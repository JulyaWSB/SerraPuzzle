import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro } from '../screens/cadastro';
import FinishScreen from '../screens/EscapeRoom/FinishScreen';
import Room2 from '../screens/EscapeRoom/Room2';
import Room3 from '../screens/EscapeRoom/Room3';
import { HomeScreen } from '../screens/HomeScreen/home';
import { Login } from '../screens/login';
import { Perfil } from '../screens/perfil';
import SplashScreen from '../screens/SplashScreen';
import { BottonTabBomb, BottonTabCharada, BottonTabMovie, BottonTabTempo, BottonTabTranslate } from './BottonTabNavigator/BottonTabNavigator';

export type RootStackParamList = {
  'Bomb Click': undefined;
  Login: undefined;
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
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Bomb Click" component={BottonTabBomb} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="MoviePuzzle" component={BottonTabMovie} />
      <Stack.Screen name="Translate Game" component={BottonTabTranslate} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="PuzzleFotos" component={BottonTabTempo} />
      <Stack.Screen name="Room1" component={BottonTabCharada} />
      <Stack.Screen name="Room2" component={Room2} />
      <Stack.Screen name="Room3" component={Room3} />
      <Stack.Screen name="Finish" component={FinishScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
