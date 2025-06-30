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
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login({ onLogin }: { onLogin?: () => void }) {
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

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("nome", response.data.user.name);

      Alert.alert("Sucesso", "Bem-vindo!");
      console.log("Token:", response.data.token);
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
<<<<<<< HEAD
        <Input label="E-mail" value={email} onChangeText={setEmail} />
        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin}>
=======
        <Input label="E-mail" />
        <Input label="Senha" />
        <TouchableOpacity onPress={onLogin}>
>>>>>>> 8f62a774eddfd5b65ba1364711fe48cc7669374e
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
