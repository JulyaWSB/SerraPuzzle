import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GameContextType = {
  inventory: string[];
  currentRoom: number;
  updateProgress: (newRoom: number, newItem: string) => void;
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

// ✅ Correção aqui
type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [inventory, setInventory] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<number>(1);

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

  const updateProgress = async (newRoom: number, newItem: string) => {
    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    setCurrentRoom(newRoom);
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
