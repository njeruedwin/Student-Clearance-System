import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import StudentSignIn from "./Components/StudentSignIn";
import AdminPage from "./Components/AdminPage";
import AdministratorSignIn from "./Components/AdministratorSignIn";
import StudentPage from "./Components/StudentPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/admin" component={AdminPage} exact />
      <Route path="/studentsignin" component={StudentSignIn} />
      <Route path="/administratorsignin" component={AdministratorSignIn} />
      <Route path="/student" component={StudentPage} />
    </Switch>
  </Router>,

  document.getElementById("root")
);
