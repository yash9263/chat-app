import "./App.css";
import Home from "./components/home/Home";
import ProvideAuth from "./components/ProvideAuth";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import Protected from "./components/protected/Protected";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/protected/PrivateRoute";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />

            <PrivateRoute exact path="/protected">
              <Protected />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
