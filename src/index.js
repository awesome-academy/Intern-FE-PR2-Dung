import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { store } from "./redux/store.js";
import "./index.css";
import App from "./App";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading... </div>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

reportWebVitals();
