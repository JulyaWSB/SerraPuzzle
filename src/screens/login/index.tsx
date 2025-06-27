import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { useState } from "react";
import { Input } from "../../components/input";

export function Login({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/loginBg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <Input label="E-mail" />
        <Input label="Senha" />
        <TouchableOpacity onPress={onLogin}>
          <Image
            source={require("../../assets/botao.png")}
            style={styles.startButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.temCadastro}>
        <Text style={styles.textoCadastro}>Não possuí cadastro? </Text>
        <TouchableOpacity>
          <Text style={styles.textoCadastro}> Cadastre-se aqui!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
