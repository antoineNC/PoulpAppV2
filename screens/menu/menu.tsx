import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MenuScreenNavProp } from "../../navigation/types";
import Bouton from "../../components/button";
import firestoreService from "../../service/firestore.service";
import { CurrentUserContext } from "../../service/context";

interface Profil {
  nom: string;
  photo: string;
  info: string | Array<string>;
}

function MenuScreen({ navigation }: MenuScreenNavProp) {
  const [profil, setProfil] = useState<Profil>({
    nom: "",
    photo: "",
    info: "",
  });
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    // On récupère la liste de posts à afficher et on les stocke dans le state
    firestoreService.getProfile(currentUser, (profil) => {
      setProfil({ nom: profil.nom, photo: profil.photo, info: profil.info });
    });
  }, []);

  const photoURL = profil.photo;
  const nom = profil.nom;
  const info = profil.info;

  const modifProfile = () => {
    if (currentUser.sessionId === ("BDE" || "BDS" || "BDA" || "JE" || "BDF")) {
      navigation.navigate("BureauProfil", { idBureau: currentUser.sessionId });
    } else {
      Alert.alert(
        "Une erreur est survenue",
        "Il semblerait que le compte sur lequel vous êtes connectés ne corresponde pas à l'identifiant de la session actuelle.\nVeuillez vous reconnecter ou contacter un administrateur."
      );
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 30,
          paddingLeft: 20,
        }}
      >
        <Image
          source={
            typeof photoURL !== "string"
              ? photoURL
              : {
                  uri:
                    photoURL !== ""
                      ? photoURL
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
                }
          }
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginHorizontal: 15,
            alignItems: "baseline",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>{nom}</Text>
          {currentUser.isAdmin === 0 || currentUser.isAdmin === 1 ? (
            <Text>{info}</Text>
          ) : (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              <Text>Adhésions : </Text>
              <FlatList
                data={info}
                horizontal={true}
                renderItem={({ item }) => (
                  <Text style={{ fontWeight: "bold" }}>[{item}] </Text>
                )}
              />
            </View>
          )}
          {currentUser.isAdmin === 1 ? (
            <View style={{ marginTop: 10, alignItems: "flex-start" }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                }}
                onPress={modifProfile}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Modifier profil
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Bouton screen="Bureaux" text="Bureaux" navigation={navigation} />

        {currentUser.isAdmin === 2 ? (
          <Bouton
            screen="Cartes"
            text="Mes cartes d'adhésions"
            navigation={navigation}
          />
        ) : null}

        <Bouton
          screen="Partenariats"
          text="Partenariats"
          navigation={navigation}
        />
        <Bouton screen="Clubs" text="Clubs" navigation={navigation} />
        <Bouton
          screen="BoiteQuestions"
          text="Boîte à questions"
          navigation={navigation}
        />

        {currentUser.isAdmin === 0 || currentUser.isAdmin === 2 ? (
          <Bouton
            screen="Notifications"
            text="Notifications"
            navigation={navigation}
          />
        ) : null}

        <Bouton
          screen="Details"
          text="Détails de l'application"
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
}

export default MenuScreen;
