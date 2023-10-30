export interface Cliente {
  name: string;
  cnpj: string;
  ac: string;
}

export interface Produto {
  description: string;
  code: string;
  price: number;
  frete: number;
  quantity: number;
}

export interface Vendedor {
  name: string;
  phone: string;
  email: string;
}

export interface Orcamento {
  id: string;
  cliente: Cliente;
  vendedor: Vendedor;
  produtos: Produto[];
  total: number;
  data: string;
}
