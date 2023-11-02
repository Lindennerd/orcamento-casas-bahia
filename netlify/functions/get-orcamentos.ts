import { Config, Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
  const {
    planetscale: { connection },
  } = context;

  const orcamentos = await connection.execute(`
    SELECT 
      o.ID as orcamento_id,
      o.created_at as orcamento_created_at,
      c.ID as cliente_id,
      c.name as cliente_name,
      c.cnpj as cliente_cnpj,
      c.ac as cliente_ac,
      v.ID as vendedor_id,
      v.name as vendedor_name,
      v.phone as vendedor_phone,
      v.email as vendedor_email,
      p.ID as produto_id,
      p.description as produto_description,
      p.code as produto_code,
      p.price as produto_price,
      p.frete as produto_frete,
      p.quantity as produto_quantity,
      tp.total_price
    FROM Orcamento o
    INNER JOIN Cliente c on c.ID = o.ID 
    INNER JOIN Vendedor v on v.ID = o.ID
    INNER JOIN Produto p on p.orcamento_id  = o.ID 
    INNER JOIN (
        SELECT orcamento_id, SUM(price * quantity) as total_price
        FROM Produto
        GROUP BY orcamento_id
    ) tp on tp.orcamento_id = o.ID`);

  return {
    statusCode: 200,
    body: JSON.stringify(orcamentos.rows),
  };
});

export const config: Config = {
  path: "/get-orcamentos",
  method: "GET",
};
