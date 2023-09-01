import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import { Post } from "../service/collecInterface";
import { postDisStyle } from "../theme/styles";
import { Icon } from "@rneui/themed";
import firestoreService from "../service/firestore.service";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  post: Post;
  removePost: (post: Post) => void;
  modifPost: (post: Post) => void;
  onPressClose: () => void;
  navigation: any;
};

export default function PostDisplayed({
  post,
  removePost,
  modifPost,
  onPressClose,
  navigation,
}: Props) {
  const [editing, setEditing] = useState(true);

  // ==== IMPORTANT, check si l'utlisateur est bien l'éditeur du post
  // useEffect(() => {
  //   const isEditor = async () => {
  //     const userId = await AsyncStorage.getItem("sessionId");
  //     if (userId == post.editor) {
  //       setEditing(true);
  //     }
  //   };
  //   isEditor();
  // }, []);

  // Permet de récupérer le chemin d'accès de l'image associé à l'association qui a créé le post
  const getImagePath = () => {
    if (post.editor == "BDE") {
      return require("../image/bde.png");
    } else if (post.editor == "BDS") {
      return require("../image/bds.png");
    } else if (post.editor == "BDA") {
      return require("../image/bda.png");
    } else if (post.editor == "BDF") {
      return require("../image/bdf.png");
    } else if (post.editor == "JE") {
      return require("../image/je.png");
    }
  };

  // Permet de naviguer vers l'écran du calendrier
  const goToCalendar = () => {
    onPressClose(); // Permet de fermer le modal
    navigation.navigate("Calendrier");
  };
  return (
    <ScrollView>
      <View style={postDisStyle.postContainer}>
        <TouchableOpacity
          style={postDisStyle.closeButton}
          onPress={onPressClose}
        >
          <Icon
            name="window-close"
            type="font-awesome"
            color="#52234E"
            size={30}
          />
        </TouchableOpacity>

        <View style={postDisStyle.headerContainer}>
          <View>
            <Image source={getImagePath()} style={postDisStyle.logo} />
          </View>

          <View style={{ flex: 1 }}>
            <View style={postDisStyle.titreContainer}>
              <Text style={postDisStyle.titreText}>{post.titre}</Text>
            </View>

            {/*Affichage de la liste de tags */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {post.tags.map((value, index) => (
                <Text key={index}> [{value}] </Text>
              ))}
            </View>

            {/*S'il s'agit d'un événement visible sur le calendrier, on affiche les dates */}
            {post.visibleCal == true ? (
              <TouchableOpacity onPress={goToCalendar}>
                <View style={postDisStyle.calendarView}>
                  <Icon
                    style={postDisStyle.calendarIcon}
                    size={25}
                    name="calendar"
                    type="font-awesome"
                  />
                  <View>
                    <Text style={postDisStyle.calendarText}>
                      Du : {post.date[0]} à {post.date[2]}
                    </Text>
                    <Text style={postDisStyle.calendarText}>
                      Au : {post.date[1]} à {post.date[3]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View style={postDisStyle.descriptionContainer}>
          <Text>{post.description}</Text>
        </View>

        {/*Si le post contient une image, on l'affiche */}
        {post.image != "" ? (
          <Image source={{ uri: post.image }} style={postDisStyle.image} />
        ) : null}

        {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}
        {editing ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => removePost(post)}
              style={postDisStyle.appButtonContainer}
            >
              <Icon
                style={{ margin: 10 }}
                size={20}
                name="trash"
                color="white"
                type="font-awesome"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => modifPost(post)}
              style={postDisStyle.appButtonContainer}
            >
              <Icon
                style={{ margin: 10 }}
                size={20}
                name="pencil"
                color="white"
                type="font-awesome"
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
