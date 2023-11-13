import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/connexion/logIn";
import SignUp from "../screens/connexion/signUp";
import { RootStackParamList } from "./types";
import { colors } from "../theme/colors";

const ConnexionStack = createStackNavigator<RootStackParamList>();
export default function ConnexionNav() {
  return (
    <ConnexionStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: colors.primary },
      }}
    >
      <ConnexionStack.Screen name="Connexion" component={LogIn} />
      <ConnexionStack.Screen name="Inscription" component={SignUp} />
    </ConnexionStack.Navigator>
  );
}
