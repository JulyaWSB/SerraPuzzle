import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }: { navigation: any }) {
  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/botao.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    padding: 10,
  },
  buttonImage: {
    width: 200,
    height: 100,
  },
});
