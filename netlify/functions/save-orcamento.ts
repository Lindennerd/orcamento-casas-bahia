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
      const cliente = await transaction.execute(
        "INSERT INTO Cliente (name, cnpj, ac) VALUES (?, ?, ?)",
        [orcamento.cliente.name, orcamento.cliente.cnpj, orcamento.cliente.ac]
      );
      const vendedor = await transaction.execute(
        "INSERT INTO Vendedor (name, phone, email) VALUES (?, ?, ?)",
        [
          orcamento.vendedor.name,
          orcamento.vendedor.phone,
          orcamento.vendedor.email,
        ]
      );
      const orcamentoId = await connection.execute(
        "INSERT INTO Orcamento (cliente_id, vendedor_id) VALUES (?, ?)",
        [cliente.insertId, vendedor.insertId]
      );
      await Promise.all(
        orcamento.produtos.map(async (produto) => {
          const produtoInsert = await connection.execute(
            "INSERT INTO Produto (description, code, price, frete, quantity, orcamento_id) VALUES (?, ?, ?, ?, ?, ?)",
            [
              produto.description,
              produto.code,
              produto.price,
              produto.frete,
              produto.quantity,
              orcamentoId.insertId,
            ]
          );
          return produtoInsert;
        })
      );
    });
  } catch (error) {
    console.log(error);
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
