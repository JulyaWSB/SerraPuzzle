import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

// 🚨 Simulação de usuário logado (troque pelo contexto futuramente)
const usuarioLogado = {
  id: '12345',
  nome: 'Cauã Pacheco',
  email: 'caua@example.com',
};

export function Perfil() {
  const alterarConta = () => {
    Alert.alert('Alterar Conta', `Função para alterar a conta do usuário ${usuarioLogado.nome} (${usuarioLogado.email})`);
  };

  const deletarConta = () => {
    Alert.alert('Deletar Conta', `Função para deletar a conta do usuário ${usuarioLogado.nome} (${usuarioLogado.email})`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Usuário</Text>

      <View style={styles.cardUsuario}>
        <Text style={styles.texto}>ID: {usuarioLogado.id}</Text>
        <Text style={styles.texto}>Nome: {usuarioLogado.nome}</Text>
        <Text style={styles.texto}>Email: {usuarioLogado.email}</Text>
      </View>

      <TouchableOpacity onPress={alterarConta} style={styles.botaoAlterar}>
        <Text style={styles.botaoTexto}>Alterar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={deletarConta} style={styles.botaoDeletar}>
        <Text style={styles.botaoTexto}>Deletar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}