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
import { RootStackParamList } from "../../routes/StackNavigator";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Login({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation<NavigationProps>();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const dados = {
        email: email,
        password: senha,
      }

      console.log("Chegou aqui!")
      const response = await apiLogin.post("/auth/signin", dados);

      await AsyncStorage.setItem("token", response.data?.content?.token);
      await AsyncStorage.setItem("nome", response.data?.content?.user?.name);

      Alert.alert("Sucesso", "Bem-vindo!");

      console.log("Token:", response.data.token);
      navigation.navigate("Home");

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
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.textoCadastro}>
            {" "}
            Cadastre-se aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
