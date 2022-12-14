import react from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Confirmation = () => {
  const navigation = useNavigation();

  const handleMoveOn = () => {
    //@ts-ignore
    navigation.navigate("plantSelect");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😊</Text>
        <Text style={styles.title}>Prontinho.</Text>
        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas plantinha com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button title="Começar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    padding: 30,
  },

  emoji: {
    textAlign: "center",
    fontSize: 78,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },

  subTitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});

export default Confirmation;
