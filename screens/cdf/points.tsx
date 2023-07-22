import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import PointItem from "../../components/pointItem";
import firestoreService from "../../service/firestore.service";
import { Points } from "../../service/collecInterface";
import { PointScreenNavProp } from "../../navigation/types";

export default function PointScreen({ navigation }: PointScreenNavProp) {
  const [points, setPoints] = useState<Array<Points>>([]);
  const [isBdf, setIsBdf] = useState(false);

  useEffect(() => {
    // On récupère la liste de posts à afficher et on les stocke dans le state
    firestoreService.listenEvent((listPoints) => setPoints(listPoints));
    // On récupère l'utilisateur actuel de la session, et on regarde si c'est un admin ou non
    const isBdfFunc = async () => {
      if ((await firestoreService.getId()) === "BDF") {
        setIsBdf(true);
      }
    };
    isBdfFunc();
  }, []);

  // Fonction appelée lors de la suppression d'un post
  const removeEvent = (idPoint?: string) => {
    // Une alerte s'affiche pour confirmer la suppression
    Alert.alert(
      "Attention",
      "Etes-vous sûr(e) de vouloir supprimer cet event de la Coupe des Familles ?",
      [
        {
          text: "Oui",
          onPress: () => {
            // Si l'utilisateur veut effectivement supprimer le post, on fait appel au firestoreService
            if (idPoint) {
              firestoreService.removeEvent(idPoint);
            }
          },
        },
        {
          text: "Non",
          onPress: () => {},
        },
      ]
    );
  };

  // Permet de naviguer vers l'écran de modification d'un post
  const modifEvent = (points: Points) => {
    navigation.navigate("ModifPoints", { points: points }); // On passe en paramètre le post en question à modifier
  };

  const calculScore = (couleur: string) => {
    if (couleur == "bleu") {
      var bleu = 0;
      points.map((item, index) => (bleu = bleu + item.bleu));
      return bleu;
    } else if (couleur == "jaune") {
      var jaune = 0;
      points.map((item, index) => (jaune = jaune + item.jaune));
      return jaune;
    } else if (couleur == "orange") {
      var orange = 0;
      points.map((item, index) => (orange = orange + item.orange));
      return orange;
    } else if (couleur == "rouge") {
      var rouge = 0;
      points.map((item, index) => (rouge = rouge + item.rouge));
      return rouge;
    } else if (couleur == "vert") {
      var vert = 0;
      points.map((item, index) => (vert = vert + item.vert));
      return vert;
    }
  };
  return (
    <View style={styles.mainContainer}>
      {isBdf ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPoints")}
          style={styles.floatingButton}
        >
          <Text style={{ color: "white", fontSize: 17 }}>
            Ajouter des points
          </Text>
        </TouchableOpacity>
      ) : null}
      <BarChart
        data={{
          labels: ["Bleu", "Jaune", "Orange", "Rouge", "Vert"],
          datasets: [
            {
              data: [
                Number(calculScore("bleu")),
                Number(calculScore("jaune")),
                Number(calculScore("orange")),
                Number(calculScore("rouge")),
                Number(calculScore("vert")),
              ],
            },
          ],
        }}
        yAxisLabel={""}
        yAxisSuffix={""}
        showValuesOnTopOfBars={true}
        width={Dimensions.get("window").width}
        height={220}
        fromZero
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          color: (opacity = 1) => `rgba(82,35,78,${opacity})`,
        }}
        style={{
          marginTop: 10,
          alignSelf: "center",
        }}
      />

      <FlatList<Points>
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={points}
        renderItem={({ item }) => (
          <PointItem
            point={item}
            removeEvent={removeEvent}
            modifEvent={modifEvent}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  floatingButton: {
    backgroundColor: "#52234E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: Dimensions.get("window").width,
  },
});
