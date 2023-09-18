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
import { colors } from "../theme/colors";

export default function PartenariatDisp(props: {
  parteDisp: Partenariat;
  setModal: (state: boolean) => void;
}) {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.close}
        name="close"
        type="simple-line-icon"
        color={colors.primary}
        size={35}
        onPress={() => {
          props.setModal(false);
        }}
      />
      {/* Partie de description du partenariat avec le logo, le nom qui est donné grace aux fonctions de navigation
              une description et l'adresse qui redirige sur google map une fois qu'on clique dessus */}
      <View style={styles.image_description_container}>
        <Image source={{ uri: props.parteDisp.logo }} style={styles.strech} />
        <Text style={styles.nom}>{props.parteDisp.nom}</Text>
        <Text style={styles.description}>{props.parteDisp.description}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(props.parteDisp.adresseMap)}
        >
          <View style={styles.adresse}>
            <Icon
              style={styles.iconAdresse}
              name="map-marker-radius"
              type="material-community"
              color={colors.primary}
              size={20}
            />
            <Text style={styles.adresseText}>{props.parteDisp.adresse}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* La présentation des différents avantages qu'offre ce partenariat. C'est une simple liste */}
      <View style={styles.avantages}>
        <Text style={styles.avantageHeader}> Les avantages</Text>
        <View style={styles.separator} />
        <View>
          {props.parteDisp.avantages.map((item, key) => (
            <Text key={key} style={styles.avantageContent}>
              - {item}
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
    marginHorizontal: 10,
  },
  close: { alignSelf: "flex-end", marginRight: 20, marginTop: 20 },
  image_description_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  strech: {
    resizeMode: "center",
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  nom: { fontSize: 20, marginTop: 15 },
  description: {
    marginTop: 10,
    textAlign: "center",
  },
  adresse: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  iconAdresse: { margin: 7 },
  adresseText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  avantages: {
    paddingVertical: 10,
  },
  avantageHeader: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    alignSelf: "center",
    marginVertical: 10,
    height: 1,
    width: "80%",
    backgroundColor: colors.primary,
  },
  avantageContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
  },
});
