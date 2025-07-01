import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import bgImage from '../../assets/loginBg.png';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../@types/navigation';

type PerfilScreenProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

export function Perfil() {
  const navigation = useNavigation<PerfilScreenProp>();

  const [usuarioLogado, setUsuarioLogado] = useState<{
    nome: string;
    email: string | null;
  }>({
    nome: '',
    email: '',
  });

  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const nome = await AsyncStorage.getItem('nome');
        const email = await AsyncStorage.getItem('email');
        setUsuarioLogado({
          nome: nome || 'Usuário',
          email: email || 'Email não encontrado',
        });
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage:', error);
      }
    };

    carregarUsuario();
  }, []);

  const alterarConta = () => {
    setEditando(true);
  };

  const salvarAlteracao = async () => {
    try {
      if (!novoNome.trim()) {
        Alert.alert('Aviso', 'Digite um novo nome válido.');
        return;
      }
      await AsyncStorage.setItem('nome', novoNome);
      setUsuarioLogado((prev) => ({ ...prev, nome: novoNome }));
      setNovoNome('');
      setEditando(false);
      Alert.alert('Sucesso', 'Nome alterado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar novo nome:', error);
      Alert.alert('Erro', 'Não foi possível alterar o nome.');
    }
  };

  const deletarConta = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar sua conta? Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Conta deletada', 'Sua conta foi excluída com sucesso.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erro ao deletar conta:', error);
              Alert.alert('Erro', 'Não foi possível deletar sua conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Perfil do Usuário</Text>

        <View style={styles.cardUsuario}>
          <Text style={styles.texto}>Nome: {usuarioLogado.nome}</Text>
          <Text style={styles.texto}>Email: {usuarioLogado.email}</Text>
        </View>

        {editando && (
          <View style={{ width: '100%', marginBottom: 20 }}>
            <TextInput
              style={styles.inputAlterar}
              placeholder="Novo nome"
              value={novoNome}
              onChangeText={setNovoNome}
            />
            <TouchableOpacity onPress={salvarAlteracao} style={styles.botaoSalvar}>
              <Text style={styles.botaoTexto}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}

        {!editando && (
          <TouchableOpacity onPress={alterarConta} style={styles.botaoAlterar}>
            <Text style={styles.botaoTexto}>Alterar Conta</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={deletarConta} style={styles.botaoDeletar}>
          <Text style={styles.botaoTexto}>Deletar Conta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}