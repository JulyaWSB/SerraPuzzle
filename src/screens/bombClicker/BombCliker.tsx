import { ImageBackground, Modal, Pressable, StatusBar, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./BombCliker.styles";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { BottomTabRoutes } from "../../routes/BottonTabNavigator/BottonTabNavigator";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";

export function BombCliker() {
    const [pausado, setPausado] = useState(false);

    const pausarOuDespausar = () => {
        setPausado(!pausado);
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="default"
                hidden 
            />

            <ImageBackground source={require("../../assets/FlorestaMágica.png")} style={styles.backgroundImage}>
                <View style={styles.header}> 
                    {pausado ? (
                        <TouchableOpacity onPress={pausarOuDespausar}>
                            <Image source={require("../../assets/Icons/jogar.png")} style={styles.icon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={pausarOuDespausar}>
                            <Image source={require("../../assets/Icons/pausa.png")} style={styles.icon} />
                        </TouchableOpacity>
                    )}

                    {pausado && (
                        <Modal visible={pausado} transparent animationType="fade">
                            <Pressable style={styles.overlay} onPress={() => setPausado(false)}>
                                <View >
                                    <Text> Bom-dia </Text>
                                </View>
                            </Pressable>
                        </Modal>
                    )}
                </View>

                {/* <BottomTabRoutes />  */}
            </ImageBackground>
        </>
    )
}