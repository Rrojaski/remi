import * as TYPES from "../types";

export const showAnswer = isShowAnswer => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.UPDATE_SHOW_ANSWER, payload: true });
  try {
    dispatch({ type: TYPES.UPDATE_SHOW_ANSWER_SUCCESS, payload: isShowAnswer });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_SHOW_ANSWER_FAIL, payload: error });
  }
};

export const showDefinition = isShowDefinition => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.UPDATE_SHOW_DEFINITION });
  try {
    dispatch({
      type: TYPES.UPDATE_SHOW_DEFINITION_SUCCESS,
      payload: isShowDefinition
    });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_SHOW_DEFINITION_FAIL, payload: error });
  }
};
