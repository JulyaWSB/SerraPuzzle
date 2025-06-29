import { useFonts } from "expo-font";
import { Login } from "./src/screens/login";
import { Cadastro } from "./src/screens/cadastro";
import { Cronometro } from "./src/components/cronometro/Cronometro";
import { BotaoClick } from "./src/components/botaoDeClicar/BotaoClick";
import { BombCliker } from "./src/screens/bombClicker/BombCliker";
import { CronometroProvider } from "./src/context/CronometroContext";


export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    PressStart: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    Tinny: require("./src/assets/fonts/Tiny5-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // return <Login />;

  // return <BotaoClick />
  
  return (
  <CronometroProvider>
    <BombCliker />
  </CronometroProvider> )
}
