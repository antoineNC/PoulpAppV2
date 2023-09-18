import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import firestoreService from "../../service/firestore.service";
import { Icon } from "@rneui/themed";
import { ModifPointScreenNavProp } from "../../navigation/types";
import { Points } from "../../service/collecInterface";

export default function ModifEvent({
  navigation,
  route,
}: ModifPointScreenNavProp) {
  // Chaque champ est initialisé avec les données du event à modifier
  const [point, setPoint] = useState<Points>({
    id: route.params.points.id,
    titre: route.params.points.titre,
    date: route.params.points.date,
    bleu: route.params.points.bleu,
    jaune: route.params.points.jaune,
    orange: route.params.points.orange,
    rouge: route.params.points.rouge,
    vert: route.params.points.vert,
  });
  const [datePicker, setDatePicker] = useState(false);

  // Fonction appellée au clic sur le bouton 'Modifier le post'
  // Fait appel au firestoreService pour modifier le post en question
  const modifEvent = () => {
    firestoreService.modifEvent(point);
    navigation.navigate("Points");
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.textInput}>
          <TextInput
            value={point.titre}
            style={{ width: 300, fontSize: 15 }}
            onChangeText={(text) => {
              setPoint({ ...point, titre: text });
            }}
          />
        </View>
        <View style={styles.timePickerContainer}>
          <Text style={{ width: 50 }}>Date : </Text>
          <TouchableOpacity
            style={[styles.dtPicker, { width: 130 }]}
            onPress={() => setDatePicker(true)}
          >
            <Icon name="calendar" type="font-awesome" color=colors.primary />
            <Text>{point.date}</Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
              display="default"
              value={new Date()}
              onChange={(event, date) => {
                var nvPoint = point;
                date && event.type == "set"
                  ? (nvPoint.date =
                      date.getFullYear() +
                      "/" +
                      (date.getMonth() < 9 ? "0" : "") +
                      (date.getMonth() + 1) +
                      "/" +
                      (date.getDate() < 10 ? "0" : "") +
                      date.getDate())
                  : "";
                setDatePicker(false);
                setPoint(nvPoint);
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
        <TouchableOpacity style={styles.buttonContainer} onPress={modifEvent}>
          <Text style={styles.addBtnText}>Modifier l'event</Text>
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
    backgroundColor: colors.primary,
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
