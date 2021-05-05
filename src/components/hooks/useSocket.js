import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "./useAuth";

// const Server = "localhost:4000";
// const NewMessageEvent = "chat message";

export default function useSocket() {
  // const [messages, setMessages] = useState([]);
  // const user = useAuth();
  // const socket = io(Server);
  // useEffect(() => {
  //   socket.on(NewMessageEvent, (msg) => {
  //     console.log(msg);
  //     setMessages((messages) => [...messages, msg]);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  // const sendMessage = (msg) => {
  //   const obj = {
  //     msg: msg,
  //     user: user.displayName,
  //   };
  //   socket.emit(NewMessageEvent, obj);
  // };
  // return { messages, sendMessage };
}
