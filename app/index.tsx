import Header from "@/components/Header";
import ListedTamagotchi from "@/components/ListedTamagotchi";
import { Link, router, useFocusEffect } from "expo-router";
import { ScrollView, VirtualizedList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { useCallback, useEffect, useState } from "react";

type Tamagotchi = {
  id: number;
  name: string;
  fome: number;
  sono: number;
  diversao: number;
  image: string;
  last_interaction?: string;
};

const TamagotchiList = () => {
  const { getTamagotchis } = useTamagotchiDatabase();
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);

  const tamagotchisList = async () => {
    try {
      const res = await getTamagotchis();
      setTamagotchis(res as Tamagotchi[]);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      tamagotchisList();
      return () => {};
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
      <ScrollView>
        <Header text="+" onPress={() => router.navigate("/TamagotchiAdd")} />
        <VirtualizedList
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default TamagotchiList;
