import { StackScreenProps } from "@react-navigation/stack";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Post } from "../service/collecInterface";

export type RootStackParamList = {
  Connexion: undefined;
  Inscription: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
};

export type HomeTabParamList = {
  FeedStack: NavigatorScreenParams<FeedStackParamList>;
  CalabarTab: undefined;
  CDFStack: NavigatorScreenParams<CDFTabParamList>;
  MenuStack: NavigatorScreenParams<MenuStackParamList>;
};

export type FeedStackParamList = {
  Feed: undefined;
  Calendrier: undefined;
  AddPost: undefined;
  ModifPost: { post: Post };
};

export type CDFTabParamList = {
  PointStack: NavigatorScreenParams<PointStackParamList>;
  EventsF: undefined;
};

export type PointStackParamList = {
  Points: undefined;
  AddPoints: undefined;
  ModifPoints: undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
  Profil: undefined;
  //   GererMesPosts: undefined;
  Partenariats: undefined;
  //   Partenariat: Partenariat;
  Bureaux: undefined;
  //   ModifAsso: Asso;
  Cartes: undefined;
  Clubs: undefined;
  //   Club: Club;
  BAQ: undefined;
  Notifications: undefined;
  Details: undefined;
};

export type SignUpScreenNavProp = StackScreenProps<
  RootStackParamList,
  "Inscription"
>;
export type LoginScreenNavProp = StackScreenProps<
  RootStackParamList,
  "Connexion"
>;

// nécessaire pour pouvoir naviguer vers Connexion ou Inscription
export type FeedScreenNavProp = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, "Feed">,
  BottomTabScreenProps<HomeTabParamList>
>;

export type MenuScreenNavProp = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, "Menu">,
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList>,
    StackScreenProps<RootStackParamList>
  >
>;
export type ClubsScreenNavProp = StackScreenProps<MenuStackParamList, "Clubs">;

export type CalabarScreenNavProp = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, "CalabarTab">,
  StackScreenProps<RootStackParamList>
>;
