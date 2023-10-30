import { createContext, useContext, useEffect, useState } from "react";
import { Orcamento } from "../../types";

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

  useEffect(() => {
    const data = localStorage.getItem("@orcamentos");
    if (data) {
      setOrcamentos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (orcamentos.length === 0) return;
    localStorage.setItem("@orcamentos", JSON.stringify(orcamentos));
  }, [orcamentos]);

  return (
    <AppContext.Provider value={{ orcamentos, setOrcamentos }}>
      {children}
    </AppContext.Provider>
  );
};
