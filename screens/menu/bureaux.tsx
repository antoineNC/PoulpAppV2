import { Card } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function Bureaux() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Dimensions.get("window").height * 0.1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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