import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  screen: string;
  params?: any;
  navigation: any;
}

export default function Button({
  text,
  screen,
  params,
  navigation,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen, params)}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    margin: 10,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
