import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { getGenres, getPopularMovies } from '../../services/MovieApi/movieApiIndex';


type Genre = {
  id: number;
  name: string;
};

export  function MoviePuzzle() {
  const [movie, setMovie] = useState<any>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [vidas, setVidas] = useState(3);
  const [acertos, setAcertos] = useState(0);

  useEffect(() => {
    carregarGeneros();
    // sortearFilme();
  }, []);

  const carregarGeneros = async () => {
    try {
      const generos = await getGenres();
      setGenres(generos);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  };
}
