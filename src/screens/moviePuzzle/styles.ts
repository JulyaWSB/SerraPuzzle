import { Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semi-transparente para melhor contraste
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
   padding: 10,
    fontFamily: 'monospace', 
    fontSize: 18,
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 20,
  },
  descricao: {
   fontFamily: 'monospace',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
     fontFamily: 'monospace',
    fontSize: 16,
    color: '#ffcc00',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
     backgroundColor: '#ffcc00',
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,

  },
  buttonText: {
    fontFamily: 'bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
   
  },
  status: {
  marginTop: 15,
  paddingVertical: 8,
  paddingHorizontal: 12,
  fontWeight: 'bold',
  fontSize: 14,
  fontFamily: 'monospace', 
  color: '#000',
  backgroundColor: '#ff0000', 
  borderColor: '#000',
  borderWidth: 2,
  textAlign: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 0,
  },
});

export default styles;
