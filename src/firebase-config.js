import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBL0lJM4gWl83XLsulEjRJ40_gzFeQIpFc",
  authDomain: "chatapp-2f899.firebaseapp.com",
  projectId: "chatapp-2f899",
  storageBucket: "chatapp-2f899.appspot.com",
  messagingSenderId: "157570280809",
  appId: "1:157570280809:web:7f526ac87f3ae7b3da21f8",
};

firebase.initializeApp(firebaseConfig);
const authService = firebase.auth();

export { authService };
