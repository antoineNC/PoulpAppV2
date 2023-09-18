import { Icon } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
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
import GestMembres from "../screens/menu/gestMembres";
import { colors } from "../theme/colors";

export const deconnexion = (navigation: any) => {
  navigation.navigate("Deconnexion");
};

const FeedStack = createStackNavigator<FeedStackParamList>();
export const FeedStackNav = () => {
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      }}
    >
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          title: "Fil d'actualité",
          cardStyle: { backgroundColor: colors.primary },
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
    <CalabarStack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        cardStyle: { backgroundColor: colors.primary },
      }}
    >
      <CalabarStack.Screen name="Calabar" component={Calabar} />
    </CalabarStack.Navigator>
  );
};

const CoupeFamillesTab = createMaterialTopTabNavigator<CDFTabParamList>();
export const CDFTabNav = () => {
  return (
    <CoupeFamillesTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "darkgrey",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
          borderRadius: 10,
        },
        tabBarStyle: {
          marginTop: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: colors.primary,
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
    <FeedFamStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTintColor: "white",
      }}
    >
      <FeedFamStack.Screen
        name="FeedFamille"
        component={FeedFamille}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.primary },
        }}
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
    <PointStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTintColor: "white",
      }}
    >
      <PointStack.Screen
        name="Points"
        component={Points}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.primary },
        }}
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
    <MenuStack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
      }}
    >
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
              <Icon name="sign-out" type="font-awesome" color="white" />
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
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
