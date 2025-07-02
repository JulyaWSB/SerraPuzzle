import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../routes/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Resultado'>;

export default function HomeScreen() {
  const [fato, setFato] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  async function buscarFato() {
    setLoading(true);
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
    const data = await response.json();
    setFato(data.text);
    setLoading(false);
  }

  useEffect(() => {
    buscarFato();
  }, []);

  function responder(resposta: boolean) {
  navigation.navigate('Resultado', {
    fato,
    respostaUsuario: resposta,
    acertou: false, // ou true se quiser simular acerto
    fim: null, // ou 'ganhou' / 'perdeu' conforme necessidade
    explicacao: 'Essa é uma explicação de exemplo para o fato.', // texto genérico
  });
}


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fato Maluco</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <Text style={styles.fato}>{fato}</Text>
          <View style={styles.botoes}>
            <Button title="Verdadeiro" onPress={() => responder(true)} />
            <Button title="Falso" onPress={() => responder(false)} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  fato: { fontSize: 18, color: '#eee', padding: 20, textAlign: 'center' },
  botoes: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: 200, 
    marginTop: 20 
  },
});
