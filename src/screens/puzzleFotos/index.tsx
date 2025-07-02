import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import loginBg from '../../assets/loginBg.png'; // ajuste o caminho conforme sua pasta assets
import manhaImg from '../../assets/manha.png';
import meioDiaImg from '../../assets/meioDia.png';
import noiteImg from '../../assets/noite.png';
import tardeImg from '../../assets/tarde.png';
import { RootStackParamList } from '../../routes/StackNavigator';
import styles from './styles';


const imagensPorHorario = [
  { hora: '06:00', imagem: manhaImg },
  { hora: '12:00', imagem: meioDiaImg },
  { hora: '18:00', imagem: tardeImg },
  { hora: '00:00', imagem: noiteImg },
];

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

function gerarSequenciaCerta(horaUsuario: string) {
  const [horaU, minU] = horaUsuario.split(':').map(Number);
  const minutosUsuario = horaU * 60 + minU;

  const horariosEmMinutos = imagensPorHorario.map(item => {
    const [h, m] = item.hora.split(':').map(Number);
    return { ...item, minutos: h * 60 + m };
  });

  const proximosHorarios = horariosEmMinutos.filter(item => item.minutos > minutosUsuario);

  const ordenados = horariosEmMinutos.sort((a, b) => a.minutos - b.minutos);

  const sequencia = proximosHorarios.length > 0
    ? [...proximosHorarios, ...ordenados.filter(item => item.minutos <= minutosUsuario)]
    : ordenados;

  return sequencia;
}

function embaralhar<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function PuzzleFotos() {
  const [horaUsuario, setHoraUsuario] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(true);
  const [inputHora, setInputHora] = useState('');
  const [sequenciaCorreta, setSequenciaCorreta] = useState<string[]>([]);
  const [imagensEmbaralhadas, setImagensEmbaralhadas] = useState<typeof imagensPorHorario>([]);
  const [respostaUsuario, setRespostaUsuario] = useState<string[]>([]);
  const [fontLoaded, setFontLoaded] = useState(false);

  const navigation = useNavigation<NavigationProps>();

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
    if (horaUsuario) {
      const ordemCerta = gerarSequenciaCerta(horaUsuario);
      setSequenciaCorreta(ordemCerta.map(item => item.hora));

      const embaralhadas = embaralhar(imagensPorHorario);
      setImagensEmbaralhadas(embaralhadas);
    }
  }, [horaUsuario]);

  const selecionarHorario = (hora: string) => {
    if (respostaUsuario.includes(hora)) return;

    const novaResposta = [...respostaUsuario, hora];
    setRespostaUsuario(novaResposta);

    if (novaResposta.length === 4) {
      const acertou = novaResposta.every((hora, idx) => hora === sequenciaCorreta[idx]);
      setTimeout(() => {
        if (acertou) {
          AsyncStorage.setItem("nivel", "2")
          Alert.alert('Parabéns!', 'Você acertou a sequência!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate("Home"),
            },
          ]);
        } else {
          AsyncStorage.setItem("nivel", "0")
          Alert.alert('Tente novamente', 'A ordem estava incorreta. Experimente de novo.');
        }
        setRespostaUsuario([]);
      }, 300);
    }
  };

  const limparSequencia = () => {
    setRespostaUsuario([]);
  };

  const validarHora = (hora: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(hora);
  };

  const confirmarHora = () => {
    if (validarHora(inputHora)) {
      setHoraUsuario(inputHora);
      setModalVisible(false);
    } else {
      Alert.alert(
        'Formato inválido',
        'Digite a hora no formato 24h (HH:MM). Ex: 06:00 ou 18:30',
        [{ text: 'OK', style: 'default' }],
        { cancelable: false }
      );
    }
  };

  if (!fontLoaded) {
    return null; // Ou um spinner
  }

  return (
    <ImageBackground source={loginBg} style={styles.bg}>
      <View style={styles.container}>
        {/* Modal para entrada da hora */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitulo, { fontFamily: 'Jersey15' }]}>
                Me conta, que horas foi seu primeiro suspiro do dia?
              </Text>
              <TextInput
                style={[styles.inputHora, { fontFamily: 'Jersey15' }]}
                placeholder="HH:MM"
                value={inputHora}
                onChangeText={text => {
                  let formatted = text.replace(/[^\d]/g, '');
                  if (formatted.length > 2) {
                    formatted = formatted.slice(0, 2) + ':' + formatted.slice(2, 4);
                  }
                  if (formatted.length > 5) {
                    formatted = formatted.slice(0, 5);
                  }
                  setInputHora(formatted);
                }}
                keyboardType="numeric"
                maxLength={5}
              />
              <TouchableOpacity
                onPress={confirmarHora}
                style={styles.botaoConfirmar}
              >
                <Text style={[styles.botaoConfirmarTexto, { fontFamily: 'Jersey15' }]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={[styles.titulo, { fontFamily: 'Jersey15' }]}>
          Organize as horas do seu dia nessa sequência secreta.
        </Text>

        <View style={styles.grid}>
          {imagensEmbaralhadas.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selecionarHorario(item.hora)}
              disabled={respostaUsuario.includes(item.hora)}
              style={[
                styles.card,
                respostaUsuario.includes(item.hora) && styles.selecionado,
              ]}
            >
              <Image source={item.imagem} style={styles.imagem} />
              {/* Removido o texto com a hora */}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sequenciaContainer}>
          <Text style={[styles.textoResposta, { fontFamily: 'Jersey15', marginBottom: 8 }]}>
            Sua sequência:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {respostaUsuario.map((hora, idx) => {
              const imagem = imagensPorHorario.find(item => item.hora === hora)?.imagem;
              if (!imagem) return null;
              return (
                <Image
                  key={idx}
                  source={imagem}
                  style={styles.imagemSequencia}
                />
              );
            })}
          </View>
        </View>

        <TouchableOpacity onPress={limparSequencia} style={styles.botaoLimpar}>
          <Text style={[styles.botaoLimparTexto, { fontFamily: 'Jersey15' }]}>
            Limpar sequência
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}