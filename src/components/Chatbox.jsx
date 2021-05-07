import { useEffect, useRef, useState } from "react";
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
  const dummy = useRef();
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
        dummy.current.scrollIntoView({ behaviour: "smooth" });
      });
    console.log(roomMessages);
    // setCurrentRoomDocs(docs[currentRoomIndex]);
    return () => unsub();
  }, [currentRoom]);

  const submitHandler = async (event) => {
    event.preventDefault();
    // sendMessage(text);
    // setText("");
    if (text.length > 0) {
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
    }
    dummy.current.scrollIntoView({ behaviour: "smooth" });
    setText("");
  };
  if (currentRoomDocs) {
    return (
      <div className="chat-container">
        <h1 className="row chat-title">{currentRoomDocs.id}</h1>
        <ul className="row messages-container">
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
          <span ref={dummy}></span>
        </ul>

        <form className="row form-container">
          <input
            className="input-message"
            type="text"
            placeholder="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button className="send-btn" type="submit" onClick={submitHandler}>
            send
          </button>
        </form>
      </div>
    );
  } else {
    return <div className="not-selected">Select Chat or room</div>;
  }
}
