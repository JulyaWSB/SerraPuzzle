import { useFonts } from "expo-font";
import { Login } from "./src/screens/login";
import { Cadastro } from "./src/screens/cadastro";
import { TranslateGame } from "./src/screens/translateGame";

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Login />;
}
