import { Status } from "@/components/ListedTamagotchi";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View, Button } from "react-native";
import imageMap from "@/constants/ImageMap";
import { useCallback, useState } from "react";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { statusMap } from "@/constants/Status";

type TamagotchiDetailProps = {
  id: number;
  name?: string;
  fome?: number;
  sono?: number;
  diversao?: number;
  image?: number;
};

const TamagotchiDetail = ({ id }: TamagotchiDetailProps) => {
  const params = useLocalSearchParams();

  const { getTamagotchi, updateTamagotchiStatus } = useTamagotchiDatabase();
  const [name, setName] = useState<string>("");
  const [fome, setFome] = useState<number>(0);
  const [sono, setSono] = useState<number>(0);
  const [diversao, setDiversao] = useState<number>(0);
  const [image, setImage] = useState<number>(0);

  const tamagotchiList = async () => {
    try {
      const tamagotchi: any = await getTamagotchi(Number(params.id));

      setName(tamagotchi[0].name);
      setFome(tamagotchi[0].fome < 0 ? 0 : tamagotchi[0].fome);
      setSono(tamagotchi[0].sono < 0 ? 0 : tamagotchi[0].sono);
      setDiversao(tamagotchi[0].diversao < 0 ? 0 : tamagotchi[0].diversao);
      setImage(tamagotchi[0].image);
    } catch (error) {
      console.error(error);
    }
  };

  const maxStats = () => {
    setFome(100);
    setSono(100);
    setDiversao(100);

    updateTamagotchiStatus(Number(params.id), {
      fome: 100,
      sono: 100,
      diversao: 100,
    });
  };

  let status = statusMap(fome, sono, diversao);

  useFocusEffect(
    useCallback(() => {
      tamagotchiList();
      return () => {};
    }, [])
  );
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: params.name as string }} />
      <Image style={styles.image} source={imageMap[image]} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.statusContainer}>
        <Status title="Fome" value={fome} color="#EEFF3A" />
        <Status title="Sono" value={sono} color="#9DE8FF" />
        <Status title="Diversão" value={diversao} color="#FEACAC" />
      </View>
      <Status title="Status" value={status} width={200} />
      <Button title="Atualizar Todos os Status" onPress={maxStats} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});

export default TamagotchiDetail;
