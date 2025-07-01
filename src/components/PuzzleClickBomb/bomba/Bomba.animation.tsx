import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useBombaAnimations(clicksPorSegundo: number) {
  const rotacaoBomba1 = useRef(new Animated.Value(0)).current;
  const rotacaoBomba2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (clicksPorSegundo <= 0) return;

    // Velocidade baseada nos clicks por segundo
    const velocidade = Math.max(500, 3000 - (clicksPorSegundo * 150));

    // Resetando valores para manter a animação contínua
    rotacaoBomba1.setValue(0);
    rotacaoBomba2.setValue(0);

    const animacaoBomba1 = Animated.loop(
      Animated.timing(rotacaoBomba1, {
        toValue: 1,
        duration: velocidade,
        useNativeDriver: true,
      })
    );

    const animacaoBomba2 = Animated.loop(
      Animated.timing(rotacaoBomba2, {
        toValue: 1,
        duration: velocidade,
        useNativeDriver: true,
      })
    );

    animacaoBomba1.start();
    animacaoBomba2.start();

    return () => {
      animacaoBomba1.stop();
      animacaoBomba2.stop();
    };
  }, [clicksPorSegundo]);

  const rotacaoTransform1 = rotacaoBomba1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotacaoTransform2 = rotacaoBomba2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return {
    rotacaoTransform1,
    rotacaoTransform2,
  };
}
