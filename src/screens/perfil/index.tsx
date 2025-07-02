import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import loginBg from '../../assets/loginBg.png';
import { apiLogin } from "../../service/loginApi/loginConnection";
import { useUsuario } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/StackNavigator';
import * as Font from 'expo-font';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Perfil() {
  const { usuario, setUsuario } = useUsuario();
  const navigation = useNavigation<NavigationProps>();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Jersey15': require('../../assets/fonts/Jersey15-Regular.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, [usuario]);

  const alterarConta = async () => {
    if (!usuario) return;

    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e email não podem estar vazios.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const body = {
        id: usuario.id,
        name: nome,
        email: email,
      };

      const resposta = await apiLogin.put('/user', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsuario({ ...usuario, nome, email });

      Alert.alert('Sucesso', 'Conta alterada com sucesso!');
      setEditando(false);
      console.log(resposta.data);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        Alert.alert('Erro', 'Token inválido ou sessão expirada.');
      } else if (error.response?.status === 400) {
        Alert.alert('Erro', 'Dados enviados inválidos.');
      } else {
        Alert.alert('Erro', 'Não foi possível alterar a conta.');
      }
    }
  };

  const deletarConta = async () => {
    if (!usuario) return;

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      await apiLogin.delete(`/user/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      Alert.alert('Sucesso', 'Conta deletada com sucesso!', [
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            setUsuario(null);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        Alert.alert('Erro', 'Token inválido ou sessão expirada.');
      } else {
        Alert.alert('Erro', 'Não foi possível deletar a conta.');
      }
    }
  };

  if (!fontLoaded) {
    return null; 
  }

  if (!usuario) {
    return (
      <ImageBackground source={loginBg} style={styles.background} resizeMode="cover">
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Text style={[styles.titulo, { color: '#fff', fontFamily: 'Jersey15' }]}>
            Nenhum usuário logado
          </Text>
          <TouchableOpacity
            style={[styles.botaoAlterar, { marginTop: 20 }]}
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })}
          >
            <Text style={[styles.botaoTexto, { fontFamily: 'Jersey15' }]}>
              Voltar ao Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={loginBg} style={styles.background} resizeMode="cover">
      <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
        <Text style={[styles.titulo, { color: '#fff', fontFamily: 'Jersey15' }]}>
          Perfil do Usuário
        </Text>

        <View style={[styles.cardUsuario, { backgroundColor: 'rgba(255,255,255,0.9)' }]}>
          <Text style={[styles.texto, { fontFamily: 'Jersey15' }]}>
            ID: {usuario.id}
          </Text>

          {editando ? (
            <>
              <Text style={[styles.texto, { fontFamily: 'Jersey15' }]}>Nome:</Text>
              <TextInput
                style={[styles.texto, { borderWidth: 1, padding: 8, borderRadius: 6, fontFamily: 'Jersey15' }]}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#666"
              />

              <Text style={[styles.texto, { fontFamily: 'Jersey15' }]}>Email:</Text>
              <TextInput
                style={[styles.texto, { borderWidth: 1, padding: 8, borderRadius: 6, fontFamily: 'Jersey15' }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          ) : (
            <>
              <Text style={[styles.texto, { fontFamily: 'Jersey15' }]}>
                Nome: {usuario.nome}
              </Text>
              <Text style={[styles.texto, { fontFamily: 'Jersey15' }]}>
                Email: {usuario.email}
              </Text>
            </>
          )}
        </View>

        {editando ? (
          <TouchableOpacity onPress={alterarConta} style={styles.botaoAlterar}>
            <Text style={[styles.botaoTexto, { fontFamily: 'Jersey15' }]}>
              Salvar Alterações
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditando(true)} style={styles.botaoAlterar}>
            <Text style={[styles.botaoTexto, { fontFamily: 'Jersey15' }]}>
              Alterar Conta
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={deletarConta} style={styles.botaoDeletar}>
          <Text style={[styles.botaoTexto, { fontFamily: 'Jersey15' }]}>
            Deletar Conta
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}