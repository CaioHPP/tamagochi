import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { router, Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";
import { initDatabase } from "./database/initDatabase";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="tamagotchi.db" onInit={initDatabase}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Tamagotchi" />
        <Stack.Screen
          name="TamagotchiAdd"
          options={{ title: "Adicionar Tamagotchi" }}
        />
        <Stack.Screen name="GamePick" options={{ title: "Escolha um Game" }} />
        <Stack.Screen
          name="MemoryGame"
          options={{ title: "Jogo da Memória" }}
        />
        <Stack.Screen name="CameraGame" options={{ title: "Camera" }} />
      </Stack>
    </SQLiteProvider>
  );
}
