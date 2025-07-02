import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro } from '../screens/cadastro';
import { Login } from '../screens/login';
import { BombCliker } from '../screens/bombClicker/BombCliker';
import { TranslateGame } from '../screens/translateGame';
import { HomeScreen } from '../screens/HomeScreen/home';
import Room1 from '../screens/EscapeRoom/Room1';
import Room2 from '../screens/EscapeRoom/Room2';
import Room3 from '../screens/EscapeRoom/Room3';
import FinishScreen from '../screens/EscapeRoom/FinishScreen';
import { BottonTabBomb } from './BottonTabNavigator/BottonTabNavigator';
import { PuzzleFotos } from '../screens/puzzleFotos';
import { MoviePuzzle } from '../screens/moviePuzzle';

export type RootStackParamList = {
  'Bomb Click': undefined;
  Login: undefined;
  Home: undefined;
  Cadastro: undefined;
  'Translate Game': undefined;
  Room1: undefined;
  Room2: undefined;
  Room3: undefined;
  Finish: undefined;
  PuzzleFotos: undefined;
  MoviePuzzle: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Room1" component={Room1} />
      <Stack.Screen name="MoviePuzzle" component={MoviePuzzle} />
      <Stack.Screen name="Translate Game" component={TranslateGame} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Bomb Click" component={BottonTabBomb} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Room2" component={Room2} />
      <Stack.Screen name="Room3" component={Room3} />
      <Stack.Screen name="Finish" component={FinishScreen} />
      <Stack.Screen name="PuzzleFotos" component={PuzzleFotos} />
    </Stack.Navigator>
  );
}

export default MyStack;
