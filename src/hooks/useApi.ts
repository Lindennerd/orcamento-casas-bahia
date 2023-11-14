import { Orcamento } from "../../types";

export default function useApi() {
  interface OrcamentoJson {
    total_price: string;
    produto_frete: string;
    produto_price: string;
    produto_id: number;
    produto_description: string;
    produto_code: string;
    produto_quantity: number;
    orcamento_created_at: string;
    vendedor_email: string;
    vendedor_name: string;
    vendedor_phone: string;
    cliente_cnpj: string;
    cliente_name: string;
    ID: number;
    cliente_id: number;
    vendedor_id: number;
    created_at: string;
    name: string;
    cnpj: string;
    ac: string;
    phone: string;
    email: string;
    description: string;
    code: string;
    price: string;
    frete: string;
    quantity: number;
    orcamento_id: number;
  }

  const mapOrcamentos = (orcamentoJson: OrcamentoJson[]) => {
    const orcamentos: Orcamento[] = [];

    orcamentoJson.forEach((orcamento) => {
      const existingOrcamento = orcamentos.find(
        (o) => o.id === orcamento.orcamento_id
      );

      if (existingOrcamento) {
        existingOrcamento.produtos.push({
          id: orcamento.produto_id,
          description: orcamento.produto_description,
          code: orcamento.produto_code,
          price: Number(orcamento.produto_price),
          frete: Number(orcamento.produto_frete),
          quantity: orcamento.produto_quantity,
        });
      } else {
        orcamentos.push({
          id: orcamento.orcamento_id,
          cliente: {
            id: orcamento.cliente_id,
            name: orcamento.cliente_name,
            cnpj: orcamento.cliente_cnpj,
            ac: orcamento.cliente_cnpj,
          },
          vendedor: {
            id: orcamento.vendedor_id,
            name: orcamento.vendedor_name,
            phone: orcamento.vendedor_phone,
            email: orcamento.vendedor_email,
          },
          produtos: [
            {
              id: orcamento.produto_id,
              description: orcamento.produto_description,
              code: orcamento.produto_code,
              price: Number(orcamento.produto_price),
              frete: Number(orcamento.produto_frete),
              quantity: orcamento.produto_quantity,
            },
          ],
          total: Number(orcamento.total_price),
          data: orcamento.orcamento_created_at,
        });
      }
    });

    return orcamentos;
  };

  return {
    saveOrcamento: async (orcamento: Orcamento) => {
      const response = await fetch("/.netlify/functions/save-orcamento", {
        method: "POST",
        body: JSON.stringify(orcamento),
      });

      return response;
    },
    getOrcamentos: async () => {
      const response = await fetch("/.netlify/functions/get-orcamentos");
      const json = await response.json();
      if (json instanceof Array) return mapOrcamentos(json);
      else return [];
    },
    updateOrcamento: async (orcamento: Orcamento) => {
      const response = await fetch("/.netlify/functions/update-orcamento", {
        method: "POST",
        body: JSON.stringify(orcamento),
      });

      return response;
    },
  };
}
