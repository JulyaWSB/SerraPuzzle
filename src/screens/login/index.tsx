import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../components/input";
import { PasswordInput } from "../../components/passwordInput";
import { useUsuario } from "../../context/UserContext";
import { RootStackParamList } from "../../routes/StackNavigator";
import { apiLogin } from "../../service/loginApi/loginConnection";
import styles from "./styles";


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Login({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigation = useNavigation<NavigationProps>();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { setUsuario } = useUsuario();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const dados = {
        email: email,
        password: senha,
      };

      const response = await apiLogin.post("/auth/signin", dados);

      console.log("Resposta da API:", response.data);

      await AsyncStorage.setItem("token", response.data?.content?.token);
      await AsyncStorage.setItem("nome", response.data?.content?.user?.name);

      // Salva usuário no contexto
      const userData = {
        id: response.data?.content?.user?.id,
        nome: response.data?.content?.user?.name,
        email: response.data?.content?.user?.email,
      };
      setUsuario(userData);

      Alert.alert("Sucesso", "Bem-vindo!");

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
        <PasswordInput label="Senha" value={senha} onChangeText={setSenha} />
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
          <Text style={styles.textoCadastro}> Cadastre-se aqui!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}