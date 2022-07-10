import React from 'react';

import './base.css';
import './styles.css';

import {
    Route, Switch, useRouteMatch
  } from 'react-router-dom';

import Acceuil from './Acceuil/Acceuil';
import Header from './Header';
import Footer from './Footer';
import Gallerie from './Gallerie';
import Carte from './Carte';
import ContactForm from './ContactForm';
import Panier from './Panier/Panier';
import Wrapper from './Panier/Paiement';
import Felicitation from './Panier/Felicitation';


const Site = () => {
  const { url } = useRouteMatch();

  return (
    <div className="site">
          <Header />

            <Switch>
              <Route
                exact
                path={`${url}/`}
              >
                  <Acceuil />
              </Route>

              <Route
                exact
                path={`${url}/carte`}    
              >
                  <Carte />
              </Route>

              <Route
                exact
                path={`${url}/contact-form`}    
              >
                  <ContactForm />
              </Route>

              <Route
                exact
                path={`${url}/gallerie`}
              >
                  <Gallerie />
              </Route>

              <Route
                exact
                path={`${url}/panier`}
              >
                  <Panier />
              </Route>

              <Route
                exact
                path={`${url}/paiement`}
              >
                  <Wrapper/>
              </Route>
              <Route
                exact
                path={`${url}/felicitation`}
              >
                  <Felicitation/>
              </Route>

          </Switch>

        <Footer />
      </div>

  )
};
export default Site;

