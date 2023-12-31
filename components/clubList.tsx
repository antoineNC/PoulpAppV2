import React, { useEffect, useState, useContext } from "react";
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
import { Icon } from "@rneui/themed";
import { CurrentUserContext } from "../service/context";
import { colors } from "../theme/colors";

export default function ClubList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
  navigation: { navigate: (arg0: string, arg1: { club: Club }) => void };
}) {
  const { currentUser } = useContext(CurrentUserContext);
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
                <Image source={{ uri: item.logo }} style={styles.image} />
                <Text style={styles.nomText}>{item.nom}</Text>
                {currentUser.sessionId === props.bureau ? (
                  <>
                    <TouchableOpacity
                      style={styles.delete}
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
                    >
                      <Icon name="trash" type="evilicon" color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.edit}
                      onPress={() => {
                        props.navigation.navigate("ClubModif", { club: item });
                      }}
                    >
                      <Icon name="pencil" type="evilicon" />
                    </TouchableOpacity>
                  </>
                ) : null}
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
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 5,
  },
  delete: {
    position: "absolute",
    left: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "red",
    height: 25,
    width: 25,
  },
  edit: {
    position: "absolute",
    right: 5,
    borderColor: colors.primary,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    height: 25,
    width: 25,
  },
});
