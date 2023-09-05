import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import ConnexionNav from "./navigation/connexionNav";
import { StatusBar } from "react-native";
import { CurrentUserContext } from "./service/context";
import { useState } from "react";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    sessionId: "",
    isAdmin: 2,
  });
  return (
    <NavigationContainer>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <StatusBar barStyle={"light-content"} backgroundColor={"#52234E"} />
        <ConnexionNav />
      </CurrentUserContext.Provider>
    </NavigationContainer>
  );
}
