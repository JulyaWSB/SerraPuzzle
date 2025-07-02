import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Alert, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../../routes/StackNavigator';
import { GameContext } from './GameContext';
import styles from './stylesRoom1';

// Tipagem para navegação entre salas
type Room1ScreenProps = {
  navigation: any;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

/** mostra um enigma e permite ao usuário responder. Se acertar, avança para a próxima sala e adiciona item ao inventário.*/
const Room1: React.FC<Room1ScreenProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  //para armazenar a resposta do usuário
  const [answer, setAnswer] = useState('');
  //para atualizar progresso e inventário
  const { updateProgress } = useContext(GameContext)!;

  const [vida, setVida] = useState(3);

  //chamada ao pressionar o botão de confirmação
  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === 'temperatura') {
      updateProgress(2, 'Chave Misteriosa');
      navigation.navigate('Room2');
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

