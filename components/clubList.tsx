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
} from "react-native";
import firestoreService from "../service/firestore.service";
import { Club } from "../service/collecInterface";
import { Icon } from "@rneui/themed";
import ClubDisp from "./clubDisp";

export default function ClubList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
}) {
  const [clubs, setClubs] = useState<Club[]>();
  const [clubDisp, setClubDisp] = useState<Club>();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenClubs((clubs) => setClubs(clubs), props.bureau);
    };
    getData();
  }, []);
  const showModal = (item: Club) => {
    setClubDisp(item);
    setModal(true);
  };
  return (
    <>
      <Modal
        visible={modal}
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        {clubDisp ? (
          <ClubDisp clubDisp={clubDisp} setModal={setModal} />
        ) : (
          <Text>Une erreur est survenue</Text>
        )}
      </Modal>
      <FlatList
        data={clubs}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => showModal(item)}>
              <View style={styles.club}>
                <Image
                  source={{ uri: item.logo }}
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
