import "./UsersBar.css";
import useAuth from "../hooks/useAuth";
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
    <div className="usersbar-container">
      <div className="all-users-container">
        <div className="usersbar-title">all users</div>
        <ul className="all-users">
          {users &&
            users.map((user, i) =>
              currentUser.uid !== user.id ? (
                <li
                  key={i}
                  className="users-item user-item"
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
      </div>

      {showChatBox && (
        <div className="room-users-container">
          <div className="usersbar-title">room users</div>
          <ul className="room-users">
            {currentRoom &&
              roomUsers.map((user, index) => (
                <li className="users-item room-users-item" key={index}>
                  {user.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
