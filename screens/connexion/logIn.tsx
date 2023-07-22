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
import { LoginScreenNavProp } from "../../navigation/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getUserInfo, refreshToken, revoke } from "../../service/googleAuth";
import firestoreService from "../../service/firestore.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../theme/styles";

WebBrowser.maybeCompleteAuthSession();

export default function LogIn({ navigation, route }: LoginScreenNavProp) {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>();
  const [auth, setAuth] = useState<AuthSession.TokenResponse>();
  const [requireRefresh, setRequireRefresh] = useState(false);

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
    console.log("useEffect1", response?.type);
    // enter after logging in google
    if (response?.type === "success" && response.authentication) {
      // setAuth(response.authentication);
      const persistAuth = async () => {
        if (response.authentication) {
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify(response.authentication)
          );
        }
        const userInfo = await getUserInfo(response.authentication);
        const exists = await firestoreService.LogIn(
          userInfo.id,
          userInfo.email
        );
        if (exists) {
          navigation.navigate("Home", {
            screen: "FeedStack",
            params: { screen: "Feed" },
          });
        }
      };
      console.log("useEffect1 auth", response.authentication);
      persistAuth();
    }
  }, [response]);

  // useful when user want to connect again
  useEffect(() => {
    console.log("useEffect2");
    const getPersistedAuth = async () => {
      const authJsonValue = await AsyncStorage.getItem("auth");
      const userJsonValue = await AsyncStorage.getItem("sessionId");
      if (authJsonValue != null && userJsonValue != null) {
        // const authFromJson = JSON.parse(authJsonValue);
        // setAuth(authFromJson);
        navigation.navigate("Home", {
          screen: "FeedStack",
          params: { screen: "Feed" },
        });

        // setRequireRefresh(
        //   AuthSession.TokenResponse.isTokenFresh({
        //     expiresIn: authFromJson.expiresIn,
        //     issuedAt: authFromJson.issuedAt,
        //   })
        // );
      }
    };
    getPersistedAuth();
  }, []);

  // const refresh = async () => {
  //   const tokenResult = await refreshToken(auth);
  //   setAuth(tokenResult);
  //   await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
  //   setRequireRefresh(false);
  // };

  // const logout = async () => {
  //   if (auth?.accessToken) {
  //     await revoke(auth);
  //     setAuth(undefined);
  //     setUserInfo(undefined);
  //     await AsyncStorage.removeItem("auth");
  //     console.log("logout auth: ", auth);
  //     console.log("logout user: ", userInfo);
  //   } else {
  //     console.log("access token not available");
  //   }
  // };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={require("../../image/logo.png")} style={styles.logo} />
        {route.params ? null : (
          <View style={{ marginVertical: 20 }}>
            <Button
              title="Acccéder à la session"
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "FeedStack",
                  params: { screen: "Feed" },
                })
              }
            />
          </View>
        )}
        {route.params?.reconnect === false ? null : (
          <View style={{ marginVertical: 20 }}>
            <Button
              title="Acccéder à la session"
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "FeedStack",
                  params: { screen: "Feed" },
                })
              }
            />
          </View>
        )}

        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />

        {/* {requireRefresh ? (
          <View>
            <Text>Token requires refresh...</Text>
            <Button title="Refresh Token" onPress={refresh} />
          </View>
        ) : null} */}

        <Text style={{ marginTop: 10 }}>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
          <Text style={{ color: "#57B9BB" }}>Je m'inscris !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
