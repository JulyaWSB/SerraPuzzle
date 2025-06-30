import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// tipagem do contexto do jogo
type GameContextType = {
  inventory: string[]; // itens coletados pelo jogador
  currentRoom: number; // sala atual
  updateProgress: (newRoom: number, newItem: string) => void; // função para atualizar progresso
};

// criação do contexto
export const GameContext = createContext<GameContextType | undefined>(undefined);

type GameProviderProps = {
  children: ReactNode;
};

/*gerencia inventário, sala atual e persistência local*/
export const GameProvider = ({ children }: GameProviderProps) => {
  const [inventory, setInventory] = useState<string[]>([]); // estado do inventário
  const [currentRoom, setCurrentRoom] = useState<number>(1); // estado da sala atual

  // carrega progresso salvo ao iniciar o app e etc
  useEffect(() => {
    const loadProgress = async () => {
      const savedProgress = await AsyncStorage.getItem('@escapeRoomProgress');
      if (savedProgress) {
        const { room, items } = JSON.parse(savedProgress);
        setCurrentRoom(room);
        setInventory(items);
      }
    };
    loadProgress();
  }, []);

  /**
   * atualiza o progresso do jogador
   * @param newRoom Nova sala
   * @param newItem Novo item coletado
   */
  const updateProgress = async (newRoom: number, newItem: string) => {
    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    setCurrentRoom(newRoom);
    // salva progresso localmente
    await AsyncStorage.setItem(
      '@escapeRoomProgress',
      JSON.stringify({ room: newRoom, items: updatedInventory })
    );
  };

  return (
    <GameContext.Provider value={{ inventory, currentRoom, updateProgress }}>
      {children}
    </GameContext.Provider>
  );
};
