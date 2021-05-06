import useFirestore from "./hooks/useFirestore";
import "./UsersBar.css";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

export default function UsersBar({
  currentRoom,
  currentRoomDocs,
  currentRoomIndex,
  docs,
  users,
  showChatBox,
  setShowChatBox,
  setCurrentUserChatDocs,
  setCurrentUserChatDocsIndex,
}) {
  const [roomUsers, setRoomUsers] = useState([]);
  useEffect(() => {
    if (currentRoomDocs) {
      setRoomUsers(docs[currentRoomIndex].users);
    }
  }, [currentRoom, docs]);
  const currentUser = useAuth();
  return (
    <div>
      <ul>
        {users &&
          users.map((user, i) =>
            currentUser.uid !== user.id ? (
              <li
                key={i}
                className="users-item"
                onClick={() => {
                  setShowChatBox(false);
                  setCurrentUserChatDocs(user);
                  setCurrentUserChatDocsIndex(i);
                }}
              >
                {user.name}
              </li>
            ) : null
          )}
      </ul>
      <hr />
      <ul>
        {showChatBox &&
          currentRoom &&
          roomUsers.map((user, index) => <li key={index}>{user.name}</li>)}
      </ul>
    </div>
  );
}
