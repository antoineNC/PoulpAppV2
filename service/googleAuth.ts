import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import { Google } from "./config";

export const getUserInfo = async (auth: AuthSession.TokenResponse | null) => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${auth?.accessToken}` },
    });

    const user = await response.json();
    console.log("getUser : ", user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getClientId = () => {
  if (Platform.OS === "ios") {
    return Google.iosId;
  } else if (Platform.OS === "android") {
    return Google.androidId;
  } else {
    console.log("Invalid platform - not handled");
    return "";
  }
};

export const refreshToken = async (
  auth: AuthSession.TokenResponse | undefined
) => {
  const clientId = getClientId();
  console.log("refresh: ", auth?.refreshToken);
  const tokenResult = await AuthSession.refreshAsync(
    {
      clientId: clientId,
      refreshToken: auth?.refreshToken,
    },
    {
      tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
    }
  );

  tokenResult.refreshToken = auth?.refreshToken;
  return tokenResult;
};

export const revoke = async (auth: AuthSession.TokenResponse) => {
  await AuthSession.revokeAsync(
    {
      token: auth?.accessToken,
    },
    {
      revocationEndpoint: "https://oauth2.googleapis.com/revoke",
    }
  );
};
