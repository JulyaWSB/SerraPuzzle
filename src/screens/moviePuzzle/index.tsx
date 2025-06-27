import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getGenres, getPopularMovies } from '../../services/MovieApi/movieApiIndex';
import styles  from './styles';


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

  const getOpcoesDeGenero = (): Genre[] => {
    if (!movie || genres.length === 0) return [];

    const generosDoFilme = genres.filter((g) => movie.genre_ids.includes(g.id));
    const generosErrados = genres.filter((g) => !movie.genre_ids.includes(g.id));

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

  const verificarGenero = (generoEscolhidoId: number) => {
    if (!movie) return;

    if (movie.genre_ids.includes(generoEscolhidoId)) {
      const novosAcertos = acertos + 1;
      setAcertos(novosAcertos);
      Alert.alert('Acertou!', 'Você acertou o gênero do filme!');

      if (novosAcertos >= 3) {
        Alert.alert('Parabéns!', 'Você acertou a quantidade nescessaria de filmes! O numero que você buscava era 8.');
        setAcertos(0);
        setVidas(3);
      }

      sortearFilme();
    } else {
      const novasVidas = vidas - 1;
      setVidas(novasVidas);

      if (novasVidas <= 0) {
        Alert.alert('Fim de jogo', 'Você perdeu todas as vidas!');
        setAcertos(0);
        setVidas(3);
      } else {
        Alert.alert('Errou!', `Você errou! Vidas restantes: ${novasVidas}`);
      }
    }
  };

  if (loading || !movie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (

 <ImageBackground
    source={require('../../assets/cinema.png')} // certifique-se do nome e extensão
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.overlay}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.descricao}>{movie.overview}</Text>
      <Text style={styles.question}>Qual é o gênero desse filme?</Text>

      {getOpcoesDeGenero().map((genero) => (
        <TouchableOpacity
          key={genero.id}
          style={styles.button}
          onPress={() => verificarGenero(genero.id)}
        >
          <Text style={styles.buttonText}>{genero.name}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.status}>Vidas: {vidas}</Text>
      <Text style={styles.status}>Acertos: {acertos}</Text>
    </View>
  </ImageBackground>
);

}
