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
import { showAnswer, showDefinition } from "./store/actions/uiActions";
import { updateCurrentImage } from "./store/actions/imageActions";
import { connect } from "react-redux";
import blueRanger from "./assets/images/blue_ranger.png";

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import Home from './screens/Home/Home'

const MyApp = props => {
  const [screenHeight, setScreenHeight] = useState(300);

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

  // Get Screen Dimension
  useEffect(() => {
    let { width, height } = Dimensions.get("window");
    setScreenHeight(height);
  }, []);

  // Get Firestore Images
  useEffect(() => {
    (async () => {
      await getFirestoreCards();
      updateCurrentCard();
    })();
  }, []);

  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    // <View style={{ height: screenHeight }}>
    //   <Header />
    //   <View
    //     style={{
    //       height: screenHeight - 120,
    //       display: "flex",
    //       flexDirection: "column"
    //     }}
    //   >
    //     <View style={styles.container}>
    //       <TouchableOpacity onPress={() => updateCurrentImage()}>
    //         <Image
    //           style={styles.image}
    //           source={image ? { uri: image } : blueRanger}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //
    //     {isShowAnswer ? (
    //       <View>
    //         <Text
    //           style={{
    //             alignSelf: "center",
    //             fontSize: 40,
    //             fontWeight: "bold"
    //           }}
    //         >
    //           {currentCard && currentCard.character}
    //         </Text>
    //         <Text
    //           style={{
    //             alignSelf: "center",
    //             fontSize: 30,
    //             fontWeight: "bold"
    //           }}
    //         >
    //           {currentCard && currentCard.pronunciation}
    //         </Text>
    //         <Text
    //           style={{
    //             alignSelf: "center",
    //             fontSize: 30,
    //             fontWeight: "bold"
    //           }}
    //         >
    //           {currentCard && currentCard.definition}
    //         </Text>
    //       </View>
    //     ) : (
    //       <View
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center"
    //         }}
    //       >
    //         <Text
    //           style={{
    //             alignSelf: "center",
    //             fontSize: 30,
    //             fontWeight: "bold",
    //             marginBottom: "1%"
    //           }}
    //         >
    //           {currentCard && currentCard.pronunciation}
    //         </Text>
    //
    //         {isShowDefinition ? (
    //           <View>
    //             <Text
    //               style={{
    //                 alignSelf: "center",
    //                 fontSize: 30,
    //                 fontWeight: "bold"
    //               }}
    //             >
    //               {currentCard && currentCard.definition}
    //             </Text>
    //           </View>
    //         ) : (
    //           <View>
    //             <Button
    //               title="Definition"
    //               onPress={() => showDefinition(true)}
    //             />
    //           </View>
    //         )}
    //       </View>
    //     )}
    //
    //     {isShowAnswer ? (
    //       <View style={styles.buttonContainer}>
    //         <Button
    //           color="red"
    //           title="WRONG"
    //           onPress={() => updateFirestoreCard("bad")}
    //         />
    //         <Button
    //           title="MAYBE"
    //           onPress={() => updateFirestoreCard("maybe")}
    //         />
    //         <Button
    //           color="green"
    //           title="GOOD"
    //           onPress={() => updateFirestoreCard("good")}
    //         />
    //       </View>
    //     ) : (
    //       <View style={styles.buttonContainer}>
    //         <Button title="SHOW ANSWER" onPress={() => showAnswer(true)} />
    //       </View>
    //     )}
    //   </View>
    // </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
