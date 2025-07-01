import axios from "axios";

const movieApiKey = 'b9eae1c1b626c8da74fe89ecb75e9ed8';
const UrlBase = 'https://api.themoviedb.org/3';




const movieApi = axios.create({
baseURL: UrlBase,
  params: {
    api_key: movieApiKey,
    language: 'pt-BR',
  },
});

export const getGenres = async () => {
  try {
    const response = await movieApi.get('/genre/movie/list');
    return response.data.genres; // array de gêneros
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await movieApi.get('/movie/popular', {
      params: { page },
    });
    return response.data.results; // array de filmes populares
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};
    
