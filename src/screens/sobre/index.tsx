import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView } from "react-native";

const equipe = [
  {
    nome: "Cauã Pacheco",
    cargo: "Desenvolvedor",
    imagem: require("../../assets/cauã.png"),
  },
  {
    nome: "João Pedro Rodrigues",
    cargo: "Desenvolvedor",
    imagem: require("../../assets/joao pedro.png"),
  },
  {
    nome: "Julya Werneck",
    cargo: "Desenvolvedora",
    imagem: require("../../assets/julya.png"),
  },
  {
    nome: "Karen Santos",
    cargo: "Desenvolvedora",
    imagem: require("../../assets/karen.png"),
  },
  {
    nome: "Maria Aragão",
    cargo: "Desenvolvedora",
    imagem: require("../../assets/maria.png"),
  },
  {
    nome: "Sabrina Siqueira",
    cargo: "Desenvolvedora",
    imagem: require("../../assets/images/livro (1).png"),
  },

];

export default function Sobre() {
 return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sobre a Equipe</Text>
      <Text style={styles.descricao}>
        Este aplicativo foi desenvolvido por uma equipe multidisciplinar dedicada a criar experiências inovadoras em jogos mobile.
      </Text>
      {equipe.map((membro, i) => (
        <View key={i} style={styles.card}>
          <Image source={membro.imagem} style={styles.foto} />
          <View>
            <Text style={styles.nome}>{membro.nome}</Text>
            <Text style={styles.funcao}>{membro.cargo}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#4B0082",
    textAlign: "center",
  },
  descricao: {
    fontSize: 16,
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    elevation: 2,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  funcao: {
    fontSize: 15,
    color: "#555",
  },
});