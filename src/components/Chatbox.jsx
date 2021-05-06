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
  const [roomMessages, setRoomMessages] = useState([]);
  const currentUser = useAuth();
  // console.log(user.displayName);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("rooms")
      .doc(currentRoom)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        let documets = [];
        snap.forEach((doc) => {
          documets.push({ ...doc.data(), id: doc.id });
          // console.log(doc.data());
        });
        setRoomMessages(documets);
      });
    console.log(roomMessages);
    // setCurrentRoomDocs(docs[currentRoomIndex]);
    return () => unsub();
  }, [currentRoom]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // sendMessage(text);
    // setText("");
    await firebase
      .firestore()
      .collection("rooms")
      .doc(currentRoom)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion({
          name: currentUser.displayName,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        }),
      });

    if (currentRoom) {
      await firebase
        .firestore()
        .collection("rooms")
        .doc(currentRoom)
        .collection("messages")
        .add({
          text: text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: currentUser.displayName,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        });
    }
    setText("");
  };
  if (currentRoomDocs) {
    return (
      <div>
        <h1>{currentRoomDocs.id}</h1>
        <ul>
          {roomMessages &&
            roomMessages.map((message) => {
              return (
                <li
                  key={message.id}
                  className={`message-item  + ${
                    currentUser.uid === message.uid
                      ? " my-message"
                      : " received-message"
                  }`}
                >
                  <div className="author-name">{message.name}</div>
                  <p className="author-message">{message.text}</p>
                </li>
              );
            })}
        </ul>

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
      </div>
    );
  } else {
    return <div></div>;
  }
}
