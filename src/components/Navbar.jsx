import React, { useState } from "react";
import "./Navbar.css";
import { authService } from "../firebase-config";
import useAuth from "./hooks/useAuth";
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

  return (
    <nav>
      <div className="header">
        <h1>Title</h1>
      </div>
      <div className="menu">
        <i
          className="fas fa-bars"
          onClick={() => {
            setShowItems(!showItems);
          }}
        ></i>
      </div>
      <ul className={showItems ? "show" : ""}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <React.Fragment>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
            <li className="mr-6">
              <button className="" onClick={handleSignOut}>
                Sign out
              </button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}
