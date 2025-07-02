import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Alert, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { GameContext } from './GameContext';
import styles from './stylesRoom2';

type Room2ScreenProps = {
  navigation: any;
};

const Room2: React.FC<Room2ScreenProps> = ({ navigation }) => {
  // estado para armazenar o código digitado
  const [code, setCode] = useState('');
  // scesso ao inventário e função de progresso via contexto
  const { inventory, updateProgress } = useContext(GameContext)!;

  // verifica se o usuário já possui a chave
  const hasKey = inventory.includes('Chave Misteriosa');

  const [vida, setVida] = useState(3);

  // função chamada ao tentar abrir o cofre
  const checkCode = () => {
    if (code === '1984') {
      if (hasKey) {
        updateProgress(3, 'Livro Cifrado');
        navigation.navigate('Room3');
      } else {
        Alert.alert('Você precisa da chave!', 'Volte para a Sala 1 e resolva o enigma.');
      }
    } else {
      if (vida > 1) {
        setVida(prev => prev - 1);
        Alert.alert(`'Código incorreto!', 'Dica: O ano do livro distópico mais famoso. Você tem mais ${vida - 1} vidas.`);
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
        <Text style={styles.title}>Sala 2: Cofre Secreto</Text>
        <Text style={styles.title}>Você encontrou um cofre com um teclado numérico.</Text>
        <Text style={styles.title}>Dica: "O futuro é um livro já escrito."</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o código..."
          keyboardType="numeric"
          value={code}
          onChangeText={setCode}
        />

        <Button title="Abrir Cofre" onPress={checkCode} />

        {/* Aviso caso não tenha a chave */}
        {!hasKey && (
          <Text style={styles.warning}>
            ⚠ Você precisa da "Chave Misteriosa" (Volte para a Sala 1).
          </Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default Room2;
