import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Post } from "../../service/collecInterface";
import { Timestamp } from "firebase/firestore";
import { AddPostScreenNP } from "../../navigation/types";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox, Icon } from "@rneui/themed";
import Constants from "expo-constants";
import firestoreService from "../../service/firestore.service";
import Tag from "../../components/tag";

export default function AddPost({ navigation }: AddPostScreenNP) {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today =
      (date < 10 ? "0" : "") +
      date +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;

    return today;
  };
  const [post, setPost] = useState<Post>({
    id: "",
    titre: "",
    description: "",
    tags: [],
    visibleCal: true,
    date: [getCurrentDate(), getCurrentDate(), "18:00", "20:00"],
    image: "",
    editor: "",
    timeStamp: Timestamp.now(),
  });
  const [timePStart, setTimePStart] = useState(false);
  const [timePEnd, setTimePEnd] = useState(false);
  const [datePStart, setDatePStart] = useState(false);
  const [datePEnd, setDatePEnd] = useState(false);

  const listTags = [
    { label: "BDE", value: "BDE" },
    { label: "BDS", value: "BDS" },
    { label: "BDA", value: "BDA" },
    { label: "BDF", value: "BDF" },
    { label: "JE", value: "JE" },
    { label: "Evénement", value: "Evénement" },
    { label: "Soirée", value: "Soirée" },
    { label: "Afterwork", value: "Afterwork" },
    { label: "Shotgun", value: "Shotgun" },
    { label: "Annonce", value: "Annonce" },
    { label: "AGE", value: "AGE" },
    { label: "Gazette", value: "Gazette" },
  ];

  const addPost = () => {
    // Vérification si le post n'est pas vide (il doit contenir au moins un titre)
    if (post.titre != "") {
      var nvPost = post;
      nvPost.editor = firestoreService.getAsso();
      setPost(nvPost);
      console.log(post);
      // Création du post en faisant appel à firestore.Service
      // Si c'est un événement, on transmet les propriétés correspondantes
      if (post.visibleCal == true) {
        firestoreService.addPost(post);
      }
      // Si ce n'est pas un événement, on remplit les champs correspondant à un événement par ""
      // (sinon, la date d'aujourd'hui serait enregistrée par défaut)
      else {
        var nvPost = post;
        nvPost.date = ["", "", "", ""];
        setPost(nvPost);
        firestoreService.addPost(nvPost);
      }
      // Une fois l'événement créé, on navigue vers l'écran du fil d'actualité
      navigation.goBack();
    } else {
      Alert.alert("Erreur", "Le post doit au moins contenir un titre");
    }
  };

  // Permet d'ajouter un tag à la liste
  const addTag = (tag: string) => {
    if (!checkTag(tag)) {
      setPost({ ...post, tags: [...post.tags, tag] });
    }
  };

  // Permet de supprimer un tag de la liste
  const removeTag = (tagDelete: string) => {
    setPost({
      ...post,
      tags: post.tags.filter((tag: string) => tag !== tagDelete),
    });
  };

  // Vérifie si le tag ajouté n'existe pas déjà dans la liste
  const checkTag = (tag: string) => {
    const arr = post.tags;
    if (arr != null && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == tag) {
          return true;
        }
      }
    }
    return false;
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
      setPost({ ...post, image: result.assets[0].uri });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  const deleteImage = () => {
    setPost({ ...post, image: "" });
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Titre"
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => setPost({ ...post, titre: text })}
          />
        </View>

        <View style={[styles.textInput, styles.textInputDescription]}>
          <TextInput
            placeholder="Description"
            multiline={true}
            style={styles.descriptionText}
            onChangeText={(text) => setPost({ ...post, description: text })}
          />
        </View>

        <View style={styles.selectTagsView}>
          <Picker
            placeholder="oui"
            onValueChange={(tag: string) => {
              addTag(tag);
            }}
            mode="dropdown"
          >
            {listTags.map((tag, index) => {
              return (
                <Picker.Item key={index} value={tag.value} label={tag.label} />
              );
            })}
          </Picker>
        </View>

        <FlatList<string>
          horizontal
          contentContainerStyle={styles.tagsSelected}
          data={post.tags}
          keyExtractor={(tag) => tag}
          renderItem={({ item }: { item: string }) => (
            <Tag tag={item} removeTag={removeTag} />
          )}
        />

        {/*Si une image est sélectionnée, on l'affiche, et les boutons de supression et modification d'image apparaissent */}
        {post.image != "" ? (
          <View style={styles.imageView}>
            <Image source={{ uri: post.image }} style={styles.image} />
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

        <View style={styles.checkBoxView}>
          <CheckBox
            title="Evenement"
            checked={post.visibleCal}
            checkedColor="#52234E"
            onPress={() => setPost({ ...post, visibleCal: !post.visibleCal })}
            containerStyle={styles.checkBox}
          />
        </View>

        {/*Si l'utilisateur a définit le post comme un événement, on affiche les dateTimePickers*/}
        {post.visibleCal == true ? (
          <View style={{ alignItems: "center" }}>
            <View style={styles.dtPickerContainer}>
              <Text style={{ width: 50, fontWeight: "bold" }}>Début : </Text>
              <Text>Le</Text>
              <TouchableOpacity
                style={[styles.dtPicker, { width: 130 }]}
                onPress={() => setDatePStart(true)}
              >
                <Icon name="calendar" type="font-awesome" color="#52234E" />
                <Text>{post.date[0]}</Text>
              </TouchableOpacity>

              {datePStart && (
                <DateTimePicker
                  display="default"
                  value={new Date()}
                  onChange={(event, date) => {
                    var nvDate = post.date;
                    date && event.type === "set"
                      ? (nvDate[0] =
                          (date.getDate() < 10 ? "0" : "") +
                          date.getDate() +
                          "/" +
                          (date.getMonth() < 9 ? "0" : "") +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear())
                      : "";
                    setPost({
                      ...post,
                      date: nvDate,
                    });
                    setDatePStart(false);
                  }}
                />
              )}
              <Text>à</Text>

              <TouchableOpacity
                style={[styles.dtPicker, { width: 90 }]}
                onPress={() => setTimePStart(true)}
              >
                <Icon name="clock" type="feather" color="#52234E" />
                <Text>{post.date[2]}</Text>
              </TouchableOpacity>

              {/*Permet d'afficher le timePicker*/}
              {timePStart && (
                <DateTimePicker
                  mode={"time"}
                  display="default"
                  is24Hour={true}
                  value={new Date()}
                  onChange={(event, value) => {
                    var nvDate = post.date;
                    value && event.type === "set"
                      ? (nvDate[2] =
                          value?.getHours() +
                          ":" +
                          (value?.getMinutes() < 10
                            ? "0" + value?.getMinutes()
                            : value?.getMinutes()))
                      : "";
                    setPost({
                      ...post,
                      date: nvDate,
                    });
                    setTimePStart(false);
                  }}
                />
              )}
            </View>
            <View style={styles.dtPickerContainer}>
              <Text style={{ width: 50, fontWeight: "bold" }}>Fin : </Text>
              <Text>Le</Text>

              <TouchableOpacity
                style={[styles.dtPicker, { width: 130 }]}
                onPress={() => setDatePEnd(true)}
              >
                <Icon name="calendar" type="font-awesome" color="#52234E" />
                <Text>{post.date[1]}</Text>
              </TouchableOpacity>

              {datePEnd && (
                <DateTimePicker
                  display="default"
                  value={new Date()}
                  onChange={(event, date) => {
                    var nvDate = post.date;
                    date && event.type === "set"
                      ? (nvDate[1] =
                          (date.getDate() < 10 ? "0" : "") +
                          date.getDate() +
                          "/" +
                          (date.getMonth() < 9 ? "0" : "") +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear())
                      : "";
                    setPost({ ...post, date: nvDate });
                    setDatePEnd(false);
                  }}
                />
              )}
              <Text>à</Text>

              <TouchableOpacity
                style={[styles.dtPicker, { width: 90 }]}
                onPress={() => setTimePEnd(true)}
              >
                <Icon name="clock" type="feather" color="#52234E" />
                <Text>{post.date[3]}</Text>
              </TouchableOpacity>

              {timePEnd && (
                <DateTimePicker
                  mode={"time"}
                  display="default"
                  is24Hour={true}
                  value={new Date()}
                  onChange={(event, value) => {
                    var nvDate = post.date;
                    value && event.type === "set"
                      ? (nvDate[3] =
                          value?.getHours() +
                          ":" +
                          (value?.getMinutes() < 10
                            ? "0" + value?.getMinutes()
                            : value?.getMinutes()))
                      : "";
                    setPost({ ...post, date: nvDate });
                    setTimePEnd(false);
                  }}
                />
              )}
            </View>
          </View>
        ) : null}

        <TouchableOpacity style={styles.buttonContainer} onPress={addPost}>
          <Text style={styles.appButtonText}>Publier le post</Text>
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
  selectTagsView: {
    flexDirection: "column",
    alignItems: "center",
    width: 150,
    margin: 10,
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  tagsSelected: {
    width: 300,
    flexDirection: "row",
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
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  buttonImage: {
    margin: 10,
    backgroundColor: "#52234E",
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
  checkBoxView: {
    backgroundColor: "whitesmoke",
    width: 300,
    marginVertical: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    justifyContent: "center",
  },
  checkBox: {
    backgroundColor: "whitesmoke",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dtPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dtPicker: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10,
    height: 40,
  },
});

// Styles spécifiques pour les dateTimePicker
const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   height: 30,
  //   fontSize: 15,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "blue",
  //   borderRadius: 4,
  //   color: "black",
  //   paddingRight: 30,
  // },
  // inputAndroid: {
  //   height: 40,
  //   fontSize: 15,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderWidth: 0.5,
  //   borderColor: "purple",
  //   borderRadius: 8,
  //   color: "black",
  //   paddingRight: 30,
  // },
});