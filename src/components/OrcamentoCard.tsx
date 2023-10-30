import { FiEdit, FiShare } from "react-icons/fi";
import { Orcamento } from "../../types";
import { useFormatCurrency } from "../common/useFormatCurrency";

export const OrcamentoCard = ({ orcamento }: { orcamento: Orcamento }) => {
  const { formatCurrency } = useFormatCurrency();

  return (
    <div className="bg-white rounded-md shadow-md p-6 w-80">
      <div className="flex justify-between gap-1">
        <p className="text-gray-500">Cliente:</p>
        <p className="text-end">{orcamento.cliente.name}</p>
      </div>
      <div className="flex justify-between gap-1">
        <p className="text-gray-500">Vendedor:</p>
        <p>{orcamento.vendedor.name}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Total</p>
        <p>{formatCurrency(orcamento.total)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Data</p>
        <p>{orcamento.data}</p>
      </div>
      <div className="flex justify-end mt-4">
        <a
          href={`/orcamento/${orcamento.id}`}
          className="p-2 cursor-pointer  hover:text-green-500 transition-all flex items-center gap-2"
        >
          Ver <FiShare />
        </a>
        <a
          href={`/orcamento/editar/${orcamento.id}`}
          className="p-2 cursor-pointer hover:text-green-500 transition-all flex items-center gap-2"
        >
          Editar <FiEdit />
        </a>
      </div>
    </div>
  );
};
