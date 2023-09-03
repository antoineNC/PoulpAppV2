import { Card } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { BureauxScreenNavProp } from "../../navigation/types";

export default function Bureaux({ navigation }: BureauxScreenNavProp) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BureauProfil", { idBureau: "BDE" })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau Des Elèves</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bde.png")}
              />
            </Card>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BureauProfil", { idBureau: "BDS" })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau Des Sports</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bds.png")}
              />
            </Card>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BureauProfil", { idBureau: "BDA" })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau des Arts</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bda.png")}
              />
            </Card>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BureauProfil", { idBureau: "JE" })
            }
          >
            <Card containerStyle={styles.card}>
              <Card.Title>Junior Entreprise</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/je.png")}
              />
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { flex: 1 },
  card: { borderRadius: 10, backgroundColor: "#dfc9ec" },
});
