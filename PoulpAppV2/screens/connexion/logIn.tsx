import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Icon } from "@rneui/themed";
import styles from "../../theme/styles";
import { LoginScreenNavProp } from "../../navigation/types";
import firestoreService from "../../service/firestore.service";

export default function LogIn({ navigation }: LoginScreenNavProp) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("eleve");

  // Fonction appellée au clic sur le bouton 'se connecter'
  const signIn = () => {
    // Vérifications d'usage
    if (mail == "" || password == "") {
      Alert.alert("Un ou des champs sont vides");
    } else if (!firestoreService.checkIfAdmin(mail) && user == "admin") {
      Alert.alert("Ce compte n'est pas admin");
    } else if (firestoreService.checkIfAdmin(mail) && user == "eleve") {
      Alert.alert("Ce compte n'est pas élève");
    } else {
      // S'il n'y a pas d'erreur, on fait appel au service d'authentification de firebase depuis le firestoreService
      firestoreService
        .SignIn(mail, password)
        // Si l'authentification fonctionne, on navigue vers l'écran du fil d'actualité
        .then(() => navigation.navigate("Home", { screen: "Feed" }))
        // Sinon on récupère l'erreur et on l'affiche sous forme d'alerte.
        // Les erreures les plus courantes ont été traduites en français
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              Alert.alert("Erreur", "Utilisateur non reconnu");
              break;
            case "auth/invalid-email":
              Alert.alert("Erreur", "Email invalide");
              break;
            case "auth/wrong-password":
              Alert.alert("Erreur", "Mot de passe incorrect");
              break;
            default:
              Alert.alert("Erreur :", error.code);
              break;
          }
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require("../image/logo.png")} style={styles.logo} />

        <View style={styles.textInputCo}>
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
            onChangeText={(email) => setMail(email)}
          />
        </View>

        <View style={styles.textInputCo}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="key"
            type="fontisto"
            color="#52234E"
          />
          <TextInput
            placeholder="mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <RadioButton.Group
          onValueChange={(value: React.SetStateAction<string>) =>
            setUser(value)
          }
          value={user}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.raddioButton}>
              <Text>Elève</Text>
              <RadioButton value="eleve" color="#52234E" />
            </View>
            <View style={styles.raddioButton}>
              <Text>Admin</Text>
              <RadioButton value="admin" color="#52234E" />
            </View>
          </View>
        </RadioButton.Group>

        <TouchableOpacity
          onPress={() => signIn()}
          style={styles.appButtonContainerCo}
        >
          <Text style={styles.appButtonTextCo}>Se connecter</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 10 }}>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
          <Text style={{ color: "#57B9BB" }}>Je m'inscris !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
