import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import styles from "./styles";
import { useState } from "react";
import { Input } from "../../components/input";
import { apiLogin } from "../../service/loginApi/loginConnection";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await apiLogin.post("/auth/signin", {
        email,
        password: senha,
      });

      Alert.alert("Sucesso", "Bem-vindo!");
      console.log("Token:", response.data.token);
      // Aqui você pode usar AsyncStorage para salvar o token, ou navegar:
      // await AsyncStorage.setItem("token", response.data.token);
      // navigation.navigate("Home");
    } catch (error: any) {
      if (error.response?.status === 404) {
        Alert.alert("Erro", "Credenciais inválidas.");
      } else {
        Alert.alert("Erro", "Erro ao fazer login.");
      }
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/loginBg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <Input label="E-mail" value={email} onChangeText={setEmail} />
        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin}>
          <Image
            source={require("../../assets/botao.png")}
            style={styles.startButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.temCadastro}>
        <Text style={styles.textoCadastro}>Não possuí cadastro? </Text>
        <TouchableOpacity>
          <Text
            style={styles.textoCadastro}
            // onPress={() => navigation.navigate("Cadastro")}
          >
            {" "}
            Cadastre-se aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
