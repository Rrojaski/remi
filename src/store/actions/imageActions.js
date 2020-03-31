import * as TYPES from "../types";
import axios from "axios";

export const updateCurrentImage = () => async (dispatch, getState) => {
  let currentDefinition = getState().cards.currentCard.definition;

  const baseUrl =
    "https://api.unsplash.com/photos/random?client_id=kpIGOlzK2GGf7tk4ZSQk83V46nb3r_YHcXPdW2-DVDE&query=";

  dispatch({ type: TYPES.GET_IMAGE });

  try {
    await axios.get(baseUrl + currentDefinition).then(data => {
      let nextImageUrl = data.data.urls.raw;

      dispatch({
        type: TYPES.GET_IMAGE_SUCCESS,
        payload: nextImageUrl
      });
    });
  } catch (error) {
    dispatch({ type: TYPES.GET_IMAGE_FAIL, payload: error });
  }
};
