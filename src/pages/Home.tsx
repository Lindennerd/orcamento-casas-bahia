import { OrcamentoCard } from "../components/OrcamentoCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { orcamentos } = useAppContext();

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4 max-w-screen-lg mx-auto p-2 rounded-md">
        {orcamentos.map((orcamento) => (
          <OrcamentoCard key={orcamento.id} orcamento={orcamento} />
        ))}
      </div>
    </>
  );
}
