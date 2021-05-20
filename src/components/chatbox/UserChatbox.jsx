import { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import useAuth from "../hooks/useAuth";
import "./Chatbox.css";

export default function UserChatbox({
  currentUserChatDocs,
  currentUserChatDocsIndex,
  setCurrentUserChatDocs,
}) {
  const [text, setText] = useState("");
  const dummy = useRef();
  const [userMessages, setUserMessages] = useState([]);
  const currentUser = useAuth();
  //   console.log(currentUser);
  //   console.log(currentUserChatDocs, currentUserChatDocsIndex);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("accounts")
      .doc(currentUser.uid)
      .collection("chats")
      .doc(currentUserChatDocs.id)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snap) => {
        // console.log(snap);
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setUserMessages(documents);
        dummy.current.scrollIntoView({ behaviour: "smooth" });
      });
    console.log(userMessages);
    return () => unsub();
  }, [currentUserChatDocs.id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (text.length > 0) {
      await firebase
        .firestore()
        .collection("accounts")
        .doc(currentUser.uid)
        .collection("chats")
        .doc(currentUserChatDocs.id)
        .collection("messages")
        .add({
          text: text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: currentUser.displayName,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("accounts")
        .doc(currentUserChatDocs.id)
        .collection("chats")
        .doc(currentUser.uid)
        .collection("messages")
        .add({
          text: text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: currentUser.displayName,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        })
        .catch((error) => {
          console.log(error);
        });
    }
    dummy.current.scrollIntoView({ behaviour: "smooth" });
    setText("");
  };
  // console.log(userMessages);
  if (currentUserChatDocs) {
    return (
      <div className="chat-container">
        <h1 className="row chat-title">{currentUserChatDocs.name}</h1>
        <ul className="row messages-container">
          {userMessages.length > 0 ? (
            userMessages.map((message) => {
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
            })
          ) : (
            <div className="no-message">
              Start Conversation with {currentUserChatDocs.name}{" "}
            </div>
          )}
          <span ref={dummy}></span>
        </ul>
        <form className="row form-container">
          <input
            className="input-message"
            placeholder="text"
            type="text"
            name="message"
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
