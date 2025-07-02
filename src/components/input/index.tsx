import { TextInput, Text, View } from "react-native";
import styles from "./styles";

//define o que o componente vai rceber
type Props = {
  label: string; //texto da label
  value: string; //valor do campo para ser controlado
  onChangeText: (text: string) => void; //atualiza o valor do componenbte
  secureTextEntry?: boolean; //se for true esconde o que está sendo digitado (para as senhas)
};

export function Input({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
