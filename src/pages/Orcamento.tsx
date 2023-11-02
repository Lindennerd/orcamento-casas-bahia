import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Orcamento as OrcamentoType } from "../../types";
import LoadingSkeleton from "../components/Loading";
import { Orcamento } from "../components/Orcamento/index";
import { useAppContext } from "../context/AppContext";

export default function OrcamentoPage() {
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
    <>
      <Orcamento view={current} />
    </>
  );
}
