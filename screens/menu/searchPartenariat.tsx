import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import List from "../../components/searchList";
import SearchBar from "../../components/searchBar";
import firestoreService from "../../service/firestore.service";
import { Partenariat } from "../../service/collecInterface";
import styles from "../../theme/styles";

export default function PartenariatScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [partenariats, setParte] = useState<Partenariat[]>();

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      firestoreService.listenPartenariats((partenariats) =>
        setParte(partenariats)
      );
    };
    getData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!partenariats ? (
        <ActivityIndicator size="large" />
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={partenariats}
          setClicked={setClicked}
        />
      )}
    </View>
  );
}
