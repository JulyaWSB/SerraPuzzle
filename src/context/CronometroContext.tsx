import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface CronometroContextProps {
  millis: number;
  segundos: string;
  centesimos: string;
  isRunningCronometro: boolean;
  isFinished: boolean; // Nova propriedade para indicar se terminou
  start: () => void;
  pause: () => void;
  reset: (novoTempo?: number) => void;
  addTime: (segundosExtras: number) => void;
}

interface CronometroProviderProps {
  segundoInicial?: number;
  children: ReactNode;
}

const CronometroContext = createContext<CronometroContextProps | undefined>(undefined);

export function CronometroProvider({ segundoInicial = 10, children }: CronometroProviderProps) {
  const [millis, setMillis] = useState(segundoInicial * 1000);
  const [isRunningCronometro, setIsRunningCronometro] = useState(true);
  const [tempoInicial] = useState(segundoInicial * 1000);

  // Verifica se o cronômetro terminou
  const isFinished = millis === 0;

  useEffect(() => {
    if (!isRunningCronometro || isFinished) return;

    const intervalo = setInterval(() => {
      setMillis((prev) => {
        const next = prev - 50;
        if (next <= 0) {
          // Para automaticamente quando chega a zero
          setIsRunningCronometro(false);
          return 0;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(intervalo);
  }, [isRunningCronometro, isFinished]);

  // Garante que sempre temos 4 dígitos visíveis
  const segundosTotal = Math.floor(millis / 1000);
  const segundos = Math.min(99, segundosTotal).toString().padStart(2, '0');
  const centesimos = Math.floor((millis % 1000) / 10).toString().padStart(2, '0');

  const start = useCallback(() => {
    // Só permite iniciar se houver tempo restante
    if (millis > 0) {
      setIsRunningCronometro(true);
    }
  }, [millis]);

  const pause = useCallback(() => {
    setIsRunningCronometro(false);
  }, []);

  const reset = useCallback((novoTempo?: number) => {
    const tempo = novoTempo ? novoTempo * 1000 : tempoInicial;
    setMillis(tempo);
    setIsRunningCronometro(false);
  }, [tempoInicial]);

  const addTime = useCallback((segundosExtras: number) => {
    setMillis(prev => prev + (segundosExtras * 1000));
  }, []);

  return (
    <CronometroContext.Provider value={{
      millis,
      segundos,
      centesimos,
      isRunningCronometro,
      isFinished,
      start,
      pause,
      reset,
      addTime
    }}>
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