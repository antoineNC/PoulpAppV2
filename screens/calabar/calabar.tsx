import { Text, View } from "react-native";
import styles from "../../theme/styles";

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: "white" }]}>
        This is the Calabar screen (WIP)
      </Text>
    </View>
  );
}

export default SettingsScreen;
