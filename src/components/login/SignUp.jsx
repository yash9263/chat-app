import { useState } from "react";
import firebase from "firebase/app";
import "./SignIn.css";
import "firebase/auth";
import { authService } from "../../firebase-config";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let { from } = location.state || { from: { pathname: "/protected" } };

  const handleSignup = (event) => {
    event.preventDefault();
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      authService
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              const useruid = userCredential.user.uid;
              firebase.firestore().collection("accounts").doc(useruid).set({
                name: userCredential.user.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          console.log("you're signed up");
          setError(null);
          setEmail("");
          setPassword("");
          setUsername("");
          history.replace(from);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      setError("One or more field is/are missing");
    }
  };

  const handleSignupWithGoogle = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    authService
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        history.replace(from);
        // console.log(user);
        firebase.firestore().collection("accounts").doc(user.uid).set({
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <div className="page-title">Sign Up</div>
      <form className="signin-form-container">
        <div className="input-container">
          <label className="input-label">UserName</label>
          <input
            className="text-input"
            type="text"
            placeholder="user name"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="input-label">Email</label>
          <input
            className="text-input"
            type="email"
            name=""
            placeholder="abc@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="input-label">Password</label>
          <input
            className="text-input"
            type="password"
            name=""
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {error && <p className="error-msg">{error}</p>}
        </div>
        <Link to="/signin">Already have an account</Link>
        <div className="btn-container">
          <button className="signin-btn" type="submit" onClick={handleSignup}>
            Sign Up
          </button>
          <button className="signin-btn" onClick={handleSignupWithGoogle}>
            Google
          </button>
        </div>
      </form>
    </div>
  );
}
