import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import firestoreService from "../../service/firestore.service";
import { Post } from "../../service/collecInterface";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "@rneui/themed";
import Tag from "../../components/tag";
import { ModifPostScreenNavProp } from "../../navigation/types";

export default function ModifPostFamille({
  navigation,
  route,
}: ModifPostScreenNavProp) {
  const [post, setPost] = useState<Post>(route.params.post);
  const [timePStart, setTimePStart] = useState(false);
  const [timePEnd, setTimePEnd] = useState(false);
  const [datePStart, setDatePStart] = useState(false);
  const [datePEnd, setDatePEnd] = useState(false);

  // Fonction appellée au clic sur le bouton 'Modifier le post'
  // Fait appel au firestoreService pour modifier le post en question
  const modifPost = () => {
    // Si c'est un événement, on transmet les propriétés correspondantes
    if (post.visibleCal == true) {
      firestoreService.modifPost(post);
    }
    // Si ce n'est pas un événement, on remplit les champs correspondant à un événement par ""
    // (sinon, la date d'aujourd'hui serait enregistrée par défaut)
    else {
      var nvPost = post;
      nvPost.date = ["", "", "", ""];
      setPost(nvPost);
      firestoreService.modifPost(nvPost);
    }

    navigation.navigate("FeedFamille");
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
    } else {
      return false;
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
      setPost({ ...post, image: result.assets[0].uri });
    }
  };

  // Permet de supprimer l'image choisie (le chemin d'accès vaut "")
  const deleteImage = () => {
    setPost({ ...post, image: "" });
  };
  // Liste des tags disponibles
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

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Titre"
            value={post.titre}
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => {
              setPost({ ...post, titre: text });
            }}
          />
        </View>
        <View style={[styles.textInput, styles.textInputDescription]}>
          <TextInput
            placeholder="Description"
            value={post.description}
            multiline={true}
            style={styles.descriptionText}
            onChangeText={(text) => {
              setPost({ ...post, description: text });
            }}
          />
        </View>

        <View style={styles.selectTagsView}>
          <Picker
            selectedValue={
              post.tags.length ? post.tags[post.tags.length - 1] : "BDE"
            }
            onValueChange={(tag: string) => {
              addTag(tag);
            }}
          >
            {listTags.map((tag, index) => {
              return (
                <Picker.Item key={index} value={tag.value} label={tag.label} />
              );
            })}
          </Picker>
        </View>
        {/* display tags selected for the post */}
        <View style={styles.tagsSelected}>
          {post.tags.map((item, index) => (
            <Tag key={index} tag={item} removeTag={removeTag} />
          ))}
        </View>
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
                    var nvPost = "";
                    date && event.type == "set"
                      ? ((nvPost =
                          (date.getDate() < 10 ? "0" : "") +
                          date.getDate() +
                          "/" +
                          (date.getMonth() < 9 ? "0" : "") +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear()),
                        setPost({
                          ...post,
                          date: [
                            nvPost,
                            post.date[1],
                            post.date[2],
                            post.date[3],
                          ],
                        }))
                      : "";
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
                    var nvPost = "";
                    {
                      value && event.type == "set"
                        ? ((nvPost =
                            value?.getHours() +
                            ":" +
                            (value?.getMinutes() < 10
                              ? "0" + value?.getMinutes()
                              : value?.getMinutes())),
                          setPost({
                            ...post,
                            date: [
                              post.date[0],
                              post.date[1],
                              nvPost,
                              post.date[3],
                            ],
                          }))
                        : "";
                    }
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
                    var nvPost = "";
                    date && event.type == "set"
                      ? ((nvPost =
                          (date.getDate() < 10 ? "0" : "") +
                          date.getDate() +
                          "/" +
                          (date.getMonth() < 9 ? "0" : "") +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear()),
                        setPost({
                          ...post,
                          date: [
                            post.date[0],
                            nvPost,
                            post.date[2],
                            post.date[3],
                          ],
                        }))
                      : "";
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
                    var nvPost = "";
                    {
                      value && event.type == "set"
                        ? ((nvPost =
                            value?.getHours() +
                            ":" +
                            (value?.getMinutes() < 10
                              ? "0" + value?.getMinutes()
                              : value?.getMinutes())),
                          setPost({
                            ...post,
                            date: [
                              post.date[0],
                              post.date[1],
                              post.date[2],
                              nvPost,
                            ],
                          }))
                        : "";
                    }
                    setTimePEnd(false);
                  }}
                />
              )}
            </View>
          </View>
        ) : null}
        <TouchableOpacity style={styles.buttonContainer} onPress={modifPost}>
          <Text style={styles.appButtonText}>Modifier le post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    // marginTop: Constants.statusBarHeight,
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
    width: 200,
    margin: 10,
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  tagsSelected: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
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
  //   paddingRight: 30, // to ensure the text is never behind the icon
  // },
  // inputAndroid: {
  //   height: 50,
  //   fontSize: 15,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderWidth: 0.5,
  //   borderColor: "purple",
  //   borderRadius: 8,
  //   color: "black",
  //   paddingRight: 30, // to ensure the text is never behind the icon
  // },
});
