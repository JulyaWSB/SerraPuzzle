import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardUsuario: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
  },
  botaoAlterar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoDeletar: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)', // escurece para contraste
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
 },
 inputAlterar: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 8,
  marginBottom: 10,
  fontSize: 16,
},
botaoSalvar: {
  backgroundColor: '#2196F3',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
},
});