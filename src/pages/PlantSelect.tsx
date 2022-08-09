import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../styles/colors";

import Header from "../components/Header";
import fonts from "../styles/fonts";
import EnviromentButton from "../components/EnviromentButton";
import api from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

const plantSelect = () => {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected, setEnviromentsSelected] = useState("all");

  const handleEnviromentsSelected = (environment: string) => {
    setEnviromentsSelected(environment);
  };

  const getList = async () => {
    try {
      const { data } = await api.get(
        "/plants_environments?_sort=title&-order=asc"
      );
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
    getListPlant();
  }, []);

  const getListPlant = async () => {
    try {
      const { data } = await api.get("plants?_sort=name&-order=asc");
      setPlants(data);
    } catch (e) {
      console.log(e);
    }
  };

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
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentsSelected(item.key)}
            />
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={plants}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
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
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});

export default plantSelect;
