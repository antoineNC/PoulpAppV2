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
import ModifPostFamille from "../screens/cdf/modifPostFam";
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
import ClubModif from "../screens/menu/club/clubModif";
import ClubAdd from "../screens/menu/club/clubAdd";
import Partenariats from "../screens/menu/searchPartenariat";
import ParteModif from "../screens/menu/partenariat/parteModif";
import ParteAdd from "../screens/menu/partenariat/parteAdd";
import GestMembres from "../screens/menu/GestMembres";

import Constants from "expo-constants";

export const deconnexion = (navigation: any) => {
  navigation.navigate("Deconnexion");
};

const screenOptions: StackNavigationOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#52234E" },
};

const FeedStack = createStackNavigator<FeedStackParamList>();
export const FeedStackNav = () => {
  return (
    <FeedStack.Navigator screenOptions={screenOptions}>
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          title: "Fil d'actualité",
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
      <FeedStack.Screen
        name="AddPost"
        component={AddPost}
        options={{ title: "Ajouter un nouveau post" }}
      />
      <FeedStack.Screen
        name="ModifPost"
        component={ModifPost}
        options={{ title: "Modifier le post" }}
      />
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
          marginTop: Constants.statusBarHeight,
          elevation: 0,
        },
      }}
    >
      <CoupeFamillesTab.Screen
        name="PointStack"
        component={PointStackNav}
        options={{ title: "Les points" }}
      />
      <CoupeFamillesTab.Screen
        name="FeedFamStack"
        component={FeedFamStackNav}
        options={{ title: "Actu famille" }}
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
      <FeedFamStack.Screen
        name="ModifPostFamille"
        component={ModifPostFamille}
        options={{ headerStatusBarHeight: 0, title: "Modifier le post" }}
      />
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
      <PointStack.Screen
        name="AddPoints"
        component={AddPoints}
        options={{ headerStatusBarHeight: 0, title: "Ajouter des points" }}
      />
      <PointStack.Screen
        name="ModifPoints"
        component={ModifPoints}
        options={{ headerStatusBarHeight: 0, title: "Modifer les points" }}
      />
    </PointStack.Navigator>
  );
};

const MenuStack = createStackNavigator<MenuStackParamList>();
export const MenuStackNav = () => {
  return (
    <MenuStack.Navigator screenOptions={screenOptions}>
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
      <MenuStack.Screen
        name="BureauProfil"
        component={BureauProfil}
        options={{ title: "Profil du bureau" }}
      />
      <MenuStack.Screen name="Bureaux" component={Bureaux} />
      <MenuStack.Screen
        name="Cartes"
        component={Cartes}
        options={{ title: "Cartes d'adhésions" }}
      />
      <MenuStack.Screen name="Partenariats" component={Partenariats} />
      <MenuStack.Screen name="Clubs" component={Clubs} />
      <MenuStack.Screen
        name="ClubModif"
        component={ClubModif}
        options={{ title: "Modifier le club" }}
      />
      <MenuStack.Screen
        name="ClubAdd"
        component={ClubAdd}
        options={{ title: "Ajouter un club" }}
      />
      <MenuStack.Screen
        name="ParteModif"
        component={ParteModif}
        options={{ title: "Modifier le partenariat" }}
      />
      <MenuStack.Screen
        name="ParteAdd"
        component={ParteAdd}
        options={{ title: "Ajouter un partenariat" }}
      />
      <MenuStack.Screen
        name="GestMembres"
        component={GestMembres}
        options={{ title: "Gérer les membres" }}
      />
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
