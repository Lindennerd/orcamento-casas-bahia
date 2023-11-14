import { OrcamentoCard } from "../components/OrcamentoCard";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { orcamentos } = useAppContext();

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4 max-w-screen-lg mx-auto p-2 rounded-md">
        {orcamentos.length === 0 && (
          <>
            <p className="text-center text-gray-500">
              Nenhum orçamento cadastrado
            </p>
            <div className="flex-1 text-right text-white">
              <a href="/orcamento/novo">Novo Orçamento</a>
            </div>
          </>
        )}
        {orcamentos.map((orcamento) => (
          <OrcamentoCard key={orcamento.id} orcamento={orcamento} />
        ))}
      </div>
    </>
  );
}
