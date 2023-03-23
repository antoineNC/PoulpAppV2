import { Text, TouchableOpacity, View } from "react-native";
import { ClubsScreenNavProp } from "../../navigation/types";
import styles from "../../theme/styles";

function SettingsScreen({ navigation }: ClubsScreenNavProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is les CLUBS</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Bureaux")}>
        Les bureaux
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;
