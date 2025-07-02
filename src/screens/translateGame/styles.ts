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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  statusText: {
    fontFamily: "PressStart2P",
    fontSize: 18,
    color: "#000",
    marginHorizontal: 8,
    textAlignVertical: "center",
  },

  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    marginBottom: 20,
    alignSelf: "center",
  },

  livesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  heart: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
});

export default styles;
