import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  ScrollView,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Icon } from "@rneui/themed";
import styles from "../../theme/styles";
import { colors } from "../../theme/colors";

export default function SignUp(props: {
  setIsLogged: (state: string) => void;
}) {
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Fonction appellée au clic sur le bouton 'Je m'inscris'
  const signUp = () => {
    if (code && firstName && lastName && mail && password) {
      if (checkCode() === true) {
        const mailDomain = mail.substring(mail.length - 8);
        if (mailDomain === "@ensc.fr") {
          setLoading(true);
          firestoreService
            .SignUp(mail, password, firstName, lastName)
            .then((res) => {
              if (res === true) {
                Alert.alert(
                  "E-mail de vérification",
                  "Un e-mail de vérification vous a été envoyé à votre adresse ENSC.\nPensez à chercher dans les spams.",
                  [{ text: "Ok", onPress: () => props.setIsLogged("login") }]
                );
              }
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          Alert.alert(
            "E-mail non valide",
            "Vous devez utiliser votre adresse '@ensc.fr'."
          );
        }
      }
    } else {
      Alert.alert("Champs vide", "Il y a au moins un champs vide.");
    }
  };

  const checkCode = (): boolean | undefined => {
    if (code === "ENSC2023") {
      return true;
    } else {
      Alert.alert("Erreur", "Le code est incorrect.");
    }
  };

  return (
    <ScrollView>
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
            style={localStyles.image}
          />
          <Text style={localStyles.nameApp}>La Poulp'App</Text>
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="lock"
            color={colors.primary}
          />
          <TextInput
            onChangeText={(txt) => setFirstName(txt)}
            placeholder="Prénom"
            style={{ width: 190 }}
          />
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="lock"
            color={colors.primary}
          />
          <TextInput
            onChangeText={(txt) => setLastName(txt)}
            placeholder="Nom"
            style={{ width: 190 }}
          />
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="lock"
            color={colors.primary}
          />
          <TextInput
            onChangeText={(txt) => setMail(txt)}
            placeholder="E-mail"
            style={{ width: 190 }}
          />
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="lock"
            color={colors.primary}
          />
          <TextInput
            onChangeText={(txt) => setPassword(txt)}
            placeholder="Mot de passe"
            secureTextEntry={true}
            style={{ width: 190 }}
          />
        </View>
        <View style={styles.textInput}>
          <Icon
            style={{ margin: 10 }}
            size={20}
            name="lock"
            color={colors.primary}
          />
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
            color={colors.primary}
            onPress={() =>
              Alert.alert(
                "Code ENSC",
                "Ce code est donné lors de l'amphi de présentation en début d'année. Si vous ne le connaissez pas, adressez vous au BDE."
              )
            }
          />
        </View>

        <TouchableOpacity
          onPress={() => signUp()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <Text>Déjà inscrit ?</Text>
          <TouchableOpacity onPress={() => props.setIsLogged("login")}>
            <Text style={{ color: colors.cyan }}>Je me connecte !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const localStyles = StyleSheet.create({
  image: {
    height: 100,
    resizeMode: "center",
    marginVertical: 30,
  },
  nameApp: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
