import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  CDFTabParamList,
  FeedStackParamList,
  MenuStackParamList,
  PointStackParamList,
} from "./types";
import Feed from "../screens/filActu/feed";
import Calabar from "../screens/calabar/calabar";
import Points from "../screens/cdf/points";
import EventsF from "../screens/cdf/points";
import Menu from "../screens/menu/menu";
import Clubs from "../screens/menu/clubs";
import Constants from "expo-constants";

const FeedStack = createStackNavigator<FeedStackParamList>();
export const FeedStackNav = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={Feed} />
      {/* <FeedStack.Screen name="Calendrier" component={Feed} />
      <FeedStack.Screen name="AddPost" component={Feed} />
      <FeedStack.Screen name="ModifPost" component={Feed} /> */}
    </FeedStack.Navigator>
  );
};

const CalabarStack = createStackNavigator();
export const CalabarStackNav = () => {
  return (
    <CalabarStack.Navigator>
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
      <CoupeFamillesTab.Screen name="EventsF" component={EventsF} />
    </CoupeFamillesTab.Navigator>
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
      <PointStack.Screen name="AddPoints" component={Points} />
      <PointStack.Screen name="ModifPoints" component={Points} />
    </PointStack.Navigator>
  );
};

const MenuStack = createStackNavigator<MenuStackParamList>();
export const MenuStackNav = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={Menu} />
      {/* <MenuStack.Screen name="Profil" component={Menu} />
      <MenuStack.Screen name="Bureaux" component={Menu} />
      <MenuStack.Screen name="Cartes" component={Menu} />
      <MenuStack.Screen name="Partenariats" component={Menu} /> */}
      <MenuStack.Screen name="Clubs" component={Clubs} />
      {/* <MenuStack.Screen name="BAQ" component={Menu} />
      <MenuStack.Screen name="Notifications" component={Menu} />
      <MenuStack.Screen name="Details" component={Menu} /> */}
    </MenuStack.Navigator>
  );
};
