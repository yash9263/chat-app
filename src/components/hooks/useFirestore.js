import { useEffect, useState } from "react";
import firebase from "firebase/app";

export default function useFirestore(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection(collection)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);
  return { docs };
}
