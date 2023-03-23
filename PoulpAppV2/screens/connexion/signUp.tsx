import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Icon } from "@rneui/themed";
import styles from "../../theme/styles";
import { SignUpScreenNavProp } from "../../navigation/types";

export default function SignUp({ navigation }: SignUpScreenNavProp) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [code, setCode] = useState("");
  // Fonction appellée au clic sur le bouton 'Je m'inscris'
  const checkSignUp = () => {
    // Vérifications d'usage
    if (
      nom == "" ||
      prenom == "" ||
      mail == "" ||
      password == "" ||
      confPass == "" ||
      code == ""
    ) {
      Alert.alert("Erreur", "Un ou des champs sont vides");
    } else if (confPass != password) {
      Alert.alert(
        "Erreur",
        "La confirmation du mot de passe ne correspond pas"
      );
    } else if (code != "ENSC2021") {
      Alert.alert("Erreur", "Le code est incorrect");
    } else {
      // S'il n'y a pas d'erreur, on fait appel au service d'authentification de firebase depuis le firestoreService
      firestoreService.SignUp(nom, prenom, mail, password).then((res) => {
        if (res === true) {
          navigation.navigate("Home", {
            screen: "FeedStack",
            params: { screen: "Feed" },
          });
        }
      });
      // Si l'authentification fonctionne, on navigue vers l'écran du fil d'actualité
    }
  };
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="user"
            type="antdesign"
            color="#52234E"
          />
          <TextInput
            placeholder="Nom"
            style={{ width: 95 }}
            onChangeText={(name) => setNom(name)}
          />
          <TextInput
            placeholder="Prénom"
            style={{ width: 95, borderLeftWidth: 0.5, paddingLeft: 5 }}
            onChangeText={(firstName) => setPrenom(firstName)}
          />
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="at-sign"
            type="feather"
            color="#52234E"
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={{ width: 190 }}
            onChangeText={(email) => setMail(email)}
          />
        </View>

        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="key"
            type="fontisto"
            color="#52234E"
          />
          <TextInput
            onChangeText={(password) => setPassword(password)}
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
          />
        </View>

        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="key"
            type="fontisto"
            color="#52234E"
          />
          <TextInput
            onChangeText={(confirmPassword) => setConfPass(confirmPassword)}
            placeholder="Confirmation du mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
          />
        </View>

        <View style={styles.textInput}>
          <Icon style={{ margin: 10 }} size={20} name="lock" color="#52234E" />
          <TextInput
            onChangeText={(code) => setCode(code)}
            placeholder="Code"
            secureTextEntry={true}
            style={{ width: 190 }}
          />
          <Icon
            size={20}
            name="questioncircleo"
            type="antdesign"
            color="#52234E"
            onPress={() =>
              Alert.alert(
                "Code ENSC",
                "Ce code est donné lors de l'amphi de présentation en début d'année. Si vous ne le connaissez pas, adressez vous au BDE."
              )
            }
          />
        </View>

        <TouchableOpacity
          onPress={() => checkSignUp()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Je m'inscris !</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
