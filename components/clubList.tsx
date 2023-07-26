import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import firestoreService from "../service/firestore.service";
import { Club } from "../service/collecInterface";
import ClubDisp from "./clubDisp";
import { Badge, Icon, Chip } from "@rneui/themed";

export default function ClubList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
  navigation: { navigate: (arg0: string, arg1: { idClub: string }) => void };
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

  const deleteClub = (idClub: string) => {
    firestoreService
      .deleteClub(idClub)
      .then(() => console.log("club deleted"))
      .catch(() => console.log("an error occured"));
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
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: "contain",
                    borderRadius: 5,
                  }}
                />
                <Badge
                  value={<Icon name="trash" type="evilicon" size={20} />}
                  status="error"
                  badgeStyle={{
                    borderColor: "black",
                    borderWidth: 0.5,
                    height: 25,
                    width: 25,
                  }}
                  containerStyle={{
                    position: "absolute",
                    left: 5,
                  }}
                  onPress={() => {
                    Alert.alert(
                      "Suppression",
                      "Voulez-vous vraiment supprimer " + item.nom + " ?",
                      [
                        {
                          text: "Oui",
                          onPress: () => {
                            deleteClub(item.id);
                          },
                        },
                        { text: "Non" },
                      ]
                    );
                  }}
                />
                <Badge
                  value={<Icon name="pencil" type="evilicon" size={20} />}
                  badgeStyle={{
                    borderColor: "#52234E",
                    borderWidth: 0.5,
                    backgroundColor: "#dfc9ec",
                    height: 25,
                    width: 25,
                  }}
                  containerStyle={{
                    position: "absolute",
                    right: 5,
                  }}
                  onPress={() => {
                    props.navigation.navigate("ModifClubs", {
                      idClub: item.id,
                    });
                  }}
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
