import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Bureau, Role } from "../../service/collecInterface";
import { BureauProfilNavProp } from "../../navigation/types";
import ClubList from "../../components/clubList";
import PartenariatList from "../../components/parteList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";

export default function BureauProfil({
  navigation,
  route,
}: BureauProfilNavProp) {
  const { idBureau } = route.params;
  const [bureau, setBureau] = useState<Bureau>({
    nom: "Erreur",
    mail: "erreur",
    id: "err",
    description: "erreur",
    logo: "",
    membres: [],
  });
  const [roles, setRoles] = useState<Array<Role>>([
    { idRole: 1, nomRole: "Président" },
  ]);
  const [editor, setEditing] = useState(false);
  const logo = firestoreService.getImagePath(idBureau);

  useEffect(() => {
    firestoreService.listenAsso(idBureau, (bureau: Bureau) => {
      setBureau(bureau);
    });
    firestoreService.getAllRoles().then((roles) => {
      setRoles(roles);
    });
    const isEditor = async () => {
      const userId = await AsyncStorage.getItem("sessionId");
      if (userId == idBureau) {
        setEditing(true);
      }
    };
    isEditor();
  }, [idBureau]);

  const addClub = (idBureau: string) => {
    navigation.navigate("ClubAdd", { idBureau: idBureau });
  };
  const addParte = (idBureau: string) => {
    navigation.navigate("ParteAdd", { idBureau: idBureau });
  };

  return (
    <ScrollView style={styles.main_container}>
      {/* C'est la partie description de l'asso avec le logo, le nom et une description de l'asso */}
      <View style={styles.profil}>
        <Image
          source={logo}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={styles.nomProfil}>{bureau.nom}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:" + bureau.mail)}
          >
            <Text style={styles.descriptionProfil}>{bureau.mail}</Text>
          </TouchableOpacity>
          <Text style={styles.descriptionProfil}>{bureau.description}</Text>
        </View>
      </View>

      {/* C'est la partie des clubs, avec un titre et une flatlist de club */}
      <View style={styles.partie}>
        <Text style={styles.titretext}> Les clubs</Text>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => addClub(idBureau)}>
            <View style={styles.addItem}>
              <Icon
                name="plussquareo"
                type="antdesign"
                size={70}
                color={"grey"}
              />
            </View>
          </TouchableOpacity>
          <ClubList bureau={idBureau} navigation={navigation} />
        </View>
      </View>

      {/* C'est la partie des partenariats, avec un titre et une flatlist de partenariats */}
      <View style={styles.partie}>
        <Text style={styles.titretext}> Les partenariats</Text>
        <View style={styles.separator} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => addParte(idBureau)}>
            <View style={styles.addItem}>
              <Icon
                name="plussquareo"
                type="antdesign"
                size={70}
                color={"grey"}
              />
            </View>
          </TouchableOpacity>
          <PartenariatList bureau={idBureau} navigation={navigation} />
        </View>
      </View>

      {/* C'est la partie des Membres et des postes, avec un titre et une liste de membres et de postes */}
      <View style={styles.partie}>
        <Text style={styles.titretext}>Les membres </Text>
        <View style={styles.separator} />
        <View style={styles.members}>
          <View>
            {bureau.membres.map((item, key) => (
              <Text key={key} style={styles.membersContent}>
                {roles.find((value) => value.idRole === item.idRole)?.nomRole} :
              </Text>
            ))}
          </View>
          <View>
            {bureau.membres.map((item, key) => (
              <Text key={key} style={styles.membersContent}>
                {item.nomEtu}
              </Text>
            ))}
          </View>
        </View>
        {editor ? (
          <TouchableOpacity
            style={[styles.buttonContainer, { marginVertical: 15 }]}
            //   onPress={() => navigation.navigate("ModifAsso", bureau)}
          >
            <Text style={styles.appButtonText}>Gérer les membres</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    paddingHorizontal: 7,
  },
  profil: {
    // flex:1,
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
    // alignItems:"center",
    justifyContent: "space-around",
  },
  membersContent: {
    // fontSize: 2,
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
  },
});
