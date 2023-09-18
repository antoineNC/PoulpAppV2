import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { colors } from "./colors";

// Common styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    paddingBottom: 10,
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 280,
  },
  appButtonContainer: {
    margin: 50,
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
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 100,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 30,
  },
  textInputCo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 280,
  },
  raddioButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  appButtonContainerCo: {
    margin: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 200,
  },
  appButtonTextCo: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#F0E4EF",
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 20,
  },
});

export const postStyle = StyleSheet.create({
  postContainer: {
    flex: 1,
    width: Dimensions.get("window").width - 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    paddingTop: 5,
    margin: 3,
    paddingBottom: 10,
    backgroundColor: "#F0E4EF",
  },
  headerContainer: {
    flex: 1,
    width: Dimensions.get("window").width * 0.95,
    flexDirection: "row",
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    margin: 3,
    marginRight: 8,
  },
  titreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.78,
  },
  titreText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  calendarView: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 10,
    color: "#349CA8",
  },
  calendarText: {
    color: "#349CA8",
    fontStyle: "italic",
  },
  descriptionContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width - 20,
    borderRadius: 3,
  },
});

export const postDisStyle = StyleSheet.create({
  postContainer: {
    alignItems: "center",
    paddingTop: 5,
    margin: 7,
    paddingBottom: 10,
  },
  closeButton: {
    position: "absolute",
    right: 7,
    top: 5,
    zIndex: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    margin: 3,
    marginRight: 8,
  },
  titreContainer: {
    alignItems: "flex-start",
    height: 30,
  },
  titreText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarView: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 10,
    color: "#349CA8",
  },
  calendarText: {
    color: "#349CA8",
    fontStyle: "italic",
  },
  descriptionContainer: {
    padding: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width - 20,
    borderRadius: 3,
  },
  appButtonContainer: {
    margin: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default styles;
