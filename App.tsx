import { useFonts } from "expo-font";
import { useState } from "react";
import { Login } from "./src/screens/login";
import { Cadastro } from "./src/screens/cadastro";
import HomeScreen from "./src/screens/home/home";

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return <HomeScreen />;
}
