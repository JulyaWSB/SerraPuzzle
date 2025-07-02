import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../routes/StackNavigator';
import { getGenres, getPopularMovies } from '../../service/MovieApi/movieApiIndex';

export type Genre = {
  id: number;
  name: string;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function useMovieGame() {
  const [movie, setMovie] = useState<any>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [vidas, setVidas] = useState(3);
  const [acertos, setAcertos] = useState(0);
  const navigation = useNavigation<NavigationProps>();

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

 const [alerta, setAlerta] = useState<{
  visivel: boolean;
  titulo: string;
  mensagem: string;
  acaoPosAlerta?: () => void;  // função opcional
}>({
  visivel: false,
  titulo: '',
  mensagem: ''
});

  const verificarGenero = (generoEscolhidoId: number) => {
  if (!movie) return;

  if (movie.genre_ids.includes(generoEscolhidoId)) {
    const novosAcertos = acertos + 1;
    setAcertos(novosAcertos);

    if (novosAcertos >= 3) {
      setAlerta({
        visivel: true,
        titulo: '🎇 Parabéns! 🎇',
        mensagem: 'Você acertou a quantidade necessária! O número que você busca é [][][][][8][]!',
        acaoPosAlerta: () => {
          setAcertos(0);
          setVidas(3);
          sortearFilme();
          navigation.navigate("Room1");
        }
      });
    } else {
      setAlerta({
        visivel: true,
        titulo: '🎉 Acertou! 🎉',
        mensagem: 'Você acertou o gênero do filme!',
        acaoPosAlerta: () => {
          sortearFilme();
        }
      });
    }

  } else {
    const novasVidas = vidas - 1;
    setVidas(novasVidas);

    if (novasVidas <= 0) {
      setAlerta({
        visivel: true,
        titulo: '😢 Que pena! 😢',
        mensagem: 'Você falhou com o Nikola!',
        acaoPosAlerta: () => {
          setAcertos(0);
          setVidas(3);
          sortearFilme();
        }
      });
    } else {
      setAlerta({
        visivel: true,
        titulo: '❌ Errou! ❌',
        mensagem: `Você errou! Vidas restantes: ${novasVidas}`,
        acaoPosAlerta: undefined  // sem ação extra após fechar
      });
    }
  }
};

  return {
    movie,
    loading,
    vidas,
    acertos,
    alerta,
    setAlerta,
    getOpcoesDeGenero,
    verificarGenero
  };
}