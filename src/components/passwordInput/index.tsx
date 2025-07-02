import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Input } from "../input";
import styles from "./styles";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export function PasswordInput({ label, value, onChangeText }: Props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!mostrarSenha}
      />
      <TouchableOpacity
        onPress={() => setMostrarSenha(!mostrarSenha)}
        style={styles.eye}
      >
        <Icon name={mostrarSenha ? "eye" : "eye-off"} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
