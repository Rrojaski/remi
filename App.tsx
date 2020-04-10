import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./src/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import MyApp from "./src/index";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <MyApp />
        </ReactReduxFirebaseProvider>
      </Provider>
    </NavigationContainer>
  );
}
