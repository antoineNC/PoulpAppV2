import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabNav from "./navigation/homeTabNav";
import ConnexionNav from "./navigation/connexionNav";
import { CurrentUserContext } from "./service/context";
import * as Notifications from "expo-notifications";
import { colors } from "./theme/colors";
import firestoreService from "./service/firestore.service";
import { User, onAuthStateChanged } from "firebase/auth";

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
        console.log("user UID", user.uid, "vérifié?", user.emailVerified);
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
