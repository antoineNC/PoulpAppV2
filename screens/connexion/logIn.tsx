import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { colors } from "../../theme/colors";
import firestoreService from "../../service/firestore.service";
import { LoginScreenNavProp } from "../../navigation/types";
import { signOut } from "firebase/auth";
import { CurrentUserContext } from "../../service/context";

export default function LogIn({ navigation }: LoginScreenNavProp) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    // Vérifications d'usage
    if (email == "" || password == "") {
      Alert.alert("Champs vide", "Un ou plusieurs champs sont vides.");
    } else {
      setLoading(true);
      // S'il n'y a pas d'erreur, on fait appel au service d'authentification de firebase depuis le firestoreService
      firestoreService.LogIn(email, password).then((res) => {
        if (res === true) {
          signOut(firestoreService.auth).then(() =>
            setCurrentUser({
              ...currentUser,
              user: firestoreService.auth.currentUser,
            })
          );
        }
        setLoading(false);
      });
    }
  };

  return (
    <>
      {loading === true ? (
        <View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            position: "absolute",
            zIndex: 10,
            opacity: 0.6,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : null}
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
            name="at"
            type="ionicon"
            color="#52234E"
          />
          <TextInput
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
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
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity onPress={logIn} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text>Pas encore de compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
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
