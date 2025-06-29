import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CronometroContextProps {
  millis: number;
  segundos: string;
  centesimos: string;
}

const CronometroContext = createContext<CronometroContextProps | undefined>(undefined);

export function CronometroProvider({ segundoInicial = 60, children }: { segundoInicial?: number; children: ReactNode }) {
  const [millis, setMillis] = useState(segundoInicial * 1000);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMillis((prev) => {
        const next = prev - 10;
        return next < 0 ? 0 : next;
      });
    }, 20);

    return () => clearInterval(intervalo);
  }, []);

  const segundos = Math.floor(millis / 1000).toString().padStart(2, '0');
  const centesimos = Math.floor((millis % 1000) / 10).toString().padStart(2, '0');

  return (
    <CronometroContext.Provider value={{ millis, segundos, centesimos }}>
      {children}
    </CronometroContext.Provider>
  );
}

export function useCronometro() {
  const context = useContext(CronometroContext);
  if (!context) {
    throw new Error('useCronometro precisa estar dentro de <CronometroProvider>');
  }
  return context;
}
