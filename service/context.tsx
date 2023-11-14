import { User } from "firebase/auth";
import { createContext } from "react";

export const ThemeContext = createContext("default");
export const CurrentUserContext = createContext<{
  currentUser: { sessionId: string; isAdmin: number; user: User | null };
  setCurrentUser: (props: {
    sessionId: string;
    isAdmin: number; // 0=>admin, 1=>bureau, 2=>étudiant
    user: User | null; // to update authentication
  }) => void;
}>({
  currentUser: { sessionId: "", isAdmin: 2, user: null },
  setCurrentUser: (props: {
    sessionId: string;
    isAdmin: number;
    user: User | null;
  }) => {},
});
