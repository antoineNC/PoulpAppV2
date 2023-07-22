import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
} from "react-native";
import { DecoScreenNavProp } from "../../navigation/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getUserInfo, refreshToken, revoke } from "../../service/googleAuth";
import firestoreService from "../../service/firestore.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/styles";

WebBrowser.maybeCompleteAuthSession();

export default function LogOut({ navigation }: DecoScreenNavProp) {
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
    console.log("useEffect deco: ", response?.type);
    logout();
  }, []);

  const logout = async () => {
    // await AsyncStorage.clear();
    // console.log("clear");
    const authJSON = await AsyncStorage.getItem("auth");
    console.log("auth", authJSON);
    if (authJSON) {
      console.log("authJSON ", authJSON);
      const auth = JSON.parse(authJSON);
      console.log("accessToken ", auth.accessToken);
      if (auth?.accessToken) {
        await revoke(auth);
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("sessionId");
        console.log("response: ", response);
        navigation.navigate("Connexion", { reconnect: false });
      } else {
        console.log("access token not available");
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require("../../image/logo.png")} style={styles.logo} />
        <Text>Déconnexion...</Text>
      </View>
    </View>
  );
}
