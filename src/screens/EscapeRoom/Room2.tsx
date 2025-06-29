import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground } from 'react-native';
import { GameContext } from './GameContext';
import { StackNavigationProp } from '@react-navigation/stack';
import  styles  from './stylesRoom2';

type RootStackParamList = {
  Room1: undefined;
  Room2: undefined;
};

type Room2ScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Room2'>;
};

const Room2: React.FC<Room2ScreenProps> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const { inventory, updateProgress } = useContext(GameContext)!;

  const hasKey = inventory.includes('Chave Misteriosa');

  const checkCode = () => {
    if (code === '1984') {
      if (hasKey) {
        updateProgress(3, 'Livro Cifrado');
        Alert.alert('Parabéns!', 'Você escapou da sala!');
      } else {
        Alert.alert('Você precisa da chave!', 'Volte para a Sala 1 e resolva o enigma.');
      }
    } else {
      Alert.alert('Código incorreto!', 'Dica: O ano do livro distópico mais famoso.');
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
