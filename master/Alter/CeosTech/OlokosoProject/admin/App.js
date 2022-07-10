import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import NavBarContextProvider from "./contexts/Navbar/navbarState";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Commander from "./pages/Commander";
import Panier from "./pages/Panier";
import Contact from "./pages/Contact";
import Equipe from "./pages/Equipe";
import Valeurs from "./pages/Valeurs";
import Restaurant from "./pages/Restaurant";
import Galerie from "./pages/Galerie";
import Brunch from "./pages/Brunch";
import Footer from "./components/footer/Footer";
import Alerts from "./components/alert/Alerts";
import Traiteur from "./components/Traiteur";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// + Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { sendrequest } from "./middlewares/request.js"
import Paiement from "./pages/Paiement";
import Felicitation from "./pages/Felicitation";
import Admin from "./pages/Admin";
import Login from "./components/admin/security/Login";
import SecuredRoute from "./middlewares/SecuredRout";

import CookieConsent from "react-cookie-consent";



// C'est pour identifier votre compte stripe
//const stripePromise = async () => loadStripe(getStripeAPIKey());

function App() {

  const [apiKey, setApiKey] = useState(null);
  const [isKeyLoaded, setIsKeyLoaded] = useState(false);

  const getAPIKeys = () => {
    sendrequest('get', 'paiement/api/keys', setApiKey, setIsKeyLoaded);
  }

  useEffect(() => {
    getAPIKeys();
  }, []);
  const LoginContainer=()=><div><Route path="/login" component={Login} /></div>


  return (
    <div className='App'>
      <Alerts />

      <CookieConsent 
        enableDeclineButton        
        buttonText="J'accepte"
        declineButtonText="Je refuse"
      >
        Ce site utilise des cookies pour améliorer votre expérience.
      </CookieConsent>

      <Router>
        <NavBarContextProvider>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              <Home />
              <Equipe />   
              <Valeurs />

              {isKeyLoaded && (
                <Restaurant mapKey={apiKey[0].google_maps_key} />
              )}

              <Traiteur />
              <Brunch />
              <Contact />            
            </Route>
            <Route exact path='/commander' component={Commander} />
            <Route exact path='/panier' component={Panier} />
            <Route exact path='/galerie' component={Galerie} />

            {isKeyLoaded && 
              <Route exact path='/paiement'>
                <Elements stripe={loadStripe(apiKey[0].stripe_public_key)}>
                {/*Pour les tests en prod */}
                {/*<Elements stripe={"pk_test_51IZE0cLbB6RgpOO7iZUCX9Ur3vHxEbgRHRndYTjkEuzei0jpqiDjlccIlVHQMbCZEb6zAHpd4R5tktQR3IIy5u5i00kZDxLJsh"}>*/}
                  <Paiement />
                </Elements>
              </Route>
            }

            <Route exact path='/felicitation' component={Felicitation} />
            <Route path='/admin' component={Admin} />
            <Route exact component={NotFoundPage} />
          </Switch>          
        </NavBarContextProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
