import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import firestoreService from "../../service/firestore.service";
import { Icon } from "@rneui/themed";
import { AddPointScreenNavProp } from "../../navigation/types";
import { Points } from "../../service/collecInterface";

export default function AddPoints({ navigation }: AddPointScreenNavProp) {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today =
      year +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      (date < 10 ? "0" : "") +
      date;

    return today;
  };

  const [point, setPoint] = useState<Points>({
    id: "",
    titre: "",
    date: getCurrentDate(),
    bleu: 0,
    jaune: 0,
    orange: 0,
    rouge: 0,
    vert: 0,
  });
  const [datePicker, setDatePicker] = useState(false);

  const addEvent = () => {
    // Vérification si le post n'est pas vide (il doit contenir au moins un titre)
    if (point.titre != "") {
      // Création du post en faisant appel à firestore.Service
      firestoreService.addEvent({
        id: point.id,
        titre: point.titre,
        date: point.date,
        bleu: point.bleu,
        jaune: point.jaune,
        orange: point.orange,
        rouge: point.rouge,
        vert: point.vert,
      });
      // Une fois l'événement créé, on navigue vers l'écran du fil d'actualité
      navigation.navigate("Points");
    } else {
      Alert.alert("Attention", "Le post doit au moins contenir un titre.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Titre"
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => setPoint({ ...point, titre: text })}
          />
        </View>
        <View style={styles.timePickerContainer}>
          <Text style={{ width: 50 }}>Date : </Text>
          <TouchableOpacity
            style={[styles.dtPicker, { width: 130 }]}
            onPress={() => setDatePicker(true)}
          >
            <Icon name="calendar" type="font-awesome" color="#52234E" />
            <Text>{point.date}</Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
              value={new Date()}
              display="default"
              onChange={(event, date) => {
                var nvDate = point.date;
                date && event.type == "set"
                  ? (nvDate =
                      date.getFullYear() +
                      "/" +
                      (date.getMonth() < 9 ? "0" : "") +
                      (date.getMonth() + 1) +
                      "/" +
                      (date.getDate() < 10 ? "0" : "") +
                      date.getDate())
                  : "";
                setPoint({ ...point, date: nvDate });
                setDatePicker(false);
              }}
            />
          )}
        </View>
        <View style={styles.tableauPoints}>
          <View style={styles.familleContainer}>
            <Text style={styles.famille}>Bleu :</Text>
            <Text style={styles.famille}>Jaune :</Text>
            <Text style={styles.famille}>Orange :</Text>
            <Text style={styles.famille}>Rouge :</Text>
            <Text style={styles.famille}>Vert :</Text>
          </View>
          <View style={styles.inputContainer}>
            <NumericInput
              value={point.bleu}
              onChange={(text: number) => {
                setPoint({ ...point, bleu: text });
              }}
              onLimitReached={(isMax: any, msg: any) => console.log(isMax, msg)}
              totalHeight={40}
              totalWidth={250}
              separatorWidth={0.5}
              rounded
              rightButtonBackgroundColor="whitesmoke"
              leftButtonBackgroundColor="whitesmoke"
              inputStyle={{ borderWidth: 0 }}
              containerStyle={styles.pointInput}
              borderColor={"black"}
            />
            <NumericInput
              value={point.jaune}
              onChange={(text: number) => {
                setPoint({ ...point, jaune: text });
              }}
              onLimitReached={(isMax: any, msg: any) => console.log(isMax, msg)}
              totalHeight={40}
              totalWidth={250}
              separatorWidth={0.5}
              rounded
              rightButtonBackgroundColor="whitesmoke"
              leftButtonBackgroundColor="whitesmoke"
              inputStyle={{ borderWidth: 0 }}
              containerStyle={styles.pointInput}
              borderColor={"black"}
            />
            <NumericInput
              value={point.orange}
              onChange={(text: number) => {
                setPoint({ ...point, orange: text });
              }}
              onLimitReached={(isMax: any, msg: any) => console.log(isMax, msg)}
              totalHeight={40}
              totalWidth={250}
              separatorWidth={0.5}
              rounded
              rightButtonBackgroundColor="whitesmoke"
              leftButtonBackgroundColor="whitesmoke"
              inputStyle={{ borderWidth: 0 }}
              containerStyle={styles.pointInput}
              borderColor={"black"}
            />
            <NumericInput
              value={point.rouge}
              onChange={(text: number) => {
                setPoint({ ...point, rouge: text });
              }}
              onLimitReached={(isMax: any, msg: any) => console.log(isMax, msg)}
              totalHeight={40}
              totalWidth={250}
              separatorWidth={0.5}
              rounded
              rightButtonBackgroundColor="whitesmoke"
              leftButtonBackgroundColor="whitesmoke"
              inputStyle={{ borderWidth: 0 }}
              containerStyle={styles.pointInput}
              borderColor={"black"}
            />
            <NumericInput
              value={point.vert}
              onChange={(text: number) => {
                setPoint({ ...point, vert: text });
              }}
              onLimitReached={(isMax: any, msg: any) => console.log(isMax, msg)}
              totalHeight={40}
              totalWidth={250}
              separatorWidth={0.5}
              rounded
              rightButtonBackgroundColor="whitesmoke"
              leftButtonBackgroundColor="whitesmoke"
              inputStyle={{ borderWidth: 0 }}
              containerStyle={styles.pointInput}
              borderColor={"black"}
            />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={addEvent}>
          <Text style={styles.addBtnText}>Publier les points de famille</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 5,
  },
  titre: {
    flexBasis: "auto",
    flexGrow: 1,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  textInput: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 40,
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  dtPicker: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10,
    height: 40,
  },
  tableauPoints: {
    flexDirection: "row",
  },
  familleContainer: {
    flexBasis: 100,
  },
  famille: {
    height: 50,
    marginVertical: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputContainer: {
    flexBasis: "auto",
    flexGrow: 1,
  },
  pointInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#52234E",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 90,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addBtnText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

// Styles spécifiques pour les dateTimePicker
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 30,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    height: 40,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
