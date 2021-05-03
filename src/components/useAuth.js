import { useContext } from "react";
import { firebaseContext } from "./ProvideAuth";

export default function useAuth() {
  return useContext(firebaseContext);
}
