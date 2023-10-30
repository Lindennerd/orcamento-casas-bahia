import { Vendedor } from "../../../types";

export const VendedorView = (props: { vendedor: Vendedor }) => {
  return (
    <div>
      <div className="flex gap-2">
        <span>Vendedor:</span>
        <span>{props.vendedor.name}</span>
      </div>
      <div className="flex gap-2">
        <span>Telefone:</span>
        <span>{props.vendedor.phone}</span>
      </div>
      <div className="flex gap-2">
        <span>Email:</span>
        <span>{props.vendedor.email}</span>
      </div>
    </div>
  );
};
