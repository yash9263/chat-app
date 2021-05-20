import "./App.css";
import Home from "./components/Home";
import ProvideAuth from "./components/ProvideAuth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

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
