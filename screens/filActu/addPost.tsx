import { useContext, useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Timestamp } from "firebase/firestore";
import firestoreService from "../../service/firestore.service";
import { Post } from "../../service/collecInterface";
import { AddPostScreenNP } from "../../navigation/types";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CurrentUserContext } from "../../service/context";
import PostForm from "../../components/postForm";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../../service/notifications";
import * as Notifications from "expo-notifications";
import { colors } from "../../theme/colors";

export default function AddPost({ navigation }: AddPostScreenNP) {
  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token !== undefined) setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current !== undefined)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current !== undefined)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

  const { currentUser } = useContext(CurrentUserContext);
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
  const [loading, setLoading] = useState(false);

  const addPost = () => {
    // Vérification si le post n'est pas vide (il doit contenir au moins un titre)
    if (post.titre != "") {
      var nvPost = post;
      if (currentUser.isAdmin === 1) nvPost.editor = currentUser.sessionId;
      else nvPost.editor = "BDE";
      if (post.visibleCal === false) {
        // Si ce n'est pas un événement, on remplit les champs correspondant à un événement par ""
        // (sinon, la date d'aujourd'hui serait enregistrée par défaut)
        nvPost.date = ["", "", "", ""];
      }
      if (post.image !== "") {
        setLoading(true);
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
                console.log("nvpost", nvPost);
                firestoreService.addPost(nvPost);
                console.log("token:", expoPushToken);
                console.log("notification:", notification);
                schedulePushNotification(
                  nvPost.titre,
                  "Nouveau post sur la Polp'App !"
                ).then(() => navigation.goBack());
              });
            }
          );
        });
      } else {
        console.log("nvpost", nvPost);
        firestoreService.addPost(nvPost);
        schedulePushNotification(nvPost.titre, nvPost.description).then(() =>
          navigation.goBack()
        );
      }
    } else {
      Alert.alert("Erreur", "Le post doit au moins contenir un titre");
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
      <TouchableOpacity style={styles.buttonContainer} onPress={addPost}>
        <Text style={styles.appButtonText}>Publier le post</Text>
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
