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

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
        animation: 'fade',  
        gestureEnabled: true,            
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Bomb Click" component={BombCliker} />
      <Stack.Screen name="Translate Game" component={TranslateGame} />
      <Stack.Screen name="Room1" component={Room1} />
      <Stack.Screen name="Room2" component={Room2} />
      <Stack.Screen name="Room3" component={Room3} />
      <Stack.Screen name="Finish" component={FinishScreen} />
      
    </Stack.Navigator>
  );
}

export default MyStack;
