import * as TYPES from "../types";

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
    console.log("Firestore responsed with this many cards: ", cards.length);

    dispatch({ type: TYPES.GET_FIRESTORE_CARDS_SUCCESS, payload: cards });
  } catch (error) {
    dispatch({ type: TYPES.GET_FIRESTORE_CARDS_FAIL, payload: error });
  }
};

export const updateFirestoreCard = card => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD });
  try {
    firestore
      .collection("cards")
      .doc(card.id)
      .set({
        character: card.character,
        definition: card.definition,
        grade: card.grade,
        pronunciation: card.pronunciation
      });
    dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_SUCCESS });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_FIRESTORE_CARD_FAIL, payload: error });
  }
};

const randomCardIndex = cardArrayLength => {
  let randomNumber = Math.floor(Math.random() * cardArrayLength);
  return randomNumber;
};

export const updateCurrentCard = card => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log("updaing current card");

  dispatch({ type: TYPES.UPDATE_CURRENT_CARD });
  try {
    let firestoreCards = getState().cards.cards;
    console.log("getting currentCard");

    let currentCard = getState().cards.currentCard;
    if (!currentCard) {
      currentCard = { id: randomCardIndex(firestoreCards.length) };
    }
    console.log("currentCard: ", currentCard);
    let nextCard = {};

    if (currentCard) {
      do {
        nextCard = firestoreCards[randomCardIndex(firestoreCards.length)];
      } while (nextCard.id === currentCard.id);
    }

    console.log("nextCard: ", nextCard);

    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_SUCCESS, payload: nextCard });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_FAIL, payload: error });
  }
};
