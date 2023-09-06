import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
  Animated,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Bureau, Etudiant, Role } from "../../service/collecInterface";
import { BureauProfilNavProp } from "../../navigation/types";
import ClubList from "../../components/clubList";
import PartenariatList from "../../components/parteList";
import { Icon } from "@rneui/themed";
import { CurrentUserContext } from "../../service/context";

export default function BureauProfil({
  navigation,
  route,
}: BureauProfilNavProp) {
  const { idBureau } = route.params;
  const { currentUser } = useContext(CurrentUserContext);
  const [bureau, setBureau] = useState<Bureau>({
    nom: "Erreur",
    mail: "erreur",
    id: "err",
    description: "erreur",
    logo: "",
    membres: [],
  });
  const [etudiants, setEtus] = useState<Etudiant[]>([
    { id: "", nom: "", prenom: "", adhesions: [], mail: "" },
  ]);
  const [roles, setRoles] = useState<Array<Role>>([{ idRole: "", role: "" }]);
  const logo = firestoreService.getImagePath(idBureau);

  useEffect(() => {
    firestoreService.listenBureau(idBureau, (bureau: Bureau) => {
      setBureau(bureau);
    });
    firestoreService.listenEtudiants((etus) => setEtus(etus));
    firestoreService.getAllRoles((roles) => setRoles(roles));
  }, [idBureau]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const updateBureau = async () => {
    await firestoreService.updateBureau(bureau);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  const addClub = (idBureau: string) => {
    navigation.navigate("ClubAdd", { idBureau: idBureau });
  };
  const addParte = (idBureau: string) => {
    navigation.navigate("ParteAdd", { idBureau: idBureau });
  };

  return (
    <>
      <ScrollView style={styles.main_container}>
        {/* C'est la partie description de l'asso avec le logo, le nom et une description de l'asso */}
        <View style={styles.profil}>
          <Image
            source={logo}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />

          {currentUser.sessionId === idBureau ? (
            <View style={{ flex: 1, paddingHorizontal: 12, rowGap: 5 }}>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="Nom"
                  value={bureau.nom}
                  onChangeText={(text) => setBureau({ ...bureau, nom: text })}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="e-mail"
                  value={bureau.mail}
                  onChangeText={(text) => setBureau({ ...bureau, mail: text })}
                />
              </View>
              <View style={[styles.textInput, { height: 100, paddingTop: 5 }]}>
                <TextInput
                  placeholder="Decription"
                  value={bureau.description}
                  multiline
                  onChangeText={(text) =>
                    setBureau({ ...bureau, description: text })
                  }
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { alignSelf: "auto", marginTop: 10 },
                ]}
                onPress={updateBureau}
              >
                <Text style={styles.appButtonText}>Valider le profil</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
              <Text style={styles.nomProfil}>{bureau.nom}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL("mailto:" + bureau.mail)}
              >
                <Text
                  style={[
                    styles.descriptionProfil,
                    { color: "blue", fontWeight: "bold" },
                  ]}
                >
                  {bureau.mail}
                </Text>
              </TouchableOpacity>
              <Text style={styles.descriptionProfil}>{bureau.description}</Text>
            </View>
          )}
        </View>

        {idBureau !== "JE" && idBureau !== "BDF" ? (
          <>
            <View style={styles.partie}>
              {/* C'est la partie des clubs, avec un titre et une flatlist de club */}
              <Text style={styles.titretext}> Les clubs</Text>
              <View style={styles.separator} />
              <View style={{ flexDirection: "row" }}>
                {currentUser.sessionId === idBureau ? (
                  <TouchableOpacity onPress={() => addClub(idBureau)}>
                    <View style={styles.addItem}>
                      <Icon
                        name="plussquareo"
                        type="antdesign"
                        size={70}
                        color={"#52234E"}
                      />
                    </View>
                  </TouchableOpacity>
                ) : null}
                <ClubList bureau={idBureau} navigation={navigation} />
              </View>
            </View>

            <View style={styles.partie}>
              {/* C'est la partie des partenariats, avec un titre et une flatlist de partenariats */}
              <Text style={styles.titretext}> Les partenariats</Text>
              <View style={styles.separator} />
              <View style={{ flexDirection: "row" }}>
                {currentUser.sessionId === idBureau ? (
                  <TouchableOpacity onPress={() => addParte(idBureau)}>
                    <View style={styles.addItem}>
                      <Icon
                        name="plussquareo"
                        type="antdesign"
                        size={70}
                        color={"#52234E"}
                      />
                    </View>
                  </TouchableOpacity>
                ) : null}

                <PartenariatList bureau={idBureau} navigation={navigation} />
              </View>
            </View>
          </>
        ) : null}

        {/* C'est la partie des Membres et des postes, avec un titre et une liste de membres et de postes */}
        <View style={styles.partie}>
          <Text style={styles.titretext}>Les membres </Text>
          <View style={styles.separator} />
          <View>
            {bureau.membres.map((item, key) => (
              <View key={key} style={styles.members}>
                <Text style={styles.membersContent}>
                  {roles.find((value) => value.idRole === item.idRole)?.role} :
                </Text>
                <Text style={styles.membersContent}>
                  {etudiants.find((value) => value.id === item.idEtu)?.prenom +
                    " " +
                    etudiants.find((value) => value.id === item.idEtu)?.nom}
                </Text>
              </View>
            ))}
          </View>
          {currentUser.sessionId === idBureau ? (
            <TouchableOpacity
              style={[styles.buttonContainer, { marginVertical: 15 }]}
              onPress={() => navigation.navigate("GestMembres", { bureau })}
            >
              <Text style={styles.appButtonText}>Gérer les membres</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          margin: 10,
          opacity: fadeAnim,
        }}
      >
        <View
          style={{
            backgroundColor: "lightgreen",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text>Le profil du bureau a bien été mis à jour.</Text>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 7,
  },
  profil: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  nomProfil: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 7,
  },
  descriptionProfil: {
    fontSize: 13,
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  },
  partie: {
    paddingVertical: 12,
  },
  titretext: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    alignSelf: "center",
    marginVertical: 10,
    height: 1,
    width: "80%",
    backgroundColor: "#52234E",
  },
  addItem: {
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  members: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  membersContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
  },
});
