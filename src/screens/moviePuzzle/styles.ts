import { Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    color: '#000',
    padding: 10,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#000',
  },
  question: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    marginVertical: 5,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
   
  },
  status: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
