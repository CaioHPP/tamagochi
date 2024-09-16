import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

const GamePick = () => {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Image
          source={require("../assets/images/MemoryGame.gif")}
          style={styles.image}
        />
        <Button
          title="Jogo da Memória"
          onPress={() => {
            router.push({
              pathname: "/MemoryGame",
              params: { id: Number(params.id) },
            });
          }}
        />
      </View>
      <View style={styles.gameContainer}>
        <Image
          source={require("../assets/images/HidenSeekGame.gif")}
          style={styles.image}
        />
        <Button
          title="Esconde-Esconde"
          onPress={() => {
            router.push({
              pathname: "/CameraGame",
              params: { id: Number(params.id) },
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  gameContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default GamePick;
