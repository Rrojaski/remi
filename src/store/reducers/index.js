import { combineReducers } from "redux";
//Reducers
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import cardReducer from "./cardsReducer";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cards: cardReducer,
  images: imageReducer
});

export default rootReducer;
