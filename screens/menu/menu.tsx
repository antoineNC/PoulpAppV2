import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { MenuScreenNavProp } from "../../navigation/types";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import Bouton from "../../components/button";
import firestoreService from "../../service/firestore.service";
import { Bureau } from "../../service/collecInterface";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // On récupère la liste de posts à afficher et on les stocke dans le state
    firestoreService.getProfile((profil) => {
      setProfil({ nom: profil.nom, photo: profil.photo, info: profil.info });
    });
    const isAdminFunc = async () => {
      const admin = await firestoreService.checkIfAdmin();
      setIsAdmin(admin);
    };
    isAdminFunc();
  }, []);

  const photoURL = profil.photo;
  const nom = profil.nom;
  const info = profil.info;
  return (
    <View style={styles.main_container}>
      <View style={{ flexDirection: "row" }}>
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
          defaultSource={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          }}
        />
        <View>
          <Text>{nom}</Text>
          {typeof info !== "string" ? (
            <FlatList
              data={info}
              horizontal={true}
              renderItem={({ item }) => <Text>{item}</Text>}
            />
          ) : (
            <Text>{info}</Text>
          )}
        </View>
        {isAdmin ? (
          <View>
            <TouchableOpacity>
              <Text>Modifier profil</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View>
        <Bouton screen="Bureaux" text="Bureaux" navigation={navigation} />

        {!isAdmin ? (
          <Bouton
            screen="Cartes"
            text="Mes cartes d'adhésions"
            navigation={navigation}
          />
        ) : null}

        <Bouton
          screen="Partenariats"
          text="Les partenariats"
          navigation={navigation}
        />
        <Bouton screen="Clubs" text="Les clubs" navigation={navigation} />
        <Bouton
          screen="BoiteQuestions"
          text="Boîte à questions"
          navigation={navigation}
        />

        {!isAdmin ? (
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
    </View>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
