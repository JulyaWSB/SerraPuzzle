import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BombCliker } from '../../screens/bombClicker/BombCliker';


const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
	BombClick: {};
}

export function BottomTabRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#000', paddingBottom: 2 },
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
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="BombClick"
				component={BombCliker}
			/>
		</Tab.Navigator>
	);
}