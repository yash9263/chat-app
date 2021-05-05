import Chatbox from "./Chatbox";
import "./Chatapp.css";
import LeftSidebar from "./LeftSidebar";
import UsersBar from "./UsersBar";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import useFirestore from "./hooks/useFirestore";

export default function Chatapp() {
  const [users, setUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomDocs, setCurrentRoomDocs] = useState(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(null);

  const { docs } = useFirestore("rooms");

  //   const { users } = useFirestore("accounts");

  //   console.log(users);
  //   console.log(docs);
  //   console.log(currentRoom);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("accounts")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        setUsers(documents);
      });

    return () => unsub();
  }, [currentRoomDocs]);

  //   console.log(currentRoomIndex, currentRoomDocs);
  console.log(users);
  return (
    <div className="chatapp-container">
      <LeftSidebar
        setCurrentRoom={setCurrentRoom}
        setCurrentRoomIndex={setCurrentRoomIndex}
        setCurrentRoomDocs={setCurrentRoomDocs}
        docs={docs}
      />
      <Chatbox
        currentRoom={currentRoom}
        setCurrentRoomDocs={setCurrentRoomDocs}
        currentRoomDocs={currentRoomDocs}
        currentRoomIndex={currentRoomIndex}
        docs={docs}
      />
      <UsersBar currentRoomDocs={currentRoomDocs} docs={docs} users={users} />
    </div>
  );
}
