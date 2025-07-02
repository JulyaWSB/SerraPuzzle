import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Jersey15',
    color: '#fff', 
  },
  cardUsuario: {
    borderRadius: 10,
    padding: 20,
    width: '90%',          
    maxWidth: 400,        
    marginBottom: 20,
    elevation: 3,
    overflow: 'hidden',    
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Jersey15',
    color: '#000',     
  },
  input: {
    borderWidth: 1,
    borderColor: '#000', 
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',  
    color: '#000',                   
    marginBottom: 10,
    fontFamily: 'Jersey15',
  },
  botaoAlterar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoDeletar: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jersey15',
  },
});