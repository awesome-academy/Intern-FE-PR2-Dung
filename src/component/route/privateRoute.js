import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import * as linkRouter from "../../constants/router";

export default function PrivateRoute({ component: Component, ...rest }) {
  const fakeAuthe = useSelector((state) => state.usersReducer.isAuthen);
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuthe === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={linkRouter.login} />
        )
      }
    />
  );
}
