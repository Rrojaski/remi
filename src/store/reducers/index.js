import { combineReducers } from "redux";
//Reducers
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import cardReducer from "./cardsReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cards: cardReducer
});

export default rootReducer;
