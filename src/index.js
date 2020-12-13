import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./Login"

import { Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
      </>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
