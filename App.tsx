import { useFonts } from "expo-font";
import { useState } from "react";
import { Login } from "./src/screens/login";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GameProvider } from './src/screens/EscapeRoom/GameContext';
import Room1 from './src/screens/EscapeRoom/Room1';
import Room2 from './src/screens/EscapeRoom/Room2';
import Room3 from './src/screens/EscapeRoom/Room3';
import FinishScreen from './src/screens/EscapeRoom/FinishScreen';
import Inventory from './src/screens/EscapeRoom/Inventário';
import HomeScreen from './src/screens/HomeScreen/home'; // ✅ importar Home corretamente

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RoomStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Room1" component={Room1} />
      <Stack.Screen name="Room2" component={Room2} />
      <Stack.Screen name="Room3" component={Room3} />
      <Stack.Screen name="Finish" component={FinishScreen} />
    </Stack.Navigator>
  );
}

function EscapeRoomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Escape Room" component={RoomStack} />
      <Tab.Screen name="Inventário" component={Inventory} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login">
              {() => <Login onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="RunasPuzzleFases" component={EscapeRoomTabs} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
