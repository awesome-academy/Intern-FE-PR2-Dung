import { Route } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import React from "react";
export default function PublicRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Header />
          <Component {...props} />
          <Footer />
        </>
      )}
    />
  );
}
