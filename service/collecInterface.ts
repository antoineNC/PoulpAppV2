import { Timestamp } from "firebase/firestore";

export interface Etudiant {
  id: string;
  mail: string;
  nom: string;
  prenom: string;
  adhesions: Array<Bureau["id"]>;
}

export interface Bureau {
  id: string; // en majuscules
  nom: string;
  mail: string;
  description: string;
  logo: string;
  membres: Array<{ idEtu: string; idRole: string }>;
}

export interface Role {
  idRole: string;
  role: string;
}

export interface Club {
  id: string;
  nom: string;
  bureau: Bureau["id"];
  logo: string;
  description: string;
  contact: string;
}

export interface Partenariat {
  id: string;
  nom: string;
  bureau: Bureau["id"];
  logo: string;
  description: string;
  adresse: string;
  adresseMap: string;
  avantages: Array<string>;
}

export interface Post {
  id: string;
  titre: string;
  description: string;
  tags: Array<string>;
  visibleCal: boolean;
  date: [string, string, string, string]; //dateDebut, dateFin, heureDebut, heureFin
  image: string;
  editor: Bureau["id"];
  timeStamp: Timestamp;
}

export interface Points {
  id: string;
  titre: string;
  date: string;
  bleu: number;
  jaune: number;
  orange: number;
  rouge: number;
  vert: number;
}
