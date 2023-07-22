import React, { useState, useEffect } from "react";
import { View } from "react-native";
import firestoreService from "../../service/firestore.service";
import { Post } from "../../service/collecInterface";
import PostList from "../../components/postList";
import { Calendar } from "react-native-calendars";
import { CalScreenNP } from "../../navigation/types";

export default function Calendrier({ navigation }: CalScreenNP) {
  // Permet de récupérer la date d'aujourd'hui pour initialiser la date sélectionnée
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var today =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (date < 10 ? "0" : "") +
      date;
    return today;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [events, setEvents] = useState({});
  const [eventSelected, setEventSelected] = useState<Array<Post>>([]);

  // Le calendrier accepte les dates sous format "AAAA-MM-JJ"
  // Les dates affichées sur les posts sont sous format "JJ/MM/AAA"
  // Il faut donc pouvoir convertir les dates "JJ/MM/AAA" en "AAAA-MM-JJ"
  const convertDateFormatSlashToUnderscore = (slashFormat: string) => {
    var dateSplitted = slashFormat.split("/");
    var newDate =
      dateSplitted[2] + "-" + dateSplitted[1] + "-" + dateSplitted[0];
    return newDate;
  };

  // Conversion du format "AAAA-MM-JJ" en "JJ/MM/AAA"
  const convertDateFormatUnderscoreToSlash = (slashFormat: string) => {
    var dateSplitted = slashFormat.split("-");
    var newDate =
      dateSplitted[2] + "/" + dateSplitted[1] + "/" + dateSplitted[0];
    return newDate;
  };

  useEffect(() => {
    // On crée un tableau qui va accueillir toutes les dates devant être marquées sur le calendrier
    let marquedDates: { [key: string]: {} } = {};

    // Pour chaque post, on récupère sa date de début et on la met dans notre tableau
    // Pour chaque date récupérée, on lui donne un style (pour être marquée sur le calendrier)
    firestoreService.listenPost((posts) => {
      posts.forEach((post) => {
        if (post.date[0] !== "") {
          marquedDates[convertDateFormatSlashToUnderscore(post.date[0])] = {
            marked: true,
            dotColor: "#57B9BB",
          };
          // Idem avec la date de fin
          marquedDates[convertDateFormatSlashToUnderscore(post.date[1])] = {
            marked: true,
            dotColor: "#57B9BB",
          };
        }
      });
      // On ajoute à notre tableau la date sélectionnée par l'utilisateur, qui est marquée avec un style différent
      marquedDates[selectedDate] = {
        selected: true,
      };
    });

    // On ajoute à notre tableau la date sélectionnée par l'utilisateur, qui est marquée avec un style différent
    marquedDates[selectedDate] = {
      selected: true,
    };

    firestoreService.listenPostDate(
      (postsDebut) => setEventSelected(postsDebut),
      convertDateFormatUnderscoreToSlash(selectedDate)
    );

    // Mise à jour du state
    setEvents(marquedDates);
  }, []);

  // Permet d'afficher (ou non) l'événement associé à une date
  const displaySelectedEvent = (date: string) => {
    // On récupère depuis la BDD tous les posts qui ont pour date (début ou fin) la date sélectionnée
    // Et on met à jour le state avec les posts correspondant
    firestoreService.listenPostDate(
      (postsDebut) => setEventSelected(postsDebut),
      convertDateFormatUnderscoreToSlash(date)
    );
  };

  // Lorsqu'un utilisateur clique sur une nouvelle date,
  // il faut mettre à jour quelles dates doivent être marquées
  const onPressDay = (date: string) => {
    displaySelectedEvent(date);
    const nouvelleDateSelectionnee = date;

    // Retourne vrai si l'ancienne date sélectionnée était un événement, faux sinon
    const even = (element: Post) => {
      if (
        convertDateFormatSlashToUnderscore(element.date[0]) === selectedDate ||
        convertDateFormatSlashToUnderscore(element.date[1]) === selectedDate
      )
        return true;
      else {
        return false;
      }
    };

    // Nouveau tableau des dates devant être marquées
    let updatedMarkedDates = {};
    // Si l'ancienne date sélectionnée était un événement, il faut la marquer
    if (eventSelected.some(even)) {
      updatedMarkedDates = {
        // On récupère l'ensemble des dates marquées comme événement
        ...events,
        // L'ancienne date sélectionnée est marquée comme un événement
        ...{ [selectedDate]: { marked: true, dotColor: "#57B9BB" } },
        // La nouvelle date sélectionnée est marquée comme date sélectionnée
        ...{ [nouvelleDateSelectionnee]: { selected: true } },
      };
    }
    // Sinon, on fait la même chose, mais l'ancienne date sélectionnée devient non marquée
    else {
      updatedMarkedDates = {
        ...events,

        ...{ [selectedDate]: { selected: false } },

        ...{ [nouvelleDateSelectionnee]: { selected: true } },
      };
    }

    // Mise à jour de la date sélectionnée
    setSelectedDate(nouvelleDateSelectionnee);

    // Mise à jour des date devant être marquées
    setEvents(updatedMarkedDates);
  };

  return (
    <View style={{ height: "100%" }}>
      <Calendar
        theme={{
          todayTextColor: "#57B9BB",
          monthTextColor: "#57B9BB",
          arrowColor: "#57B9BB",
          textMonthFontWeight: "bold",
          textMonthFontSize: 18,
          selectedDayBackgroundColor: "#57B9BB",
          selectedDayTextColor: "white",
          textDayHeaderFontSize: 8,
        }}
        monthFormat={"MMMM yyyy"}
        disableMonthChange={true}
        onDayPress={(date: { dateString: any }) => onPressDay(date.dateString)}
        markedDates={events}
      />
      {/*Affichage de la liste des posts correspondant à la date sélectionnée*/}
      <View style={{ flex: 1 }}>
        <PostList posts={eventSelected} navigation={navigation} />
      </View>
    </View>
  );
}
