import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../types";
import FatoScreen from "../../screens/FatoScreen";
import HistoricoScreen from "../../screens/HistoricoScreen";
import ResultadoScreen from "../../screens/ResultadoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 2,
          borderTopColor: "#fff",
        },
        tabBarActiveTintColor: "#F1FA8C",
        tabBarInactiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontFamily: "monospace",
        },
      }}
    >
      <Tab.Screen
        name="Fato"
        component={FatoScreen}
        options={{
          tabBarLabel: "Fato",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoricoScreen}
        options={{
          tabBarLabel: "Histórico",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function FatoMalucoNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Resultado"
        component={ResultadoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
