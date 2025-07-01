import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BombCliker } from '../../screens/bombClicker/BombCliker';
import { HomeScreen } from '../../screens/HomeScreen/home';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
	BombClick: {},
	Home: {}
}

export function BottonTabBomb() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#fff', paddingBottom: 2 },
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: "transparent"
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={require("../../assets/Icons/pausa.png")}
							style={{ tintColor: "#e0e1dd", width: 30 }}
						/>
					)
				}}
				name="BombClick"
				component={BombCliker}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={require("../../assets/Icons/pausa.png")}
							style={{ tintColor: "#e0e1dd", width: 30 }}
						/>
					)
				}}
				name="Home"
				component={HomeScreen}
			/>
		</Tab.Navigator>
	);
}