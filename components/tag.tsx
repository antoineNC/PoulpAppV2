import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

interface TagProps {
  tag: string;
  removeTag: (tag: string) => void;
}

export default function Tag({ tag, removeTag }: TagProps) {
  const remove = () => {
    removeTag(tag);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={remove} style={{ flexDirection: "row" }}>
        <Text style={{ color: "white" }}>{tag}</Text>
        <Text style={{ fontWeight: "bold", color: "white" }}> &times; </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cyan,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    margin: 5,
  },
});
