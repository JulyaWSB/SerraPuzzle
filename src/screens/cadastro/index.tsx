import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { Input } from "../../components/input";

export function Cadastro() {
  return (
    <ImageBackground
      source={require("../../assets/loginBg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <Input label="Nome" />
        <Input label="E-mail" />
        <Input label="Senha" />
        <Input label="Confirmar Senha" />
        <TouchableOpacity>
          <Image
            source={require("../../assets/botao.png")}
            style={styles.startButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.temLogin}>
        <Text style={styles.textoLogin}>Já possuí cadastro? </Text>
        <TouchableOpacity>
          <Text style={styles.textoLogin}> Entre aqui!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
