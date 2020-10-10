import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated()) { // eg an authenticated user should not be able to go to the login or signup screen
            return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
