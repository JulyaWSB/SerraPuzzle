import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Cronometro.styles';
import { DigitoAnimado } from './Cronometro.animated';
import { useCronometro } from '../../../context/CronometroContext';

export function Cronometro() {
  
  const { segundos, centesimos } = useCronometro();

  const digitos = `${segundos}${centesimos}`.split('');

  return (
    <View style={styles.contador}>
      <DigitoAnimado valor={digitos[0]} />
      <DigitoAnimado valor={digitos[1]} />
      <Text style={styles.doisPontos}> : </Text>
      <DigitoAnimado valor={digitos[2]} />
      <DigitoAnimado valor={digitos[3]} />
    </View>
  );
}


