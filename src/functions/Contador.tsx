import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Text } from 'react-native';
import { styles } from './Contador.styles';
import { transform } from '@babel/core';

export function Cronometro({ segundoInicial }: { segundoInicial: number }) {
    const [millis, setMillis] = useState(segundoInicial * 1000);
    const animacao1 = useRef(new Animated.Value(0)).current;
    const animacao2 = useRef(new Animated.Value(0)).current;
    const animacao3 = useRef(new Animated.Value(0)).current;
    const animacao4 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (millis <= 0) return;

        const intervalo = setInterval(() => {
            setMillis((prev) => {
                const next = prev - 10;
                return next < 0 ? 0 : next;
            });
        }, 100); // pode ajustar esse valor pra suavidade

        return () => clearInterval(intervalo);
    }, [millis]);

    const segundos = Math.floor(millis / 1000).toString().padStart(2, '0');
    const centesimos = Math.floor((millis % 1000) / 10).toString().padStart(2, '0');

    const digito = `${segundos}${centesimos}`.split('');

    useEffect(() => {
        animacao1.setValue(0);
        Animated.timing(animacao1, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [digito[0]]);

    useEffect(() => {
        animacao2.setValue(0);
        Animated.timing(animacao2, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [digito[1]]);

    useEffect(() => {
        animacao3.setValue(0);
        Animated.timing(animacao3, {
            toValue: 1,
            duration: 10,
            useNativeDriver: false,
        }).start();
    }, [digito[2]]);

    useEffect(() => {
        animacao4.setValue(0);
        Animated.timing(animacao4, {
            toValue: 1,
            duration: 120,
            useNativeDriver: false,
        }).start();
    }, [digito[3]]);


    const movimento1 = animacao1.interpolate({
        inputRange: [0, 1], // valor original de animacao3 (de 0 até 1)
        outputRange: [50, 0], // o valor visual que você quer animar (desce de 20 até 0)
    });

    const movimento2 = animacao2.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const movimento3 = animacao3.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const movimento4 = animacao4.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const opacidade1 = animacao1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View style={styles.contador}>
            <Animated.Text style={[styles.texto, { transform: [{ translateY: movimento1 }] }]} >
                {digito[0]}
            </Animated.Text>
            <Animated.Text style={[styles.texto, { transform: [{ translateY: movimento2 }] }]} >
                {digito[1]}
            </Animated.Text>
            <Text style={styles.texto}> : </Text>
            <Animated.Text style={[styles.texto, { transform: [{ translateY: movimento3 }] }]} >
                {digito[2]}
            </Animated.Text>
            <Animated.Text style={[styles.texto, { transform: [{ translateY: movimento4 }] }]} >
                {digito[3]}
            </Animated.Text>
        </View>
    );
}
