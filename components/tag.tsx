import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

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
        <Text>{tag}</Text>
        <Text style={{ fontWeight: "bold" }}> &times; </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#8AC8CE",
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    margin: 5,
  },
});
