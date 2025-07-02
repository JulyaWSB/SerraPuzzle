import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./styles";
import { translateWord } from "../../service/translateApi/translateGameService";
import { languages } from "../../utils/languages";
import heartFull from "../../assets/heartGame.png";
import heartEmpty from "../../assets/heartGameWhite.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/StackNavigator";
import { useNavigation } from "@react-navigation/native";

//array com palavras em português
const palavras = [
  "gato",
  "cachorro",
  "coelho",
  "formiga",
  "elefante",
  "capivara", //melhor animal <3
  "girafa",
  "leão",
  "gavião",
  "zebra",
];

//deixa o nome bonitinho para o botão
const languageMap: Record<string, string> = {
  es: "Espanhol",
  fr: "Francês",
  de: "Alemão",
  it: "Italiano",
  ru: "Russo",
  ja: "Japonês",
  ko: "Coreano",
  ar: "Árabe",
  tr: "Turco",
  zh: "Mandarim",
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

//função para pegar um item aleatório de um array
const getRandomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

//função para embaralhar um array
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// Função que tenta traduzir a palavra até obter uma tradução válida
// Retorna [idioma, palavra traduzida]
const tryTranslate = async (word: string): Promise<[string, string]> => {
  // Tenta até 5 vezes
  for (let attempt = 0; attempt < 5; attempt++) {
    const lang = getRandomItem(languages); //escolhe um idioma aleatório

    try {
      const translation = await translateWord(word, lang); //chama a API para traduzir

      //verifica se a tradução é válida se existe e não é igual à palavra original (não adicionei pt nas linguagens mas em italiano as vezes retorna a palavra igual)
      if (translation && translation !== word) {
        return [lang, translation]; //retorna idioma e tradução para exibir antes e dps da seta
      }
    } catch {
      //se deu erro na tradução tenta de novo com outro idioma para evitar problema
      continue;
    }
  }
  //se não conseguiu traduzir após 5 tentativas lança erro (esse erro vem da Api (verificar se a palavra em pt existe no bd))
  throw new Error("Não foi possível obter uma tradução válida.");
};

export function TranslateGame() {
  const [original, setOriginal] = useState(""); //armazena a palavra original
  const [translated, setTranslated] = useState(""); //a palavra traduzida
  const [correctLang, setCorrectLang] = useState(""); //a lingugem da palavra traduzida
  const [options, setOptions] = useState<string[]>([]); //armazena as 4 lingugens (erradas e a certa (usei para a contrução do botão))
  const [loading, setLoading] = useState(false); //o carregamento quaando abre ou muda o jogo
  const [lives, setLives] = useState(3); //guarda a quantidade de vidas
  const [score, setScore] = useState(0); //guarda o "avanço"/acertos
  const [highlightedIndex, setHighlightedIndex] = useState(-1); //para mudar a cor da opções
  const navigation = useNavigation<NavigationProps>();

  const handleReset = () => {
    setScore(0);
    setLives(3);
    generateChallenge();
  };

  const handleProximo = () => {
    navigation.navigate("MoviePuzzle");
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  //função que gera um novo desafio
  const generateChallenge = async () => {
    setLoading(true); //mostra o carregamento

    const word = getRandomItem(palavras); //pega palavra aleatória do array em pt

    try {
      const [lang, translation] = await tryTranslate(word); //obtém tradução da palavra que pegamos acima

      setOriginal(word); //seta palavra original
      setTranslated(translation); //seta tradução
      setCorrectLang(lang); //seta idioma correto

      //cria as opções erradas, removendo o idioma correto do array (faz com que nn tenha a oção de ter 2 botões com a mesma lingua)
      const wrongLangs = languages.filter((l) => l !== lang);

      //embaralha e pega 3 idiomas errados para opções falsas
      const fakeOptions = shuffle(wrongLangs).slice(0, 3);

      //mistura as opções (correta + erradas) para embaralhar a posição -- correção da ordem (a linguagem certa sempre era a primeira sem essa função)
      const allOptions = shuffle([lang, ...fakeOptions]);

      setOptions(allOptions); // atualiza as opções no estado
    } catch (error) {
      //se der erro na tradução mostra alerta para o usuário
      Alert.alert("Erro", "Não foi possível traduzir a palavra.");
    } finally {
      setLoading(false); //esconde o carregando
    }
  };

  //quando clica em uma das opções vem para cá
  const handleAnswer = (selected: string) => {
    const isCorrect = selected === correctLang;

    if (isCorrect) {
      const newScore = score + 1; //se estiver certo vc avança mais 1 na estrela
      setScore(newScore);

      //se chegar em 5 o jogador vence
      if (newScore === 5) {
        Alert.alert(
          "Você acertou a quantidade necessária!",
          "O número que você busca é [][][][4][][]!",
          [
            {
              text: "Voltar ao Início",
              onPress: () => handleHome(),
            },
            {
              text: "Jogar novamente",
              onPress: () => handleReset(),
            },
            {
              text: "Próximo Jogo",
              onPress: () => handleProximo(),
            },
          ]
        );

        return;
      }

      //se ainda nn venceu mas acertou cai aqui
      Alert.alert("Acertou!", `Muito bem!`, [
        { text: "Próxima", onPress: generateChallenge },
      ]);
    } else {
      const newLives = lives - 1; //porem se errar cai aqui e é -1 vida
      setLives(newLives);

      //se acabou as vidas o jogador perde
      if (newLives === 0) {
        Alert.alert(
          "Você falhou com o Nikola!",
          `Você errou 3 vezes!\nA tradução correta de "${original}" era em ${languageMap[correctLang]}.`,
          [
            {
              //reinicia o jogo e zera os valores de vida e pontos
              text: "Tentar novamente",
              onPress: () => {
                setScore(0);
                setLives(3);
                generateChallenge();
              },
            },
          ]
        );
        return;
      }

      //se ainda tem vidas mostra alerta de erro e continua para o próximo desafio
      Alert.alert(
        "Errou!",
        `A tradução de "${original}" foi para o idioma: ${languageMap[correctLang]}.`,
        [{ text: "Continuar", onPress: generateChallenge }]
      );
    }
  };

  //useEffect para gerar o primeiro desafio quando o componente monta
  useEffect(() => {
    generateChallenge();
  }, []);

  //useEffect para gerar animação de destaque
  useEffect(() => {
    const interval = setInterval(() => {
      //atualiza o index do botão que vai receber o bg
      setHighlightedIndex((prevIndex) => {
        if (options.length === 0) return -1; //proteção para caso naão haja botao paa destacar
        return (prevIndex + 1) % options.length;
      });
    }, 500); //velocidade que muda

    return () => clearInterval(interval);
  }, [options]); //reinicia quando opções mudam

  //tela
  return (
    <ImageBackground
      source={require("../../assets/loginBg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.status}>
        <View style={styles.livesContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Image
              key={index}
              source={index < lives ? heartFull : heartEmpty}
              style={styles.heart}
              resizeMode="contain"
            />
          ))}
        </View>
        <Text style={styles.statusText}>{score}/5</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Qual é o idioma da tradução?</Text>

        {loading ? (
          //mostra loading
          <ActivityIndicator size="large" color="#0077cc" />
        ) : (
          <>
            {/* mostra a palavra em pt e a traduzida */}

            <View style={styles.challenge}>
              <Text style={styles.challengeText}>{original}</Text>
              <Image
                source={require("../../assets/setaIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.challengeText}>{translated}</Text>
            </View>

            {/* um botão para cada opção de idioma */}
            {options.map((langCode, index) => (
              <View key={index} style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    index === highlightedIndex && {
                      backgroundColor: "#f78dce",
                    },
                  ]}
                  onPress={() => handleAnswer(langCode)}
                >
                  <Text style={styles.optionText}>{languageMap[langCode]}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </View>
    </ImageBackground>
  );
}
