import { useEffect, useState } from "react";
import "./Chatbox.css";
import firebase from "firebase/app";
import { io } from "socket.io-client";
import useAuth from "./hooks/useAuth";
import useFirestore from "./hooks/useFirestore";
// import useSocket from "./hooks/useSocket";

// const Server = "localhost:4000";
// const NewMessageEvent = "chat message";

export default function Chatbox({
  currentRoom,
  currentRoomDocs,
  setCurrentRoomDocs,
  currentRoomIndex,
  docs,
}) {
  const [text, setText] = useState("");
  // const { messages, sendMessage } = useSocket();
  const user = useAuth();
  // console.log(user.displayName);

  useEffect(() => {
    console.log(docs, currentRoomDocs);
    setCurrentRoomDocs(docs[currentRoomIndex]);
  }, [currentRoom, currentRoomDocs, docs]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // sendMessage(text);
    setText("");
    await firebase
      .firestore()
      .collection("rooms")
      .doc(currentRoom)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(user.displayName),
        messages: firebase.firestore.FieldValue.arrayUnion({
          author: user.displayName,
          message: text,
          // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
      });
  };

  return (
    <div>
      <h1>{currentRoomDocs && currentRoomDocs.id}</h1>
      <ul>
        {currentRoomDocs &&
          currentRoomDocs.messages.map((msgObj, index) => {
            return (
              <li
                key={index}
                className={`message-item  + ${
                  user.displayName === msgObj.author
                    ? " my-message"
                    : " received-message"
                }`}
              >
                <div className="author-name">{msgObj.author}</div>
                <p className="author-message">{msgObj.message}</p>
              </li>
            );
          })}
      </ul>
      {currentRoom && (
        <form action="">
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button type="submit" onClick={submitHandler}>
            send
          </button>
        </form>
      )}
    </div>
  );
}
