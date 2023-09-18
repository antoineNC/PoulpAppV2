import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SearchBar(props: {
  clicked: any;
  searchPhrase: string | undefined;
  setSearchPhrase: (text: string) => void;
  setClicked: (arg0: boolean) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        paddingHorizontal: 15,
      }}
    >
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Chercher"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />

        {props.clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            color={colors.primary}
            title="Annuler"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 10,
  },
});
