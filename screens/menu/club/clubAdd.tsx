import { useState } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Club } from "../../../service/collecInterface";
import firestoreService from "../../../service/firestore.service";
import { ClubAddProps } from "../../../navigation/types";
import { colors } from "../../../theme/colors";

export default function ClubAdd({ navigation, route }: ClubAddProps) {
  const { idBureau } = route.params;
  const [club, setClub] = useState<Club>({
    id: "",
    nom: "",
    description: "",
    contact: "",
    logo: "",
    bureau: "",
  });
  const addClub = () => {
    // Vérification si le club n'est pas vide (il doit contenir au moins un titre)
    if (club.nom != "") {
      var nvClub = club;
      nvClub.bureau = idBureau;
      setClub(nvClub);
      firestoreService.addClub(nvClub);
      navigation.goBack();
    } else {
      Alert.alert("Erreur", "Le club doit au moins contenir un nom.");
    }
  };
  // Permet d'ouvrir la gallerie d'images de l'utilisateur.
  // Le chemin d'accès de l'image choisie est enregistrée dans le state
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setClub({ ...club, logo: result.assets[0].uri });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  const deleteImage = () => {
    setClub({ ...club, logo: "" });
  };
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Titre"
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => setClub({ ...club, nom: text })}
          />
        </View>

        <View style={[styles.textInput, styles.textInputDescription]}>
          <TextInput
            placeholder="Description"
            multiline={true}
            style={styles.descriptionText}
            onChangeText={(text) => setClub({ ...club, description: text })}
          />
        </View>

        {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
        {club.logo != "" ? (
          <View style={styles.imageView}>
            <Image source={{ uri: club.logo }} style={styles.image} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
                <Text style={styles.appButtonText}>Modifier l'image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonImage}
                onPress={deleteImage}
              >
                <Text style={styles.appButtonText}>Supprimer l'image</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          //Si aucune image n'est sélectionnée, seul le bouton d'importation est affiché
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={pickImage}
            >
              <Text style={styles.appButtonText}>Importer une image</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.buttonContainer} onPress={addClub}>
          <Text style={styles.appButtonText}>Ajouter le club</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
  },
  textInputDescription: {
    height: 300,
  },
  descriptionText: {
    fontSize: 15,
    width: 300,
    height: 270,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  imageView: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 320,
    height: 320,
  },
  buttonContainer: {
    margin: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  buttonImage: {
    margin: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
