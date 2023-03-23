import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/connexion/logIn";
import SignUp from "../screens/connexion/signUp";
import HomeTabNav from "./homeTabNav";
import { RootStackParamList } from "./types";

const ConnexionStack = createStackNavigator<RootStackParamList>();
export default function ConnexionNav() {
  return (
    <ConnexionStack.Navigator>
      <ConnexionStack.Screen name="Connexion" component={LogIn} />
      <ConnexionStack.Screen name="Inscription" component={SignUp} />
      <ConnexionStack.Screen
        name="Home"
        component={HomeTabNav}
        options={{
          headerShown: false,
        }}
      />
    </ConnexionStack.Navigator>
  );
}
