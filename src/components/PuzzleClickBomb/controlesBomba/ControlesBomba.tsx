import { ImageBackground, View, Text} from "react-native";
import { Cronometro } from "../cronometro/Cronometro";
import { styles } from "./ControlesBomba.styles";
import { useContador } from "../../../context/ContadorContext";

export function ControlesBomba() {

    const { clicks } = useContador();

    const Clicks = clicks;

    return (
        <View style={styles.componente}>
            <ImageBackground source={require("../../../assets/CentroDaBomba.png")} style={styles.imagem}>
                <Cronometro/>
                <Text style={styles.contador}> {Clicks} </Text>
            </ImageBackground>
        </View>
    )
}