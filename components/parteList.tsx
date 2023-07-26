import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Dimensions,
} from "react-native";
import firestoreService from "../service/firestore.service";
import { Partenariat } from "../service/collecInterface";
import { Icon } from "@rneui/themed";
import PartenariatDisp from "./parteDisp";

export default function PartenariatList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
}) {
  const [partenariats, setPartenariats] = useState<Partenariat[]>();
  const [parteDisp, setParteDisp] = useState<Partenariat>();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenPartenariats(
        (partenariats) => setPartenariats(partenariats),
        props.bureau
      );
    };
    getData();
  }, []);
  const showModal = (item: Partenariat) => {
    setParteDisp(item);
    setModal(true);
  };
  return (
    <>
      <Modal
        visible={modal}
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        {parteDisp ? (
          <PartenariatDisp parteDisp={parteDisp} setModal={setModal} />
        ) : (
          <Text>Une erreur est survenue</Text>
        )}
      </Modal>
      <FlatList
        data={partenariats}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => showModal(item)}>
              <View style={styles.club}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                />
                <Text style={styles.nomText}>{item.nom}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  club: {
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  nomText: {
    fontSize: 8,
    fontWeight: "bold",
    paddingVertical: 7,
  },
});
