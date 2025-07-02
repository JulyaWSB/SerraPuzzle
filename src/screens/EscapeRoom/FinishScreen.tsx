import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';

const FinishScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/livre.jpeg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentBox}>
        <Text style={styles.title}>Parabéns!</Text>
        <Text style={styles.subtitle}>Você escapou do desafio!</Text>
        <Text style={styles.subtitle}>O número que você busca é [][][][][][9]</Text>
        <Button title="Voltar para o início" onPress={() => navigation.navigate('Home')} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.64)',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
    textAlign: 'center',
  },
});

export default FinishScreen;
