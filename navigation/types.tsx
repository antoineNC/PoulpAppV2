import { StackScreenProps } from "@react-navigation/stack";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { Club, Points, Post } from "../service/collecInterface";

//======PARAM LIST=======
export type RootStackParamList = {
  Connexion: { reconnect?: boolean };
  Inscription: undefined;
  Deconnexion: undefined;
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
  FeedFamStack: NavigatorScreenParams<FeedFamStackParamList>;
};

export type FeedFamStackParamList = {
  FeedFamille: undefined;
  AddPost: undefined;
  ModifPostFamille: { post: Post };
};

export type PointStackParamList = {
  Points: undefined;
  AddPoints: undefined;
  ModifPoints: { points: Points };
};

export type MenuStackParamList = {
  Menu: undefined;
  BureauProfil: { idBureau: "BDE" | "BDS" | "BDA" | "JE" };
  //   GererMesPosts: undefined;
  Partenariats: undefined;
  //   Partenariat: Partenariat;
  Bureaux: undefined;

  Cartes: undefined;
  Clubs: undefined;
  ClubModif: { club: Club };
  ClubAdd: { idBureau: string };
  BAQ: undefined;
  Notifications: undefined;
  Details: undefined;
};
//=======================

//=======NAVIGATION PROPS========

// ConnexionStack
export type SignUpScreenNavProp = StackScreenProps<
  RootStackParamList,
  "Inscription"
>;
export type LoginScreenNavProp = StackScreenProps<
  RootStackParamList,
  "Connexion"
>;
export type DecoScreenNavProp = StackScreenProps<
  RootStackParamList,
  "Deconnexion"
>;

// FeedStack
export type FeedScreenNavProp = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, "Feed">,
  BottomTabScreenProps<HomeTabParamList>
>;
export type CalScreenNP = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, "Calendrier">,
  BottomTabScreenProps<HomeTabParamList>
>;
export type AddPostScreenNP = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, "AddPost">,
  BottomTabScreenProps<HomeTabParamList>
>;
export type ModifPostScreenNP = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, "ModifPost">,
  BottomTabScreenProps<HomeTabParamList>
>;

// CalabarStack
export type CalabarScreenNavProp = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, "CalabarTab">,
  StackScreenProps<RootStackParamList>
>;

// CDFTab - Points
export type PointScreenNavProp = CompositeScreenProps<
  StackScreenProps<PointStackParamList, "Points">,
  MaterialTopTabScreenProps<CDFTabParamList>
>;
export type AddPointScreenNavProp = CompositeScreenProps<
  StackScreenProps<PointStackParamList, "AddPoints">,
  MaterialTopTabScreenProps<CDFTabParamList>
>;
export type ModifPointScreenNavProp = CompositeScreenProps<
  StackScreenProps<PointStackParamList, "ModifPoints">,
  MaterialTopTabScreenProps<CDFTabParamList>
>;
// CDFTab - FeedFamille
export type FeedFamScreenNavProps = CompositeScreenProps<
  StackScreenProps<FeedFamStackParamList, "FeedFamille">,
  MaterialTopTabScreenProps<CDFTabParamList>
>;
export type ModifPostScreenNavProp = CompositeScreenProps<
  StackScreenProps<FeedFamStackParamList, "ModifPostFamille">,
  MaterialTopTabScreenProps<CDFTabParamList>
>;

// MenuStack
export type MenuScreenNavProp = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, "Menu">,
  CompositeScreenProps<
    // nécessaire pour pouvoir naviguer vers Connexion ou Inscription
    BottomTabScreenProps<HomeTabParamList>,
    StackScreenProps<RootStackParamList>
  >
>;
export type BureauxScreenNavProp = StackScreenProps<
  MenuStackParamList,
  "Bureaux"
>;
export type BureauProfilNavProp = StackScreenProps<
  MenuStackParamList,
  "BureauProfil"
>;
export type ClubsScreenNavProp = StackScreenProps<MenuStackParamList, "Clubs">;
export type ClubModifProps = StackScreenProps<MenuStackParamList, "ClubModif">;
export type ClubAddProps = StackScreenProps<MenuStackParamList, "ClubAdd">;
