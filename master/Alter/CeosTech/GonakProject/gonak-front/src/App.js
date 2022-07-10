import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SecuredRoute from "./middlewares/SecuredRout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import { sendrequest } from "./middlewares/request.js";

import Admin from "./components/admin";
import Login from "./components/admin/security/Login";
import Site from "./components/site";
import Wrapper from "./components/site/Panier/Paiement";
import { URL } from "./middlewares/request";

// Router
// We have two nested routers :
// /home for the website
// /admin for the admin part
// In order for the routing to work, we redirect / to /home so that the user falls on the website.

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [isKeyLoaded, setIsKeyLoaded] = useState(false);

  const getAPIKeys = () => {
    sendrequest("get", "gonak/api/keys/", setApiKey, setIsKeyLoaded);
  };

  useEffect(() => {
    getAPIKeys();
  }, []);
  return (
      <div className="App">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <SecuredRoute path="/admin" component={Admin} />
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Site} /> 
              <Route exact path="/home/paiement" component={Wrapper}/>
            </Switch>
          </Router>
      </div>
  );
}
export default App;
