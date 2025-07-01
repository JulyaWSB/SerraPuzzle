import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    margin: 8,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  texto: {
    color: '#fff',
    marginTop: 6,
  },
  textoResposta: {
    color: '#aaa',
    marginTop: 20,
    fontSize: 16,
  },
  selecionado: {
    opacity: 0.5,
  },
  botaoLimpar: {
  marginTop: 12,
  backgroundColor: '#FF4444',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
},

botaoLimparTexto: {
  color: '#FFF',
  fontWeight: 'bold',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '80%',
},

modalTitulo: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},

inputHora: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
  textAlign: 'center',
},

botaoConfirmar: {
  backgroundColor: '#4CAF50',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
},

botaoConfirmarTexto: {
  color: '#fff',
  fontWeight: 'bold',
},
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
});
export default styles;