import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import firestoreService from "../service/firestore.service";
import { Club } from "../service/collecInterface";

export default function ClubList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
  onPress: (club: Club) => void;
}) {
  const [clubs, setClubs] = useState<Club[]>();
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenClubs((clubs) => setClubs(clubs), props.bureau);
    };
    getData();
  }, []);
  return (
    <FlatList
      style={styles.flatlist}
      contentContainerStyle={styles.content}
      data={clubs}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => props.onPress(item)}>
            <View style={styles.club}>
              <Image
                source={{ uri: item.logo }}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text style={styles.nomText}>{item.nom}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    // flexWrap:'wrap'
  },
  content: {
    // alignItems: 'flex-start',
    // flexDirection: 'row',
    // flex: 1,
    marginHorizontal: 0,
  },
  club: {
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  nomText: {
    fontSize: 8,
    fontWeight: "bold",
    paddingVertical: 7,
  },
});
