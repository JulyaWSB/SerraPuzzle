import { TextInput, Text } from "react-native";
import styles from "./styles";

export function Input({ label = "" } = {}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </>
  );
}
