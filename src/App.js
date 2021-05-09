import "./App.css";
import Home from "./components/Home";
import ProvideAuth from "./components/ProvideAuth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/Loading";

function App() {
  // const [user, loading] = useAuthState(firebase.auth());
  // if (!loading) {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/protected">
            <Protected />
          </PrivateRoute>
        </div>
      </Router>
    </ProvideAuth>
  );
  // } else {
  //   return <Loading />;
  // }
}

export default App;
