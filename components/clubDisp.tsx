import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Club } from "../service/collecInterface";
import { Icon } from "@rneui/themed";
import { colors } from "../theme/colors";

export default function ClubDisp(props: {
  clubDisp: Club;
  setModal: (state: boolean) => void;
}) {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="close"
        type="simple-line-icon"
        color={colors.primary}
        size={35}
        onPress={() => {
          props.setModal(false);
        }}
      />
      <View style={styles.image_description_container}>
        <Image source={{ uri: props.clubDisp.logo }} style={styles.strech} />
        <Text style={styles.nom}>{props.clubDisp.nom}</Text>
        <Text style={styles.description}>{props.clubDisp.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => Linking.openURL(props.clubDisp.contact)}
      >
        <Text style={styles.appButtonText}>Nous contacter</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nom: { fontSize: 20 },
  icon: { alignSelf: "flex-end", marginRight: 20, marginTop: 20 },
  image_description_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  strech: {
    resizeMode: "contain",
    height: 200,
    width: 150,
  },
  description: {
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    margin: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
