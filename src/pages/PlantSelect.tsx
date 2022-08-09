import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../styles/colors";

import Header from "../components/Header";
import fonts from "../styles/fonts";
import EnviromentButton from "../components/EnviromentButton";
import api from "../services/api";

interface EnviromentProps {
  key: string;
  title: string;
}

const plantSelect = () => {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);

  const getList = async () => {
    try {
      const { data } = await api.get("plants_environments");
      console.log("data: ", data);
      setEnviroments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    } catch (error: any) {
      console.log("error.response", error);
    }
  };
  useEffect(() => {
    // console.log("teste");
    getList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>Você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item }) => <EnviromentButton title={item.title} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
});

export default plantSelect;
