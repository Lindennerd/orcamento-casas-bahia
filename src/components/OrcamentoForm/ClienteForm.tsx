import { Cliente } from "../../../types";
import { Form, Input } from "../Form";

export interface ClientFormProps {
  cliente: Cliente;
  setCliente: (cliente: Cliente) => void;
}

export const ClienteForm = (props: ClientFormProps) => {
  return (
    <Form>
      <Input
        label="Nome"
        name="nome"
        type="text"
        value={props.cliente.name}
        onChange={(e) =>
          props.setCliente({ ...props.cliente, name: e.target.value })
        }
      />
      <Input
        label="CNPJ"
        name="cnpj"
        type="text"
        value={props.cliente.cnpj}
        mask="99.999.999/9999-99"
        onChange={(e) =>
          props.setCliente({ ...props.cliente, cnpj: e.target.value })
        }
      />
      <Input
        label="A/C"
        name="ac"
        type="text"
        value={props.cliente.ac}
        onChange={(e) =>
          props.setCliente({ ...props.cliente, ac: e.target.value })
        }
      />
    </Form>
  );
};
