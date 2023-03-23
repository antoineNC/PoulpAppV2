import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import ConnexionNav from "./navigation/connexionNav";

export default function App() {
  return (
    <NavigationContainer>
      <ConnexionNav />
    </NavigationContainer>
  );
}
