import { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { Orcamento as OrcamentoType } from "../../../types";
import { OrcamentoView } from "./OrcamentoView";

export interface OrcamentoProps {
  view: OrcamentoType;
}

export const Orcamento = (props: OrcamentoProps) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="w-full h-10 bg-slate-200 flex justify-end items-center px-4">
        <a
          className="text-blue-500 cursor-pointer flex items-center gap-2 hover:text-blue-700"
          onClick={() => handlePrint()}
        >
          <span>Imprimir</span>
          <FiPrinter />
        </a>
      </div>
      <OrcamentoView orcamento={props.view} ref={componentRef} />
    </>
  );
};
