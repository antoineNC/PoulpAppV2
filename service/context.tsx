import { User } from "firebase/auth";
import { createContext } from "react";

export const ThemeContext = createContext("default");
export const CurrentUserContext = createContext<{
  currentUser: { sessionId: string; isAdmin: number; user: User | null };
  setCurrentUser: (props: {
    sessionId: string;
    isAdmin: number;
    user: User | null;
  }) => void;
}>({
  currentUser: { sessionId: "", isAdmin: 2, user: null },
  setCurrentUser: (props: {
    sessionId: string;
    isAdmin: number;
    user: User | null;
  }) => {},
});
