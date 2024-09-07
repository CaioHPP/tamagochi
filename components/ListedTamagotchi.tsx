import { router } from "expo-router";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";

type StatusProps = {
  title: string;
  value: number;
  color?: string;
  width?: number;
};

type TamagotchiProps = {
  id: number;
  name: string;
  fome: number;
  sono: number;
  diversao: number;
  image: string;
};

export function Status({ title, value, color, width }: StatusProps) {
  const styles = StyleSheet.create({
    status: {
      backgroundColor: color ? color : "#fcd556",
      padding: 5,
      borderRadius: 5,
      elevation: 3,
      justifyContent: "space-between",
      alignItems: "center",
      width: width ? width : 50,
      height: 50,
    },
    title: {
      fontSize: 10,
      fontWeight: "bold",
    },
    value: {
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.status}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const ListedTamagotchi = ({
  id,
  name,
  fome,
  sono,
  diversao,
  image,
}: TamagotchiProps) => {
  const imagePath = require(`../assets/images/${image}.png`);
  console.log(imagePath);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/Tamagotchi",
          params: { id, name, fome, sono, diversao, image },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imagePath} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.statusContainer}>
            <Status title="Fome" value={fome} />
            <Status title="Sono" value={sono} />
            <Status title="Diversão" value={diversao} />
            <Status title="Total" value={fome + sono + diversao} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    marginLeft: 10,
  },
  title: {
    color: "#15351c",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
});
export default ListedTamagotchi;
