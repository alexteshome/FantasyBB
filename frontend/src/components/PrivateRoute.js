import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
