import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TextInput, Button, Alert } from 'react-native';
import { GameContext } from './GameContext';
import styles from './stylesRoom1'; 

// Tipagem para navegação
type Room3ScreenProps = {
  navigation: any;
};

const Room3: React.FC<Room3ScreenProps> = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const { updateProgress } = useContext(GameContext)!;

  // chamada ao pressionar o botão de confirmação
  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === 'sombra') {
      updateProgress(4, 'Chave Final');
      // Navega para a tela de finalização
      navigation.replace('Finish');
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
        <Text style={styles.title}>Enigma 3: Me siga o dia todo, mas desapareço à noite. Quem sou eu?</Text>
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

export default Room3;
