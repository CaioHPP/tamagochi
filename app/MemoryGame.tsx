import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Button,
  Alert,
} from "react-native";
import { router } from "expo-router";

type MemoryImage = {
  id: number;
  src: any;
};

const initialImages: MemoryImage[] = [
  { id: 1, src: require("../assets/images/1.png") },
  { id: 2, src: require("../assets/images/2.png") },
  { id: 3, src: require("../assets/images/3.png") },
  { id: 4, src: require("../assets/images/4.png") },
  { id: 1, src: require("../assets/images/1.png") },
  { id: 2, src: require("../assets/images/2.png") },
  { id: 3, src: require("../assets/images/3.png") },
  { id: 4, src: require("../assets/images/4.png") },
];

const shuffleArray = (array: MemoryImage[]): MemoryImage[] => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [images, setImages] = useState<MemoryImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [revealedImages, setRevealedImages] = useState<number[]>([]);

  const startGame = () => {
    const shuffledImages = shuffleArray([...initialImages]);
    setImages(shuffledImages);
    setRevealedImages([]);
    setSelectedImages([]);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleSelectImage = (index: number) => {
    if (selectedImages.length < 2 && !revealedImages.includes(index)) {
      setSelectedImages([...selectedImages, index]);

      if (
        selectedImages.length === 1 &&
        images[selectedImages[0]].id === images[index].id
      ) {
        setRevealedImages([...revealedImages, selectedImages[0], index]);
        setSelectedImages([]);
      } else if (selectedImages.length === 1) {
        setTimeout(() => setSelectedImages([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (revealedImages.length === images.length && images.length > 0) {
      Alert.alert("Parabéns!", "Você encontrou todos os pares");
      startGame();
    }
  }, [revealedImages]);

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={() => router.back()} />

      <Text style={styles.title}>Jogo da Memória</Text>
      <View style={styles.board}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectImage(index)}
            style={styles.card}
          >
            {selectedImages.includes(index) ||
            revealedImages.includes(index) ? (
              <Image source={image.src} style={styles.image} />
            ) : (
              <View style={styles.placeholder} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  board: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 80,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  placeholder: {
    width: 70,
    height: 70,
    backgroundColor: "#cccccc",
    borderRadius: 10,
  },
});

export default MemoryGame;
