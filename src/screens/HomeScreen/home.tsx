import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ImageBackground, Modal, Pressable } from 'react-native';
import styles from './styles';

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

export function HomeScreen({ navigation }: { navigation: any }) {
  const [menuVisible, setMenuVisible] = useState(false);

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
            onPress={card.onPress ? () => card.onPress(navigation) : undefined}
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
