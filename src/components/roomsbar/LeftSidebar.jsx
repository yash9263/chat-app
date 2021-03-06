import { useState } from "react";
import "./LeftSidebar.css";
import firebase from "firebase/app";

export default function LeftSidebar({
  rooms,
  setCurrentRoom,
  docs,
  setCurrentRoomIndex,
  setCurrentRoomDocs,
  setShowChatBox,
}) {
  const [newRoom, setNewRoom] = useState("");

  const createRoom = (event) => {
    event.preventDefault();

    if (newRoom.length > 0) {
      firebase.firestore().collection("rooms").doc(newRoom).set({
        users: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setCurrentRoom(null);
    }
    setNewRoom("");
  };

  return (
    <div className="left-sidebar-container">
      <div className="form-container">
        <form className="form">
          <input
            className="form-input"
            type="text"
            placeholder="room name"
            value={newRoom}
            onChange={(event) => {
              setNewRoom(event.target.value);
            }}
          />
          <button className="form-btn" type="submit" onClick={createRoom}>
            Create Room
          </button>
        </form>
      </div>
      <div className="title">Rooms</div>
      <ul className="rooms-container">
        {docs.map((doc, i) => (
          <li
            className="room-item"
            key={i}
            onClick={(event) => {
              setShowChatBox(true);
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
  );
}
