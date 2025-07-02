import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { BombCliker } from '../../screens/bombClicker/BombCliker';
import Room1 from "../../screens/EscapeRoom/Room1";
import { MoviePuzzle } from '../../screens/moviePuzzle';
import { PuzzleFotos } from '../../screens/puzzleFotos';
import { TranslateGame } from '../../screens/translateGame';
import { styles } from './Bottom.styles';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
	BombClick: {},
	Home: {},
	Fotos: {},
	translate: {},
	movie: {},
	charada: {}
}

export function BottonTabBomb() {
	const [nivel, setNivel] = useState(5);

	useEffect(() => {
		const intervalo = setInterval(() => {
			AsyncStorage.getItem("nivel").then(valor => { setNivel(Number(valor)) }).catch(err => console.error("Erro ao buscar nível:", err));
		}, 2000);
		return () => clearInterval(intervalo);
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="BombClick"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0,
				},
				tabBarItemStyle: {
					backgroundColor: 'transparent',
				},
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#000',
			}}
		>

			{/* PuzzleFotos - Nível 0 */}
			<Tab.Screen
				name="Fotos"
				component={PuzzleFotos}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 0
									? require("../../assets/Icons/EstrelaFotos.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 0) e.preventDefault();
					}
				})}
			/>

			{/* BombClick - Nível 2 */}
			<Tab.Screen
				name="BombClick"
				component={BombCliker}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 2
									? require("../../assets/Icons/EstrelaBomb.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 2) e.preventDefault();
					}
				})}
			/>

			{/* Translate Game - Nível 3 */}
			<Tab.Screen
				name="translate"
				component={TranslateGame}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 3
									? require("../../assets/Icons/EstrelaJulya.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 3) e.preventDefault();
					}
				})}
			/>

			{/* MoviePuzzle - Nível 4 */}
			<Tab.Screen
				name="movie"
				component={MoviePuzzle}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaFilme.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>

			{/* Room 1 - Nível 4 */}
			<Tab.Screen
				name="charada"
				component={Room1}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaCharada.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>
		</Tab.Navigator>
	);
}

export function BottonTabTempo() {
	const [nivel, setNivel] = useState(5);

	useEffect(() => {
		const intervalo = setInterval(() => {
			AsyncStorage.getItem("nivel").then(valor => { setNivel(Number(valor)) }).catch(err => console.error("Erro ao buscar nível:", err));
		}, 2000);
		return () => clearInterval(intervalo);
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="Fotos"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0,
				},
				tabBarItemStyle: {
					backgroundColor: 'transparent',
				},
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#000',
			}}
		>

			{/* PuzzleFotos - Nível 0 */}
			<Tab.Screen
				name="Fotos"
				component={PuzzleFotos}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 0
									? require("../../assets/Icons/EstrelaFotos.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 0) e.preventDefault();
					}
				})}
			/>

			{/* BombClick - Nível 2 */}
			<Tab.Screen
				name="BombClick"
				component={BombCliker}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 2
									? require("../../assets/Icons/EstrelaBomb.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 2) e.preventDefault();
					}
				})}
			/>

			{/* Translate Game - Nível 3 */}
			<Tab.Screen
				name="translate"
				component={TranslateGame}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 3
									? require("../../assets/Icons/EstrelaJulya.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 3) e.preventDefault();
					}
				})}
			/>

			{/* MoviePuzzle - Nível 4 */}
			<Tab.Screen
				name="movie"
				component={MoviePuzzle}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaFilme.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>

			{/* Room 1 - Nível 4 */}
			<Tab.Screen
				name="charada"
				component={Room1}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaCharada.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>
		</Tab.Navigator>
	);
}

export function BottonTabTranslate() {
	const [nivel, setNivel] = useState(5);

	useEffect(() => {
		const intervalo = setInterval(() => {
			AsyncStorage.getItem("nivel").then(valor => { setNivel(Number(valor)) }).catch(err => console.error("Erro ao buscar nível:", err));
		}, 2000);
		return () => clearInterval(intervalo);
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="translate"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0,
				},
				tabBarItemStyle: {
					backgroundColor: 'transparent',
				},
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#000',
			}}
		>

			{/* PuzzleFotos - Nível 0 */}
			<Tab.Screen
				name="Fotos"
				component={PuzzleFotos}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 0
									? require("../../assets/Icons/EstrelaFotos.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 0) e.preventDefault();
					}
				})}
			/>

			{/* BombClick - Nível 2 */}
			<Tab.Screen
				name="BombClick"
				component={BombCliker}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 2
									? require("../../assets/Icons/EstrelaBomb.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 2) e.preventDefault();
					}
				})}
			/>

			{/* Translate Game - Nível 3 */}
			<Tab.Screen
				name="translate"
				component={TranslateGame}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 3
									? require("../../assets/Icons/EstrelaJulya.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 3) e.preventDefault();
					}
				})}
			/>

			{/* MoviePuzzle - Nível 4 */}
			<Tab.Screen
				name="movie"
				component={MoviePuzzle}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaFilme.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>

			{/* Room 1 - Nível 4 */}
			<Tab.Screen
				name="charada"
				component={Room1}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaCharada.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>
		</Tab.Navigator>
	);
}

