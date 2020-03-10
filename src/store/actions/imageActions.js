import * as TYPES from "../types";
import axios from "axios";

const randomIndex = arrayLength => {
  let randomNumber = Math.floor(Math.random() * arrayLength);
  return randomNumber;
};

export const getImage = () => async (dispatch, getState) => {
  let currentDefinition = getState().cards.currentCard.definition;

  const baseUrl =
    "https://api.unsplash.com/search/photos?client_id=kpIGOlzK2GGf7tk4ZSQk83V46nb3r_YHcXPdW2-DVDE&query=";
  dispatch({ type: TYPES.GET_IMAGES });

  try {
    await axios.get(baseUrl + currentDefinition).then(data => {
      let resultLength = data.data.results.length;

      let nextImageUrl = data.data.results[randomIndex(resultLength)].urls.raw;

      dispatch({
        type: TYPES.GET_IMAGES_SUCCESS,
        payload: nextImageUrl
      });
    });
  } catch (error) {
    dispatch({ type: TYPES.GET_IMAGES_FAIL, payload: error });
  }
};
