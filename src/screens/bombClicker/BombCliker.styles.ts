import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  /*Estrutura Principal - Fundo da Página */
  backgroundImage: {
    flex: 1,
  },

  /*Cabeçalho - Puasar o jogo */
  header: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    zIndex: 1,
  },

  icon: {
    width: 50,
    height: 50,
  },

  gameInfo: {
    alignItems: 'flex-end',
  },

  timeDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    color: '#ffffff',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  scoreDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    color: '#caf0f8',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  /*Jogo - a Bomba e o popUp de sequência de clicks */
  bombContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  comboIndicator: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },

  comboText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    color: '#03045e',
    backgroundColor: 'rgba(202, 240, 248, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#90e0ef',
  },

  /*Modal de Regras do Jogo*/
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainerPause: {
    width: 350,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    gap: 15
  },

  imagemFundoRegras: {
    width: 300,
    height: 500,
    justifyContent: "center",
    alignItems: "center"
  },

  viewTextos: {
    width: 200,
    marginBottom: 20
  },

  modalTitle: {
    fontSize: 25,
    fontFamily: "Tinny",
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  modalText: {
    fontFamily: "Tinny",
    fontSize: 15
  },

  ImagemFundoIniciar: {
    width: 350,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  ModalIniciar: {
    width: 250,
    gap: 5,
    bottom: 20
  },

   modalTitleInicio: {
    fontSize: 25,
    fontFamily: "Tinny",
    color: '#ffffff',
    marginBottom: 1,
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  /*Botões*/
  Button: {
    backgroundColor:"rgba(224, 3, 3, 0.67)",
    paddingVertical: 2,
    paddingHorizontal: 50,
    borderWidth: 4,
    borderColor: "rgba(175, 0, 0, 0.74)",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    elevation: 8,
  },

  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: "Tinny",
    textAlign: 'center',
    textShadowColor: '#03045e',
    justifyContent: "center"
  },

  secondaryButton: {
    backgroundColor:"rgba(5, 83, 240, 0.72)",
    paddingVertical: 2,
    paddingHorizontal: 47,
    borderWidth: 4,
    borderColor: "rgba(45, 38, 253, 0.57)",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    elevation: 8,
  },

  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: "Tinny",
    textAlign: 'center',
    textShadowColor: '#03045e',
    justifyContent: "center"
  },

  buttonContainer: {
    alignItems: 'center',
  },

  continueButton: {
    backgroundColor: '#00b4d8',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 180,
    borderWidth: 2,
    borderColor: '#90e0ef',
    shadowColor: '#03045e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  restartButton: {
    backgroundColor:"rgba(224, 3, 3, 0.67)",
    paddingVertical: 2,
    paddingHorizontal: 70,
    borderWidth: 4,
    borderColor: "rgba(175, 0, 0, 0.74)",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    elevation: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  /*Contagem regressiva pra iniciar o jogo*/
  countdownContainer: {
    backgroundColor: 'rgba(3, 4, 94, 0.9)',
    borderRadius: 100,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#90e0ef',
  },

  /*Modal de Pausar o jogo*/
  countdownText: {
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    color: '#caf0f8',
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  /*Modal de fim de Jogo*/
  gameOverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: "Tinny",
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },

  finalScore: {
    fontSize: 20,
    fontFamily: "Tinny",
    color: '#90e0ef',
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: '#03045e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});