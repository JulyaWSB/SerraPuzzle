import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro } from '../screens/cadastro';
import { Login } from '../screens/login';
import { BombCliker } from '../screens/bombClicker/BombCliker';
import { TranslateGame } from '../screens/translateGame';
import { HomeScreen } from '../screens/HomeScreen/home';
import { Perfil } from '../screens/perfil';
import Sobre from '../screens/sobre';
import Room1 from '../screens/EscapeRoom/Room1';
import Room2 from '../screens/EscapeRoom/Room2';
import Room3 from '../screens/EscapeRoom/Room3';
import FinishScreen from '../screens/EscapeRoom/FinishScreen';
import { BottonTabBomb } from './BottonTabNavigator/BottonTabNavigator';
import { PuzzleFotos } from '../screens/puzzleFotos';
import { MoviePuzzle } from '../screens/moviePuzzle';
import SplashScreen from '../screens/SplashScreen';
import FatoMalucoNavigator from './FatoMalucoNavigator';


export type RootStackParamList = {
  'Bomb Click': undefined;
  Login: undefined;
  FatoMaluco: undefined;
  Home: undefined;
  Perfil: undefined;
  Cadastro: undefined;
  'Translate Game': undefined;
  Room1: undefined;
  Room2: undefined;
  Room3: undefined;
  Finish: undefined;
  PuzzleFotos: undefined;
  MoviePuzzle: undefined;
  Sobre: undefined;
  Splash: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="FatoMaluco" component={FatoMalucoNavigator} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Sobre" component={Sobre} />
      <Stack.Screen name="MoviePuzzle" component={MoviePuzzle} />
      <Stack.Screen name="Translate Game" component={TranslateGame} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Bomb Click" component={BottonTabBomb} />
      <Stack.Screen name="PuzzleFotos" component={PuzzleFotos} />
      <Stack.Screen name="Room1" component={Room1} />
      <Stack.Screen name="Room2" component={Room2} />
      <Stack.Screen name="Room3" component={Room3} />
      <Stack.Screen name="Finish" component={FinishScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
