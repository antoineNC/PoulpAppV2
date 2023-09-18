import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import firestoreService from "../../service/firestore.service";
import { Post } from "../../service/collecInterface";
import { ModifPostScreenNavProp } from "../../navigation/types";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import PostForm from "../../components/postForm";
import { colors } from "../../theme/colors";

export default function ModifPostFamille({
  navigation,
  route,
}: ModifPostScreenNavProp) {
  const [post, setPost] = useState<Post>(route.params.post);
  const [loading, setLoading] = useState(false);

  // Fonction appellée au clic sur le bouton 'Modifier le post'
  // Fait appel au firestoreService pour modifier le post en question
  const modifPost = () => {
    var nvPost = post;
    if (post.visibleCal == false) {
      // Si ce n'est pas un événement, on remplit les champs correspondant à un événement par ""
      // (sinon, la date d'aujourd'hui serait enregistrée par défaut)
      nvPost.date = ["", "", "", ""];
    }
    if (
      post.image !== "" &&
      !post.image.startsWith("https://firebasestorage.googleapis.com")
    ) {
      setLoading(true);
      if (route.params.post.image !== "")
        firestoreService.deleteImageFromStorage(route.params.post.image);
      firestoreService.storeImage(post.image).then((res) => {
        const uploadTask = uploadBytesResumable(res.storageRef, res.blob);
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.log("Error", error.message);
            setLoading(false);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              nvPost.image = downloadURL;
              setLoading(false);
              firestoreService.modifPost(nvPost);
              navigation.navigate("FeedFamille");
            });
          }
        );
      });
    } else {
      firestoreService.modifPost(nvPost);
      navigation.navigate("FeedFamille");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            backgroundColor: "white",
            opacity: 0.8,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : null}
      {PostForm(post, setPost)}
      <TouchableOpacity style={styles.buttonContainer} onPress={modifPost}>
        <Text style={styles.appButtonText}>Modifier le post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
