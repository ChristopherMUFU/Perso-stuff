import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";
import SecuredRoute from "./middlewares/SecuredRout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Store
// import store from "./store";

import Admin from "./components/admin";
import Login from "./components/admin/security/Login";
import Site from "./components/app";

// Router
// We have two nested routers :
// /home for the website
// /admin for the admin part
// In order for the routing to work, we redirect / to /home so that the user falls on the website.

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <SecuredRoute path="/admin" component={Admin} />
          <Route path="/" component={Site} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
