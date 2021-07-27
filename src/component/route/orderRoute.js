import { Route, Redirect } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import React from "react";
import * as linkRouter from "../../constants/router";
import { useSelector } from "react-redux";

export default function OrderRoute({ component: Component, ...rest }) {
  const isLogin = useSelector((state) => state.usersReducer.isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin === true ? (
          <>
            <Header />
            <Component {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to={linkRouter.login} />
        )
      }
    />
  );
}
