import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // container principal da tela Home
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  },
  // barra navbar
  navbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: 'transparent', // transparente para não cobrir a imagem de fundo
  },
  // icones que podem aparecer na navbar (não usado ainda)
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  // botão dos três traços na navbar
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  // estilo do texto dos três traços (menu)
  menuText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(255, 115, 0)', 
  },
  // grid dos cards de puzzle
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  // cada card do grid de puzzles
  card: {
    width: 173,
    height: 173,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    borderWidth: 5,
    borderColor: 'rgba(255, 174, 0, 0.92)', 
    borderRadius: 10,
  },
  // icones genéricos
  icon: {
    width: 40,
    height: 40,
  },
  // imagem do título
  tituloImage: {
    width: 350,
    height: 70,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  // fundo escuro do modal (quando o menu está aberto)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  // caixa branca do menu (aparece ao clicar nos três traços)
  menuBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.73)', 
    borderRadius: 10,
    marginTop: 100,
    marginRight: 30,
    padding: 80,
    minWidth: 20,
    elevation: 10,
    shadowColor: 'rgb(0,0,0)',
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 2 },
  },
  // título do menu (dentro da caixinha)
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    color: 'rgb(250, 5, 5)', 
  },
  // cada item do menu (ex: Sobre, Configurações)
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.54)', // linhazinha sutil entre os itens
  },
  // texto de cada item do menu
  menuItemText: {
    fontSize: 24,
    color: 'rgb(0,0,0)', 
  },
});

export default styles;