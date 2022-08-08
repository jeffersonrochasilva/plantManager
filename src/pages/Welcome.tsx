import React from "react";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  // Dimensions,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import regagemImg from "../assets/watering.png";

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"} suas plantas de{"\n"} forma fácil
        </Text>
        <Image source={regagemImg} style={styles.image} />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas platas. Nós cuidamos sempre de lembrar
          você sempre que precisar.
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Entypo name="chevron-thin-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  image: {
    width: 292,
    height: 284,
  },
  button: {
    backgroundColor: "#32B768",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    fontSize: 52,
    color: colors.white,
  },
});
