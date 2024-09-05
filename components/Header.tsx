import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        color: "#E26D00",
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "bold",
       
        
        

    },
    buttonAdd: {
        padding:5,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#192fa7',
        color: '#fff',
        elevation: 3,
        fontWeight: 'bold',
    },
    
    buttonAddText: {
        color: '#fff',
        fontSize: 30,
    },


});
type HeaderProps = {
    text: string;
    onPress: () => void;
}
const Header = ({text, onPress}: HeaderProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tamagotchi</Text>
            <TouchableOpacity style={styles.buttonAdd} onPress={onPress}>
                    <Ionicons name="add" size={40} color="#fff" />
                </TouchableOpacity>
        </View>
    );
}

export default Header;