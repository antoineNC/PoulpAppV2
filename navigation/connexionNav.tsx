import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/connexion/logIn";
import SignUp from "../screens/connexion/signUp";
import HomeTabNav from "./homeTabNav";
import { RootStackParamList } from "./types";
import LogOut from "../screens/connexion/logOut";
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
      <ConnexionStack.Screen
        name="Deconnexion"
        component={LogOut}
        options={{ headerLeft: () => null }}
      />
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
