import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { Points } from "../service/collecInterface";
import { CurrentUserContext } from "../service/context";

interface PointItemProps {
  point: Points;
  removeEvent: (id?: string) => void;
  modifEvent: (point: Points) => void;
}

export default function PointItem({
  point,
  removeEvent,
  modifEvent,
}: PointItemProps) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titreEtDate}>
          <Text style={styles.titreText}>{point.titre}</Text>
          <Text style={styles.date}>{point.date}</Text>
        </View>

        {/*Si l'utilisateur est le créateur du post, alors on affiche les boutons de suppression et modification */}
        {currentUser.isAdmin === 0 || currentUser.sessionId === "BDF" ? (
          <View style={styles.optionButtons}>
            <TouchableOpacity onPress={() => removeEvent(point.id)}>
              <Icon
                style={{ margin: 10 }}
                size={20}
                name="trash"
                type="font-awesome"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => modifEvent(point)}>
              <Icon
                style={{ margin: 10, marginRight: 20 }}
                size={20}
                name="pencil"
                type="font-awesome"
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={styles.tableauPoints}>
        <View>
          <Text>Bleu</Text>
          <Text>+{point.bleu}</Text>
        </View>
        <View>
          <Text>Jaune</Text>
          <Text>+{point.jaune}</Text>
        </View>
        <View>
          <Text>Orange</Text>
          <Text>+{point.orange}</Text>
        </View>
        <View>
          <Text>Rouge</Text>
          <Text>+{point.rouge}</Text>
        </View>
        <View>
          <Text>Vert</Text>
          <Text>+{point.vert}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#52234E",
    borderRadius: 10,
    paddingTop: 5,
    margin: 6,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F0E4EF",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titreEtDate: {
    flex: 4,
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  titreText: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    flex: 1,
  },
  optionButtons: {
    flex: 1,
    flexDirection: "row",
  },
  tableauPoints: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
