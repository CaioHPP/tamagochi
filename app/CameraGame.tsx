import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  tamagotchiMagPositionMap,
  tamagotchiAccPositionMap,
} from "@/constants/PossibleHidingPosition";
import { useState, useEffect, useCallback } from "react";
import imageMap from "@/constants/ImageMap";
import { Magnetometer, Accelerometer } from "expo-sensors";
import { router, useLocalSearchParams } from "expo-router";
import { useTamagotchiDatabase } from "./database/tamagotchiService";

type Data = {
  x: number;
  y: number;
  z: number;
};

type TamagotchiDetailProps = {
  id: number;
  name?: string;
  fome?: number;
  sono?: number;
  diversao?: number;
  image?: number;
};

const isMagClose = (result: Data, tamagotchiPosition: Data, range: number) => {
  const checkX = () => {
    if (tamagotchiPosition.x + range > 48.4) {
      if (result.x > tamagotchiPosition.x && result.x < 48.4) {
        return true;
      }
    }
    if (tamagotchiPosition.x - range < -48.4) {
      if (result.x < tamagotchiPosition.x && result.x > -48.4) {
        return true;
      }
    } else if (
      result.x > tamagotchiPosition.x - range &&
      result.x < tamagotchiPosition.x + range
    ) {
      return true;
    }
    return false;
  };
  const checkY = () => {
    if (tamagotchiPosition.y + range > 48.4) {
      if (result.y > tamagotchiPosition.y && result.y < 48.4) {
        return true;
      }
    }
    if (tamagotchiPosition.y - range < -48.4) {
      if (result.y < tamagotchiPosition.y && result.y > -48.4) {
        return true;
      }
    } else if (
      result.y > tamagotchiPosition.y - range &&
      result.y < tamagotchiPosition.y + range
    ) {
      return true;
    }
  };
  const checkZ = () => {
    if (tamagotchiPosition.z + range > 48.4) {
      if (result.z > tamagotchiPosition.z && result.z < 48.4) {
        return true;
      }
    }
    if (tamagotchiPosition.z - range < -48.4) {
      if (result.z < tamagotchiPosition.z && result.z > -48.4) {
        return true;
      }
    } else if (
      result.z > tamagotchiPosition.z - range &&
      result.z < tamagotchiPosition.z + range
    ) {
      return true;
    }
    return false;
  };

  return checkY() && checkZ() && checkX();
};

const isAccClose = (result: Data, tamagotchiPosition: Data, range: number) => {
  const checkX = () => {
    if (
      result.x * 10 > tamagotchiPosition.x - range &&
      result.x * 10 < tamagotchiPosition.x + range
    ) {
      return true;
    }
    return false;
  };
  const checkY = () => {
    if (
      result.y * 10 > tamagotchiPosition.y - range &&
      result.y * 10 < tamagotchiPosition.y + range
    ) {
      return true;
    }
  };
  const checkZ = () => {
    if (
      result.z * 10 > tamagotchiPosition.z - range &&
      result.z * 10 < tamagotchiPosition.z + range
    ) {
      return true;
    }
    return false;
  };

  return checkX() && checkY() && checkZ();
};

