import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { DecoScreenNavProp } from "../../navigation/types";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
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

  const logout = async () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require("../../image/logo.png")} style={styles.logo} />
        <Text>Déconnexion...</Text>
      </View>
    </View>
  );
}
