import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useGame } from '../contexts/GameContext';
import { RootStackParamList } from '../routes/types';

type Fato = {
  texto: string;
  isTrue: boolean;
  explicacao: string;
};

const fatosOriginais: Fato[] = [
  { texto: 'O sol é uma estrela.', isTrue: true, explicacao: 'O Sol é uma estrela do tipo anã amarela.' },
  { texto: 'A água ferve a 50 graus Celsius.', isTrue: false, explicacao: 'A água ferve a 100°C ao nível do mar.' },
  { texto: 'Os peixes respiram por brânquias.', isTrue: true, explicacao: 'As brânquias permitem que os peixes respirem debaixo d\'água.' },
  { texto: 'O Brasil faz parte da América do Norte.', isTrue: false, explicacao: 'O Brasil está localizado na América do Sul.' },
  { texto: 'A banana é uma fonte de potássio.', isTrue: true, explicacao: 'Bananas são ricas em potássio, importante para os músculos.' },
  { texto: 'O ser humano tem três pulmões.', isTrue: false, explicacao: 'O ser humano tem dois pulmões.' },
  { texto: 'A Terra gira em torno do Sol.', isTrue: true, explicacao: 'Esse movimento é chamado de translação e dura cerca de 365 dias.' },
  { texto: 'O pinguim vive no deserto.', isTrue: false, explicacao: 'Pinguins vivem em regiões frias, como a Antártica.' },
  { texto: 'As abelhas produzem mel.', isTrue: true, explicacao: 'O mel é produzido a partir do néctar das flores.' },
  { texto: 'O oxigênio é essencial para a vida.', isTrue: true, explicacao: 'O oxigênio é necessário para a respiração celular.' },
   { texto: 'O ser humano tem 5 sentidos.', isTrue: true, explicacao: 'Os cinco sentidos são: visão, audição, olfato, paladar e tato.' },
  { texto: 'O gelo é mais pesado que a água.', isTrue: false, explicacao: 'O gelo é menos denso que a água, por isso flutua.' },
  { texto: 'Relâmpagos sempre vêm antes do trovão.', isTrue: true, explicacao: 'A luz viaja mais rápido que o som, então vemos o relâmpago antes.' },
  { texto: 'Os morcegos são cegos.', isTrue: false, explicacao: 'Morcegos não são cegos, mas usam a ecolocalização para se orientar.' },
  { texto: 'A lua tem luz própria.', isTrue: false, explicacao: 'A luz da lua é a luz do sol refletida.' },
  { texto: 'A eletricidade sempre foi conhecida pela humanidade.', isTrue: false, explicacao: 'A eletricidade foi descoberta e estudada com profundidade apenas nos últimos séculos.' },
  { texto: 'A girafa é o animal terrestre mais alto.', isTrue: true, explicacao: 'As girafas podem atingir até 6 metros de altura.' },
  { texto: 'O oceano Atlântico é o maior do mundo.', isTrue: false, explicacao: 'O maior oceano é o Pacífico.' },
  { texto: 'A Antártida é o continente mais frio.', isTrue: true, explicacao: 'A Antártida tem as temperaturas mais baixas do planeta.' },
  { texto: 'A luz branca é composta por várias cores.', isTrue: true, explicacao: 'O prisma revela que a luz branca contém todas as cores do arco-íris.' },
  { texto: 'As plantas fazem fotossíntese durante a noite.', isTrue: false, explicacao: 'A fotossíntese ocorre na presença de luz solar.' },
  { texto: 'A Terra tem apenas uma lua.', isTrue: true, explicacao: 'A Lua é o único satélite natural da Terra.' },
  { texto: 'O som se propaga mais rápido no ar do que na água.', isTrue: false, explicacao: 'O som se propaga mais rápido na água porque as partículas estão mais próximas.' },
  { texto: 'O chocolate é tóxico para cães.', isTrue: true, explicacao: 'O chocolate contém teobromina, que é prejudicial aos cães.' },
  { texto: 'O Monte Everest é a montanha mais alta do mundo.', isTrue: true, explicacao: 'O Everest tem 8.848 metros de altitude.' },
];


export default function FatoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { adicionarResultado, vidas, acertos, historico } = useGame();

  const [fatosRestantes, setFatosRestantes] = useState<Fato[]>([]);
  const [fatoAtual, setFatoAtual] = useState<Fato | null>(null);

  useEffect(() => {
    const naoRepetidos = fatosOriginais.filter(f => !historico.some(h => h.fato === f.texto));
    setFatosRestantes(naoRepetidos);
  }, [historico]);

  useEffect(() => {
    sortearFato();
  }, [fatosRestantes]);

  function sortearFato() {
    if (fatosRestantes.length === 0) {
      setFatoAtual(null);
      return;
    }
    const indice = Math.floor(Math.random() * fatosRestantes.length);
    setFatoAtual(fatosRestantes[indice]);
  }

  function responder(respostaUsuario: boolean) {
    if (!fatoAtual) return;

    const acertou = respostaUsuario === fatoAtual.isTrue;

    adicionarResultado({
      fato: fatoAtual.texto,
      respostaUsuario,
      acertou,
    });

    setTimeout(() => {
      if (!acertou && vidas - 1 === 0) {
        navigation.navigate('Resultado', {
          fato: fatoAtual.texto,
          respostaUsuario,
          acertou: false,
          fim: 'perdeu',
          explicacao: fatoAtual.explicacao,
        });
        return;
      }

      if (acertou && acertos + 1 === 5) {
        navigation.navigate('Resultado', {
          fato: fatoAtual.texto,
          respostaUsuario,
          acertou: true,
          fim: 'ganhou',
          explicacao: fatoAtual.explicacao,
        });
        return;
      }

      navigation.navigate('Resultado', {
        fato: fatoAtual.texto,
        respostaUsuario,
        acertou,
        fim: null,
        explicacao: fatoAtual.explicacao,
      });
    }, 100);
  }

  if (!fatoAtual) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>🎉 Você respondeu todos os fatos disponíveis!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.vidas}>
        Vidas: {'❤️'.repeat(vidas) + '🤍'.repeat(5 - vidas)}
      </Text>

      <Animatable.Text animation="zoomIn" duration={500} style={styles.fato}>
        {fatoAtual.texto}
      </Animatable.Text>

      <View style={styles.botoes}>
        <Animatable.View animation="bounce" duration={1000} iterationCount="infinite">
          <TouchableOpacity style={styles.botao} onPress={() => responder(true)}>
            <Text style={styles.textoBotao}>Verdadeiro</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounce" duration={1000} iterationCount="infinite">
          <TouchableOpacity style={styles.botao} onPress={() => responder(false)}>
            <Text style={styles.textoBotao}>Falso</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  vidas: {
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 20,
    color: '#000',
  },
  fato: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 40,
    color: '#000',
    fontFamily: 'monospace',
    backgroundColor: '#F1FA8C',
    padding: 10,
    borderWidth: 3,
    borderColor: '#000',
  },
  botoes: {
    flexDirection: 'row',
    gap: 20,
  },
  botao: {
    backgroundColor: '#E63946',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: '#000',
    marginHorizontal: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  texto: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'monospace',
  },
});
