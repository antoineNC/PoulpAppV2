import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  DocumentReference,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDoc,
  setDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import {
  Etudiant,
  Post,
  Points,
  Bureau,
  Club,
  Partenariat,
  Role,
} from "./collecInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Firebase } from "./config.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Firebase.APIKEY,
  authDomain: "poulpappv2.firebaseapp.com",
  projectId: "poulpappv2",
  storageBucket: "poulpappv2.appspot.com",
  messagingSenderId: Firebase.messagingSenderId,
  appId: "1:427196722560:web:d44eb4a0390dee45dc2565",
  measurementId: "G-2XW9TZKH8R",
};

class FirestoreService {
  private auth;
  private db;
  private bureauRef;
  private etuRef: any;
  private postRef: any;
  private clubRef: any;
  private partenariatRef: any;
  private pointRef: any;
  private storage: any;

  // Connexion à la base de données
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore();
    this.bureauRef = collection(this.db, "Bureau");
    this.etuRef = collection(this.db, "Etudiant");
    this.postRef = collection(this.db, "Post");
    this.clubRef = collection(this.db, "Club");
    this.partenariatRef = collection(this.db, "Partenariat");
    this.pointRef = collection(this.db, "Point");
    // Get a reference to the storage service, which is used to create references in your storage bucket
    this.storage = getStorage();
  }

  //========== Connexion ===============
  // Insertion d'un nouvel Etudiant dans la BDD
  async SignUp(userInfo: any): Promise<boolean> {
    var isBureau = false;
    var isEtu = false;
    var added = false;
    console.log("userInfo", userInfo);
    // check que l'adresse mail finisse par "@ensc.fr"
    const mail = userInfo.email;
    const mailDomain = mail.substring(mail.length - 8); // on recupère le "@ensc.fr" en théorie
    if (mailDomain === "@ensc.fr") {
      // chercher si l'identifiant existe dans Bureau
      const bureau = this.convertEmailToAsso(mail);
      var docRef = doc(this.db, "Bureau", bureau);
      var docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        isBureau = true;
      }

      // chercher si l'identifiant existe dans "Etudiant"
      docRef = doc(this.db, "Etudiant", userInfo.id);
      docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        isEtu = true;
      }

      // si c'est un bureau ou un étudiant
      if (isBureau || isEtu) {
        Alert.alert(
          "Déjà inscrit",
          "Le compte selectionné est déjà inscrit sur l'application. Vous pouvez vous connecter avec celui-ci."
        );
      } else if (["BDE", "BDS", "BDA", "BDF", "JE"].includes(bureau)) {
        // crétaion du document lié au nouveau Bureau
        await setDoc(doc(this.db, "Bureau", bureau), {
          mail: userInfo.email,
          logo: "",
          nom: userInfo.given_name,
          description: "",
          membres: [],
        });
        await AsyncStorage.setItem("sessionId", bureau);
        added = true;
      } else {
        // crétaion du document lié au nouvel "Etudiant"
        await setDoc(doc(this.db, "Etudiant", userInfo.id), {
          mail: userInfo.email,
          nom: userInfo.family_name,
          prenom: userInfo.given_name,
          adhesions: [],
        });
        await AsyncStorage.setItem("sessionId", userInfo.id);
        added = true;
      }
    } else {
      Alert.alert(
        "Erreur",
        "Le compte selectionné doit appartenir au domaine 'ensc.fr'"
      );
    }

    return added;
  }

  async LogIn(
    id: string,
    mail: string
  ): Promise<{ exists: boolean; sessionId: string; isAdmin: number }> {
    var exists = true;
    // chercher si l'identifiant existe dans Bureau
    const bureau = this.convertEmailToAsso(mail);
    var docRef = doc(this.db, "Bureau", bureau);
    var docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // puis chercher dans Etudiant
      const docRef = doc(this.db, "Etudiant", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const docRef = doc(this.db, "Admins", mail);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          exists = false;
          Alert.alert(
            "Erreur",
            "Le compte selectionné n'est pas inscrit sur l'application.\nAttention, le compte doit avoir une adresse 'ensc.fr'."
          );
        } else {
          await AsyncStorage.setItem("sessionId", mail);
          return { exists, sessionId: mail, isAdmin: 0 };
        }
      } else {
        await AsyncStorage.setItem("sessionId", id);
        return { exists, sessionId: id, isAdmin: 2 };
      }
    } else {
      await AsyncStorage.setItem("sessionId", bureau);
      return { exists, sessionId: bureau, isAdmin: 1 };
    }
    return { exists, sessionId: "", isAdmin: 2 };
  }

  // Récupère les infos principales à afficher dans le menu ou l'écran BureauProfile
  async getProfile(
    currentUser: { sessionId: string; isAdmin: number },
    setState: (profil: {
      nom: string;
      photo: string;
      info: Array<string> | string;
    }) => void
  ) {
    if (currentUser.isAdmin === 1) {
      let imagePath = this.getImagePath(currentUser.sessionId);
      return this.listenBureau(currentUser.sessionId, (bureau) =>
        setState({
          nom: bureau.nom,
          photo: imagePath,
          info: bureau.description,
        })
      );
    } else if (currentUser.isAdmin === 2) {
      return this.listenEtu(currentUser.sessionId, (etu) =>
        setState({
          nom: etu.prenom + " " + etu.nom,
          photo: "",
          info: etu.adhesions,
        })
      );
    } else if (currentUser.isAdmin === 0) {
      return setState({
        nom: "Admin",
        photo: "",
        info: currentUser.sessionId,
      });
    }
  }

  // ============ STORAGE (Images) ====================

  // Create a storage reference from our storage service
  async storeImage(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(this.storage, "ImgPosts/" + new Date().getTime());
    return { storageRef, blob };
  }

  async deleteImageFromStorage(url: string) {
    const deleteRef = ref(this.storage, url);
    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        return;
      })
      .catch((error) => {
        Alert.alert("Erreur", "L'image n'a pas pu être supprimée.\n" + error);
        return;
      });
  }

  // ============= BUREAU ===========

  listenBureau(
    docBureau: string,
    setState: (asso: Bureau) => void
  ): () => void {
    return onSnapshot(doc(this.db, "Bureau", docBureau), (documentSnapshot) => {
      setState({
        ...documentSnapshot.data(),
        ...{ id: documentSnapshot.id },
      } as Bureau);
    });
  }

  updateBureau(bureau: Bureau): Promise<void> {
    return updateDoc(doc(this.bureauRef, bureau.id), {
      nom: bureau.nom,
      mail: bureau.mail,
      description: bureau.description,
      membres: bureau.membres,
      logo: bureau.logo,
    });
  }

  getImagePath(asso: string) {
    if (asso == "BDE") {
      return require("../image/bde.png");
    } else if (asso == "BDS") {
      return require("../image/bds.png");
    } else if (asso == "BDA") {
      return require("../image/bda.png");
    } else if (asso == "BDF") {
      return require("../image/bdf.png");
    } else if (asso == "JE") {
      return require("../image/je.png");
    }
  }

  // Convertit l'email donnée en entrée en nom de l'association
  convertEmailToAsso(email: string): string {
    if (email == "bde@ensc.fr") {
      return "BDE";
    } else if (email == "bds@ensc.fr") {
      return "BDS";
    } else if (email == "bda@ensc.fr") {
      return "BDS";
    } else if (email == "bdf@ensc.fr") {
      return "BDF";
    } else if (email == "junior@ensc.fr") {
      return "JE";
    } else {
      return "null";
    }
  }

  // Recupère le nom des postes avec l'id
  async getRole(id: string) {
    const docRef = doc(this.db, "RoleBureau", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  // Récupère la liste des postes
  getAllRoles(setState: (roles: Role[]) => void): () => void {
    return onSnapshot(
      collection(this.db, "RoleBureau"),
      (snapshot: { docs: any[] }) => {
        setState(
          snapshot.docs.map(
            (d: { data: () => Role; id: any }) =>
              ({ ...d.data(), ...{ idRole: d.id } } as Role)
          )
        );
      }
    );
  }

  // ============ ETUDIANTS ===============

  // Récupère les infos d'un étudiant particulier
  listenEtu(
    docEtu: string,
    setState: (etudiant: Etudiant) => void
  ): () => void {
    const docRef = doc(this.etuRef, docEtu);
    return onSnapshot(docRef, (doc) => {
      setState({ ...doc.data() } as Etudiant);
    });
  }

  // Récupère la liste de tous les étudiants
  listenEtudiants(setState: (etus: Array<Etudiant>) => void): () => void {
    var q = query(this.etuRef, orderBy("nom", "asc")); // ordre alphabétique
    return onSnapshot(q, (snapshot: { docs: any[] }) => {
      setState(
        snapshot.docs.map(
          (d: { data: () => Etudiant; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Etudiant)
        )
      );
    });
  }

  // ============ POSTS ==============
  // Permet de récupérer la liste des posts enregistrés dans la BDD
  listenPost(setState: (post: Array<Post>) => void, tag?: string): () => void {
    var q = query(this.postRef, orderBy("timeStamp", "desc")); // plus récent en haut de la liste
    if (tag) {
      // on filtre les posts avec un certain tag
      q = query(
        this.postRef,
        where("tags", "array-contains", tag),
        orderBy("timeStamp", "desc")
      );
    }
    return onSnapshot(q, (snapshot: { docs: any[] }) => {
      setState(
        snapshot.docs.map(
          (d: { data: () => Post; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Post)
        )
      );
    });
  }

  // Permet de récupérer les posts pour lesquels la date de DEBUT ou de FIN
  // correspond à la date donnée en entrée
  listenPostDate(
    onAssoChange: (post: Array<Post>) => void,
    date: string
  ): () => void {
    const q = query(
      this.postRef,
      where("date", "array-contains", date),
      orderBy("timeStamp", "desc")
    );
    var validPosts: any[] = [];
    return onSnapshot(q, (querySnapshot: { docs: any[] }) => {
      querySnapshot.docs.forEach((d: { data: () => Post }) => {
        if (d.data().date[0] === date || d.data().date[1]) {
          validPosts.push(d);
        }
      });
      onAssoChange(
        validPosts.map(
          (d: { data: () => Post; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Post)
        )
      );
    });
  }

  // Permet d'ajouter un nouveau post à la BDD
  addPost(post: Post): Promise<DocumentReference<any>> {
    var nvPost = {
      titre: post.titre,
      description: post.description,
      tags: post.tags,
      date: [post.date[0], post.date[1], post.date[2], post.date[3]],
      image: post.image,
      editor: post.editor,
      visibleCal: post.visibleCal,
      timeStamp: Timestamp.now(),
    };
    return addDoc(this.postRef, nvPost);
  }

  // Permet de supprimer le post correspondant à l'ID d'entrée
  removePost(id: string): Promise<void> {
    return deleteDoc(doc(this.postRef, id));
  }

  // Permet de modifier le post entré en paramètre
  modifPost(post: Post): Promise<void> {
    return updateDoc(doc(this.postRef, post.id), {
      titre: post.titre,
      description: post.description,
      tags: post.tags,
      date: [post.date[0], post.date[1], post.date[2], post.date[3]],
      image: post.image,
      editor: post.editor,
      visibleCal: post.visibleCal,
    });
  }

  //========== EVENT (Points) ===============
  listenEvent(setState: (point: Array<Points>) => void): () => void {
    const q = query(this.pointRef, orderBy("date", "desc"));
    return onSnapshot(q, (snapshot: { docs: any[] }) =>
      setState(
        snapshot.docs.map(
          (d: { data: () => Points; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Points)
        )
      )
    );
  }
  // Permet d'ajouter un nouvel event à la BDD
  addEvent(point: Points): Promise<DocumentReference<any>> {
    var nvPoint = {
      titre: point.titre,
      date: point.date,
      bleu: point.bleu,
      jaune: point.jaune,
      orange: point.orange,
      rouge: point.rouge,
      vert: point.vert,
    };
    return addDoc(this.pointRef, nvPoint);
  }

  // Permet de supprimer l'event correspondant à l'ID d'entrée
  removeEvent(id: string): Promise<void> {
    return deleteDoc(doc(this.db, "Point", id));
  }

  // Permet de modifier l'event entré en paramètre
  modifEvent(point: Points): Promise<void> {
    return updateDoc(doc(this.db, "Point", point.id), {
      titre: point.titre,
      date: point.date,
      bleu: point.bleu,
      jaune: point.jaune,
      orange: point.orange,
      rouge: point.rouge,
      vert: point.vert,
    });
  }

  // ========== CLUB ===============
  listenClubs(
    onClubsChange: (clubs: Array<Club>) => void,
    asso?: "BDE" | "BDS" | "BDA" | "JE"
  ): () => void {
    var q = query(this.clubRef, orderBy("nom", "asc"));
    if (asso) {
      q = query(
        this.clubRef,
        where("bureau", "==", asso),
        orderBy("nom", "asc")
      );
    }
    return onSnapshot(q, (querySnapshot: { docs: any[] }) => {
      onClubsChange(
        querySnapshot.docs.map(
          (d: { data: () => Club; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Club)
        )
      );
    });
  }

  addClub(club: Club) {
    var nvClub = {
      nom: club.nom,
      description: club.description,
      contact: club.contact,
      logo: club.logo,
      bureau: club.bureau,
    };
    return addDoc(this.clubRef, nvClub);
  }

  modifClub(club: Club) {
    return updateDoc(doc(this.clubRef, club.id), {
      nom: club.nom,
      description: club.description,
      contact: club.contact,
      logo: club.logo,
      bureau: club.bureau,
    });
  }

  async deleteClub(idClub: string) {
    await deleteDoc(doc(this.clubRef, idClub));
  }

  // ========== PARTENARIAT ==============
  listenPartenariats(
    onPartenariatsChange: (users: Array<Partenariat>) => void,
    asso?: "BDE" | "BDS" | "BDA" | "JE"
  ): () => void {
    var q = query(this.partenariatRef, orderBy("nom", "asc"));
    if (asso) {
      q = query(
        this.partenariatRef,
        where("bureau", "==", asso),
        orderBy("nom", "asc")
      );
    }
    return onSnapshot(q, (querySnapshot: { docs: any[] }) => {
      onPartenariatsChange(
        querySnapshot.docs.map(
          (d: { data: () => Partenariat; id: any }) =>
            ({ ...d.data(), ...{ id: d.id } } as Partenariat)
        )
      );
    });
  }

  addPartenariat(partenariat: Partenariat) {
    var nvPartenariat = {
      nom: partenariat.nom,
      description: partenariat.description,
      adresse: partenariat.adresse,
      adresseMap: partenariat.adresseMap,
      avantages: partenariat.avantages,
      image: partenariat.image,
      bureau: partenariat.bureau,
    };
    return addDoc(this.partenariatRef, nvPartenariat);
  }

  modifPartenariat(partenariat: Partenariat) {
    return updateDoc(doc(this.partenariatRef, partenariat.id), {
      nom: partenariat.nom,
      description: partenariat.description,
      adresse: partenariat.adresse,
      adresseMap: partenariat.adresseMap,
      avantages: partenariat.avantages,
      image: partenariat.image,
      bureau: partenariat.bureau,
    });
  }

  async deleteParte(idParte: string) {
    await deleteDoc(doc(this.partenariatRef, idParte));
  }
}

export default new FirestoreService();
