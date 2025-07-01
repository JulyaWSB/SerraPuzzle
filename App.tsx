import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MyStack from "./src/routes/StackNavigator";
import { CronometroProvider } from "./src/context/CronometroContext";
import { ContadorProvider } from "./src/context/ContadorContext";

// =======
// import { useState } from "react";
// import { Login } from "./src/screens/login";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { GameProvider } from './src/screens/EscapeRoom/GameContext';
// import Room1 from './src/screens/EscapeRoom/Room1';
// import Room2 from './src/screens/EscapeRoom/Room2';
// import Room3 from './src/screens/EscapeRoom/Room3';
// import FinishScreen from './src/screens/EscapeRoom/FinishScreen';
// import Inventory from './src/screens/EscapeRoom/Inventário';
// import HomeScreen from './src/screens/HomeScreen/home'; // ✅ importar Home corretamente
// import { tabBarStyle, tabBarLabelStyle } from './src/screens/EscapeRoom/tabBarStyles';

// // criação dos navegadores
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // stack de salas do Escape Room
// function RoomStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Room1" component={Room1} />
//       <Stack.Screen name="Room2" component={Room2} />
//       <Stack.Screen name="Room3" component={Room3} />
//       <Stack.Screen name="Finish" component={FinishScreen} />
//     </Stack.Navigator>
//   );
// }

// // tab bar inferior: Escape Room e Inventário
// function EscapeRoomTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#3fbd63', 
//         tabBarInactiveTintColor: '#FFF',  
//         tabBarStyle,                      
//         tabBarLabelStyle,                 
//       }}
//     >
//       <Tab.Screen name="Escape Room" component={RoomStack} />
//       <Tab.Screen name="Inventário" component={Inventory} />
//     </Tab.Navigator>
//   );
// }
// >>>>>>> 644662f1d0e64ce5b1cdf3a520c0112d54fa7db4

export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    PressStart: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    Tinny: require("./src/assets/fonts/Tiny5-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <CronometroProvider>
        <ContadorProvider>
          <MyStack />
        </ContadorProvider>
      </CronometroProvider>
    </NavigationContainer>
  );
}
