import React from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, View } from 'react-native';
import { AlertaPixelArt } from '../../components/alertMovie/alertaMovie';
import { GenreOptions } from '../../components/GeneroOptions/GenreOptions';
import { useMovieGame } from '../../hooks/moviePuzzleFunctions/movieFunctions';
import styles from './styles';

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
      <ScrollView >
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
      </ScrollView> 
    </ImageBackground>
  );
}