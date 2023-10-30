import { Vendedor } from "../../../types";
import { Form, Input } from "../Form";

export interface VendedorFormProps {
  vendedor: Vendedor;
  setVendedor: (vendedor: Vendedor) => void;
}

export const VendedorForm = (props: VendedorFormProps) => {
  return (
    <Form>
      <Input
        label="Nome"
        name="nome"
        type="text"
        value={props.vendedor.name}
        onChange={(e) =>
          props.setVendedor({ ...props.vendedor, name: e.target.value })
        }
      />
      <Input
        label="Telefone"
        name="telefone"
        type="text"
        value={props.vendedor.phone}
        mask="(99) 99999-9999"
        onChange={(e) =>
          props.setVendedor({ ...props.vendedor, phone: e.target.value })
        }
      />
      <Input
        label="E-mail"
        name="email"
        type="email"
        value={props.vendedor.email}
        onChange={(e) =>
          props.setVendedor({ ...props.vendedor, email: e.target.value })
        }
      />
    </Form>
  );
};
