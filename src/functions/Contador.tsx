import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './Contador.styles';
import { DigitoAnimado } from './Contador.animated';

export function Cronometro({ segundoInicial }: { segundoInicial: number }) {
    const [millis, setMillis] = useState(segundoInicial * 1000);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setMillis((prev) => {
                const next = prev - 10;
                return next < 0 ? 0 : next;
            });
        }, 100);

        return () => clearInterval(intervalo);
    }, []);

    const segundos = Math.floor(millis / 1000)
        .toString()
        .padStart(2, '0');
    const centesimos = Math.floor((millis % 1000) / 10)
        .toString()
        .padStart(2, '0');

    const digitos = `${segundos}${centesimos}`.split('');

    return (
        <View style={styles.contador}>
            <DigitoAnimado valor={digitos[0]} />
            <DigitoAnimado valor={digitos[1]} />
            <Text style={styles.texto}> : </Text>
            <DigitoAnimado valor={digitos[2]} />
            <DigitoAnimado valor={digitos[3]} />
        </View>
    );
}
