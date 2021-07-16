import "./App.css";
import React from "react";
import PublicRouter from "./component/route/publicRoute";
import HomePage from "./pages/homePage";
import { Switch } from "react-router";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signup";
import PrivateRoute from "./component/route/privateRoute";
import AdminPage from "./pages/adminPage";
import * as linkRoute from "./constants/router";

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRouter component={HomePage} exact path to={linkRoute.home} />
        <PublicRouter component={LoginPage} path={linkRoute.login} />
        <PublicRouter component={SignUpPage} path={linkRoute.signup} />

        <PrivateRoute component={AdminPage} path={linkRoute.admin} />
      </Switch>
    </div>
  );
}

export default App;
