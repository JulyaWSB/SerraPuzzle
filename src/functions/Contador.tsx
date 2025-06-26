import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import {styles} from './Contador.styles';

export function Cronometro({ segundoInicial }: { segundoInicial: number }) {
  const [millis, setMillis] = useState(segundoInicial * 1000);
  const animacao = useRef(new Animated.Value(millis)).current;

  useEffect(() => {
    if (millis <= 0) return;

    const intervalo = setInterval(() => {
      setMillis((prev) => {
        const next = prev - 10;
        return next < 0 ? 0 : next;
      });
    }, 50);

    return () => clearInterval(intervalo);
  }, [millis]);

  useEffect(() => {
    Animated.timing(animacao, {
        toValue: (millis + 1),
        duration: 10,
        useNativeDriver: false
    })

  }, [millis])

  const segundos = Math.floor(millis / 1000).toString().padStart(2, '0');
  const centesimos = Math.floor((millis % 1000) / 10).toString().padStart(2, '0');

  return (
    <View style={styles.contador}>
      <Text style={styles.texto}>
        {segundos}:{centesimos}
      </Text>
    </View>
  );
}
