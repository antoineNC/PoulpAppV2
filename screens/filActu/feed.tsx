import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import styles from "../../theme/styles";
import { FeedScreenNavProp } from "../../navigation/types";
import PostList from "../../components/postList";
import { Post } from "../../service/collecInterface";
import firestoreService from "../../service/firestore.service";

function FeedScreen({ navigation }: FeedScreenNavProp) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    firestoreService.listenPost((posts) => setPosts(posts));
    firestoreService.checkIfAdmin().then((response) => {
      // setIsAdmin(response);
      setIsAdmin(true);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <PostList posts={posts} navigation={navigation} />

      {/*Si c'est un admin, alors on affiche le bouton flottant, sinon rien (null)*/}
      {isAdmin ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPost")}
          style={styles.floatingButton}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: 30,
              height: 30,
            }}
          />
          <Icon
            name="pluscircle"
            type="antdesign"
            color={"#52234E"}
            size={55}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default FeedScreen;
