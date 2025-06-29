import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro } from '../screens/cadastro';
import { Login } from '../screens/login';
import { BombCliker } from '../screens/bombClicker/BombCliker';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
        animation: 'fade',  
        gestureEnabled: true
      }}
    >
      <Stack.Screen name="Bomb Click" component={BombCliker} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MyStack;
