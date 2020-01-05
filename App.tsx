import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import blueRanger from "./images/blue_ranger.png";
import fire from "./images/fire.gif";
import stone from "./images/stone.png";

export default function App() {
  const [imageArray, setImageArray] = useState([blueRanger, fire, stone]);
  const [currentImage, setCurrentImage] = useState(blueRanger);
  const [screenHeight, setScreenHeight] = useState(300);
  const [showAnswer, setShowAnswer] = useState(false);
  const updateImage = () => {
    let randomImage = Math.floor(Math.random() * imageArray.length);
    setCurrentImage(imageArray[randomImage]);
  };
  useEffect(() => {
    setShowAnswer(false);
    let { width, height } = Dimensions.get("window");
    console.log(width, height);
    setScreenHeight(height);
  }, []);
  return (
    <View style={{ height: screenHeight }}>
      <View style={styles.header}>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          REMI
        </Text>
      </View>
      <View
        style={{
          height: screenHeight - 120,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={updateImage}>
            <Image style={styles.image} source={currentImage} />
          </TouchableOpacity>
        </View>
        {showAnswer ? (
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Comida
          </Text>
        ) : (
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Guess, Bitch
          </Text>
        )}
        {showAnswer ? (
          <View style={styles.buttonContainer}>
            <Button
              color="red"
              title="WRONG"
              onPress={() => setShowAnswer(false)}
            />
            <Button title="MAYBE" onPress={() => Alert.alert("test")} />
            <Button
              color="green"
              title="GOOD"
              onPress={() => Alert.alert("test")}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="SHOW ANSWER" onPress={() => setShowAnswer(true)} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
    height: 80,
    marginBottom: 40
  },
  image: { resizeMode: "contain", width: 300, height: 300, marginBottom: 10 },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
    //backgroundColor: "#fff",
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
