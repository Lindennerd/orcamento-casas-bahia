import { createContext, useContext, useEffect, useState } from "react";
import { Orcamento } from "../../types";
import useApi from "../hooks/useApi";

interface AppContextState {
  orcamentos: Orcamento[];
  setOrcamentos: (orcamentos: Orcamento[]) => void;
}

const AppContext = createContext<AppContextState>({
  orcamentos: [],
  setOrcamentos: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const { getOrcamentos } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const orcamentos = await getOrcamentos();
      setOrcamentos(orcamentos);
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ orcamentos, setOrcamentos }}>
      {children}
    </AppContext.Provider>
  );
};
