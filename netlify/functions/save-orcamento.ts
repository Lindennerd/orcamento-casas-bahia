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

  const cliente = await connection.execute(
    "INSERT INTO Cliente (name, cnpj, ac) VALUES (?, ?, ?)",
    [orcamento.cliente.name, orcamento.cliente.cnpj, orcamento.cliente.ac]
  );

  const vendedor = await connection.execute(
    "INSERT INTO Vendedor (name, phone, email) VALUES (?, ?, ?)",
    [
      orcamento.vendedor.name,
      orcamento.vendedor.phone,
      orcamento.vendedor.email,
    ]
  );

  const orcamentoId = await connection.execute(
    "INSERT INTO Orcamento (cliente_id, vendedor_id, total, data) VALUES (?, ?, ?, ?)",
    [cliente.insertId, vendedor.insertId, orcamento.total, orcamento.data]
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

      await connection.execute(
        "INSERT INTO OrcamentoProduto (orcamento_id, produto_id) VALUES (?, ?)",
        [orcamentoId.insertId, produtoInsert.insertId]
      );
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ statusCode: 201 }),
  };
});

export const config: Config = {
  path: "/save-orcamento",
  method: "POST",
};
