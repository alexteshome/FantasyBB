import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={componentProps =>
      authenticated === true ? (
        <Component {...componentProps} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
