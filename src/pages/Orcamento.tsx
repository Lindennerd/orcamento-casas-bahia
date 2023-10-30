import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Orcamento as OrcamentoType } from "../../types";
import { Orcamento } from "../components/Orcamento/index";
import { useAppContext } from "../context/AppContext";

export default function OrcamentoPage() {
  const { id } = useParams();
  const { orcamentos } = useAppContext();

  const [current, setCurrent] = useState<OrcamentoType | null>(null);

  useEffect(() => {
    if (!id) return;
    const orcamento = orcamentos.find((orcamento) => orcamento.id === id);
    if (!orcamento) return;
    setCurrent(orcamento);
  }, [orcamentos, id]);

  if (!current)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Carregando...</h1>
      </div>
    );

  return (
    <>
      <Orcamento view={current} />
    </>
  );
}
