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
  dispatch({ type: UPDATE_FIRESTORE_CARD_CARD });
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

export const updateCurrentCard = card => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.UPDATE_CURRENT_CARD });
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
    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_SUCCESS });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_CURRENT_CARD_FAIL, payload: error });
  }
};
