import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground } from 'react-native';
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

  // função chamada ao tentar abrir o cofre
  const checkCode = () => {
    if (code === '1984') {
      if (hasKey) {
        // se tiver a chave, avança e adiciona item ao inventário
        updateProgress(3, 'Livro Cifrado');
        navigation.navigate('Room3'); // Navega para a Room3
      } else {
        // se não tiver a chave, alerta para voltar à sala 1
        Alert.alert('Você precisa da chave!', 'Volte para a Sala 1 e resolva o enigma.');
      }
    } else {
      // sódigo incorreto, mostra dica
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
