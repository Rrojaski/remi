import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity
} from "react-native";

import {
    getFirestoreCards,
    updateFirestoreCard,
    updateCurrentCard
} from "../../store/actions/cardsActions";
import { showAnswer, showDefinition } from "../../store/actions/uiActions";
import { updateCurrentImage } from "../../store/actions/imageActions";
import { connect } from "react-redux";
import Panda from "../../assets/images/panda.png";

const Study = props => {

    const {
        getFirestoreCards,
        updateFirestoreCard,
        updateCurrentCard,
        updateCurrentImage,
        showAnswer,
        showDefinition,
        image,
        currentCard,
        isShowAnswer,
        isShowDefinition
    } = props;

    // Get Firestore Images
    useEffect(() => {
        (async () => {
            await getFirestoreCards();
            updateCurrentCard();
        })();
    }, []);

    return (
        <View style={{ height: '100%' }}>
          <View
            style={{
              height: '100%',
                paddingTop: "5%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <View style={styles.container}>
              <TouchableOpacity onPress={() => updateCurrentImage()}>
                <Image
                  style={styles.image}
                  source={image ? { uri: image } : Panda}
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
                  <Button
                      title="Definition"
                      onPress={() => showDefinition(true)}
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
    showDefinition,
    updateCurrentImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
