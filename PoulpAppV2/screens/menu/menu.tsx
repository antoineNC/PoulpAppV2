import { Text, TouchableOpacity, View } from "react-native";
import { MenuScreenNavProp } from "../../navigation/types";
import styles from "../../theme/styles";

function SettingsScreen({ navigation }: MenuScreenNavProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is le MENU</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Clubs")}>
        Les Clubs
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;
