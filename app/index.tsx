import Header from "@/components/Header";
import ListedTamagotchi from "@/components/ListedTamagotchi";
import { Link, router, useFocusEffect } from "expo-router";
import { ScrollView, VirtualizedList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { SetStateAction, useCallback, useEffect, useState } from "react";

export type Tamagotchi = {
  id: number;
  name: string;
  fome: number;
  sono: number;
  diversao: number;
  image: string;
  last_interaction?: string;
};

const TamagotchiList = () => {
  const { getTamagotchis, updateTamagotchiAutoDecrease } =
    useTamagotchiDatabase();
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);

  const tamagotchisList = async () => {
    try {
      const res = await getTamagotchis();
      setTamagotchis(res as Tamagotchi[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      tamagotchisList();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      tamagotchisList();
      return async () => {};
    }, [])
  );

  if (tamagotchis.length === 0) {
    return (
      <SafeAreaView>
        <ScrollView>
          <Header text="+" onPress={() => router.navigate("/TamagotchiAdd")} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <VirtualizedList
        ListHeaderComponent={() => (
          <Header text="+" onPress={() => router.push("/TamagotchiAdd")} />
        )}
        data={tamagotchis}
        initialNumToRender={4}
        renderItem={({ item }: any) => (
          <ListedTamagotchi
            id={item.id}
            key={item.id}
            name={item.name}
            fome={item.fome}
            sono={item.sono}
            diversao={item.diversao}
            image={item.image}
          />
        )}
        keyExtractor={(item: any) => item.id}
        getItemCount={() => tamagotchis.length}
        getItem={(data, index) => data[index]}
      ></VirtualizedList>
    </SafeAreaView>
  );
};

export default TamagotchiList;
