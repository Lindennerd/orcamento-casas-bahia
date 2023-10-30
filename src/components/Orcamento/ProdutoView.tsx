import { Produto } from "../../../types";
import { useFormatCurrency } from "../../common/useFormatCurrency";

export interface ProdutoViewProps {
  produto: Produto;
}

export const ProdutoView = (props: ProdutoViewProps) => {
  const { formatCurrency } = useFormatCurrency();

  return (
    <div className="w-full overflow-hidden">
      <div className="md:flex justify-between items-center">
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Código: {props.produto.code}
          </div>
          <a className="block mt-1 text-lg leading-tight font-medium text-black">
            {props.produto.description}
          </a>
          <div className="mt-2 text-gray-500 flex gap-4">
            <span>Quantidade: {props.produto.quantity}</span>
            <span className="text-gray-500">
              Preço: R$ {formatCurrency(props.produto.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
