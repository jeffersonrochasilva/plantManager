import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../styles/colors";

import Header from "../components/Header";
import fonts from "../styles/fonts";
import EnviromentButton from "../components/EnviromentButton";
import api from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";

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
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected, setEnviromentsSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const handleEnviromentsSelected = (environment: string) => {
    setEnviromentsSelected(environment);
    console.log(environment, "environment");
    if (environment === "all") return setFilteredPlants(plants);
    console.log(plants, "plants");

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    console.log(filtered, "filtered");
    setFilteredPlants(filtered);
  };

  const getList = async () => {
    try {
      const { data } = await api.get(
        `/plants_environments?_sort=title&-order=asc&_page=${page}&_limit=8`
      );
      console.log("data: ", data);
      setEnviroments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
      setLoading(false);
    } catch (error: any) {
      console.log("error.response", error);
    }
  };

  const getListPlant = async () => {
    try {
      const { data } = await api.get(`plants?_sort=name&-order=asc`);
      if (!data) {
        return setLoading(true);
      }
      if (page > 1) {
        setPlants((oldValue) => [...oldValue, ...data]);
        setFilteredPlants((oldValue) => [...oldValue, ...data]);
      } else {
        setPlants(data);
        setFilteredPlants(data);
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (e) {
      console.log(e);
    }
  };

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    getListPlant();
  }

  useEffect(() => {
    getList();
    getListPlant();
  }, []);

  if (loading) return <Load />;

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
          data={filteredPlants}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
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
