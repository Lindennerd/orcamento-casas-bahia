import type { Config, Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";
import type { Orcamento } from "../../types";

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;
  const { body } = event;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ statusCode: 400, body: "Missing body" }),
    };
  }

  const orcamento = JSON.parse(body) as Orcamento;

  try {
    await connection.transaction(async (transaction) => {
      await transaction.execute(
        "UPDATE Cliente SET name = ?, cnpj = ?, ac = ? WHERE ID = ?",
        [
          orcamento.cliente.name,
          orcamento.cliente.cnpj,
          orcamento.cliente.ac,
          orcamento.cliente.id,
        ]
      );

      console.log("update cliente");

      await transaction.execute(
        "UPDATE Vendedor SET name = ?, phone = ?, email = ? WHERE ID = ?",
        [
          orcamento.vendedor.name,
          orcamento.vendedor.phone,
          orcamento.vendedor.email,
          orcamento.vendedor.id,
        ]
      );

      console.log("update vendedor");

      await Promise.all(
        orcamento.produtos.map(async (produto) => {
          const produtoQuery = await connection.execute(
            "SELECT COUNT(1) FROM Produto WHERE orcamento_id = ? AND ID = ?",
            [orcamento.id, produto.id]
          );

          console.log("select produto");

          if (produtoQuery.rows[0]["COUNT()"] === 0) {
            await transaction.execute(
              "INSERT INTO Produto (description, code, price, frete, quantity, orcamento_id) VALUES (?, ?, ?, ?, ?, ?)",
              [
                produto.description,
                produto.code,
                produto.price,
                produto.frete,
                produto.quantity,
                orcamento.id,
              ]
            );
            console.log("insert produto");
            return;
          }

          if (produto.deleted) {
            await transaction.execute(
              "DELETE FROM Produto WHERE orcamento_id = ? AND ID = ?",
              [orcamento.id, produto.id]
            );
            console.log("delete produto");
            return;
          }

          if (produtoQuery.rows[0]["COUNT()"] > 0) {
            await transaction.execute(
              "UPDATE Produto SET description = ?, code = ?, price = ?, frete = ?, quantity = ? WHERE orcamento_id = ? AND ID = ?",
              [
                produto.description,
                produto.code,
                produto.price,
                produto.frete,
                produto.quantity,
                orcamento.id,
                produto.id,
              ]
            );
            console.log("update produto");
            return;
          }
        })
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return {
    statusCode: 201,
  };
});

export const config: Config = {
  path: "/save-orcamento",
  method: "POST",
};
