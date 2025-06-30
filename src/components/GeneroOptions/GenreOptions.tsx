import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Genre } from '../../hooks/moviePuzzleFunctions/movieFunctions';
import styles  from '../../screens/moviePuzzle/styles';

type Props = {
  opcoes: Genre[];
  onPress: (id: number) => void;
};

export const GenreOptions = ({ opcoes, onPress }: Props) => {
  return (
    <>
      {opcoes.map((genero) => (
        <TouchableOpacity
          key={genero.id}
          style={styles.button}
          onPress={() => onPress(genero.id)}
        >
          <Text style={styles.buttonText}>{genero.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};