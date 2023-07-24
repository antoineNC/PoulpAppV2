import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import firestoreService from "../../service/firestore.service";
import { Post } from "../../service/collecInterface";
import PostList from "../../components/postList";
import { FeedFamScreenNavProps } from "../../navigation/types";

export default function FeedFamille({
  navigation,
  route,
}: FeedFamScreenNavProps) {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    firestoreService.listenPost((listPosts) => setPosts(listPosts), "BDF");
  }, []);

  return (
    <View style={styles.mainContainer}>
      <PostList posts={posts} navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  switchBtn: {
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 20,
    right: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  pointButton: {
    width: 60,
    height: 60,
    backgroundColor: "#52234E",
    position: "absolute",
    bottom: 20,
    left: 30,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  textFloatingButton: {
    color: "white",
    fontSize: 40,
  },
});
