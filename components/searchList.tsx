import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Modal,
} from "react-native";
import { Club, Partenariat } from "../service/collecInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import ClubDisp from "./clubDisp";
import PartenariatDisp from "./parteDisp";

export default function List(props: {
  searchPhrase: string;
  setClicked: (arg0: boolean) => void;
  data: Club[] | Partenariat[];
}) {
  const [itemDisp, setItemDisp] = useState<Club | Partenariat>();
  const [modal, setModal] = useState(false);
  function isClub(item: Club | Partenariat): item is Club {
    return (item as Club).logo !== undefined;
  }
  // definition of the Item, which will be rendered in the FlatList
  const Item = ({ item }: { item: Club | Partenariat }) => (
    <TouchableOpacity onPress={() => showModal(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.nom}</Text>
        <Text>{item.description}</Text>
        <Text>{item.bureau}</Text>
      </View>
    </TouchableOpacity>
  );

  const showModal = (item: Club | Partenariat) => {
    setItemDisp(item);
    setModal(true);
  };
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
    // items does not match any filter
    return null;

    // in case nothing found
    // return <Text style={{ textAlign: "center" }}>Aucun élément trouvé</Text>;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <Modal
          visible={modal}
          animationType="slide"
          onRequestClose={() => setModal(false)}
        >
          {itemDisp !== undefined ? (
            isClub(itemDisp) ? (
              <ClubDisp clubDisp={itemDisp} setModal={setModal} />
            ) : (
              <PartenariatDisp parteDisp={itemDisp} setModal={setModal} />
            )
          ) : (
            <Text>Une erreur est survenue</Text>
          )}
        </Modal>
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
    paddingBottom: 10,
    margin: 20,
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
