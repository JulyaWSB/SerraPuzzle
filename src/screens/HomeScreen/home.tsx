import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../routes/StackNavigator';
import styles from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [nivel, setNivel] = useState(0);
  const navigation = useNavigation<NavigationProps>();

  // Carregar nível do AsyncStorage quando o componente montar
  useEffect(() => {
    const fetchNivel = async () => {
      const nivelString = await AsyncStorage.getItem("nivel");
      if (nivelString) {
        setNivel(Number(nivelString));
      } else {
        setNivel(0); 
      }
    };
    fetchNivel();
  }, []);

  // Cards com requisito mínimo de nível para liberar o clique
  const gridCards = [
    {
      image: require('../../assets/cauã.png'),
      minNivel: 0, 
      onPress: () => navigation.navigate("PuzzleFotos"),
    },
    {
      image: require('../../assets/karen.png'),
      minNivel: 7,
      onPress: undefined,
    },
    {
      image: require('../../assets/maria.png'),
      minNivel: 2, 
      onPress: () => navigation.navigate("Bomb Click"),
    },
    {
      image: require('../../assets/julya.png'),
      minNivel: 3,
      onPress: () => navigation.navigate("Translate Game"),
    },
    {
      image: require('../../assets/joao pedro.png'),
      minNivel: 4,
      onPress: () => navigation.navigate("MoviePuzzle"),
    },
    {
      image: require('../../assets/images/livro (1).png'),
      minNivel: 5,
      onPress: () => navigation.navigate("Room1"),
    },
  ];

  // Função para lidar com o clique, só chama onPress se o nível for suficiente
  const handleFotos = (card: typeof gridCards[0]) => {
    if (nivel !== null && nivel >= (card.minNivel ?? 0)) {
      if (card.onPress) card.onPress();
    } else {
      alert('Você não tem nível suficiente para acessar esta opção.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/loginBg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar hidden />

      {/* Navbar etc */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
          <Text style={styles.menuText}>≡</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/título.png')}
        style={styles.tituloImage}
        resizeMode="contain"
      />

      {/* grid */}
      <View style={styles.grid}>
        {gridCards.map((card, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => handleFotos(card)}
            disabled={nivel < (card.minNivel ?? 0)} 
          >
            {card.image && (
              <Image
                source={card.image}
                style={{
                  width: 170,
                  height: 160,
                  resizeMode: 'center',
                  opacity: nivel >= (card.minNivel ?? 0) ? 1 : 0.4, 
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuBox}>
            <Text style={styles.menuTitle}>Menu</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Perfil');
            }}>
              <Text style={styles.menuItemText}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Sobre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Configurações</Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
}
