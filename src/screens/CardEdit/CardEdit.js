import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { updateFirestoreCardContent } from "../../store/actions/cardsActions";
import { connect } from "react-redux";

const CardEdit = props => {
  const { currentCard, updateFirestoreCardContent, navigation } = props;
  const [editedCard, onChangeText] = useState({
    id: null,
    character: "",
    pronunciation: "",
    definition: ""
  });
  useEffect(() => {
    onChangeText({
      id: currentCard.id,
      character: currentCard.character,
      pronunciation: currentCard.pronunciation,
      definition: currentCard.definition
    });
  }, [currentCard]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Chracter:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={editedCard && editedCard.character}
          onChangeText={character => onChangeText({ ...editedCard, character })}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Pronunciation:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={editedCard && editedCard.pronunciation}
          onChangeText={pronunciation =>
            onChangeText({ ...editedCard, pronunciation })
          }
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>Definition:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={editedCard && editedCard.definition}
          onChangeText={definition =>
            onChangeText({ ...editedCard, definition })
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          icon={<Icon name="undo" size={30} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Button
          buttonStyle={styles.button}
          icon={<Icon name="save" size={30} color="#fff" />}
          onPress={() => {
            updateFirestoreCardContent(editedCard);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    paddingTop: "5%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%"
  },
  label: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  textInput: {
    color: "#fff",
    width: "50%",
    fontSize: 30
  },
  button: {
    width: 60
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
  currentCard: cards.currentCard
});

const mapDispatchToProps = {
  updateFirestoreCardContent
};

export default connect(mapStateToProps, mapDispatchToProps)(CardEdit);
