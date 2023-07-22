import { Card } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import firestoreService from "../../service/firestore.service";

export default function Cartes() {
  const [adhesion, setAdhesion] = useState<string[]>([]);
  useEffect(() => {
    firestoreService.getProfile((profil) => {
      if (typeof profil.info !== "string") setAdhesion(profil.info);
    });
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        {adhesion[0] === undefined ? (
          <Text style={{ alignSelf: "center" }}>
            Vous n'avez aucune adhésion en cours :'(
          </Text>
        ) : null}
        {adhesion.includes("BDE") ? (
          <View style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau Des Elèves</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bde.png")}
                resizeMode="contain"
              />
            </Card>
          </View>
        ) : null}

        {adhesion.includes("BDS") ? (
          <View style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau Des Sports</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bds.png")}
                resizeMode="contain"
              />
            </Card>
          </View>
        ) : null}

        {adhesion.includes("BDA") ? (
          <View style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title>Bureau des Arts</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/bda.png")}
                resizeMode="contain"
              />
            </Card>
          </View>
        ) : null}

        {adhesion.includes("JE") ? (
          <View style={styles.cardContainer}>
            <Card containerStyle={styles.card}>
              <Card.Title>Junior Entreprise - I2C</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ padding: 0 }}
                source={require("../../image/je.png")}
                resizeMode="contain"
              />
            </Card>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {},
  card: { borderRadius: 10, backgroundColor: "#dfc9ec" },
});
