import React, { createContext, useContext, useState } from 'react';

// Tipo de cada resultado salvo no histórico
type Resultado = {
  fato: string;
  respostaUsuario: boolean;
  acertou: boolean;
};

// Tipagem do contexto
type GameAlternativeContextType = {
  vidas: number;
  acertos: number;
  historico: Resultado[];
  pontuacao: number;
  adicionarResultado: (res: Resultado) => void;
  resetarJogo: () => void;
};

// Criação do contexto
const GameAlternativeContext = createContext<GameAlternativeContextType>({} as GameAlternativeContextType);

// Provedor do contexto
export const GameAlternativeProvider = ({ children }: { children: React.ReactNode }) => {
  const [vidas, setVidas] = useState(5);
  const [acertos, setAcertos] = useState(0);
  const [historico, setHistorico] = useState<Resultado[]>([]);

  const pontuacao = acertos;

  const adicionarResultado = (resultado: Resultado) => {
    setHistorico((prev) => [...prev, resultado]);

    if (resultado.acertou) {
      setAcertos((prev) => prev + 1);
    } else {
      setVidas((prev) => Math.max(prev - 1, 0)); // Garante que não fica negativo
    }
  };

  const resetarJogo = () => {
    setVidas(5);
    setAcertos(0);
    setHistorico([]);
  };

  return (
    <GameAlternativeContext.Provider
      value={{
        vidas,
        acertos,
        historico,
        pontuacao,
        adicionarResultado,
        resetarJogo,
      }}
    >
      {children}
    </GameAlternativeContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useGame = () => useContext(GameAlternativeContext);
