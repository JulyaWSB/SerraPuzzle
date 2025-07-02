import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGame } from '../contexts/GameContext';

export default function HistoricoScreen() {
  const { historico, acertos } = useGame();
  const navigation = useNavigation(); // ✅ CORRETO: agora funciona

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎯 Acertos: {acertos}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={styles.lista}
        data={historico}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.fato}>{item.fato}</Text>
            <Text style={styles.resultado}>
              Você disse: {item.respostaUsuario ? 'Verdadeiro' : 'Falso'} — {item.acertou ? '✅ Acertou' : '❌ Errou'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 0,
  },
  lista: {
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 18,
    fontFamily: 'monospace',
    backgroundColor: '#E63946',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    borderWidth: 4,
    borderColor: '#000',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#F1FA8C',
    borderColor: '#000',
    borderWidth: 3,
    marginBottom: 12,
    padding: 12,
  },
  fato: {
    fontFamily: 'monospace',
    fontSize: 13,
    marginBottom: 4,
    color: '#000',
  },
  resultado: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#000',
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 5,
  },
  voltarTexto: {
    color: '#fff',
    marginLeft: 8,
    fontFamily: 'monospace',
  },
});

