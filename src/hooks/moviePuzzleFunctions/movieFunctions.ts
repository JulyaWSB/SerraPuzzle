import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getGenres, getPopularMovies } from '../../services/MovieApi/movieApiIndex';

export type Genre = {
  id: number;
  name: string;
};

export function useMovieGame() {
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

  const sortearFilme = async () => {
    try {
      setLoading(true);
      let filmeAleatorio: any = null;

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

  const getOpcoesDeGenero = (): Genre[] => {
    if (!movie || genres.length === 0) return [];

    const generosDoFilme = genres.filter((g) => movie.genre_ids.includes(g.id));
    const generosErrados = genres.filter((g) => !movie.genre_ids.includes(g.id));

    const generosAleatoriosErrados = generosErrados
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const generoCorreto = generosDoFilme[0];

    const opcoes = [...generosAleatoriosErrados, generoCorreto].sort(() => Math.random() - 0.5);
    return opcoes;
  };

  const verificarGenero = (generoEscolhidoId: number) => {
    if (!movie) return;

    if (movie.genre_ids.includes(generoEscolhidoId)) {
      const novosAcertos = acertos + 1;
      setAcertos(novosAcertos);
      Alert.alert('Acertou!', 'Você acertou o gênero do filme!');

      if (novosAcertos >= 3) {
        Alert.alert('Parabéns!', 'Você acertou a quantidade nescessaria de filmes! O número que você buscava era 8.');
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

  return {
    movie,
    loading,
    vidas,
    acertos,
    getOpcoesDeGenero,
    verificarGenero
  };
}