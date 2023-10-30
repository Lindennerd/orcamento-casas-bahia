import { LegacyRef, forwardRef } from "react";
import { Orcamento } from "../../../types";
import casasBahiaLogo from "../../assets/casas-bahia-logo.svg.png";
import { ClienteView } from "./ClienteView";
import { FooterView } from "./FooterView";
import { ProdutoView } from "./ProdutoView";
import { ResumeView } from "./ResumeView";
import { VendedorView } from "./VendedorView";

export const OrcamentoView = forwardRef(
  (props: { orcamento: Orcamento }, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div
        className="flex flex-col max-w-screen-lg mx-auto gap-4 px-2"
        ref={ref}
      >
        <div className="flex justify-between p-4 gap-4  border-b">
          <div className="flex items-center gap-4">
            <img src={casasBahiaLogo} className="h-12" />
            <h1 className="font-bold text-3xl">ORÇAMENTO</h1>
          </div>
          <FooterView />
        </div>
        <div className="px-4 flex justify-between">
          <ClienteView cliente={props.orcamento.cliente} />
          <VendedorView vendedor={props.orcamento.vendedor} />
        </div>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {props.orcamento.produtos.map((produto, index) => (
            <ProdutoView key={index} produto={produto} />
          ))}
        </div>
        <ResumeView total={props.orcamento.total} data={props.orcamento.data} />
      </div>
    );
  }
);
