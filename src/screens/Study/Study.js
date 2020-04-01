import React, { useEffect, useRef, useState } from "react";
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
import {
  showAnswer,
  showDefinition,
  updateVideoPaused
} from "../../store/actions/uiActions";
import { updateCurrentImage } from "../../store/actions/imageActions";
import { connect } from "react-redux";
import Video from "react-native-video";

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
    forvoAudio,
    videoPaused,
    isShowDefinition,
    updateVideoPaused
  } = props;
  const audioPlayerRef = useRef(null);

  // Get Firestore Images
  useEffect(() => {
    getFirestoreCards();
  }, []);

  const handleCardUpdate = grade => {
    updateFirestoreCardGrade(grade);
  };

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
    <View style={{ height: "100%", backgroundColor: "#121212" }}>
      <Video
        source={{
          uri: forvoAudio
        }}
        ref={audioPlayerRef}
        paused={videoPaused}
        onEnd={() => {
          audioPlayerRef.current.seek(0);
          updateVideoPaused(true);
        }}
        style={styles.backgroundAudio}
      />
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
              <View></View>
            )}
          </View>
        )}

        {isShowAnswer ? (
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="thumbs-down" size={30} color="#fff" />}
              onPress={() => handleCardUpdate("bad")}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="reply" size={30} color="#fff" />}
              onPress={() => handleCardUpdate("maybe")}
            />
            <Button
              buttonStyle={styles.button}
              icon={<Icon name="thumbs-up" size={30} color="#fff" />}
              onPress={() => handleCardUpdate("good")}
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
              onPress={() => {
                audioPlayerRef.current.seek(0);
                updateVideoPaused(false);
              }}
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
  backgroundAudio: {
    opacity: 0,
    position: "absolute"
  },
  button: { width: 60 }
});

const mapStateToProps = ({ cards, images, ui }) => ({
  currentCard: cards.currentCard,
  loadingCard: cards.loading,
  image: images.image,
  loadingImage: images.loading,
  isShowAnswer: ui.isShowAnswer,
  forvoAudio: ui.forvoAudio,
  videoPaused: ui.videoPaused,
  isShowDefinition: ui.isShowDefinition
});

const mapDispatchToProps = {
  getFirestoreCards,
  updateFirestoreCardGrade,
  updateCurrentCard,
  showAnswer,
  showDefinition,
  updateCurrentImage,
  updateVideoPaused
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
