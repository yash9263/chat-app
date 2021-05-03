import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { authService } from "../firebase-config";
import { useHistory, useLocation } from "react-router-dom";

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
          userCredential.user.updateProfile({
            displayName: username,
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
        // const user = result.user;
        history.replace(from);
        // console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <div>Sign Up</div>
      <form>
        <label>
          UserName
          <input
            type="text"
            placeholder="user name"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label>
          Email{" "}
          <input
            type="email"
            name=""
            placeholder="abc@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label>
          Password{" "}
          <input
            type="password"
            name=""
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <div>
          <p>{error && <span>{error}</span>}</p>
        </div>
        <button type="submit" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <button type="submit" onClick={handleSignupWithGoogle}>
        Sign Up with google
      </button>
    </div>
  );
}
