import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import Home from './screens/Home/Home'
import Study from './screens/Study/Study'

const App = () => {
  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{title: "REMI"}}/>
            <Stack.Screen name="Study" component={Study} />
        </Stack.Navigator>
  );
};

export default App
