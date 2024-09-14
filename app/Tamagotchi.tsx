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
  const [dead, setdead] = useState<boolean>(false);

  const tamagotchiList = async () => {
    try {
      const tamagotchi: any = await getTamagotchi(Number(params.id));

      setName(tamagotchi[0].name);
      setFome(tamagotchi[0].fome < 0 ? 0 : tamagotchi[0].fome);
      setSono(tamagotchi[0].sono < 0 ? 0 : tamagotchi[0].sono);
      setDiversao(tamagotchi[0].diversao < 0 ? 0 : tamagotchi[0].diversao);
      setImage(tamagotchi[0].image);
      tamagotchi[0].fome + tamagotchi[0].sono + tamagotchi[0].diversao <= 0
        ? setdead(true)
        : setdead(false);
    } catch (error) {
      console.error(error);
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
    router.push({
      pathname: "/GamePick",
      params: { id: Number(params.id) },
    });
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
      <View style={styles.status}>
        <Text style={styles.titleStatus}>Status</Text>
        <Text style={styles.value}>{status}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Alimentar"
          onPress={alimentar}
          disabled={fome >= 100 || dead}
          color={fome < 100 ? "#b0c002" : "gray"}
        />
        <Button
          title="Descansar"
          onPress={descansar}
          disabled={sono >= 100 || dead}
          color={sono < 100 ? "#2ca1c5" : "gray"}
        />
        <Button
          title="Brincar"
          onPress={brincar}
          disabled={diversao >= 100 || dead}
          color={diversao < 100 ? "#e27c7c" : "gray"}
        />
      </View>

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
  status: {
    backgroundColor: "#fcd556",
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    height: 50,
  },
  titleStatus: {
    fontSize: 15,
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
  },
});

export default TamagotchiDetail;