const CameraGame = () => {
  const params = useLocalSearchParams();
  const { getTamagotchi, updateTamagotchiAutoDecrease, updateTamagotchiPlay } =
    useTamagotchiDatabase();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [magData, setMagData] = useState<Data>({ x: 0, y: 0, z: 0 });
  const [accData, setAccData] = useState<Data>({ x: 0, y: 0, z: 0 });
  const [showTamagotchi, setShowTamagotchi] = useState(false);
  const [isTamaClose, setIsTamaClose] = useState(false);
  const [tamagotchiImage, setTamagotchiImage] = useState<number>(0);
  const [tamagotchiDiversao, setTamagotchiDiversao] = useState<number>(0);
  const [tamagotchiMagPosition, setTamagotchiMagPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [tamagotchiAccPosition, setTamagotchiAccPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const checkDistance = (mag: Data, accel: Data) => {
    if (
      isMagClose(mag, tamagotchiMagPosition, 12) &&
      isAccClose(accel, tamagotchiAccPosition, 1)
    ) {
      setShowTamagotchi(true);
    } else if (
      isMagClose(mag, tamagotchiMagPosition, 40) &&
      isAccClose(accel, tamagotchiAccPosition, 5)
    ) {
      setIsTamaClose(true);
      setShowTamagotchi(false);
    } else {
      setIsTamaClose(false);
    }
  };

  const tamagotchiList = async () => {
    try {
      const tamagotchi: any = await getTamagotchi(Number(params.id));
      setTamagotchiImage(tamagotchi[0].image);
      setTamagotchiDiversao(tamagotchi[0].diversao);
    } catch (error) {
      console.error(error);
    }
  };

  const setTamagotchiPosition = () => {
    const randomPosition = Math.floor(Math.random() * 8) + 1;
    setTamagotchiMagPosition(tamagotchiMagPositionMap[randomPosition]);
    setTamagotchiAccPosition(tamagotchiAccPositionMap[randomPosition]);
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    Magnetometer.setUpdateInterval(500);
    const magSubscription = Magnetometer.addListener((result) => {
      setMagData(result);
    });
    const accSubscription = Accelerometer.addListener((result) => {
      setAccData(result);
    });

    setTamagotchiPosition();
    tamagotchiList();

    return () => {
      magSubscription.remove();
      accSubscription.remove();
    };
  }, []);

  useEffect(() => {
    checkDistance(magData, accData);
  }, [magData, accData]);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const venceu = async () => {
    tamagotchiDiversao + 20 >= 100
      ? setTamagotchiDiversao(100)
      : setTamagotchiDiversao(tamagotchiDiversao + 20);
    try {
      await updateTamagotchiPlay(Number(params.id), tamagotchiDiversao);
      Alert.alert("Parabéns! 🥳", "Você encontrou seu bichinho", [
        {
          text: "Ok",
          onPress: () =>
            router.navigate({
              pathname: "/Tamagotchi",
              params: { id: Number(params.id) },
            }),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
    },
    camera: {
      height: "100%",
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "stretch",
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eee",
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: "#ccc",
    },
    text: {
      textAlign: "center",
      top: 20,
      fontSize: 15,
    },
    modalContent: {
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: "transparent",
      alignContent: "center",
    },
    modalBorder: {
      flexDirection: "column",
      alignContent: "center",
      width: "100%",
      height: "100%",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: "transparent",
    },
    modalView: {
      alignContent: "center",
      borderWidth: 30,
      width: "100%",
      height: "93%",
      marginTop: 35,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderColor: isTamaClose
        ? showTamagotchi
          ? "rgba(21, 255, 0, 0.75)"
          : "rgba(255, 251, 0, 0.75)"
        : "transparent",
    },
    modalText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
    },
    modalImage: {
      width: 300,
      height: 300,
      backgroundColor: "white",
    },
  });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          O aplicativo precisa de permissão para acessar a câmera.
        </Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <Text style={styles.text}>Mag X: {magData.x}</Text>
        <Text style={styles.text}>Mag Y: {magData.y}</Text>
        <Text style={styles.text}>Mag Z: {magData.z}</Text>

        <Text style={styles.text}>Acc X: {accData.x * 10}</Text>
        <Text style={styles.text}>Acc Y: {accData.y * 10}</Text>
        <Text style={styles.text}>Acc Z: {accData.z * 10}</Text>

        <Text style={styles.text}>T Mag X : {tamagotchiMagPosition.x}</Text>
        <Text style={styles.text}>T Mag Y : {tamagotchiMagPosition.y}</Text>
        <Text style={styles.text}>T Mag Z : {tamagotchiMagPosition.z}</Text>

        <Text style={styles.text}>T Acc X: {tamagotchiAccPosition.x}</Text>
        <Text style={styles.text}>T Acc Y: {tamagotchiAccPosition.y}</Text>
        <Text style={styles.text}>T Acc Z: {tamagotchiAccPosition.z}</Text>
      </CameraView>
      <Modal
        visible={isTamaClose}
        style={{
          ...styles.modalContent,
        }}
        transparent={true}
      >
        <View style={{ ...styles.modalBorder }}>
          <View style={{ ...styles.modalView }}>
            {showTamagotchi && (
              <TouchableOpacity onPress={venceu}>
                <Image
                  style={styles.modalImage}
                  source={imageMap[tamagotchiImage]}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CameraGame;
