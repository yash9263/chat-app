import { useEffect, useState } from "react";
import firebase from "firebase/app";
import useAuth from "./hooks/useAuth";

export default function UserChatbox({
  currentUserChatDocs,
  currentUserChatDocsIndex,
  setCurrentUserChatDocs,
}) {
  const [text, setText] = useState("");
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
      });
    console.log(userMessages);
    return () => unsub();
  }, [currentUserChatDocs.id]);

  const submitHandler = async (event) => {
    event.preventDefault();
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

    setText("");
  };
  // console.log(userMessages);
  if (currentUserChatDocs) {
    return (
      <div>
        <h1>{currentUserChatDocs.name}</h1>
        <ul>
          {userMessages.map((message) => {
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
        <form>
          <input
            type="text"
            name="message"
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
