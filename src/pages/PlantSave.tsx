import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/core";
import DateTimePiker, { Event } from "@react-native-community/datetimepicker";
import waterdrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { State } from "react-native-gesture-handler";
import { isBefore, format } from "date-fns";

interface Params {
  plant: {
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
  };
}

const PlantSave = () => {
  const [selectedDatatime, setSelectedDatatime] = useState(new Date());
  const [showDataPicker, setShowDataPicker] = useState(Platform.OS === "ios");
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDataPicker((oldState) => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDatatime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⏰");
    }

    if (dateTime) setSelectedDatatime(dateTime);
  }
  function handleOpenDateTimePickerForAndroid() {
    setShowDataPicker((oldState) => !oldState);
  }
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <Image source={plant.photo} style={styles.tipImage} />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alerLabel}>
          Escolha o melhor horario para ser lembrado:
        </Text>

        {showDataPicker && (
          <DateTimePiker
            value={selectedDatatime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}
        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dataTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>{`Mudar ${format(
              selectedDatatime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}
        <Button title="Cadastrar planta" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },

  plantInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: colors.shape,
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },

  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },

  alerLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dataTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

export default PlantSave;
