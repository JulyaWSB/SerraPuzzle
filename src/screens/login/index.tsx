import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { useState } from "react";
import { Input } from "../../components/input";

export function Login() {
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
        <Input label="Usuário" />
        <Input label="Senha" />
        <TouchableOpacity>
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
