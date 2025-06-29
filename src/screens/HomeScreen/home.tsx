import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ImageBackground, Modal, Pressable, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/images/fundo.jpg')}
      style={styles.container}
      resizeMode="cover">
      <StatusBar hidden />

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

      <View style={styles.grid}>
        {[...Array(6)].map((_, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={i === 0 ? () => navigation.navigate('RunasPuzzleFases') : undefined}
          >
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
