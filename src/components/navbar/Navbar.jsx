import React, { useState } from "react";
import "./Navbar.css";
import { authService } from "../../firebase-config";
import useAuth from "../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const [showItems, setShowItems] = useState(false);
  const history = useHistory();
  //   let history = useHistory();
  const user = useAuth();
  const handleSignOut = () => {
    authService
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  function listClicked() {
    setShowItems(false);
  }

  return (
    <nav>
      <h1 className="header">Let's Chat</h1>

      {user && <div className="user-name">{user.displayName}</div>}
      <div className="menu">
        <i
          className="fas fa-bars"
          onClick={() => {
            setShowItems(!showItems);
          }}
        ></i>
      </div>
      <span className="break"></span>
      <ul className={showItems ? "show" : ""}>
        <li onClick={listClicked}>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        {user ? (
          <React.Fragment>
            <li onClick={listClicked}>
              <Link className="link" to="/protected">
                Chats
              </Link>
            </li>
            <li className="mr-6" onClick={listClicked}>
              <button className="out-btn" onClick={handleSignOut}>
                Sign out
              </button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li onClick={listClicked}>
              <Link className="link" to="/protected">
                Chats
              </Link>
            </li>
            <li onClick={listClicked}>
              <Link className="link" to="/signIn">
                Sign In
              </Link>
            </li>
            <li onClick={listClicked}>
              <Link className="link" to="/signUp">
                Sign Up
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}
