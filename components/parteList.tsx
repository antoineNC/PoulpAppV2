import React, { useContext, useEffect, useState } from "react";
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
import { Partenariat } from "../service/collecInterface";
import { Icon } from "@rneui/themed";
import PartenariatDisp from "./parteDisp";
import { CurrentUserContext } from "../service/context";
import { colors } from "../theme/colors";

export default function PartenariatList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
  navigation: {
    navigate: (arg0: string, arg1: { partenariat: Partenariat }) => void;
  };
}) {
  const { currentUser } = useContext(CurrentUserContext);
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

  const deleteParte = (idParte: string) => {
    firestoreService
      .deleteParte(idParte)
      .then(() => console.log("Partenariat deleted"))
      .catch(() => console.log("an error occured"));
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
                  source={{ uri: item.logo }}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: "contain",
                    borderRadius: 5,
                  }}
                />
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
                                deleteParte(item.id);
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
                        props.navigation.navigate("ParteModif", {
                          partenariat: item,
                        });
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
