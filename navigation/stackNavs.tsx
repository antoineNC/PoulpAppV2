import { Icon } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  CDFTabParamList,
  FeedStackParamList,
  MenuStackParamList,
  PointStackParamList,
  FeedFamStackParamList,
} from "./types";
import Feed from "../screens/filActu/feed";
import AddPost from "../screens/filActu/addPost";
import ModifPost from "../screens/filActu/modifPost";
import Calendrier from "../screens/filActu/calendrier";
import Calabar from "../screens/calabar/calabar";
import Points from "../screens/cdf/points";
import AddPoints from "../screens/cdf/addPoint";
import ModifPoints from "../screens/cdf/modifPoint";
import FeedFamille from "../screens/cdf/feedFam";
import Menu from "../screens/menu/menu";
import Bureaux from "../screens/menu/bureaux";
import BureauProfil from "../screens/menu/bureauProfil";
import Cartes from "../screens/menu/cartes";
import Clubs from "../screens/menu/searchClub";
import Partenariats from "../screens/menu/searchPartenariat";

import Constants from "expo-constants";

export const deconnexion = (navigation: any) => {
  navigation.navigate("Deconnexion");
};

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const FeedStack = createStackNavigator<FeedStackParamList>();
export const FeedStackNav = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Calendrier")}
              style={styles.buttonCalendar}
            >
              <Icon name="calendar" type="font-awesome" color="#fff" />
              <Text
                style={{
                  fontSize: 10,
                  color: "white",
                  textAlignVertical: "bottom",
                }}
              >
                Calendrier
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <FeedStack.Screen name="Calendrier" component={Calendrier} />
      <FeedStack.Screen name="AddPost" component={AddPost} />
      <FeedStack.Screen name="ModifPost" component={ModifPost} />
    </FeedStack.Navigator>
  );
};

const CalabarStack = createStackNavigator();
export const CalabarStackNav = () => {
  return (
    <CalabarStack.Navigator screenOptions={screenOptions}>
      <CalabarStack.Screen name="Calabar" component={Calabar} />
    </CalabarStack.Navigator>
  );
};

const CoupeFamillesTab = createMaterialTopTabNavigator<CDFTabParamList>();
export const CDFTabNav = () => {
  return (
    <CoupeFamillesTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#52234E" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "darkgrey",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
          backgroundColor: "#52234E",
          padding: 7,
          paddingHorizontal: 15,
          borderRadius: 10,
        },
        tabBarStyle: {
          height: 60,
          marginTop: Constants.statusBarHeight,
          elevation: 0,
        },
      }}
    >
      <CoupeFamillesTab.Screen name="PointStack" component={PointStackNav} />
      <CoupeFamillesTab.Screen
        name="FeedFamStack"
        component={FeedFamStackNav}
      />
    </CoupeFamillesTab.Navigator>
  );
};

const FeedFamStack = createStackNavigator<FeedFamStackParamList>();
export const FeedFamStackNav = () => {
  return (
    <FeedFamStack.Navigator>
      <FeedFamStack.Screen
        name="FeedFamille"
        component={FeedFamille}
        options={{ headerShown: false }}
      />
      <FeedFamStack.Screen name="ModifPost" component={ModifPost} />
    </FeedFamStack.Navigator>
  );
};

const PointStack = createStackNavigator<PointStackParamList>();
export const PointStackNav = () => {
  return (
    <PointStack.Navigator>
      <PointStack.Screen
        name="Points"
        component={Points}
        options={{ headerShown: false }}
      />
      <PointStack.Screen name="AddPoints" component={AddPoints} />
      <PointStack.Screen name="ModifPoints" component={ModifPoints} />
    </PointStack.Navigator>
  );
};

const MenuStack = createStackNavigator<MenuStackParamList>();
export const MenuStackNav = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => deconnexion(navigation)}
              style={styles.quitButton}
            >
              <Icon name="sign-out" type="font-awesome" color="#52234E" />
            </TouchableOpacity>
          ),
        })}
      />
      <MenuStack.Screen name="BureauProfil" component={BureauProfil} />
      <MenuStack.Screen name="Bureaux" component={Bureaux} />
      <MenuStack.Screen name="Cartes" component={Cartes} />
      <MenuStack.Screen name="Partenariats" component={Partenariats} />
      <MenuStack.Screen name="Clubs" component={Clubs} />
      {/* <MenuStack.Screen name="BAQ" component={Menu} /> */}
      {/* <MenuStack.Screen name="Notifications" component={Menu} /> */}
      {/* <MenuStack.Screen name="Details" component={Menu} /> */}
    </MenuStack.Navigator>
  );
};

const styles = StyleSheet.create({
  quitButton: {
    margin: 10,
    width: 50,
    borderRadius: 10,
  },
  buttonCalendar: {
    justifyContent: "space-between",
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
