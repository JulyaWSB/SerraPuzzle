import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FatoScreen from '../screens/FatoScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: '#f0f0f0', borderTopColor: '#ccc' },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';

          if (route.name === 'Fato') {
            iconName = 'information-circle';
          } else if (route.name === 'Histórico') {
            iconName = 'list';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Fato" component={FatoScreen} options={{ title: 'Fato Maluco' }} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} options={{ title: 'Histórico de Respostas' }} />
    </Tab.Navigator>
  );
}