import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";
// import Button from "../../components/Button";

export default function ClubScreen({ club }: { club: Club }) {
  return (
    <View style={styles.container}>
      <View style={styles.image_description_container}>
        <Image
          source={{ uri: this.props.route.params.ImageUrl }}
          style={styles.strech}
        />
        <Text style={styles.description}>
          {this.props.route.params.Description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Linking.openURL(this.props.route.params.ContactUrl)}
      >
        <Text style={styles.appButtonText}>Nous contacter</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  image_description_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  strech: {
    resizeMode: "contain",
    height: 200,
    width: 150,
  },
  description: {
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    margin: 30,
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
