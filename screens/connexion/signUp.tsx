import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { SignUpScreenNavProp } from "../../navigation/types";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getUserInfo } from "../../service/googleAuth";
import firestoreService from "../../service/firestore.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";
import styles from "../../theme/styles";

WebBrowser.maybeCompleteAuthSession();

export default function SignUp({ navigation }: SignUpScreenNavProp) {
  const [code, setCode] = useState("");
  const [displayBtn, setDisplayBtn] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "427196722560-bfottqft64l1bvmclt6hr11dhaejkcd3.apps.googleusercontent.com",
    iosClientId:
      "427196722560-17g8q0ggj0u2k9e3es8qaum7rc2ilto9.apps.googleusercontent.com",
    webClientId:
      "427196722560-6r60j6b8i07kpo18vlo881uslfs91q1i.apps.googleusercontent.com",
    expoClientId:
      "427196722560-b0c2niu649m98qiep7qsvrgq9h4mvq0j.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (displayBtn && response?.type === "success" && response.authentication) {
      const persistAuth = async () => {
        if (response.authentication) {
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify(response.authentication)
          );
        }
        const userInfo = await getUserInfo(response.authentication);
        const added = await firestoreService.SignUp(userInfo);
        if (added) {
          navigation.navigate("Home", {
            screen: "FeedStack",
            params: { screen: "Feed" },
          });
        }
      };
      persistAuth();
    }
  }, [response]);

  // Fonction appellée au clic sur le bouton 'Je m'inscris'
  const checkCode = () => {
    if (code == "") {
      setDisplayBtn(false);
      Alert.alert("Erreur", "Entrez le code pour pouvoir vous inscrire.");
    } else if (code != "ENSC2021") {
      setDisplayBtn(false);
      Alert.alert("Erreur", "Le code est incorrect.");
    } else {
      // S'il n'y a pas d'erreur, on affiche le bouton Google
      setDisplayBtn(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <Icon style={{ margin: 10 }} size={20} name="lock" color=colors.primary />
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
            color=colors.primary
            onPress={() =>
              Alert.alert(
                "Code ENSC",
                "Ce code est donné lors de l'amphi de présentation en début d'année. Si vous ne le connaissez pas, adressez vous au BDE."
              )
            }
          />
        </View>

        <TouchableOpacity
          onPress={() => checkCode()}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Vérifier le code</Text>
        </TouchableOpacity>

        {displayBtn ? (
          <Button
            title="Sign up with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}
