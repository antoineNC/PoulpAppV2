import { useEffect, useState } from "react";
import { Post } from "../service/collecInterface";
import { Alert, FlatList, Modal, TouchableOpacity, View } from "react-native";
import firestoreService from "../service/firestore.service";
import styles from "../theme/styles";
import PostItem from "./postItem";
import PostDisplayed from "./postDisplayed";
import { Timestamp } from "firebase/firestore";
import { RouteProp } from "@react-navigation/native";
import { FeedFamStackParamList } from "../navigation/types";

export default function PostList(props: {
  posts: Array<Post>;
  navigation: { navigate: (arg0: string, arg1: { post: Post }) => any };
  route?: RouteProp<FeedFamStackParamList, "FeedFamille">;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [postDisplayed, setPostDisplayed] = useState<Post>({
    id: "",
    titre: "",
    description: "",
    tags: [],
    visibleCal: false,
    date: ["", "", "", ""],
    image: "",
    editor: "",
    timeStamp: Timestamp.now(),
  });

  // Fonction appelée lors de la suppression d'un post
  const removePost = (post?: Post) => {
    // Une alerte s'affiche pour confirmer la suppression
    Alert.alert(
      "Attention",
      "Etes-vous sûr(e) de vouloir supprimer ce post ?",
      [
        {
          text: "Oui",
          onPress: () => {
            // Si l'utilisateur veut effectivement supprimer le post, on fait appel au firestoreService
            if (post) {
              if (post.image !== "")
                firestoreService.deleteImageFromStorage(post.image);
              firestoreService.removePost(post.id);
            }
            // Si l'utilisateur supprime le post depuis le "pop-up" (postDisplayed), alors on ferme le modal
            if (isVisible == true) {
              toggleModal();
            }
          },
        },
        {
          text: "Non",
          onPress: () => {},
        },
      ]
    );
  };

  // Permet de naviguer vers l'écran de modification d'un post
  const modifPost = (post: Post) => {
    if (props.route) {
      props.navigation.navigate("ModifPostFamille", { post: post }); // On passe en paramètre le post en question à modifier
    } else {
      props.navigation.navigate("ModifPost", { post: post });
    }

    // Si l'utilisateur modifie le post depuis le "pop-up" (postDisplayed), alors on ferme le modal
    if (isVisible == true) {
      toggleModal();
    }
  };

  // Permet d'afficher ou de fermer le modal (c'est à dire le post "pop-up")
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  // Fonction appellée lors d'un clique sur un post.
  const displayPost = (post: Post) => {
    // Le post à afficher est stocké dans le state
    var display = { ...postDisplayed };
    display = post;
    setPostDisplayed(display);

    // Le "pop-up" apparait
    toggleModal();
  };

  return (
    <View style={styles.mainContainer}>
      {/*Si le modal est visible, il affiche le post à afficher sous forme de pop-up*/}
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <PostDisplayed
            post={postDisplayed}
            removePost={removePost}
            modifPost={modifPost}
            onPressClose={toggleModal}
            navigation={props.navigation}
          />
        </View>
      </Modal>

      <FlatList<Post>
        data={props.posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => displayPost(item)}>
            <PostItem
              post={item}
              removePost={removePost}
              modifPost={modifPost}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
