import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Bureau, Club, Partenariat } from "../../service/collecInterface";
import { BureauProfilNavProp } from "../../navigation/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import MemberList from "../../components/MemberList";
// import Button from "../../components/Button";

export default function BureauProfil({
  navigation,
  route,
}: BureauProfilNavProp) {
  const { idBureau } = route.params;
  const [bureau, setBureau] = useState<Bureau>();
  const [editor, setEditing] = useState(false);
  const logo = firestoreService.getImagePath(idBureau);
  useEffect(() => {
    firestoreService.listenAsso(idBureau, (bureau: Bureau) => {
      setBureau(bureau);
    });
    const isEditor = async () => {
      const userId = await AsyncStorage.getItem("sessionId");
      if (userId == "BDE2") {
        setEditing(true);
      }
    };
    isEditor();
  }, [idBureau]);
  return (
    <ScrollView style={styles.main_container}>
      {/* C'est la partie description de l'asso avec le logo, le nom et une description de l'asso */}
      <View style={styles.profil}>
        <Image
          source={logo}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={styles.nomProfil}>{bureau?.nom}</Text>
          <Text style={styles.descriptionProfil}>E-mail : {bureau?.mail}</Text>
          <Text style={styles.descriptionProfil}>{bureau?.description}</Text>
        </View>
      </View>
      {editor ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          //   onPress={() => navigation.navigate("ModifAsso", bureau)}
        >
          <Text style={styles.appButtonText}>Modifier profil</Text>
        </TouchableOpacity>
      ) : null}

      {/* C'est la partie des clubs, avec un titre et une flatlist de club */}
      {/* <View style={styles.partie}>
        <Text style={styles.titretext}> Les clubs</Text>
        <View style={styles.separator} />
        <ClubList
          onPress={(club: Club) => this.props.navigation.navigate("Club", club)}
        />
      </View> */}

      {/* C'est la partie des partenariats, avec un titre et une flatlist de partenariats */}
      {/* <View style={styles.partie}>
        <Text style={styles.titretext}> Les partenariats</Text>
        <View style={styles.separator} />
        <PartenariatList
          onPress={(partenariat: Partenariat) =>
            this.props.navigation.navigate("Partenariat", partenariat)
          }
        />
      </View> */}

      {/* C'est la partie des Membres et des postes, avec un titre et une liste de membres et de postes */}
      {/* <View style={styles.partie}>
        <Text style={styles.titretext}>Les membres </Text>
        <View style={styles.separator} />
        <View style={styles.members}>
          <View>
            {this.state.asso.Postes.map((item, key) => (
              <Text key={key} style={styles.membersContent}>
                {item}:
              </Text>
            ))}
          </View>
          <View>
            {this.state.asso.Membres.map((item, key) => (
              <Text key={key} style={styles.membersContent}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View> */}
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
    width: 200,
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