import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "PressStart2P",
    color: "#ffd700",
    fontSize: 33,
    marginBottom: 45,
    textShadowColor: "#000",
    textShadowOffset: { width: 4, height: 3 },
    textShadowRadius: 1,
  },
  startButton: {
    width: 240,
    height: 80,
    resizeMode: "contain",
    marginTop: 20,
  },
  temCadastro: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
  },

  textoCadastro: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 20,
  },
});

export default styles;
