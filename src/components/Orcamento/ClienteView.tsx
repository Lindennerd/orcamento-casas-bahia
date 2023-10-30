import { Cliente } from "../../../types/index";
export const ClienteView = (props: { cliente: Cliente }) => {
  return (
    <div>
      <div className="flex gap-2">
        <span>Cliente:</span>
        <span>{props.cliente.name}</span>
      </div>
      <div className="flex gap-2">
        <span>CNPJ:</span>
        <span>{props.cliente.cnpj}</span>
      </div>
      <div className="flex gap-2">
        <span>A/C:</span>
        <span>{props.cliente.ac}</span>
      </div>
    </div>
  );
};
