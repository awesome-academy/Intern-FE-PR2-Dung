// import KEY_TOKEN from "../../userPage/const/const";
import { Route, Redirect } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import React from "react";

export default function OrderRoute({ component: Component, ...rest }) {
  const isLogin = true;
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
          <Redirect to="/login" />
        )
      }
    />
  );
}
