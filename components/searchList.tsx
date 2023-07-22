import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Club, Partenariat } from "../service/collecInterface";
import { TouchableOpacity } from "react-native-gesture-handler";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ item }: { item: Club | Partenariat }) => (
  <TouchableOpacity>
    <View style={styles.item}>
      <Text style={styles.title}>{item.nom}</Text>
      <Text>{item.description}</Text>
      <Text>{item.bureau}</Text>
    </View>
  </TouchableOpacity>
);

// the filter
export default function List(props: {
  searchPhrase: string;
  setClicked: (arg0: boolean) => void;
  data: Club[] | Partenariat[];
}) {
  const renderItem = ({ item }: { item: Club | Partenariat }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item item={item} />;
    }
    // filter of the name
    if (
      item.nom
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }
    // filter of the description
    if (
      item.description
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }

    // filter of the editor
    if (
      item.bureau
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }

    // in case nothing found
    return <Text>Aucun élément trouver</Text>;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
