import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TamagotchiList from ".";
import { router } from "expo-router";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { useState } from "react";
import imageMap from "@/constants/ImageMap";

const TamagotchiAdd = () => {
  const [name, setName] = useState<string>("");
  const { createTamagotchi } = useTamagotchiDatabase();
  const [selectedImage, setSelectedImage] = useState<number>(1);

  const images = [1, 2, 3, 4, 5];

  const create = async () => {
    try {
      const image = selectedImage;
      const res = await createTamagotchi(name, image);
    } catch (error) {
      console.error(error);
    }
  };

  const salvar = () => {
    create();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text>Selecione uma imagem</Text>
      <View style={styles.imageContainer}>
        {images.map((img) => (
          <TouchableOpacity key={img} onPress={() => setSelectedImage(img)}>
            <Image
              style={[
                styles.image,
                selectedImage === img && styles.selectedImage,
              ]}
              source={imageMap[img]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Tamagotchi"
        onChangeText={setName}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={() => salvar()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
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
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 8,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: "#ffe4e4",
    padding: 5,
    fontSize: 20,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "regular",
    lineHeight: 24,
  },
  button: {
    padding: 5,
    width: 300,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#192fa7",
    color: "#fff",
    elevation: 3,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  selectedImage: {
    borderColor: "#192fa7",
    borderWidth: 4,
  },
});

export default TamagotchiAdd;
