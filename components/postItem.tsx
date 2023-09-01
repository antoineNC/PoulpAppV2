import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { postStyle } from "../theme/styles";
import { Icon } from "@rneui/themed";
import { Post } from "../service/collecInterface";
import firestoreService from "../service/firestore.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type Props = {
  post: Post;
  removePost: (post: Post) => void;
  modifPost: (post: Post) => void;
};

export default function PostItem({ post, removePost, modifPost }: Props) {
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
  return (
    <View style={postStyle.postContainer}>
      <View style={postStyle.headerContainer}>
        <View>
          <Image source={getImagePath()} style={postStyle.logo} />
        </View>

        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={postStyle.titreContainer}>
            <Text style={postStyle.titreText}>{post.titre}</Text>

            {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}
            {editing ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={() => removePost(post)}>
                  <Icon
                    style={{ margin: 10, marginRight: 15 }}
                    size={20}
                    name="trash"
                    type="font-awesome"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => modifPost(post)}>
                  <Icon
                    style={{ margin: 10, marginLeft: 15 }}
                    size={20}
                    name="pencil"
                    type="font-awesome"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          {/*Affichage de la liste de tags */}
          <View>
            <FlatList
              style={{ flexDirection: "row", flexWrap: "wrap" }}
              data={post.tags}
              keyExtractor={(tag) => tag}
              renderItem={({ item }: { item: string }) => (
                <Text> [{item}] </Text>
              )}
            />
          </View>

          {/*S'il s'agit d'un événement visible sur le calendrier, on affiche les dates */}
          {post.visibleCal == true ? (
            <View style={postStyle.calendarView}>
              <Icon
                style={postStyle.calendarIcon}
                size={25}
                name="calendar"
                type="font-awesome"
              />
              <View>
                <Text style={postStyle.calendarText}>
                  Du : {post.date[0]} à {post.date[2]}
                </Text>
                <Text style={postStyle.calendarText}>
                  Au : {post.date[1]} à {post.date[3]}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>

      <View style={postStyle.descriptionContainer}>
        <Text numberOfLines={4}>
          {/*Limitation du nombre de lignes affichées*/}
          {post.description}
        </Text>
      </View>

      {/*Si le post contient une image, on l'affiche */}
      {post.image != "" ? (
        <Image source={{ uri: post.image }} style={postStyle.image} />
      ) : null}
    </View>
  );
}
