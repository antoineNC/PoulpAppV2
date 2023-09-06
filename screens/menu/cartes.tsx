import { Card } from "@rneui/themed";
import { useEffect, useState, useContext } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import firestoreService from "../../service/firestore.service";
import { CurrentUserContext } from "../../service/context";

export default function Cartes() {
  const { currentUser } = useContext(CurrentUserContext);

  const [adhesion, setAdhesion] = useState<string[]>([]);
  useEffect(() => {
    firestoreService.getProfile(currentUser, (profil) => {
      if (typeof profil.info !== "string") setAdhesion(profil.info);
    });
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        {adhesion[0] === undefined ? (
          <Text style={{ alignSelf: "center", justifyContent: "center" }}>
            Vous n'avez aucune adhésion en cours :'(
          </Text>
        ) : null}
        {adhesion.includes("BDE") ? (
          <View>
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
          <View>
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
          <View>
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
          <View>
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
  card: { borderRadius: 10, backgroundColor: "#dfc9ec" },
});
