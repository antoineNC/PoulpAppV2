import { useState } from "react";
import { ParteModifProps } from "../../../navigation/types";
import {
  ScrollView,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import firestoreService from "../../../service/firestore.service";
import { Icon } from "@rneui/themed";
import { colors } from "../../../theme/colors";

export default function ParteModif({ navigation, route }: ParteModifProps) {
  const [partenariat, setPartenariat] = useState(route.params.partenariat);
  const [nvAvantage, setNvAvantage] = useState("");

  // Fonction appellée au clic sur le bouton 'Modifier le partenariat'
  // Fait appel au firestoreService pour modifier le partenariat en question
  const modifPartenariat = () => {
    firestoreService.modifPartenariat(partenariat);
    navigation.goBack();
  };

  // Permet d'ajouter un avantage à la liste
  const addAvantage = (avantage: string) => {
    if (avantage !== "") {
      setPartenariat({
        ...partenariat,
        avantages: [...partenariat.avantages, avantage],
      });
      setNvAvantage("");
    }
  };

  // Permet de supprimer un tag de la liste
  const removeAvantage = (avantageDelete: string) => {
    setPartenariat({
      ...partenariat,
      avantages: partenariat.avantages.filter(
        (avantage: string) => avantage !== avantageDelete
      ),
    });
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
      setPartenariat({ ...partenariat, image: result.assets[0].uri });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  const deleteLogo = () => {
    setPartenariat({ ...partenariat, image: "" });
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Nom"
            value={partenariat.nom}
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => {
              setPartenariat({ ...partenariat, nom: text });
            }}
          />
        </View>
        <View style={[styles.textInput, styles.textInputDescription]}>
          <TextInput
            placeholder="Description"
            value={partenariat.description}
            multiline={true}
            style={styles.descriptionText}
            onChangeText={(text) => {
              setPartenariat({ ...partenariat, description: text });
            }}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Adresse"
            value={partenariat.adresse}
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => {
              setPartenariat({ ...partenariat, adresse: text });
            }}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Lien Google maps"
            value={partenariat.adresseMap}
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => {
              setPartenariat({ ...partenariat, adresseMap: text });
            }}
          />
        </View>

        <View style={{ margin: 10 }}>
          {partenariat.avantages.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "whitesmoke",
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 5,
                padding: 10,
                marginBottom: 5,
                flexDirection: "row",
              }}
            >
              <Text style={{ flex: 1 }}>{item}</Text>
              <TouchableOpacity
                onPress={() => removeAvantage(item)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}> &times; </Text>
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={{
              width: 340,
              backgroundColor: "whitesmoke",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 10,
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder="Nouvel avantage"
              value={nvAvantage}
              style={{ width: 300, fontSize: 15, flex: 1 }}
              onChangeText={(text) => {
                setNvAvantage(text);
              }}
            />
            <TouchableOpacity onPress={() => addAvantage(nvAvantage)}>
              <Icon name="plussquare" type="antdesign" />
            </TouchableOpacity>
          </View>
        </View>

        {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
        {partenariat.image != "" ? (
          <View style={styles.imageView}>
            <Image
              source={{ uri: partenariat.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
                <Text style={styles.appButtonText}>Modifier l'image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonImage} onPress={deleteLogo}>
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
        <TouchableOpacity
          style={[styles.buttonContainer, { width: "auto" }]}
          onPress={modifPartenariat}
        >
          <Text style={styles.appButtonText}>Modifier le partenariat</Text>
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
    paddingHorizontal: 20,
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
