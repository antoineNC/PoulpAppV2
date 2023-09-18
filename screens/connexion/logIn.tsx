import React, { useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";

import { LoginScreenNavProp } from "../../navigation/types";
import { getUserInfo } from "../../service/googleAuth";
import firestoreService from "../../service/firestore.service";
import { CurrentUserContext } from "../../service/context";
import { colors } from "../../theme/colors";

WebBrowser.maybeCompleteAuthSession();

export default function LogIn({ navigation, route }: LoginScreenNavProp) {
  const { setCurrentUser } = useContext(CurrentUserContext);
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
        const res = await firestoreService.LogIn(userInfo.id, userInfo.email);
        if (res.exists) {
          setCurrentUser({ sessionId: res.sessionId, isAdmin: res.isAdmin });
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
    const getPersistedAuth = async () => {
      const authJsonValue = await AsyncStorage.getItem("auth");
      const userJsonValue = await AsyncStorage.getItem("sessionId");
      if (authJsonValue != null && userJsonValue != null) {
        console.log("useEffect2");
        if (userJsonValue.endsWith("gmail.com")) {
          console.log("useeffect2 admin");
          setCurrentUser({ sessionId: userJsonValue, isAdmin: 0 });
        } else if (userJsonValue === ("BDE" || "BDS" || "BDA" || "JE"))
          setCurrentUser({ sessionId: userJsonValue, isAdmin: 1 });
        else setCurrentUser({ sessionId: userJsonValue, isAdmin: 2 });

        navigation.navigate("Home", {
          screen: "FeedStack",
          params: { screen: "Feed" },
        });
      }
    };
    getPersistedAuth();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../image/logo.png")} style={styles.image} />
        <Text style={styles.nameApp}>La PoulP'App</Text>
      </View>
      <View>
        {route.params !== undefined ? null : (
          <TouchableOpacity
            style={[styles.btnContainer, { marginVertical: 20 }]}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "FeedStack",
                params: { screen: "Feed" },
              })
            }
          >
            <Text style={styles.btnTxt}>ACCEDER A LA SESSION</Text>
            <Icon name="sign-in" type="font-awesome" color={"#fff"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btnContainer, { alignSelf: "center" }]}
          onPress={() => {
            promptAsync();
          }}
          disabled={!request}
        >
          <Text style={styles.btnTxt}>CONNEXION</Text>
          <Icon name="google" type="antdesign" color={"#fff"} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Text>Pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
          <Text style={{ color: colors.cyan }}>Je m'inscris !</Text>
        </TouchableOpacity>
      </View>
    </View>
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
