import Chatbox from "./Chatbox";
import "./Chatapp.css";
import LeftSidebar from "./LeftSidebar";
import UserChatbox from "./UserChatbox";
import UsersBar from "./UsersBar";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import useFirestore from "./hooks/useFirestore";

export default function Chatapp() {
  const [users, setUsers] = useState([]);
  //current selected room states
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomDocs, setCurrentRoomDocs] = useState(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(null);

  //current selected user chat states
  const [currentUserChatDocs, setCurrentUserChatDocs] = useState(null);
  const [currentUserChatDocsIndex, setCurrentUserChatDocsIndex] = useState(
    null
  );

  //which chat to show user or room
  const [showChatBox, setShowChatBox] = useState(true);

  const { docs } = useFirestore("rooms");

  //   const { users } = useFirestore("accounts");

  //   console.log(users);
  console.log(docs);
  //   console.log(currentRoom);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("accounts")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // console.log(doc.data());
          documents.push({ ...doc.data(), id: doc.id });
        });
        setUsers(documents);
      });
    // console.log(users);
    return () => unsub();
  }, []);

  //   console.log(currentRoomIndex, currentRoomDocs);
  // console.log(users);
  return (
    <div className="chatapp-container">
      <LeftSidebar
        setShowChatBox={setShowChatBox}
        setCurrentRoom={setCurrentRoom}
        setCurrentRoomIndex={setCurrentRoomIndex}
        setCurrentRoomDocs={setCurrentRoomDocs}
        docs={docs}
      />
      {showChatBox ? (
        <div>
          {currentRoom && (
            <Chatbox
              currentRoom={currentRoom}
              setCurrentRoomDocs={setCurrentRoomDocs}
              currentRoomDocs={currentRoomDocs}
              currentRoomIndex={currentRoomIndex}
              docs={docs}
            />
          )}
        </div>
      ) : (
        <UserChatbox
          currentUserChatDocs={currentUserChatDocs}
          currentUserChatDocsIndex={currentUserChatDocsIndex}
          setCurrentUserChatDocs={setCurrentUserChatDocs}
        />
      )}
      <UsersBar
        currentRoom={currentRoom}
        currentRoomDocs={currentRoomDocs}
        currentRoomIndex={currentRoomIndex}
        docs={docs}
        users={users}
        setShowChatBox={setShowChatBox}
        setCurrentUserChatDocs={setCurrentUserChatDocs}
        setCurrentUserChatDocsIndex={setCurrentUserChatDocsIndex}
      />
    </div>
  );
}
