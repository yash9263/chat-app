import useFirestore from "./hooks/useFirestore";
import "./UsersBar.css";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

export default function UsersBar({
  currentRoomDocs,
  docs,
  users,
  setShowChatBox,
  setCurrentUserChatDocs,
  setCurrentUserChatDocsIndex,
}) {
  const [roomUsers, setRoomUsers] = useState(null);
  const currentUser = useAuth();
  useEffect(() => {}, [currentRoomDocs]);
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
        {currentRoomDocs &&
          currentRoomDocs.users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
      </ul>
    </div>
  );
}
