import firebase from "firebase/app";
import "firebase/auth";
import { Route, Redirect } from "react-router-dom";
import { authService } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

export default function PrivateRoute({ children, ...rest }) {
  const [user, loading] = useAuthState(firebase.auth());
  if (!loading) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authService.currentUser ? (
            children
          ) : (
            <Redirect to={{ pathname: "/signin", state: { from: location } }} />
          )
        }
      />
    );
  } else {
    return <Loading />;
  }
}
