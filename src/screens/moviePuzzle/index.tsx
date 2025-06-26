import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { getGenres, getPopularMovies } from '../../services/MovieApi/movieApiIndex';


type Genero = {
  id: number;
  name: string;
};

export  function MoviePuzzle() {
  const [movie, setMovie] = useState<any>(null);
  const [genres, setGenres] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const [vidas, setVidas] = useState(3);
  const [acertos, setAcertos] = useState(0);

  useEffect(() => {
    carregarGeneros();
    sortearFilme();
  }, []);

  const carregarGeneros = async () => {
    try {
      const generos = await getGenres();
      setGenres(generos);
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  };

  const getOpcoesDeGenero = (): Genero[] => {
  if (!movie || genres.length === 0) return [];

  const generosDoFilme = genres.filter((g) => movie.genreIds.includes(g.id));
  const generosErrados = genres.filter((g) => !movie.genreIds.includes(g.id));

  const generosAleatoriosErrados = generosErrados
    .sort(() => Math.random() - 0.5)
    .slice(0, 3); // 3 errados

  const generoCorreto = generosDoFilme[0]; // pegar o primeiro gênero do filme

  const opcoes = [...generosAleatoriosErrados, generoCorreto]
    .sort(() => Math.random() - 0.5); // embaralhar as opções

  return opcoes;
};

  const sortearFilme = async () => {
  try {
    setLoading(true);

    let filmeAleatorio: any = null;

    // tenta até encontrar um filme válido
    while (
      !filmeAleatorio ||
      !filmeAleatorio.genre_ids ||
      filmeAleatorio.genre_ids.length === 0 ||
      !filmeAleatorio.overview || 
      filmeAleatorio.overview.trim() === ''
    ) {
      const paginaAleatoria = Math.floor(Math.random() * 10) + 1;
      const filmes = await getPopularMovies(paginaAleatoria);
      filmeAleatorio = filmes[Math.floor(Math.random() * filmes.length)];
    }

    setMovie(filmeAleatorio);
  } catch (error) {
    console.error('Erro ao buscar filme:', error);
  } finally {
    setLoading(false);
  }
};




}
