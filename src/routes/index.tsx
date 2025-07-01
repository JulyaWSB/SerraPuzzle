// routes/index.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ResultadoScreen from '../screens/ResultadoScreen';
import Tabs from './tabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Rotas() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Resultado" component={ResultadoScreen} />
    </Stack.Navigator>
  );
}
