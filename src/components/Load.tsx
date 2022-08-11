import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Lottie from "lottie-react-native";

import loadAnimation from "../assets/load.json";
import colors from "../styles/colors";

const Load = () => {
  return (
    <View style={styles.container}>
      {/* <Lottie
        source={require("../assets/load.json")}
        autoPlay
        loop
        style={styles.animation}
      /> */}
      <Text style={styles.animations}>Carregando....!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    backgroundColor: "transparent",
    width: 200,
    height: 200,
  },
  animations: {
    color: colors.green,
    fontSize: 16,
  },
});

export { Load };
