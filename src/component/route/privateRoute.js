import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const fakeAuthe = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuthe === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}