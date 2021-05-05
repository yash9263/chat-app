import { useEffect, useState } from "react";
import "./LeftSidebar.css";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import useFirestore from "./hooks/useFirestore";

export default function LeftSidebar({
  rooms,
  setCurrentRoom,
  docs,
  setCurrentRoomIndex,
  setCurrentRoomDocs,
}) {
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {}, [docs]);

  const createRoom = (event) => {
    event.preventDefault();
    setNewRoom("");
    firebase.firestore().collection("rooms").doc(newRoom).set({
      users: [],
      messages: [],
    });
    setCurrentRoom(null);
  };

  return (
    <div className="left-sidebar-container">
      <form action="">
        <input
          type="text"
          value={newRoom}
          onChange={(event) => {
            setNewRoom(event.target.value);
          }}
        />
        <button type="submit" onClick={createRoom}>
          Create Room
        </button>
      </form>
      <div>
        <ul>
          {docs.map((doc, i) => (
            <li
              className="room-item"
              key={i}
              onClick={(event) => {
                setCurrentRoom(doc.id);
                setCurrentRoomIndex(i);
                setCurrentRoomDocs(doc);
              }}
            >
              {doc.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}