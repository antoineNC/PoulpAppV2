import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import firestoreService from "../../service/firestore.service";
import { GestMembresProps } from "../../navigation/types";
import { Etudiant, Role } from "../../service/collecInterface";
import { Icon } from "@rneui/themed";

export default function GestMembres({ navigation, route }: GestMembresProps) {
  const [bureau, setBureau] = useState(route.params.bureau);
  const [etudiants, setEtus] = useState<Etudiant[]>([
    { id: "", nom: "", prenom: "", adhesions: [], mail: "" },
  ]);
  const [roles, setRoles] = useState<Array<Role>>([{ idRole: "", role: "" }]);
  const [selectedEtu, setSelectEtu] = useState<Etudiant>({
    id: "",
    nom: "",
    prenom: "",
    adhesions: [],
    mail: "",
  });
  const [selectedRole, setSelectRole] = useState<Role>({
    idRole: "",
    role: "",
  });

  useEffect(() => {
    firestoreService.getAllRoles((roles) => setRoles(roles));
    firestoreService.listenEtudiants((etus) => setEtus(etus));
  }, []);

  const updateBureau = async () => {
    await firestoreService.updateBureau(bureau);
  };

  const addMembre = () => {
    setBureau({
      ...bureau,
      membres: [
        ...bureau.membres,
        { idEtu: selectedEtu.id, idRole: selectedRole.idRole },
      ],
    });
  };

  const deleteMembre = (idEtu: string, idRole: string) => {
    setBureau({
      ...bureau,
      membres: bureau.membres.filter(
        (value) => value.idEtu !== idEtu || value.idRole !== idRole
      ),
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginVertical: 20, rowGap: 10 }}>
        {bureau.membres
          .sort((a, b) => parseInt(a.idRole) - parseInt(b.idRole))
          .map((item, key) => (
            <View
              key={key}
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                paddingVertical: 2,
                borderBottomWidth: 0.5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.membersContent}>
                  {roles.find((value) => value.idRole === item.idRole)?.role} :
                </Text>
                <Text style={styles.membersContent}>
                  {etudiants.find((value) => value.id === item.idEtu)?.prenom +
                    " " +
                    etudiants.find((value) => value.id === item.idEtu)?.nom}
                </Text>
              </View>
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => deleteMembre(item.idEtu, item.idRole)}
              >
                <Icon name="circle-with-cross" type="entypo" size={30} />
              </TouchableOpacity>
            </View>
          ))}
      </View>

      <>
        <Text style={{ fontWeight: "bold" }}>Ajouter un membre</Text>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Dropdown
              data={roles}
              labelField={"role"}
              valueField={"idRole"}
              onChange={(item) => {
                setSelectRole(item);
              }}
              placeholder={"Selectionner"}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Dropdown
              data={etudiants}
              labelField={"nom"}
              valueField={"id"}
              onChange={(item) => {
                setSelectEtu(item);
              }}
              search
              searchPlaceholder="Chercher un.e étudiant.e"
              placeholder={"Selectionner"}
            />
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 0.5,
              borderRadius: 10,
              paddingVertical: 5,
            }}
            onPress={addMembre}
          >
            <Text>Ajouter le nouveau membre</Text>
            <Icon name="checkbox-outline" type="ionicon" />
          </TouchableOpacity>
        </View>
      </>

      <TouchableOpacity
        onPress={updateBureau}
        style={{
          alignSelf: "center",
          backgroundColor: "#52234E",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 12,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff", alignSelf: "center" }}>
          Valider les membres
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  members: {
    flexDirection: "row",
  },
  membersContent: {
    paddingVertical: 4,
    justifyContent: "center",
  },
});
