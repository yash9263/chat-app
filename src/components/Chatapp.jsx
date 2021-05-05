import Chatbox from "./Chatbox";
import "./Chatapp.css";
import LeftSidebar from "./LeftSidebar";
import UsersBar from "./UsersBar";
import { useEffect, useState } from "react";
import useFirestore from "./hooks/useFirestore";

export default function Chatapp() {
  //   const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentRoomDocs, setCurrentRoomDocs] = useState(null);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(null);

  const { docs } = useFirestore("rooms");

  //   console.log(docs);
  //   console.log(allRooms);
  //   console.log(currentRoom);

  useEffect(() => {}, [currentRoomDocs]);

  //   console.log(currentRoomIndex, currentRoomDocs);

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
      <UsersBar currentRoomDocs={currentRoomDocs} docs={docs} />
    </div>
  );
}
