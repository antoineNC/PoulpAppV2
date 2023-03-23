import React from "react";
import { Text, View } from "react-native";
import styles from "../../theme/styles";
import { FeedScreenNavProp } from "../../navigation/types";
import { Button } from "react-native-paper";

function FeedScreen({ navigation }: FeedScreenNavProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the settings screen</Text>
      <Button icon="camera" onPress={() => navigation.navigate("Calendrier")}>
        Ouais calabar
      </Button>
    </View>
  );
}

export default FeedScreen;
