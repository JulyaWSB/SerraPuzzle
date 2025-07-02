import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { styles } from './Cronometro.styles';

interface DigitoAnimadoProps {
  valor: string;
  duracao?: number;
}

export function DigitoAnimado({ valor, duracao = 20 }: DigitoAnimadoProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const [digitoAtual, setDigitoAtual] = useState(valor);
  const digitoAnterior = useRef(valor);

  useEffect(() => {
    if (valor !== digitoAtual) {
      digitoAnterior.current = digitoAtual;
      setDigitoAtual(valor);
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: duracao,
        useNativeDriver: true
      }).start();
    }
  }, [valor]);

  const translateAnterior = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  const opacityAnterior = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateNovo = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });

  const opacityNovo = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={{ position: 'relative', overflow: 'hidden'}}>
      <Animated.Text style={[styles.texto, { transform: [{ translateY: translateAnterior }], opacity: opacityAnterior}]}>
        {digitoAnterior.current}
      </Animated.Text>
      <Animated.Text style={[styles.texto, {transform: [{ translateY: translateNovo }], opacity: opacityNovo}]}>
        {digitoAtual}
      </Animated.Text>
    </View>
  );
}
