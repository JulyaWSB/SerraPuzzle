import { useFonts } from "expo-font";
import { Login } from "./src/screens/login";
import { Cadastro } from "./src/screens/cadastro";
import { Cronometro } from "./src/functions/Contador";


export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    Daruma: require("./src/assets/fonts/DarumadropOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // return <Login />;

  return <Cronometro segundoInicial={60} />
  
}
