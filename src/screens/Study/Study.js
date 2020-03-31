import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import {
  getFirestoreCards,
  updateFirestoreCardGrade,
  updateCurrentCard
} from "../../store/actions/cardsActions";
import { showAnswer, showDefinition } from "../../store/actions/uiActions";
import { updateCurrentImage } from "../../store/actions/imageActions";
import { connect } from "react-redux";

const Study = props => {
  const {
    getFirestoreCards,
    updateFirestoreCardGrade,
    updateCurrentCard,
    loadingCard,
    updateCurrentImage,
    showAnswer,
    showDefinition,
    image,
    loadingImage,
    currentCard,
    isShowAnswer,
    isShowDefinition
  } = props;

  // Get Firestore Images
  useEffect(() => {
    getFirestoreCards();
  }, []);

  return loadingCard ? (
    <View
      style={{
        backgroundColor: "#121212",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ height: "100%",   backgroundColor: "#121212" }}>
      <View
        style={{
          height: "100%",
          paddingTop: "5%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={{ height: 300 }}
            onPress={() => updateCurrentImage()}
          >
            {loadingImage ? (
              <ActivityIndicator />
            ) : (
              <Image
                source={{ uri: image }}
                style={styles.image}
                placeholderStyle={{ backgroundColor: "transparent" }}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
          </TouchableOpacity>
        </View>

        {isShowAnswer ? (
          <View>
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 40,
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.character}
            </Text>
            <Text
              style={{
                color: "#fff",
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold"
              }}
            >
              {currentCard && currentCard.pronunciation}
            </Text>
            <Text
              style={{
                color: "#fff",
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
                color: "#fff",
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
              <View></View>
            )}
          </View>
        )}

        {isShowAnswer ? (
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="thumbs-down" size={30} color="#fff" />}
              onPress={() => updateFirestoreCardGrade("bad")}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="reply" size={30} color="#fff" />}
              onPress={() => updateFirestoreCardGrade("maybe")}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="thumbs-up" size={30} color="#fff" />}
              onPress={() => updateFirestoreCardGrade("good")}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="eye" size={30} color="#fff" />}
              onPress={() => showAnswer(true)}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="comment" size={30} color="#fff" />}
              onPress={() => {}}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="question" size={30} color="#fff" />}
              onPress={() => showDefinition(!isShowDefinition)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: { resizeMode: "contain", width: 300, height: 300, marginBottom: 10 },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 20
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
  },
  button: { width: 60 }
});

const mapStateToProps = ({ cards, images, ui }) => ({
  currentCard: cards.currentCard,
  loadingCard: cards.loading,
  image: images.image,
  loadingImage: images.loading,
  isShowAnswer: ui.isShowAnswer,
  isShowDefinition: ui.isShowDefinition
});

const mapDispatchToProps = {
  getFirestoreCards,
  updateFirestoreCardGrade,
  updateCurrentCard,
  showAnswer,
  showDefinition,
  updateCurrentImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
