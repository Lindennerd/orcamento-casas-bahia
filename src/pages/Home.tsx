import { OrcamentoCard } from "../components/OrcamentoCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { orcamentos } = useAppContext();

  if (!orcamentos.length) {
    return (
      <div className="flex flex-col items-center mt-8 h-screen">
        <span className="text-xl">Nenhum orçamento salvo...</span>
        <span>
          Para começar um, clique em
          <a href="/orcamento/novo" className="underline text-blue-500 ml-1">
            Novo Orçamento
          </a>
        </span>
      </div>
    );
  }

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
