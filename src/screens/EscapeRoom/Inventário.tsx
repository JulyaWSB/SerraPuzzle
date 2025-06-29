import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GameContext } from './GameContext';

const Inventory = () => {
  const { inventory } = useContext(GameContext)!;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧰 Inventário</Text>

      {inventory.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não coletou nenhum item.</Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.itemText}>• {item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    padding: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  itemBox: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2
  },
  itemText: {
    fontSize: 18
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20
  }
});
