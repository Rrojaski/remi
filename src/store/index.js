import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getFirebase, createFirebaseInstance } from "react-redux-firebase";
import {
  getFirestore,
  createFirestoreInstance,
  reduxFirestore
} from "redux-firestore";
import rootReducer from "./reducers";
import firebase from "../api/Firebase/Firebase";

const enhancers = [];

if (window && window.location && window.location.hostname === "localhost") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const middleware = [
  thunk.withExtraArgument({ getFirebase, getFirestore })
  // This is where you add other middleware like redux-observable
];

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const initialState = window.___INITIAL_STATE__ || {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxFirestore(firebase, rrfConfig),
    ...enhancers
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
  createFirebaseInstance
};

export { store, rrfProps };
