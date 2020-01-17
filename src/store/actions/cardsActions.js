import * as TYPES from "../types";

export const getCards = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: TYPES.GET_CARDS });

  try {
    let response = await firestore.collectionGroup("cards").get();
    let cards = response.docs.map(card => {
      let id = card.id;
      return { ...card.data(), id };
    });

    console.log(cards, "Jennifer Lopez found these cards!");

    dispatch({ type: TYPES.GET_CARDS_SUCCESS, payload: cards });
  } catch (error) {
    dispatch({ type: TYPES.GET_CARDS_FAIL, payload: error });
  }
};
