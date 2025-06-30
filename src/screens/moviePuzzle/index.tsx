import React from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { useMovieGame } from '../../hooks/moviePuzzleFunctions/movieFunctions';
import { GenreOptions } from '../../components/GeneroOptions/GenreOptions';
import styles from './styles';
import { AlertaPixelArt } from '../../components/alertMoviePuzzlee/alertaMovie';

export function MoviePuzzle() {
  const {
    movie,
    loading,
    vidas,
    acertos,
    alerta,
    getOpcoesDeGenero,
    verificarGenero,
    setAlerta
  } = useMovieGame();

  if (loading || !movie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/cinema.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.descricao}>{movie.overview}</Text>
        <Text style={styles.question}>Qual é o gênero desse filme?</Text>

        <GenreOptions
          opcoes={getOpcoesDeGenero()}
          onPress={verificarGenero}
        />

        <Text style={styles.status}>Vidas: {vidas}</Text>
        <Text style={styles.status}>Acertos: {acertos}</Text>
      </View>
      
      <AlertaPixelArt
        visivel={alerta.visivel}
        titulo={alerta.titulo}
        mensagem={alerta.mensagem}
        aoFechar={() => setAlerta({ visivel: false, titulo: '', mensagem: '' })}
         acaoPosAlerta={alerta.acaoPosAlerta}
      />
    </ImageBackground>
  );
}