export interface Cliente {
  id: number;
  name: string;
  cnpj: string;
  ac: string;
}

export interface Produto {
  id: number;
  description: string;
  code: string;
  price: number;
  frete: number;
  quantity: number;
  deleted?: boolean;
  editting?: boolean;
}

export interface Vendedor {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Orcamento {
  id: number;
  cliente: Cliente;
  vendedor: Vendedor;
  produtos: Produto[];
  total: number;
  data: string;
}
