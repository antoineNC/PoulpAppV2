import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import List from "../../components/searchList";
import SearchBar from "../../components/searchBar";
import firestoreService from "../../service/firestore.service";
import { Club } from "../../service/collecInterface";
import styles from "../../theme/styles";

export default function ClubScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [clubs, setClubs] = useState<Club[]>();

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenClubs((clubs) => setClubs(clubs));
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!clubs ? (
        <ActivityIndicator size="large" />
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={clubs}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
}
