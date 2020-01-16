import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./src/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import MyApp from "./src/index";

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <MyApp />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
