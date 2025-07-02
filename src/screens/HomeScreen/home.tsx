import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ImageBackground, Modal, Pressable } from 'react-native';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/StackNavigator';

const gridCards = [
  {
    image: require('../../assets/images/livro (1).png'),
    onPress: (navigation: any) => navigation.navigate('RunasPuzzleFases'),
  },
  {
    image: require('../../assets/images/camera.png'),
    onPress: undefined,
  },
  {}, {}, {}, {}, // outros cards p add imagem
];

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleFotos = (i : number) => {
    if( i === 0) {
      navigation.navigate("PuzzleFotos");
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/fundo.jpg')}
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
        source={require('../../assets/loginBg.png')}
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
