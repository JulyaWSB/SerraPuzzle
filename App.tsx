import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GameProvider } from './contexts/GameContext';
import { RootStackParamList } from './src/routes/types';
import FatoScreen from './src/screens/fato/FatoScreen';
import HistoricoScreen from './src/screens/fato/HistoricoScreen';
import ResultadoScreen from './src/screens/fato/ResultadoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 2,
          borderTopColor: '#fff',
        },
        tabBarActiveTintColor: '#F1FA8C',
        tabBarInactiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontFamily: 'monospace',
        },
      }}
    >
      <Tab.Screen
        name="Fato"
        component={FatoScreen}
        options={{
          tabBarLabel: 'Fato',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoricoScreen}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </GameProvider>
  );
}