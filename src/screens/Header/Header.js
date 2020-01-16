import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold"
        }}
      >
        REMI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
    height: 80,
    marginBottom: 40
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
