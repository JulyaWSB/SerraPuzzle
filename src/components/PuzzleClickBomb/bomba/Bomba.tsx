import { View, Animated, Pressable } from "react-native";
import { styles } from "./Bomba.styles";
import { ControlesBomba } from "../controlesBomba/ControlesBomba";
import { useState, useEffect, useCallback } from "react";
import { useContador } from "../../../context/ContadorContext";
import { useCronometro } from "../../../context/CronometroContext";
import { useBombaAnimations } from "./Bomba.animation";

export function Bomba() {
  const { isRunningCronometro, millis } = useCronometro();
  const { adicionarClique, clicks } = useContador();
  const [clicksLocais, setClicksLocais] = useState(0);

  // Estados para controlar clicks por segundo
  const [clicksPorSegundo, setClicksPorSegundo] = useState(0);
  const [ultimoTempo, setUltimoTempo] = useState(Date.now());
  const [ultimoClicks, setUltimoClicks] = useState(0);

  // Usar o hook customizado para animações
  const { rotacaoTransform1, rotacaoTransform2 } = useBombaAnimations(clicksPorSegundo);

  // Calcula clicks por segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = Date.now();
      const tempoDecorrido = (agora - ultimoTempo) / 1000;

      if (tempoDecorrido >= 1) {
        const novosClicks = clicks - ultimoClicks;
        const cps = novosClicks / tempoDecorrido;

        setClicksPorSegundo(Math.round(cps));
        setUltimoTempo(agora);
        setUltimoClicks(clicks);
      }
    }, 50); // Atualiza a cada 50ms para ter mais responsividade

    return () => clearInterval(intervalo);
  }, [clicks, ultimoTempo, ultimoClicks]);

  // Reseta clicks por segundo quando o cronômetro para
  useEffect(() => {
    if (!isRunningCronometro && millis === 0) {
      setClicksPorSegundo(0);
    }
  }, [isRunningCronometro, millis]);

  const clicar = useCallback(() => {
    // Só permite clicar se o cronômetro estiver rodando E tiver tempo restante
    if (isRunningCronometro && millis > 0) {
      setClicksLocais(prev => prev + 1);
      adicionarClique();
    }
  }, [isRunningCronometro, millis, adicionarClique]);

  // Determina se o componente deve responder aos toques
  const isClickable = isRunningCronometro && millis > 0;

  return (
    <Pressable 
      onPress={clicar}
      disabled={!isClickable}
      style={({ pressed }) => [
        { opacity: !isClickable ? 0.5 : pressed ? 0.8 : 1 }
      ]}
    >
      <View style={styles.componente}>
        <Animated.Image 
          source={require("../../../assets/Bomba1.png")} 
          style={[
            styles.bomba, 
            { 
              transform: [{ rotate: rotacaoTransform1 }],
              opacity: !isClickable ? 0.6 : 1
            }
          ]} 
        />
        <Animated.Image 
          source={require("../../../assets/Bomba2.png")} 
          style={[
            styles.bomba, 
            { 
              transform: [{ rotate: rotacaoTransform2 }],
              opacity: !isClickable ? 0.6 : 1
            }
          ]} 
        />
        <ControlesBomba />
      </View>
    </Pressable>
  );
}