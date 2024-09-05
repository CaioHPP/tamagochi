import { Status } from "@/components/ListedTamagotchi";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";


type TamagotchiDetailProps = {
    id: number;
    name: string;
    fome: number;
    sono: number;
    diversao: number;

}

const TamagotchiDetail = ({id, name, fome, sono, diversao}: TamagotchiDetailProps) => {
    const params = useLocalSearchParams();
    
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: (params.name as string) }} />
            <Image style={styles.image} source={require('../assets/images/tamagotchi.png')} />
            <Text style={styles.title}>{name}</Text>
            <View style={styles.statusContainer}>
                <Status title="Fome" value={fome} color="#EEFF3A" />
                <Status title="Sono" value={sono} color="#9DE8FF" />
                <Status title="Diversão" value={diversao} color="#FEACAC"/>
            </View>
            <Status title="Total" value={fome + sono + diversao} width={200} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        marginHorizontal: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 300,
        height: 300,
    },
    title: {
        color: "rgb(0, 0, 0)",
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "bold",
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
});

export default TamagotchiDetail;