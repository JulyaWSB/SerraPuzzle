import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { GameContext } from './GameContext';
import { StackNavigationProp } from '@react-navigation/stack';
import  styles  from './stylesRoom1';

type RootStackParamList = {
  Room1: undefined;
  Room2: undefined;
};

type Room1ScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Room1'>;
};

const Room1: React.FC<Room1ScreenProps> = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const { updateProgress } = useContext(GameContext)!;

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === 'temperatura') {
      updateProgress(2, 'Chave Misteriosa');
      navigation.navigate('Room2');
    } else {
      Alert.alert('Resposta errada! Tente novamente.');
    }
  };

  return (
  <ImageBackground
    source={require('../../assets/images/Room.jpeg')}
    style={styles.container}
    resizeMode="cover"
  >
  <View style={styles.contentBox}>
    <Text style={styles.title}>Enigma 1: O que sobe e desce sem sair do lugar?</Text>

    <TextInput
      placeholder="Digite sua resposta..."
      value={answer}
      onChangeText={setAnswer}
      style={styles.input}
    />

    <Button title="CONFIRMAR" onPress={checkAnswer} />
  </View>
</ImageBackground>

  );
};

export default Room1;

