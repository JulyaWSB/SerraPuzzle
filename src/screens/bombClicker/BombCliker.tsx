import { ImageBackground, Modal, Pressable, TouchableOpacity, View } from "react-native";
import { styles } from "./BombCliker.styles";
import { Image } from "react-native";
import { useState } from "react";

export function BombCliker() {
    const [pausado, setPausado] = useState(false);

    const pausarOuDespausar = () => {
        setPausado(!pausado);
    }

    return (
        <ImageBackground source={require("../../assets/FlorestaMágica.png")} style={styles.backgroundImage}>
            <View style={styles.header}> {/*Botões de pausar o jogo*/}
                {pausado ? (
                    <TouchableOpacity onPress={pausarOuDespausar}>
                        <Image source={require("../../assets/Icons/jogar.png")} style={styles.icon} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={pausarOuDespausar}>
                        <Image source={require("../../assets/Icons/pausa.png")} style={styles.icon} />
                    </TouchableOpacity>
                )}

                if(pausado === true) {
                    <Modal visible={pausado} transparent animationType="fade">
                        <Pressable style={styles.overlay} onPress={() => setPausado(false)}>
                            <View>

                            </View>
                        </Pressable>
                    </Modal>
                }
            </View>
        </ImageBackground>
    )
}