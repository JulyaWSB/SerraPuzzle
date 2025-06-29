import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MyStack from "./src/routes/StackNavigator";
import { BottomTabRoutes } from "./src/routes/BottonTabNavigator/BottonTabNavigator";


export default function App() {
  const [fontsLoaded] = useFonts({
    PressStart2P: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    PressStart: require("./src/assets/fonts/PressStart2P-Regular.ttf"),
    Tinny: require("./src/assets/fonts/Tiny5-Regular.ttf"),
  });


  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
