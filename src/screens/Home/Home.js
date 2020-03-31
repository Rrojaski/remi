import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import Panda from "../../assets/images/panda.png";
import Icon from "react-native-vector-icons/FontAwesome";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={Panda} />
      <Text style={styles.logoText}>Welcome To Remi</Text>
      <Button
        buttonStyle={styles.button}
        icon={<Icon name="play" size={30} color="#fff" />}
        onPress={() => navigation.navigate("Study")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
    paddingTop: "5%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  logoImage: {
    resizeMode: "contain",
    maxHeight: "50%"
  },
  logoText: {
    color: "#fff",
    marginTop: 20,
    marginBottom: 50,
    fontSize: 30
  },
  button: {
    width: 60
  }
});

export default Home;
