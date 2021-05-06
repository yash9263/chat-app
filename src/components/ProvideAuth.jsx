import { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { authService } from "../firebase-config";

export const firebaseContext = createContext();

export default function ProvideAuth({ children }) {
  const [user, setUser] = useState(authService.currentUser);
  // setLoading(true);
  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // setLoading(false);
      } else {
        setUser(null);
        // setLoading(false);
      }
    });
    return () => unlisten();
  }, [user]);

  return (
    <firebaseContext.Provider value={user}>{children}</firebaseContext.Provider>
  );
}
