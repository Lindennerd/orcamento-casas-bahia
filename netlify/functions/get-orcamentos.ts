import { Config, Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const orcamentos = await connection.execute(`
        SELECT
        *
        FROM Orcamento o
        INNER JOIN Cliente c ON c.id = o.cliente_id
        INNER JOIN Vendedor v ON v.id = o.vendedor_id
    `);

  return {
    statusCode: 200,
    body: JSON.stringify(orcamentos),
  };
});

export const config: Config = {
  path: "/get-orcamentos",
  method: "GET",
};
