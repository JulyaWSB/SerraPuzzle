import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../routes/StackNavigator';
import styles from './styles';

const gridCards = [
  {
    image: require('../../assets/cauã.png'),
    onPress: undefined,
  },
  {
    image: require('../../assets/karen.png'),
    onPress: undefined,
  },
  {
    image: require('../../assets/maria.png'),
    onPress: undefined,
  }, 
  {
    image: require('../../assets/julya.png'),
    onPress: undefined,
  }, 
  {
    image: require('../../assets/joao pedro.png'),
    onPress: undefined,
  }, 
  {
    image: require('../../assets/images/livro (1).png'),
    onPress: undefined,
  }, // outros cards p add imagem
];

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleFotos = (i : number) => {
    if( i === 0) {
      navigation.navigate("PuzzleFotos");
    }
    
    if( i === 2 ) {
      navigation.navigate("Bomb Click");
    }

    if ( i === 3 ) {
      navigation.navigate("Translate Game");
    }

    if (i === 4) {
      navigation.navigate("MoviePuzzle");
    };

    if ( i === 5 ) {
      navigation.navigate("Room1");
    }
  }

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
            onPress={() => handleFotos(i)}
          >
            {card.image && (
              <Image
                source={card.image}
                style={{ width: 170, height: 160, resizeMode: 'center' }}
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
