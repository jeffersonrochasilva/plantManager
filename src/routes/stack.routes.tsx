import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import colors from "../styles/colors";

import { Welcome } from "../pages/Welcome";
import Confirmation from "../pages/Confirmation";
import UserIdentification from "../pages/UserIdentification";
import plantSelect from "../pages/PlantSelect";
import PlantSave from "../pages/PlantSave";

const stackRoutes = createStackNavigator();

const appRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      //@ts-ignore
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <stackRoutes.Screen name="Welcome" component={Welcome} />

      <stackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification}
      />

      <stackRoutes.Screen name="Confirmation" component={Confirmation} />

      <stackRoutes.Screen name="plantSelect" component={plantSelect} />

      <stackRoutes.Screen name="PlantSave" component={PlantSave} />
    </stackRoutes.Navigator>
  );
};

export default appRoutes;
