import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentBox: {
    backgroundColor: 'rgba(33, 49, 3, 0.33)',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
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
}

});

export default styles; 