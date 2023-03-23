import { Alert } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  Auth,
  updateProfile,
} from "firebase/auth";
import {
  Firestore,
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
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
// import {
//   Etudiant,
//   PostData,
//   EventF,
//   Asso,
//   Club,
//   Partenariat,
// } from "./collecInterface";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcNbKtopB7Dxp2nGcYFlDiQ4TukEpoMPc",
  authDomain: "poulpappv2.firebaseapp.com",
  projectId: "poulpappv2",
  storageBucket: "poulpappv2.appspot.com",
  messagingSenderId: "427196722560",
  appId: "1:427196722560:web:d44eb4a0390dee45dc2565",
  measurementId: "G-2XW9TZKH8R",
};

class FirestoreService {
  private auth: any;
  private db: Firestore;
  private userRef: any;
  private postRef: any;
  private assoRef: any;
  private clubRef: any;
  private partenariatRef: any;
  private eventRef: any;

  // Connexion à la base de données
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore();
    // this.userRef = collection(this.db, "Etudiant");
    // this.postRef = collection(this.db, "Post");
    // this.assoRef = collection(this.db, "Association");
    // this.clubRef = collection(this.db, "Clubs");
    // this.partenariatRef = collection(this.db, "Partenariats");
    // this.eventRef = collection(this.db, "EventFamille");
  }

  // Fait appel au service d'authentification de Firabase pour l'inscription avec email et mot de passe
  async SignUp(
    nom: string,
    prenom: string,
    email: string,
    password: string
  ): Promise<boolean> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const userUID = userCredential.user.uid;
        const etudiant = { mail: email, nom: nom, prenom: prenom };
        const docRef = doc(this.db, "Etudiant", userUID);
        await setDoc(docRef, etudiant);
        return true;
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert("Erreur", "Email déjà utilisé");
            break;
          case "auth/invalid-email":
            Alert.alert("Erreur", "Email non valide");
            break;
          case "auth/weak-password":
            Alert.alert(
              "Erreur",
              "Le mot de passe doit contenir au moins 6 caractères"
            );
            break;
          default:
            Alert.alert("Erreur :", error.code);
            break;
        }
        return false;
      });
  }

  SignIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Vérifie si l'utilisateur donné en entrée est un admin
  checkIfAdmin(email?: string): boolean {
    var user = "";
    let isAdmin = false;
    if (email) {
      user = this.convertEmailToAsso(email);
    } else {
      user = this.getAsso();
    }

    if (user !== "") {
      isAdmin = true;
    }
    return isAdmin;
  }

  // Convertit l'email donnée en entrée en nom de l'association
  convertEmailToAsso(email: string): string {
    if (email == "bde@ensc.fr") {
      return "bde";
    } else if (email == "bds@ensc.fr") {
      return "bds";
    } else if (email == "bda@ensc.fr") {
      return "bda";
    } else if (email == "bdf@ensc.fr") {
      return "bdf";
    } else if (email == "junior@ensc.fr") {
      return "je";
    } else {
      return "";
    }
  }

  getAsso(): string {
    const currentUser = this.auth.currentUser;
    const tabUsers: any[] = [];
    if (currentUser !== null) {
      currentUser.providerData.forEach((userInfo: { email: any }) => {
        tabUsers.push(userInfo?.email);
      });
    }
    return this.convertEmailToAsso(tabUsers[0]);
  }
}

export default new FirestoreService();
