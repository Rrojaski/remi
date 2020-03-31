import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import Home from "./screens/Home/Home";
import Study from "./screens/Study/Study";
import CardEdit from "./screens/CardEdit/CardEdit";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#1f1f1f"
          },
          title: "REMI"
        }}
      />
      <Stack.Screen
        name="Study"
        component={Study}
        options={({ navigation }) => ({
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#1f1f1f"
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Button
                type="clear"
                icon={<Icon name="edit" size={30} color="blue" />}
                onPress={() => navigation.navigate("Card Edit")}
              />
            </View>
          )
        })}
      />
      <Stack.Screen
        name="Card Edit"
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#1f1f1f"
          }
        }}
        component={CardEdit}
      />
    </Stack.Navigator>
  );
};

export default App;
