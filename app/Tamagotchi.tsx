import { Status } from "@/components/ListedTamagotchi";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
} from "react-native";
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

  const {
    getTamagotchi,
    updateTamagotchiAutoDecrease,
    updateTamagotchiFeed,
    updateTamagotchiPlay,
    updateTamagotchiSleep,
    deleteTamagotchi,
  } = useTamagotchiDatabase();

  const [name, setName] = useState<string>("");
  const [fome, setFome] = useState<number>(0);
  const [sono, setSono] = useState<number>(0);
  const [diversao, setDiversao] = useState<number>(0);
  const [image, setImage] = useState<number>(0);
  const [dead, setDead] = useState<boolean>(false);

  const tamagotchiList = async () => {
    try {
      const tamagotchi: any = await getTamagotchi(Number(params.id));

      setName(tamagotchi[0].name);
      setFome(tamagotchi[0].fome < 0 ? 0 : tamagotchi[0].fome);
      setSono(tamagotchi[0].sono < 0 ? 0 : tamagotchi[0].sono);
      setDiversao(tamagotchi[0].diversao < 0 ? 0 : tamagotchi[0].diversao);
      setImage(tamagotchi[0].image);
      tamagotchi[0].fome + tamagotchi[0].sono + tamagotchi[0].diversao <= 0
        ? setDead(true)
        : setDead(false);
    } catch (error) {
      console.error(error);
    }
  };

  const maxStats = () => {
    try {
      setFome(100);
      setSono(100);
      setDiversao(100);
      updateTamagotchiAutoDecrease({
        id: Number(params.id),
        fome,
        sono,
        diversao,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const alimentar = () => {
    fome + 10 >= 100 ? setFome(100) : setFome(fome + 10);
    try {
      updateTamagotchiFeed(Number(params.id), fome);
    } catch (error) {
      console.log(error);
    }
  };

  const descansar = () => {
    sono + 10 >= 100 ? setSono(100) : setSono(sono + 10);
    try {
      updateTamagotchiSleep(Number(params.id), sono);
    } catch (error) {
      console.log(error);
    }
  };

  const brincar = () => {
    diversao + 10 >= 100 ? setDiversao(100) : setDiversao(diversao + 10);
    try {
      updateTamagotchiPlay(Number(params.id), diversao);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTamagotchi = () => {
    try {
      deleteTamagotchi(Number(params.id));
      router.back();
    } catch (error) {
      console.log(error);
    }
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
      <View style={styles.statusContainer}>
        <Button title="Alimentar" onPress={alimentar} disabled={dead} />
        <Button title="Descansar" onPress={descansar} disabled={dead} />
        <Button title="Brincar" onPress={brincar} disabled={dead} />
      </View>
      <Button title="Max All" onPress={maxStats} color="red" disabled={dead} />
      {dead ? (
        <Button
          title="Enterrar Tamagotchi"
          onPress={removeTamagotchi}
          color="red"
          disabled={!dead}
        />
      ) : null}
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
