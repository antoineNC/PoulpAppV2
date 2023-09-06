import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { BureauxScreenNavProp } from "../../navigation/types";

export default function Bureaux({ navigation }: BureauxScreenNavProp) {
  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BureauProfil", { idBureau: "BDE" })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Bureau Des Elèves</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../image/bde.png")}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BureauProfil", { idBureau: "BDS" })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Bureau Des Sports</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../image/bds.png")}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BureauProfil", { idBureau: "BDA" })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Bureau Des Arts</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../image/bda.png")}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BureauProfil", { idBureau: "JE" })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Junior Entreprise - I2C</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../image/je.png")}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BureauProfil", { idBureau: "BDF" })}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Bureau Des Familles</Text>
        </View>

        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require("../../image/bdf.png")}
            resizeMode="center"
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#52234E",
    backgroundColor: "#dfc9ec",
    elevation: 3, //android
    shadowOpacity: 0.2, //ios
  },
  textContainer: {
    flex: 1,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "bold", fontSize: 16 },
  separator: { borderTopWidth: 0.7, borderColor: "#52234E" },
  imgContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { flex: 1, height: 100, width: 100 },
});
