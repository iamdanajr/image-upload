import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { lauchImagePicker } from "./utils/Imagepicker";
import { ImageUpload } from "./utils/Imageupload";

export default function App() {
  const [image, setImage] = useState("");
  const [imageDone, setImageDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setImageDone(false);
    }, 2000);
  }, [imageDone]);

  const pickImage = async () => {
    try {
      let imagePicked = await lauchImagePicker();

      if (imagePicked) {
        let ImageUploaded = await ImageUpload(imagePicked);
        if (ImageUploaded == "success") {
          setImage(imagePicked);
          setImageDone(true);
        }
      }
    } catch (error) {
      Alert.alert("Erreur", error);
    }
  };

  const removeImage = () => {
    setImage("");
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text>Select an Image</Text>
      </TouchableOpacity>

      {image && (
        <TouchableOpacity
          style={{
            ...styles.button,
            marginTop: 20,
            backgroundColor: "#ff0000",
          }}
          onPress={removeImage}
        >
          <Text>Remove</Text>
        </TouchableOpacity>
      )}

      {imageDone && (
        <Text style={styles.textSuccess}>Image Uploaded successfully</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00ffff",
  },
  button: {
    backgroundColor: "#00ffff",
    color: "#fff",
    fontSize: 20,
    padding: 10,
  },
  textSuccess: {
    marginTop: 10,
    color: "#00ffff",
  },
});
