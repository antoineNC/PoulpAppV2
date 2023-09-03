import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";
import { Partenariat } from "../service/collecInterface";
import { Icon } from "@rneui/themed";

export default function PartenariatDisp(props: {
  parteDisp: Partenariat;
  setModal: (state: boolean) => void;
}) {
  return (
    <View style={styles.container}>
      <Icon
        style={{ alignSelf: "flex-end", marginRight: 20, marginTop: 20 }}
        name="close"
        type="simple-line-icon"
        color={"#52234E"}
        size={35}
        onPress={() => {
          props.setModal(false);
        }}
      />
      {/* Partie de description du partenariat avec le logo, le nom qui est donné grace aux fonctions de navigation
              une description et l'adresse qui redirige sur google map une fois qu'on clique dessus */}
      <View style={styles.image_description_container}>
        <Image source={{ uri: props.parteDisp.image }} style={styles.strech} />
        <Text style={{ fontSize: 20 }}>{props.parteDisp.nom}</Text>
        <Text style={styles.description}>{props.parteDisp.description}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(props.parteDisp.adresseMap)}
        >
          <View style={styles.adresse}>
            <Icon
              style={{ margin: 7 }}
              name="map-marker-radius"
              type="material-community"
              color="#52234E"
              size={20}
            />
            <Text style={styles.adresseText}>{props.parteDisp.adresse}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* La présentation des différents avantages qu'offre ce partenariat. C'est une simple liste */}
      <View style={styles.partie}>
        <Text style={styles.titretext}> Les avantages</Text>
        <View style={styles.separator} />
        <View>
          {props.parteDisp.avantages.map((item, key) => (
            <Text key={key} style={styles.avantageContent}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
  },
  image_description_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  strech: {
    resizeMode: "contain",
    height: 200,
    width: Dimensions.get("window").width,
  },
  description: {
    marginTop: 10,
    textAlign: "center",
  },
  adresse: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  adresseText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  partie: {
    paddingVertical: 10,
  },
  titretext: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    alignSelf: "center",
    marginVertical: 10,
    height: 1,
    width: "80%",
    backgroundColor: "#52234E",
  },
  avantageContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
  },
});
