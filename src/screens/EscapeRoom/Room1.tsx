import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TextInput, Button, Alert } from 'react-native';
import { GameContext } from './GameContext';
import styles from './stylesRoom1';

// Tipagem para navegação entre salas
type Room1ScreenProps = {
  navigation: any; 
};

/** mostra um enigma e permite ao usuário responder. Se acertar, avança para a próxima sala e adiciona item ao inventário.*/
const Room1: React.FC<Room1ScreenProps> = ({ navigation }) => {
  //para armazenar a resposta do usuário
  const [answer, setAnswer] = useState('');
  //para atualizar progresso e inventário
  const { updateProgress } = useContext(GameContext)!;

  //chamada ao pressionar o botão de confirmação
  const checkAnswer = () => {
    // verifica se a resposta está correta 
    if (answer.toLowerCase().trim() === 'temperatura') {
      // atualiza progresso: vai para a sala 2 e adiciona a chave ao inventário
      updateProgress(2, 'Chave Misteriosa');
      // navega para a próxima sala
      navigation.navigate('Room2');
    } else {
      // mostra alerta de erro
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

