import { Route } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
export default function RouterPublic({ component: Component, ...rest }) {
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
