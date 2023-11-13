import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/connexion/logIn";
import HomeTabNav from "./navigation/homeTabNav";
import { StatusBar } from "react-native";
import { CurrentUserContext } from "./service/context";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { colors } from "./theme/colors";
import firestoreService from "./service/firestore.service";
import { User, onAuthStateChanged } from "firebase/auth";
import SignUp from "./screens/connexion/signUp";
import ConnexionNav from "./navigation/connexionNav";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [currentUser, setCurrentUser] = useState<{
    sessionId: string;
    isAdmin: number;
    user: User | null;
  }>({
    sessionId: "",
    isAdmin: 2,
    user: null,
  });

  useEffect(() => {
    onAuthStateChanged(firestoreService.auth, (user) => {
      if (user) {
        console.log("user", user.uid, "vérifié", user.emailVerified);
        setCurrentUser({ ...currentUser, user: user });
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.primary}
        />
        {currentUser.user ? <HomeTabNav /> : <ConnexionNav />}
      </CurrentUserContext.Provider>
    </NavigationContainer>
  );
}
