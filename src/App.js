import "./App.css";
import Home from "./components/Home";
import ProvideAuth from "./components/ProvideAuth";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/protected">
            <Protected />
          </PrivateRoute>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
