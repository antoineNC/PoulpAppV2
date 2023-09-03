import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import ConnexionNav from "./navigation/connexionNav";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} backgroundColor={"#52234E"} />
      <ConnexionNav />
    </NavigationContainer>
  );
}
