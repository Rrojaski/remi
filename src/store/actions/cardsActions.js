import * as TYPES from "../types";

export const getCards = async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.GET_CARDS });
};
