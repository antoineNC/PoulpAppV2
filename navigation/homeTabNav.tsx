import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import {
  FeedStackNav,
  CalabarStackNav,
  CDFTabNav,
  MenuStackNav,
} from "./stackNavs";
import { HomeTabParamList } from "./types";

const HomeTab = createBottomTabNavigator<HomeTabParamList>();
export default function HomeTabNav() {
  return (
    <HomeTab.Navigator
      id="home"
      initialRouteName="FeedStack"
      sceneContainerStyle={{ backgroundColor: "#52234E" }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#52234E",
        tabBarInactiveTintColor: "dimgrey",
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarStyle: { borderTopWidth: 0, height: 60 },
      }}
    >
      <HomeTab.Screen
        name="FeedStack"
        component={FeedStackNav}
        options={{
          tabBarLabel: "Fil d'actualité",
          tabBarIcon: (props) => (
            <Icon
              name="users"
              type="font-awesome"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="CalabarTab"
        component={CalabarStackNav}
        options={{
          tabBarLabel: "Calabar",
          tabBarIcon: (props) => (
            <Icon
              name="beer"
              type="ionicon"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
      <HomeTab.Screen
        name="CDFStack"
        component={CDFTabNav}
        options={() => ({
          tabBarLabel: "Coupe des familles",
          tabBarIcon: (props) => (
            <Icon
              name="trophy"
              type="font-awesome"
              color={props.color}
              size={props.size}
            />
          ),
        })}
      />
      <HomeTab.Screen
        name="MenuStack"
        component={MenuStackNav}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: (props) => (
            <Icon
              name="more-horizontal"
              type="feather"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}
