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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/navigation"; // ajuste para seu path

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export function Login() {
  const navigation = useNavigation<LoginScreenProp>();

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

      await AsyncStorage.setItem("token", response.data?.content?.token);
      await AsyncStorage.setItem("nome", response.data?.content?.user?.name);
      await AsyncStorage.setItem("email", response.data?.content?.user?.email); // salvando email também

      Alert.alert("Sucesso", "Bem-vindo!");
      navigation.navigate("Perfil"); // navega para perfil após login
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
        <Text style={styles.textoCadastro}>Não possuí cadastro?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.textoCadastro}> Cadastre-se aqui!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}