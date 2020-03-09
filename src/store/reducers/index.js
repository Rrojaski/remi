import { combineReducers } from "redux";
//Reducers
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import cardReducer from "./cardsReducer";
import imageReducer from "./imageReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cards: cardReducer,
  images: imageReducer,
  ui: uiReducer
});

export default rootReducer;
