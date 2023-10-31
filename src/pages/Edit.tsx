import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Orcamento as OrcamentoType } from "../../types";
import { OrcamentoForm } from "../components/OrcamentoForm";
import { useAppContext } from "../context/AppContext";

export default function Edit() {
  const { id } = useParams();
  const { orcamentos } = useAppContext();

  const [current, setCurrent] = useState<OrcamentoType | null>(null);

  useEffect(() => {
    if (!id) return;
    const orcamento = orcamentos.find(
      (orcamento) => orcamento.id === Number(id)
    );
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
    <div className="max-w-screen-md mx-auto p-2 rounded-md border mt-4">
      <OrcamentoForm orcamento={current} />
    </div>
  );
}
