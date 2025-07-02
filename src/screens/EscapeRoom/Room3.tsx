import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Alert, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { GameContext } from './GameContext';
import styles from './stylesRoom1';

// Tipagem para navegação
type Room3ScreenProps = {
  navigation: any;
};

const Room3: React.FC<Room3ScreenProps> = ({ navigation }) => {
  const [answer, setAnswer] = useState('');
  const { updateProgress } = useContext(GameContext)!;
  const [vida, setVida] = useState(3);

  // chamada ao pressionar o botão de confirmação
  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === 'sombra') {
      updateProgress(4, 'Chave Final');
      // Navega para a tela de finalização
      navigation.replace('Finish');
    } else {
      if (vida > 1) {
        setVida(prev => prev - 1);
        Alert.alert(`Resposta errada! Tente novamente. Você tem mais ${vida} vidas.`);
      } else {
        setVida(0);
        AsyncStorage.setItem("nivel", "0");
        Alert.alert(
          'Você falhou com o Nikola!',
          '',
          [
            {
              text: 'Reiniciar Jogo',
              onPress: () => navigation.navigate('Home')
            }
          ]
        );
      }
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
