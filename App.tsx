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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    sessionId: "",
    isAdmin: 2,
  });
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState("login");

  // Handle user state changes
  function Observer(user: User | null) {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUser(user);
    } else {
      // User is signed out
    }
  }

  useEffect(() => {
    return onAuthStateChanged(firestoreService.auth, Observer);
  }, []);

  if (isLogged === "login") {
    return <Login setIsLogged={setIsLogged} />;
  } else if (isLogged === "signup") {
    return <SignUp setIsLogged={setIsLogged} />;
  } else if (isLogged === "logged") {
    return (
      <NavigationContainer>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={colors.primary}
          />
          <HomeTabNav />
        </CurrentUserContext.Provider>
      </NavigationContainer>
    );
  }
}
