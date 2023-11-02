import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Orcamento as OrcamentoType } from "../../types";
import LoadingSkeleton from "../components/Loading";
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

  if (!current) return <LoadingSkeleton />;

  return (
    <div className="max-w-screen-md mx-auto p-2 rounded-md border mt-4">
      <OrcamentoForm orcamento={current} />
    </div>
  );
}
