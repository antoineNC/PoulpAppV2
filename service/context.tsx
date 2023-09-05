import { createContext } from "react";

export const ThemeContext = createContext("default");
export const CurrentUserContext = createContext({
  currentUser: { sessionId: "", isAdmin: 2 },
  setCurrentUser: function (props: { sessionId: string; isAdmin: number }) {},
});
