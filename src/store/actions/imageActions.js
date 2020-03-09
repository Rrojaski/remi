import * as TYPES from "../types";
import axios from "axios";

export const getImage = searchString => async (dispatch, getState) => {
  let { cards } = getState();
  const baseUrl =
    "https://api.unsplash.com/search/photos?client_id=kpIGOlzK2GGf7tk4ZSQk83V46nb3r_YHcXPdW2-DVDE&query=";
  dispatch({ type: TYPES.GET_IMAGES });
  console.log("reacieved", searchString);

  try {
    console.log(baseUrl + searchString);

    await axios.get(baseUrl + searchString).then(data => {
      console.log(data.data.length);
      dispatch({
        type: TYPES.GET_IMAGES_SUCCESS,
        payload: data.data.results
      });
    });
  } catch (error) {
    dispatch({ type: TYPES.GET_IMAGES_FAIL, payload: error });
  }
};
