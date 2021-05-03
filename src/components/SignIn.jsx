import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { authService } from "../firebase-config";
import { useHistory, useLocation } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let { from } = location.state || { from: { pathname: "/protected" } };

  const handleSignin = (event) => {
    event.preventDefault();
    if (email.length > 0 && password.length > 0) {
      authService
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          setError("");
          history.replace(from);
          console.log("you're signed in");
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      setError("One or more field is/are missing");
    }
  };

  const handleSigninWithGoogle = (event) => {
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
      <div>Sign In</div>
      <form>
        <label>
          Email
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
          Password
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
        <button type="submit" onClick={handleSignin}>
          Sign In
        </button>
      </form>
      <button type="submit" onClick={handleSigninWithGoogle}>
        Sign In with google
      </button>
    </div>
  );
}
