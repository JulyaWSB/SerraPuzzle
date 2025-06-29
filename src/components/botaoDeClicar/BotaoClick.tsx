import { View, Image, ImageBackground } from "react-native";
import { styles } from "./BotaoClick.styles";
import { Cronometro } from "../cronometro/Cronometro";

export function BotaoClick() {

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/BotaoClick.png')} style={styles.imagem} />
            <View style={styles.cronometro}>
                <Cronometro segundoInicial={60} />
            </View>
        </View>
    );
}