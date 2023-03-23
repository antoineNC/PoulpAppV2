export interface Etudiant {
  id: string;
  mail: string;
  nom: string;
  prenom: string;
  adhesions: Array<Bureau["id"]>;
}

export interface Bureau {
  id: string;
  nom: string;
  description: string;
  logo: string;
  membres: Array<{}>;
}

export interface Club {
  id?: string;
  nom: string;
  bureau: Bureau["id"];
  logo: string;
  description: string;
  contact: string;
}

export interface Partenariat {
  id?: string;
  nom: string;
  bureau: Bureau["id"];
  image: string;
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
  date: [Date, Date, Date, Date];
  image: string;
  editor: Bureau["id"];
}

export interface Points {
  id: string;
  titre: string;
  date: Date;
  bleu: number;
  jaune: number;
  orange: number;
  rouge: number;
  vert: number;
}
