import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAIccGIIVBGgPcWmOFp7OhwOWq2rUSOXlc",
  authDomain: "solitude-admin-client.firebaseapp.com",
  databaseURL: "https://solitude-admin-client-default-rtdb.firebaseio.com",
  projectId: "solitude-admin-client",
  storageBucket: "solitude-admin-client.appspot.com",
  messagingSenderId: "74737409636",
  appId: "1:74737409636:web:8f1352a5217f1413768971",
  measurementId: "G-6SBZQDXKCM",
};

firebase.initializeApp(firebaseConfig);

const authService = firebase.auth();
// const firestoreService = firebase.firestore();

export { authService };
