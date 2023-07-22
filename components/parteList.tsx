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
import { Partenariat } from "../service/collecInterface";

export default function PartenariatList(props: {
  bureau: "BDE" | "BDS" | "BDA" | "JE";
  onPress: (partenariat: Partenariat) => void;
}) {
  const [partenariats, setPartenariats] = useState<Partenariat[]>();
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenPartenariats(
        (partenariats) => setPartenariats(partenariats),
        props.bureau
      );
    };
    getData();
  }, []);
  return (
    <FlatList
      style={styles.flatlist}
      contentContainerStyle={styles.content}
      data={partenariats}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => props.onPress(item)}>
            <View style={styles.club}>
              <Image
                source={{ uri: item.image }}
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
