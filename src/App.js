import ProfilePage from "./pages/profilePage/index";
import "./App.css";
import React from "react";
import RouterPublic from "./component/route/publicRoute";

function App() {
  return (
    <div className="App">
      <RouterPublic component={ProfilePage} to="/" />
    </div>
  );
}

export default App;
