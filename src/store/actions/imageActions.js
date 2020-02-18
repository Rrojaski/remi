import * as TYPES from "../types";
import axios from "axios";

export const getImages = searchString => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log("reacieved", searchString);

  const baseUrl =
    "https://api.unsplash.com/search/photos?client_id=kpIGOlzK2GGf7tk4ZSQk83V46nb3r_YHcXPdW2-DVDE&query=";
  dispatch({ type: TYPES.GET_IMAGES });

  try {
    axios.get(baseUrl + searchString).then(response => {
      console.log(response.data.results.length);

      dispatch({
        type: TYPES.GET_IMAGES_SUCCESS,
        payload: response.data.results
      });
    });
  } catch (error) {
    console.log(error);

    dispatch({ type: TYPES.GET_IMAGES_FAIL, peyload: error });
  }
};
