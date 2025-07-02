import React, { createContext, useContext, useState } from 'react';

// Tipo de cada resultado salvo no histórico
type Resultado = {
  fato: string;
  respostaUsuario: boolean;
  acertou: boolean;
};

// Tipagem do contexto
type GameContextType = {
  vidas: number;
  acertos: number;
  historico: Resultado[];
  pontuacao: number;
  adicionarResultado: (res: Resultado) => void;
  resetarJogo: () => void;
};

// Criação do contexto
const GameContext = createContext<GameContextType>({} as GameContextType);

// Provedor do contexto
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
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
    <GameContext.Provider
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
    </GameContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useGame = () => useContext(GameContext);
