import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Header from "./screens/Header/Header";
import {
  getFirestoreCards,
  updateFirestoreCard,
  updateCurrentCard
} from "./store/actions/cardsActions";
import { getImage } from "./store/actions/imageActions";
import { showAnswer, showDefinition } from "./store/actions/uiActions";
import { connect } from "react-redux";
import axios from "axios";
import blueRanger from "./assets/images/blue_ranger.png";

const MyApp = props => {
  const baseApi = "http://api.giphy.com/v1/gifs";

  const [currentImage, setCurrentImage] = useState("");
  const [screenHeight, setScreenHeight] = useState(300);
  const [cardIndex, setCardIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const {
    getFirestoreCards,
    updateFirestoreCard,
    updateCurrentCard,
    getImages,
    showAnswer,
    showDefinition,
    cards,
    image,
    currentCard,
    isShowAnswer,
    isShowDefinition
  } = props;

  // Get Screen Dimension
  useEffect(() => {
    let { width, height } = Dimensions.get("window");
    setScreenHeight(height);
  }, []);

  // useEffect(() => {
  //   if (image && images.length > 0) {
  //     setCurrentImage(images[randomImageIndex(images.length)].urls.raw);
  //   }
  // }, [images]);

  // Get Firestore Images
  useEffect(() => {
    (async () => {
      await getFirestoreCards();
      updateCurrentCard();
    })();
  }, []);

  // useEffect(() => {
  //   if (cards[0]) {
  //     let randomCard = cards[randomCardIndex()];
  //     setCurrentCard(randomCard);
  //     searchImage(randomCard.definition);
  //   }
  // }, [cards]);

  const searchImage = async searchTerm => {
    await getImage();

    // setCurrentImage(images[randomImageIndex(images.length)].urls.raw);

    // axios
    //   .get(
    //     `${baseApi}/search?api_key=2HF9SAG5DYsve05CWbAltaYI2CSUU9o1&q=${searchTerm}`
    //   )
    //   .then(response => {
    //     let gif =
    //       response.data.data[randomImageIndex(response.data.data.length)];
    //     setCurrentImage(`https://media.giphy.com/media/${gif.id}/giphy.gif`);
    //   })
    //   .catch(error => console.log(error.message));
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
          <TouchableOpacity onPress={() => searchImage(currentCard.definition)}>
            <Image
              style={styles.image}
              source={currentImage ? { uri: currentImage } : blueRanger}
            />
          </TouchableOpacity>
        </View>

        {isShowAnswer ? (
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 40,
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.character}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.pronunciation}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.definition}
            </Text>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold",
                marginBottom: "1%"
              }}
            >
              {currentCard && currentCard.pronunciation}
            </Text>

            {isShowDefinition ? (
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 30,
                    fontWeight: "bold"
                  }}
                >
                  {currentCard && currentCard.definition}
                </Text>
              </View>
            ) : (
              <View>
                <Button
                  title="Definition"
                  onPress={() => showDefinition(true)}
                />
              </View>
            )}
          </View>
        )}

        {isShowAnswer ? (
          <View style={styles.buttonContainer}>
            <Button
              color="red"
              title="WRONG"
              onPress={() => updateFirestoreCard("bad")}
            />
            <Button
              title="MAYBE"
              onPress={() => updateFirestoreCard("maybe")}
            />
            <Button
              color="green"
              title="GOOD"
              onPress={() => updateFirestoreCard("good")}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="SHOW ANSWER" onPress={() => showAnswer(true)} />
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
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  backgroundVideo: {
    opacity: 0
  }
});

const mapStateToProps = ({ cards, images, ui }) => ({
  cards: cards.cards,
  currentCard: cards.currentCard,
  image: images.image,
  isShowAnswer: ui.isShowAnswer,
  isShowDefinition: ui.isShowDefinition
});

const mapDispatchToProps = {
  getFirestoreCards,
  updateFirestoreCard,
  updateCurrentCard,
  showAnswer,
  showDefinition
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
