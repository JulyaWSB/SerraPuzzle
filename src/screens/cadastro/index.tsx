import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import styles from "./styles";
import { Input } from "../../components/input";
import { useState } from "react";
import { apiLogin } from "../../service/loginApi/loginConnection";

export function Cadastro() {
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [senhaCadastroConfirm, setSenhaCadastroConfirm] = useState("");

  const senhaForte =
    /^(?=(?:.*\d){6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@*#&]).{8,}$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleCadastro() {
    if (
      !nomeCadastro ||
      !emailCadastro ||
      !senhaCadastro ||
      !senhaCadastroConfirm
    ) {
      Alert.alert("Atenção", "Preencha os campos necessários!");
      return;
    }

    if (!emailValido.test(emailCadastro)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    if (!senhaForte.test(senhaCadastro)) {
      Alert.alert(
        "Erro",
        "A senha deve ter pelo menos 8 caracteres, 6 números diferentes, uma letra maiúscula, uma minúscula e um caractere especial."
      );
      return;
    }

    if (senhaCadastro !== senhaCadastroConfirm) {
      Alert.alert("Erro", "As senhas não estão iguais.");
      return;
    }

    try {
      const dados = {
        name: nomeCadastro,
        email: emailCadastro,
        password: senhaCadastro,
      };

      await apiLogin.post("/auth/register", dados);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    } catch (err: any) {
      const status = err.response?.status;
      const mensagem = err.response?.data?.message || "";

      if (status === 400 && mensagem.toLowerCase().includes("email")) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
      } else if (status === 400) {
        Alert.alert("Erro", "Erro de validação: verifique os dados.");
      } else if (status === 500) {
        Alert.alert("Erro", "Erro no servidor.");
      } else {
        Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
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
        <Text style={styles.title}>Cadastro</Text>
        <Input
          label="Nome"
          value={nomeCadastro}
          onChangeText={setNomeCadastro}
        />
        <Input
          label="E-mail"
          value={emailCadastro}
          onChangeText={setEmailCadastro}
        />
        <Input
          label="Senha"
          value={senhaCadastro}
          onChangeText={setSenhaCadastro}
          secureTextEntry
        />
        <Input
          label="Confirmar Senha"
          value={senhaCadastroConfirm}
          onChangeText={setSenhaCadastroConfirm}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleCadastro}>
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