export function BottonTabMovie() {
	const [nivel, setNivel] = useState(0);

	useEffect(() => {
		const intervalo = setInterval(() => {
			AsyncStorage.getItem("nivel").then(valor => { setNivel(Number(valor)) }).catch(err => console.error("Erro ao buscar nível:", err));
		}, 2000);
		return () => clearInterval(intervalo);
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="movie"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0,
				},
				tabBarItemStyle: {
					backgroundColor: 'transparent',
				},
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#000',
			}}
		>

			{/* PuzzleFotos - Nível 0 */}
			<Tab.Screen
				name="Fotos"
				component={PuzzleFotos}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 0
									? require("../../assets/Icons/EstrelaFotos.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 0) e.preventDefault();
					}
				})}
			/>

			{/* BombClick - Nível 2 */}
			<Tab.Screen
				name="BombClick"
				component={BombCliker}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 2
									? require("../../assets/Icons/EstrelaBomb.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 2) e.preventDefault();
					}
				})}
			/>

			{/* Translate Game - Nível 3 */}
			<Tab.Screen
				name="translate"
				component={TranslateGame}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 3
									? require("../../assets/Icons/EstrelaJulya.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 3) e.preventDefault();
					}
				})}
			/>

			{/* MoviePuzzle - Nível 4 */}
			<Tab.Screen
				name="movie"
				component={MoviePuzzle}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaFilme.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>

			{/* Room 1 - Nível 4 */}
			<Tab.Screen
				name="charada"
				component={Room1}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaCharada.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>
		</Tab.Navigator>
	);
}

export function BottonTabCharada() {
	const [nivel, setNivel] = useState(5);

	useEffect(() => {
		const intervalo = setInterval(() => {
			AsyncStorage.getItem("nivel").then(valor => { setNivel(Number(valor)) }).catch(err => console.error("Erro ao buscar nível:", err));
		}, 2000);
		return () => clearInterval(intervalo);
	}, []);

	return (
		<Tab.Navigator
			initialRouteName="charada"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'rgba(255, 255, 255, 0)',
					borderTopWidth: 0,
					position: 'absolute',
					elevation: 0,
				},
				tabBarItemStyle: {
					backgroundColor: 'transparent',
				},
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#000',
			}}
		>

			{/* PuzzleFotos - Nível 0 */}
			<Tab.Screen
				name="Fotos"
				component={PuzzleFotos}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 0
									? require("../../assets/Icons/EstrelaFotos.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 0) e.preventDefault();
					}
				})}
			/>

			{/* BombClick - Nível 2 */}
			<Tab.Screen
				name="BombClick"
				component={BombCliker}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 2
									? require("../../assets/Icons/EstrelaBomb.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 2) e.preventDefault();
					}
				})}
			/>

			{/* Translate Game - Nível 3 */}
			<Tab.Screen
				name="translate"
				component={TranslateGame}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 3
									? require("../../assets/Icons/EstrelaJulya.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 3) e.preventDefault();
					}
				})}
			/>

			{/* MoviePuzzle - Nível 4 */}
			<Tab.Screen
				name="movie"
				component={MoviePuzzle}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaFilme.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>

			{/* Room 1 - Nível 4 */}
			<Tab.Screen
				name="charada"
				component={Room1}
				options={{
					tabBarIcon: () => (
						<Image
							resizeMode="contain"
							source={
								nivel >= 4
									? require("../../assets/Icons/EstrelaCharada.png")
									: require("../../assets/Icons/EstrelaApagada.png")
							}
							style={styles.imagem}
						/>
					)
				}}
				listeners={({ navigation }) => ({
					tabPress: e => {
						if (nivel < 4) e.preventDefault();
					}
				})}
			/>
		</Tab.Navigator>
	);
}