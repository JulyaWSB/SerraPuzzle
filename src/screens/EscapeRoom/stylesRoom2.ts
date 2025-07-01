import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentBox: {
    backgroundColor: 'rgba(34, 34, 80, 0.85)', 
    borderRadius: 24,
    padding: 28,
    margin: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#4B0082', 
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 18,
    color: '#3fbd63', 
    fontWeight: 'bold',
    textShadowColor: '#222250',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
  },
  warning: {
    color: '#FF4444',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default styles;