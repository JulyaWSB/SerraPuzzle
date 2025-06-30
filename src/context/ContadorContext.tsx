// ContadorContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useCronometro } from "./CronometroContext";

interface ContadorContextProps {
  clicks: number;
  adicionarClique: () => void;
  resetContador: () => void;
  isRunningContador: boolean;
}

const ContadorContext = createContext<ContadorContextProps | undefined>(undefined);

interface ContadorProviderProps {
  children: ReactNode;
}

export function ContadorProvider({ children }: ContadorProviderProps) {
  const { isRunningCronometro } = useCronometro(); 
  const [clicks, setClicks] = useState(0);
  const [isRunningContador, setIsRunningContador] = useState(isRunningCronometro);

  // Atualiza quando o cronômetro mudar
  useEffect(() => {
    setIsRunningContador(isRunningCronometro);
  }, [isRunningCronometro]);

  const adicionarClique = () => {
    if (isRunningContador) {
      setClicks(prev => prev + 1);
    }
  };

  const resetContador = () => {
    setClicks(0);
  };

  return (
    <ContadorContext.Provider value={{ clicks, adicionarClique, resetContador, isRunningContador }}>
      {children}
    </ContadorContext.Provider>
  );
}

export function useContador() {
  const context = useContext(ContadorContext);
  if (!context) {
    throw new Error('useContador precisa estar dentro de <ContadorProvider>');
  }
  return context;
}
