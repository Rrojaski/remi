import * as TYPES from "../types";
import axios from "axios";

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

export const getForvoAudio = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const currentCharacter = getState().cards.currentCard.character.trim();

  const url = `https://apifree.forvo.com/action/word-pronunciations/format/json/id_lang_speak/186/word/${currentCharacter}/key/b480ecdd8f526eaa76a751ee0cf811f0`;

  dispatch({ type: TYPES.GET_FORVO_AUDIO });

  try {
    await axios.get(url).then(data => {
      const chineseOnly = [];
      data.data.items.forEach(item => {
        if (item.country.toLowerCase() === "china") {
          chineseOnly.push(item);
        }
      });

      let nextAudioString = chineseOnly[0].pathmp3;

      dispatch({
        type: TYPES.GET_FORVO_AUDIO_SUCCESS,
        payload: nextAudioString
      });
    });
  } catch (error) {
    dispatch({ type: TYPES.GET_FORVO_AUDIO_FAIL, payload: error });
  }
};

export const updateVideoPaused = boolean => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: TYPES.UPDATE_VIDEO_PAUSED });

  try {
    dispatch({
      type: TYPES.UPDATE_VIDEO_PAUSED_SUCCESS,
      payload: boolean
    });
  } catch (error) {
    dispatch({ type: UPDATE_VIDEO_PAUSED_FAIL, payload: error });
  }
};
