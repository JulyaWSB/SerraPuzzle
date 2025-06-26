import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  synopsis: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  question: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '500',
  },
  buttonWrapper: {
    marginVertical: 5,
  },
  status: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
