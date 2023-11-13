import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { Icon } from "@rneui/themed";
import { colors } from "../../theme/colors";
import firestoreService from "../../service/firestore.service";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogIn(props: { setIsLogged: (state: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);

  const signIn = () => {
    // Vérifications d'usage
    if (email == "" || password == "") {
      Alert.alert("Champs vide", "Un ou plusieurs champs sont vides.");
    } else {
      // S'il n'y a pas d'erreur, on fait appel au service d'authentification de firebase depuis le firestoreService
      // try {
      firestoreService
        .LogIn(email, password)
        // Si l'authentification fonctionne, on navigue vers l'écran du fil d'actualité
        .then((res) => {
          if (res === true) props.setIsLogged("logged");
        });
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../image/logo.png")}
            style={styles.image}
          />
          <Text style={styles.nameApp}>La Poulp'App</Text>
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="user"
            type="antdesign"
            color="#52234E"
          />
          <TextInput
            placeholder="email"
            style={{ width: 190 }}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="key"
            type="entypo"
            color="#52234E"
          />
          <TextInput
            placeholder="mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Elève</Text>
          <Switch
            value={user}
            onValueChange={() => setUser((previousState) => !previousState)}
          />
          <Text>Admin</Text>
        </View>

        <TouchableOpacity onPress={signIn} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => props.setIsLogged("signup")}>
            <Text style={{ color: colors.cyan }}>Je m'inscris !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  nameApp: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    height: 100,
    resizeMode: "center",
    marginVertical: 30,
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 280,
  },
  appButtonContainer: {
    margin: 30,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    columnGap: 10,
    backgroundColor: colors.primary,
    elevation: 3, //android
    shadowOpacity: 0.2, //ios
  },
  btnTxt: { color: "#fff", fontWeight: "bold" },
});
