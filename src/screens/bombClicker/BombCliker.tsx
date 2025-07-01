import {
    ImageBackground,
    Modal,
    Pressable,
    StatusBar,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import { styles } from "./BombCliker.styles";
import { Image } from "react-native";
import { useCronometro } from "../../context/CronometroContext";
import { Bomba } from "../../components/PuzzleClickBomb/bomba/Bomba";
import { useContador } from "../../context/ContadorContext";
import { useState, useEffect } from "react";

type EstadoDoJogo = 'regras' | 'pronto' | 'contagem' | 'jogando' | 'pausado';

export function BombCliker() {
    const [estadoDoJogo, setEstadoDoJogo] = useState<EstadoDoJogo>('regras');
    const [tempoContagem, setTempoContagem] = useState(3);
    const [sequenciaCliques, setSequenciaCliques] = useState<number[]>([]);
    const [ultimoClique, setUltimoClique] = useState(0);

    const { segundos, centesimos, isRunningCronometro, start, pause, reset, addTime, millis } = useCronometro();
    const { resetContador, clicks } = useContador();

    const tempoEsgotado = millis === 0;

    useEffect(() => {
        if (sequenciaCliques.length >= 10) {
            const primeiro = sequenciaCliques[0];
            const ultimo = sequenciaCliques[sequenciaCliques.length - 1];

            if (ultimo - primeiro <= 5000) {
                addTime(2);
                setSequenciaCliques([]);
            } else {
                const recentes = sequenciaCliques.filter(t => Date.now() - t <= 5000);
                setSequenciaCliques(recentes);
            }
        }
    }, [sequenciaCliques, addTime]);

    const aoClicarBomba = () => {
        const agora = Date.now();
        setUltimoClique(agora);
        setSequenciaCliques(prev => [...prev, agora]);
    };

    const iniciarContagem = () => {
        setEstadoDoJogo('contagem');
        setTempoContagem(3);

        const intervalo = setInterval(() => {
            setTempoContagem(prev => {
                if (prev <= 1) {
                    clearInterval(intervalo);
                    setEstadoDoJogo('jogando');
                    start();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const pausarJogo = () => {
        if (estadoDoJogo === 'jogando') {
            pause();
            setEstadoDoJogo('pausado');
        }
    };

    const continuarJogo = () => {
        setEstadoDoJogo('jogando');
        start();
    };

    const reiniciarJogo = () => {
        reset();
        resetContador();
        setSequenciaCliques([]);
        setEstadoDoJogo('pronto');
    };

    const voltarParaRegras = () => {
        reset();
        resetContador();
        setSequenciaCliques([]);
        setEstadoDoJogo('regras');
    };

    const fecharModalPausa = () => {
        setEstadoDoJogo('jogando');
        setTimeout(() => start(), 100);
    };

    const renderRulesModal = () => (
        <Modal visible={estadoDoJogo === 'regras'} transparent animationType="fade">
            <View style={styles.overlay}>
                <ImageBackground source={require("../../assets/PáginasPixelArt.png")} style={styles.imagemFundoRegras}>

                    <Text style={styles.modalTitle}>REGRAS DO JOGO</Text>

                    <View style={styles.viewTextos}>
                        <Text style={styles.modalText}>🎯 Clique na bomba o mais rápido possível;</Text>
                        <Text style={styles.modalText}>⏰ Você tem tempo limitado de um minuto inicial;</Text>
                        <Text style={styles.modalText}>🔥 10 cliques rápidos em 5 segundos = +2s de bônus;</Text>
                        <Text style={styles.modalText}>⚡ Seja rápido e estratégico, o objetivo: 500 clicks!</Text>
                    </View>

                    <TouchableOpacity style={styles.Button} onPress={() => setEstadoDoJogo('pronto')}>
                        <Text style={styles.startButtonText}>ENTENDI!</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        </Modal>
    );

    const renderReadyModal = () => (
        <Modal visible={estadoDoJogo === 'pronto'} transparent animationType="fade">
            <View style={styles.overlay}>
                <ImageBackground source={require("../../assets/PaginaPixelArt3.png")} style={styles.ImagemFundoIniciar}>
                    <View style={styles.ModalIniciar}>
                        <Text style={styles.modalTitleInicio}>PRONTO PARA COMEÇAR?</Text>

                        <TouchableOpacity style={styles.Button} onPress={iniciarContagem}>
                            <Text style={styles.startButtonText}>iniciar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryButton} onPress={voltarParaRegras}>
                            <Text style={styles.secondaryButtonText}>Regras</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View >
        </Modal >
    );

    const fundoContagem = () => {
        let backgroundColor = 'rgba(3, 4, 94, 0.9)'; // cor padrão

        switch (tempoContagem) {
            case 3:
                backgroundColor = "rgb(248, 206, 66)";
                break;
            case 2:
                backgroundColor = 'rgba(255, 196, 0, 0.74)';
                break;
            case 1:
                backgroundColor = 'rgba(249, 65, 68, 0.9)';
                break;
        }

        return [
            styles.countdownContainer,
            { backgroundColor },
        ];
    };


    const renderCountdownModal = () => (
        <Modal visible={estadoDoJogo === 'contagem'} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={fundoContagem()}>
                    <Text style={[styles.countdownText]}>
                        {tempoContagem > 0 ? tempoContagem : 'VAI!'}
                    </Text>
                </View>
            </View>
        </Modal>
    );

    const renderPauseModal = () => (
        <Modal visible={estadoDoJogo === "pausado"} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={fecharModalPausa}>
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <ImageBackground source={require("../../assets/PáginasPixelArt.png")} style={styles.modalContainerPause}>
                            <Text style={styles.modalTitle}>JOGO PAUSADO</Text>

                            <View>
                                <Text style={styles.secondaryButtonText}>
                                    Tempo restante: {segundos}:{centesimos}
                                </Text>
                                <Text>
                                    Pontuação: {clicks}
                                </Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.continueButton} onPress={continuarJogo}>
                                    <Text style={styles.secondaryButtonText}>Continuar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.restartButton} onPress={reiniciarJogo}>
                                    <Text style={styles.secondaryButtonText}>Reiniciar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.secondaryButton} onPress={voltarParaRegras}>
                                    <Text style={styles.secondaryButtonText}>Menu Principal</Text>
                                </TouchableOpacity>
                            </View>
                    </ImageBackground>
                </Pressable>
            </Pressable>
        </Modal>
    );

    const renderGameOverModal = () => (
        <Modal visible={tempoEsgotado && estadoDoJogo === "jogando"} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainerPause}>
                    <Text style={styles.gameOverTitle}>TEMPO ESGOTADO!</Text>
                    <Text style={styles.finalScore}>Pontuação Final: {clicks}</Text>

                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={reiniciarJogo}
                    >
                        <Text style={styles.buttonText}>Jogar Novamente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={voltarParaRegras}
                    >
                        <Text style={styles.secondaryButtonText}>Menu Principal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="default"
                hidden
            />

            <ImageBackground source={require("../../assets/FlorestaMágica.png")} style={styles.backgroundImage}>
                {/* Header com botão de pausa - só aparece durante o jogo */}
                {estadoDoJogo === "jogando" && (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={pausarJogo}>
                            <Image
                                source={require("../../assets/Icons/pausa.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        {/* Informações do jogo */}
                        <View style={styles.gameInfo}>
                            <Text style={styles.timeDisplay}>
                                {segundos}:{centesimos}
                            </Text>
                            <Text style={styles.scoreDisplay}>
                                Pontos: {clicks}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Área da bomba - só aparece durante o jogo */}
                {estadoDoJogo === "jogando" && (
                    <TouchableOpacity onPress={aoClicarBomba}>
                        <View style={styles.bombContainer}>
                            <Bomba />
                        </View>
                    </TouchableOpacity>
                )}

                {/* Indicador de combo rápido */}
                {sequenciaCliques.length >= 5 && estadoDoJogo === "jogando" && (
                    <View style={styles.comboIndicator}>
                        <Text style={styles.comboText}>
                            COMBO: {sequenciaCliques.length}/10 🔥
                        </Text>
                    </View>
                )}

                {/* Modais */}
                {renderRulesModal()}
                {renderReadyModal()}
                {renderCountdownModal()}
                {renderPauseModal()}
                {renderGameOverModal()}
            </ImageBackground>
        </>
    );
}