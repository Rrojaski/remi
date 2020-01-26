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
import { getCards, updateCard } from "./store/actions/cardsActions";
import { connect } from "react-redux";
import axios from "axios";
import blueRanger from "./assets/images/blue_ranger.png";

const MyApp = props => {
  const baseApi = "http://api.giphy.com/v1/gifs";

  const [currentImage, setCurrentImage] = useState(blueRanger);
  const [screenHeight, setScreenHeight] = useState(300);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [cardIndex, setCardIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { getCards, updateCard, cards } = props;

  useEffect(() => {
    setShowAnswer(false);
    let { width, height } = Dimensions.get("window");
    console.log(width, height);
    setScreenHeight(height);
  }, []);

  useEffect(() => getCards(), []);

  useEffect(() => {
    if (cards[0]) {
      let randomCard = cards[randomCardIndex()];
      setCurrentCard(randomCard);
      searchImage(randomCard.definition);
    }
  }, [cards]);

  const randomCardIndex = () => {
    let randomNumber = Math.floor(Math.random() * cards.length);
    while (cardIndex === randomNumber) {
      randomNumber = Math.floor(Math.random() * cards.length);
    }
    setCardIndex(randomNumber);
    return cardIndex;
  };

  const randomImageIndex = arrayLength => {
    let randomNumber = Math.floor(Math.random() * arrayLength);
    while (imageIndex === randomNumber) {
      randomNumber = Math.floor(Math.random() * arrayLength);
    }
    setImageIndex(randomNumber);
    return imageIndex;
  };

  const searchImage = searchTerm => {
    axios
      .get(
        `${baseApi}/search?api_key=2HF9SAG5DYsve05CWbAltaYI2CSUU9o1&q=${searchTerm}`
      )
      .then(response => {
        let gif =
          response.data.data[randomImageIndex(response.data.data.length)];
        setCurrentImage(`https://media.giphy.com/media/${gif.id}/giphy.gif`);
      })
      .catch(error => console.log(error.message));
  };

  const badClick = () => {
    let currentGrade = currentCard.grade;
    if (currentGrade > 0) {
      currentGrade = currentGrade - 1;
    }
    updateCard({ ...currentCard, grade: currentGrade });
    let randomCard = cards[randomCardIndex()];
    setCurrentCard(randomCard);
    searchImage(randomCard.definition);
    setShowAnswer(false);
    setShowDefinition(false);
  };

  const goodClick = () => {
    let currentGrade = currentCard.grade;
    if (currentGrade <= 9) {
      currentGrade = currentGrade + 1;
    }
    updateCard({ ...currentCard, grade: currentGrade });
    let randomCard = cards[randomCardIndex()];
    setCurrentCard(randomCard);
    searchImage(randomCard.definition);
    setShowAnswer(false);
    setShowDefinition(false);
  };

  const maybeClick = () => {
    let randomCard = cards[randomCardIndex()];
    setCurrentCard(randomCard);
    searchImage(randomCard.definition);
    setShowAnswer(false);
    setShowDefinition(false);
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
            <Image style={styles.image} source={currentImage} />
          </TouchableOpacity>
        </View>
        {showAnswer ? (
          <View>
            <Text
              style={{
                alignSelf: "center",
                fontSize: "4rem",
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.character}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontSize: "3rem",
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.pronunciation}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                fontSize: "3rem",
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.definition}
            </Text>
          </View>
        ) : (
          <View style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "5px"
              }}
            >
              {currentCard && currentCard.pronunciation}
            </Text>

            {showDefinition ? (
              <View>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: "3rem",
                    fontWeight: "bold"
                  }}
                >
                  {currentCard && currentCard.definition}
                </Text>
              </View>
            ) : (
              <View style={{ display: "block", margin: "0 auto", width: 'max-content'}}>
                <Button
                  title="Definition"
                  onPress={() => setShowDefinition(true)}
                />
              </View>
            )}
          </View>
        )}

        {showAnswer ? (
          <View style={styles.buttonContainer}>
            <Button color="red" title="WRONG" onPress={() => badClick()} />
            <Button title="MAYBE" onPress={() => maybeClick()} />
            <Button color="green" title="GOOD" onPress={() => goodClick()} />
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

const mapStateToProps = ({ cards }) => ({
  cards: cards.cards
});

const mapDispatchToProps = { getCards, updateCard };

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
