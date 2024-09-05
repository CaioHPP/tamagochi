import { Image, TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import TamagotchiList from ".";
import { router } from "expo-router";

const TamagotchiAdd = () => {
    const salvar = () => {
        console.log('Salvando...');
        router.back();
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/tamagotchi.png')} />
            <TextInput style={styles.input} placeholder="Digite o nome do Tamagotchi" />
            <TouchableOpacity style={styles.button} onPress={() => salvar()}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            
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
    input: {
        width: 300,
        height: 50,
        borderWidth: 2,
        borderRadius: 9,
        borderColor: '#ffe4e4',
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        padding:5,
        width: 300,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#192fa7',
        color: '#fff',
        elevation: 3,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,

    },
});



export default TamagotchiAdd;