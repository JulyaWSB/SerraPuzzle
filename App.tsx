import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MyStack from "./src/routes/StackNavigator";
import { CronometroProvider } from "./src/context/CronometroContext";
import { ContadorProvider } from "./src/context/ContadorContext";
import { GameProvider } from "./src/screens/EscapeRoom/GameContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    PressStart: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    Tinny: require("./src/assets/fonts/Tiny5-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <GameProvider>
      <NavigationContainer>
        <CronometroProvider>
          <ContadorProvider>
            <MyStack />
          </ContadorProvider>
        </CronometroProvider>
      </NavigationContainer>
    </GameProvider>
  );
}
