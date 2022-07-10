import React, { useEffect, useState } from 'react';
import {
  Route, Switch, useRouteMatch, useHistory
} from 'react-router-dom';

// react-redux
import { useDispatch, useSelector } from "react-redux";
import { getNews, getNewsState } from "../../app/Redux-slices/newsSlice";

// == Import
import Home from './Home';
import Header from './Header';
import Page from './Page';
import Footer from './Footer';
import Fabry from './Fabry';
import Association from './Association';
import Actualites from './Actualites';
import ActualitePage from './Actualites/ActualitePage';
import Partenaires from './Partenaires';
import NotFound from './NotFound';

import './styles.css';
import './base.css';

//Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const publicKey="pk_test_51JDrRDIbpxt7EjD8J1YiiQxZK01GsskEId9DBtuR3FKmV5wHkMjCq1Odhqxt02g8D4g4R9oe60HA92vl537fJmra007tMqc8XR";


// == Composant
// Since a lot of our pages share similar elements, we include them in the PAGE component that contains the similar elements
const Site = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();  
  const dispatch = useDispatch();
  
  // domLoaded : when the content is Loaded, we display if necessary the 404 page (otherwise, since the homepage takes som time to be displayed, the 404 would appear for a fraction of seconds before the hompage appears) Same for Footer.
  const [domLoaded, setDomLoaded]= useState(false);
  useEffect(() => {    
    setDomLoaded(true);
  }, []);

  // This boolean indicates whether or not the API call has worked to get the 'Actualités', and if positive, allows the component Actualites to be displayed
  const isNewsLoaded = useSelector(getNewsState).isNewsLoaded;

  // We send a GET request to the API and stock the result in the store
  // We launch an action getNews => get data from API.
  // We also set the page we are on
  useEffect(() => {    
    dispatch(getNews());
    if (window.location.pathname === "/"){
      history.push(path + "home");
    }
  }, [dispatch, path, history]);



  return (
    <Elements stripe={loadStripe(publicKey)}>
      <div className="site">
        <Header />

        <Switch>          
          
          <Route
            exact
            path={path + `home`}
          >
              <Home />
          </Route>

          <Route
            exact
            path={path + `fabry/:slug`}
            component={({ match }) => (
              <Page 
                menuLink= 'fabry'
                slug={match.params.slug} 
              >
                <Fabry 
                  menuLink= 'fabry'
                  slug={match.params.slug} 
                />
              </Page>
            )}            
          />

          <Route
            exact
            path={path + `association/:slug`}
            component={({ match }) => (
              <Page
                menuLink= 'association'
                slug={match.params.slug} 
              >
                <Association
                  menuLink= 'association'
                  slug={match.params.slug} 
                />
              </Page>
            )}            
          />
          
          {isNewsLoaded && (
            <Route
              exact
              path={path + `actualites/:slug`}
              component={({ match }) => (
                <Page
                menuLink= 'actualites'
                slug={match.params.slug} >
                  <Actualites 
                    menuLink= 'actualites'
                    slug={match.params.slug} 
                  />
                </Page>
              )}            
            />
          )}  
          
          {isNewsLoaded && (
            <Route
              exact
              path={path + `actualites/articles/:slug`}
              component={({ match }) => (
                  <ActualitePage
                    slug={match.params.slug} 
                  />
              )}            
            />
          )}   

          <Route
            exact
            path={path + `partenaires-hopitaux/:slug`}
            component={({ match }) => (
              <Page
              menuLink= 'partenaires-hopitaux'
              slug={match.params.slug} >
                <Partenaires 
                  menuLink= 'partenaires-hopitaux'
                  slug={match.params.slug} 
                />
              </Page>
            )}            
          /> 

          {domLoaded && isNewsLoaded && (
            <Route component={NotFound} />
          )}

        </Switch>

        {domLoaded && isNewsLoaded && (
          <Footer />
        )}

      </div>
    </Elements>
  );
};

export default Site;