import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, TextInput, ImageBackground } from 'react-native';
import styles from './styles';

import bgImage from '../../assets/loginBg.png';
import manhaImg from '../../assets/manha.png';
import meioDiaImg from '../../assets/meioDia.png';
import tardeImg from '../../assets/tarde.png';
import noiteImg from '../../assets/noite.png';

const imagensPorHorario = [
  { hora: '06:00', imagem: manhaImg },
  { hora: '12:00', imagem: meioDiaImg },
  { hora: '18:00', imagem: tardeImg },
  { hora: '00:00', imagem: noiteImg },
];

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
        Alert.alert(acertou ? 'Parabéns!' : 'Tente novamente', acertou
          ? 'Você acertou a sequência!'
          : 'A ordem estava incorreta. Experimente de novo.');

        setRespostaUsuario([]); // reset para tentar de novo
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
      Alert.alert('Formato inválido', 'Digite a hora no formato 24h (HH:MM). Ex: 06:00 ou 18:30');
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.overlay}>
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>Digite a hora que você acordou</Text>
              <TextInput
                style={styles.inputHora}
                placeholder="HH:MM"
                value={inputHora}
                onChangeText={(text) => {
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
              />
              <TouchableOpacity onPress={confirmarHora} style={styles.botaoConfirmar}>
                <Text style={styles.botaoConfirmarTexto}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.titulo}>Selecione as imagens na ordem do seu dia</Text>

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
              <Text style={styles.texto}>{item.hora}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.textoResposta}>
          Sua sequência: {respostaUsuario.join(' → ')}
        </Text>

        <TouchableOpacity onPress={limparSequencia} style={styles.botaoLimpar}>
          <Text style={styles.botaoLimparTexto}>Limpar sequência</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
