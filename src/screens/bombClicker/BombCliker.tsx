import { ImageBackground, Modal, Pressable, StatusBar, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./BombCliker.styles";
import { Image } from "react-native";
import { useCronometro } from "../../context/CronometroContext";
import { Bomba } from "../../components/PuzzleClickBomb/bomba/Bomba";
import { useContador } from "../../context/ContadorContext";
import { useState } from "react";

export function BombCliker() {
    const [pausado, setPausado] = useState(false);

    const { segundos, centesimos, isRunningCronometro, start, pause, reset, addTime, millis } = useCronometro();
    const { resetContador } = useContador();

    const tempoEsgotado = millis === 0;

    const pausarOuDespausar = () => {
        if (!pausado) {
            pause();
            setPausado(true);
        } else {
            start();
            setPausado(false);
        }
    }

    const reiniciarJogo = () => {
        reset();
        resetContador();
        setPausado(false);
    }

    const adicionarTempo = (segundos: number) => {
        addTime(segundos);
    }

    const fecharModal = () => {
        setPausado(false); 
        setTimeout(() => {
            start(); 
        }, 5000);
    };

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="default"
                hidden
            />

            <ImageBackground source={require("../../assets/FlorestaMágica.png")} style={styles.backgroundImage}>
                <View style={styles.header}> {/*Botão de pausar o jogo, e abertura das opções de jogo*/}
                    <TouchableOpacity onPress={pausarOuDespausar}>
                        <Image
                            source={pausado ? require("../../assets/Icons/jogar.png") : require("../../assets/Icons/pausa.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    {pausado && ( /*Modal com opções de controle do jogo e cronômetro*/
                        <Modal visible={pausado} transparent animationType="fade">
                            <Pressable onPress={fecharModal}>
                                <Pressable onPress={(e) => e.stopPropagation()}>
                                    <View >
                                        <Text >JOGO PAUSADO</Text>

                                        {/* Informações do tempo atual */}
                                        <View >
                                            <Text >
                                                Tempo restante: {segundos}:{centesimos}
                                            </Text>
                                            {tempoEsgotado && (
                                                <Text >TEMPO ESGOTADO!</Text>
                                            )}
                                        </View>

                                        {/* Botões de controle do cronômetro */}
                                        <View >
                                            <TouchableOpacity
                                                onPress={pausarOuDespausar}
                                            >
                                                <Text >Continuar</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={reiniciarJogo}
                                            >
                                                <Text >Reiniciar</Text>
                                            </TouchableOpacity>

                                            {/* Botões para adicionar tempo
                                            <View style={styles.tempoControles}>
                                                <Text style={styles.tempoControlesTitulo}>Adicionar Tempo:</Text>
                                                <View style={styles.tempoControlesBotoes}>
                                                    <TouchableOpacity 
                                                        style={[styles.botaoModal, styles.botaoTempo]} 
                                                        onPress={() => adicionarTempo(10)}
                                                    >
                                                        <Text style={styles.textoBotao}>+10s</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity 
                                                        style={[styles.botaoModal, styles.botaoTempo]} 
                                                        onPress={() => adicionarTempo(30)}
                                                    >
                                                        <Text style={styles.textoBotao}>+30s</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity 
                                                        style={[styles.botaoModal, styles.botaoTempo]} 
                                                        onPress={() => adicionarTempo(60)}
                                                    >
                                                        <Text style={styles.textoBotao}>+1min</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> */}

                                            {/* Outros controles do jogo */}

                                            <TouchableOpacity >
                                                <Text>Regras</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {/* Lógica para história */ }}>
                                                <Text> História </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {/* Lógica para voltar ao menu */ }}>
                                                <Text> Menu Principal </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Pressable>
                            </Pressable>
                        </Modal>
                    )}

                     <View> {/*Aqui ficara a lógica do jogo, a bomba, que sera um TouchOpcity com animação*/}
                        <Bomba />
                    </View>
                </View>



                {/* Indicador de tempo esgotado fora do modal */}
                {tempoEsgotado && !pausado && (
                    <View >
                        <Text >TEMPO ESGOTADO!</Text>
                        <TouchableOpacity
                            onPress={reiniciarJogo}
                        >
                            <Text >Reiniciar</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* <BottomTabRoutes />  */}
            </ImageBackground>
        </>
    )
}