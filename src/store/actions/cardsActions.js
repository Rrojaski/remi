import * as TYPES from "../types";
import { showAnswer, showDefinition } from "./uiActions";
import { updateCurrentImage } from "./imageActions";

export const getFirestoreCards = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: TYPES.GET_FIRESTORE_CARDS });

  try {
    let response = await firestore.collectionGroup("cards").get();
    let cards = response.docs.map(card => {
      let id = card.id;
      return { ...card.data(), id };
    });
    console.log("Firestore responded with this many cards: ", cards.length);

    dispatch({ type: TYPES.GET_FIRESTORE_CARDS_SUCCESS, payload: cards });
    dispatch(updateCurrentCard());
  } catch (error) {
    dispatch({ type: TYPES.GET_FIRESTORE_CARDS_FAIL, payload: error });
  }
};

export const updateFirestoreCardGrade = condition => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_GRADE });

  try {
    let currentCard = getState().cards.currentCard;
    if (condition === "good" && currentCard.grade < 10) {
      currentCard.grade++;
    }
    if (condition === "bad" && currentCard.grade > 0) {
      currentCard.grade--;
    }

    firestore
      .collection("cards")
      .doc(currentCard.id)
      .set({
        character: currentCard.character,
        definition: currentCard.definition,
        grade: currentCard.grade,
        pronunciation: currentCard.pronunciation
      });

    dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_GRADE_SUCCESS });
    dispatch(showAnswer(false));
    dispatch(showDefinition(false));
    dispatch(updateCurrentCard());
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_GRADE_FAIL, payload: error });
  }
};

export const updateFirestoreCardContent = editedCard => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_CONTENT });

  try {
    firestore
      .collection("cards")
      .doc(editedCard.id)
      .set({
        character: editedCard.character,
        definition: editedCard.definition,
        grade: 0,
        pronunciation: editedCard.pronunciation
      });

    dispatch({
      type: TYPES.UPDATE_FIRESTORE_CARD_CONTENT_SUCCESS,
      payload: { ...editedCard, grade: 0 }
    });
    dispatch(showAnswer(false));
    dispatch(showDefinition(false));
  } catch (error) {
    dispatch({
      type: TYPES.UPDATE_FIRESTORE_CARD_CONTENT_FAIL,
      payload: error
    });
  }
};

const randomCardIndex = cardArrayLength => {
  let randomNumber = Math.floor(Math.random() * cardArrayLength);
  return randomNumber;
};

export const updateCurrentCard = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.UPDATE_CURRENT_CARD });
  try {
    let firestoreCards = getState().cards.cards;

    let currentCard = getState().cards.currentCard;
    if (!currentCard) {
      currentCard = { id: randomCardIndex(firestoreCards.length) };
    }
    let nextCard = {};

    if (currentCard) {
      do {
        nextCard = firestoreCards[randomCardIndex(firestoreCards.length)];
      } while (nextCard.id === currentCard.id);
    }

    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_SUCCESS, payload: nextCard });
    dispatch(updateCurrentImage());
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_FAIL, payload: error });
  }
};
