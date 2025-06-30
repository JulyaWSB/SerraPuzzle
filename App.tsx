import { useFonts } from "expo-font";
import { Login } from "./src/screens/login";
import { Cadastro } from "./src/screens/cadastro";
import { PuzzleFotos } from "./src/screens/puzzleFotos";
import { Perfil } from "./src/screens/perfil";

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  //return <Login />;
  //return <PuzzleFotos />;
  return <Perfil />;
}
