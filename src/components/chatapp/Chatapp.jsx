import Chatbox from "../chatbox/Chatbox";
import "./Chatapp.css";
import LeftSidebar from "../roomsbar/LeftSidebar";
import UserChatbox from "../chatbox/UserChatbox";
import UsersBar from "../usersbar/UsersBar";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import useFirestore from "../hooks/useFirestore";

export default function Chatapp() {
  const [users, setUsers] = useState([]);
  //current selected room states
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomDocs, setCurrentRoomDocs] = useState(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(null);

  //current selected user chat states
  const [currentUserChatDocs, setCurrentUserChatDocs] = useState(null);
  const [currentUserChatDocsIndex, setCurrentUserChatDocsIndex] =
    useState(null);

  //which chat to show user or room
  const [showChatBox, setShowChatBox] = useState(true);

  //responsive UI
  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);

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
        className="left-sidebar"
        setShowChatBox={setShowChatBox}
        setCurrentRoom={setCurrentRoom}
        setCurrentRoomIndex={setCurrentRoomIndex}
        setCurrentRoomDocs={setCurrentRoomDocs}
        docs={docs}
      />
      {showChatBox ? (
        <React.Fragment>
          {currentRoom ? (
            <Chatbox
              className="chatbox"
              currentRoom={currentRoom}
              currentRoomDocs={currentRoomDocs}
            />
          ) : (
            <div className="not-selected">
              Select a Chat or room
              <br />
              👈rooms
              <br />
              Chats👉
            </div>
          )}
        </React.Fragment>
      ) : (
        <UserChatbox
          className="chatbox"
          currentUserChatDocs={currentUserChatDocs}
        />
      )}
      <UsersBar
        className="right-sidebar"
        currentRoom={currentRoom}
        currentRoomDocs={currentRoomDocs}
        currentRoomIndex={currentRoomIndex}
        docs={docs}
        users={users}
        showChatBox={showChatBox}
        setShowChatBox={setShowChatBox}
        setCurrentUserChatDocs={setCurrentUserChatDocs}
        setCurrentUserChatDocsIndex={setCurrentUserChatDocsIndex}
      />
    </div>
  );
}
