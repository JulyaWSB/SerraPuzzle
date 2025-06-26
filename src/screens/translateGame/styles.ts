import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  challengeText: {
    fontSize: 24,
    marginBottom: 30,
    color: "#51ff00",
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#eee",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: { fontSize: 18 },

  status: {
    flexDirection: "row",
    alignContent: "space-between",
    marginBottom: 16,
    textAlign: "center",
  },

  statusText: {
    fontSize: 18,
    color: "#000",
  },
});

export default styles;
