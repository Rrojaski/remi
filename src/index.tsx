import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import Header from "./screens/Header/Header";
import { getCards } from "./store/actions/cardsActions";
import { connect } from "react-redux";

import blueRanger from "./assets/images/blue_ranger.png";
import fire from "./assets/images/fire.gif";
import stone from "./assets/images/stone.png";

const MyApp = props => {
  const [imageArray, setImageArray] = useState([blueRanger, fire, stone]);
  const [currentImage, setCurrentImage] = useState(blueRanger);
  const [screenHeight, setScreenHeight] = useState(300);
  const [showAnswer, setShowAnswer] = useState(false);
  const { testing, updateText } = props;
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
  useEffect(() => console.log(testing));

  const onChangeOfText = text => {
    updateText(text);
  };

  return (
    <View style={{ height: screenHeight }}>
      <Header />
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
            Guess
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
};

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

const mapStateToProps = ({ testing }) => ({
  testing
});

const mapDispatchToProps = { getCards };

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
