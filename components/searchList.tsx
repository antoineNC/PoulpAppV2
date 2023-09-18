import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { Club, Partenariat } from "../service/collecInterface";
import { TouchableOpacity } from "react-native-gesture-handler";
import ClubDisp from "./clubDisp";
import PartenariatDisp from "./parteDisp";
import { colors } from "../theme/colors";

export default function List(props: {
  searchPhrase: string;
  setClicked: (arg0: boolean) => void;
  data: Club[] | Partenariat[];
}) {
  const [itemDisp, setItemDisp] = useState<Club | Partenariat>();
  const [modal, setModal] = useState(false);
  function isClub(item: Club | Partenariat): item is Club {
    return (item as Club).contact !== undefined;
  }
  // definition of the Item, which will be rendered in the FlatList
  const Item = ({ item }: { item: Club | Partenariat }) => (
    <TouchableOpacity onPress={() => showModal(item)}>
      <View style={styles.item}>
        <View>
          <Image
            source={{ uri: item.logo }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 5,
              marginRight: 10,
              resizeMode: "center",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.nom}</Text>
          <Text numberOfLines={3}>{item.description}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Bureau référent : {item.bureau}
          </Text>
        </View>
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
  };

  return (
    <SafeAreaView style={styles.listContainer}>
      <View>
        <Modal
          style={{ backgroundColor: colors.secondary }}
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
  listContainer: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    paddingBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
