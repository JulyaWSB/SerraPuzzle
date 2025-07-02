import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../contexts/GameContext';
import { RootStackParamList } from '../routes/types';

type ResultadoRouteProp = RouteProp<RootStackParamList, 'Resultado'>;

export default function ResultadoScreen() {
  const route = useRoute<ResultadoRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resetarJogo, vidas, acertos } = useGame();

  const { fato, respostaUsuario, acertou, fim, explicacao } = route.params;

  let mensagemFinal = '';

  useEffect(() => {
    if (fim === 'ganhou' || fim === 'perdeu') {
      setTimeout(() => {
        resetarJogo();
      }, 100);
    }
  }, [fim]);

  if (fim === 'ganhou') {
    mensagemFinal = '🏆 Você ganhou o jogo!';
  } else if (fim === 'perdeu') {
    mensagemFinal = '💀 Você perdeu todas as vidas!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resultado</Text>

      <Text style={styles.texto}>Fato: {fato}</Text>
      <Text style={styles.texto}>
        Sua resposta: {respostaUsuario ? 'Verdadeiro' : 'Falso'}
      </Text>

      <Text style={[styles.texto, styles.resultado]}>
        {acertou ? '✅ Você acertou!' : '❌ Você errou!'}
      </Text>

      <Text style={styles.explicacao}>💡 {explicacao}</Text>

      <Text style={styles.status}>
        Vidas: {'❤️'.repeat(vidas) + '🤍'.repeat(5 - vidas)}
      </Text>
      <Text style={styles.status}>⭐ Acertos: {acertos}</Text>

      {mensagemFinal !== '' && (
        <Animatable.Text
          animation={fim === 'ganhou' ? 'tada' : 'bounceIn'}
          duration={1200}
          style={styles.mensagemFinal}
        >
          {mensagemFinal}
        </Animatable.Text>
      )}

      {fim === null && (
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text style={styles.textoBotao}>▶️ Continuar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: '#000', marginTop: 12 }]}
        onPress={() => {
          resetarJogo();
          navigation.navigate('Tabs');
        }}
      >
        <Text style={styles.textoBotao}>🔁 Novo Jogo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: '#333', marginTop: 12 }]}
        onPress={() => navigation.navigate('Tabs')}
      >
        <Text style={styles.textoBotao}>📜 Ver Histórico</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 20,
    backgroundColor: '#E63946',
    color: '#fff',
    padding: 10,
    borderWidth: 4,
    borderColor: '#000',
  },
  texto: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  explicacao: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#F1FA8C',
    padding: 10,
    borderWidth: 3,
    borderColor: '#000',
  },
  status: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#000',
    marginTop: 12,
  },
  mensagemFinal: {
    fontSize: 18,
    fontFamily: 'monospace',
    marginTop: 20,
    backgroundColor: '#000',
    color: '#F1FA8C',
    padding: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  botao: {
    backgroundColor: '#E63946',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#000',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});
