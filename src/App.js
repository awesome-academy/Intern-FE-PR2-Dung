import "./App.css";
import React from "react";
import RouterPublic from "./component/route/publicRoute";
import HomePage from "./pages/homePage";
import { Switch } from "react-router";

import "./style/_global.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <RouterPublic component={HomePage} exact to="/" />
      </Switch>
    </div>
  );
}

export default App;
