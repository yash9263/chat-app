import { Route, Redirect } from "react-router-dom";
import { authService } from "./firebase-config";

export default function PrivateRoute({ children, ...rest }) {
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
}
