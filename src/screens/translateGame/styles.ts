import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "PressStart2P",
    backgroundColor: "#222",
    color: "#fff",
    padding: 20,
    fontSize: 20,
    lineHeight: 27,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "#ffd700",
  },

  challenge: {
    flexDirection: "row",
  },

  challengeText: {
    fontSize: 24,
    backgroundColor: "#222",
    color: "#fff",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "#ffd700",
  },

  buttons: {
    width: "100%",
  },

  optionButton: {
    backgroundColor: "#222",
    padding: 15,
    paddingTop: 19,
    marginVertical: 6,
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#ffd700",
    marginHorizontal: 20,
  },

  optionText: { fontSize: 18, fontFamily: "PressStart2P", color: "#fff" },

  status: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    marginBottom: 16,
  },

  statusText: {
    fontFamily: "PressStart2P",
    fontSize: 13,
    color: "#000",
    marginHorizontal: 8,
    alignItems: "center",
  },

  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default styles;
