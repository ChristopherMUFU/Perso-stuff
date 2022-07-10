import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { sendrequest, URL } from "../../../../middlewares/request";
import { useSelector } from "react-redux";
import { calculTotal, getNombresArticles } from "../../../../utilities";
import { selectBaskets } from "../../../../app/Redux-slices/basketsSlice";
import { Grid } from "@material-ui/core";


import "./styles.css";

import CGV from "../../../../Documents/CGV.pdf";

const RadioButtonsGroup = () => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);

  const [value, setValue] = React.useState("");
  const [zoneValue, setZoneValue] = React.useState("");
  const [livraison, setLivraison] = React.useState(false);
  const [comment, setComment] = useState("");

  const [error, setError] = React.useState(false);
  const [isOpened, setOpening] = useState([]); // undefined
  const [errorCGV, setErrorCGV] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === "livraison") {
      setLivraison(true);
    } else {
      setLivraison(false);
    }
    setValue(event.target.value);
    setError(false);
  };

  const handleChangeZone = (event) => {
    setZoneValue(event.target.value);
    setError(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const get_restaurant = async () => {
    axios.get(URL + "restaurant/info_restaurant/").then((res) => setOpening(res.data));;
  };

  const affichageZone1 = () => {
    return (
      <>
        <p className="radio__text-zone">
          <strong>Zone 1 (20€ minimum de commande) : </strong>
            Le Blanc-Mesnil, Aulnay-sous-Bois, Le Bourget
        </p>
      </>
    );
  };

  const valZone1 = 20;

  const affichageZone2 = () => {
    return (
      <p className="radio__text-zone">
        <strong>Zone 2 (25€ minimum de commande) : </strong>
        Bondy, Bobigny, Dugny, Drancy
      </p>
    );
  };

  const valZone2 = 25;

  const affichageZone3 = () => {
    return (
      <p className="radio__text-zone" id="last-text-radio">
        <strong>Zone 3 (30€ minimum de commande) : </strong>
        Stains, Pierrefitte-sur-Seine, Saint-Denis, Villetaneuse, Sarcelles
      </p>
    );
  };

  const valZone3 = 30;

  useState(() => get_restaurant());

  // Will redirect to the payment and add in the props the kind of delivery chosen
  const handleSubmit = () => {
    const d = new Date();
    const hour = d.getHours();
    const day = d.getDay();
    //const isMenu = baskets.filter((menu) => "type" in menu);
    console.log("go");
    //If the restaurant is closed
    if (!isOpened[isOpened.length - 1]?.disponibilite_restaurant) {
      alert(
        "Nous sommes désolés, le restaurant est actuellement fermé, revenez bientôt !"
      );
    } else if (day > 5) {
      //If the user is trying to order a menu at the wrong time : order possible monday to friday
      alert(
        "Nous sommes désolés, il n'est pas possible de commander un menu le week-end."
      );
    } else if (hour < 10 || hour > 18) {
      //If the user is trying to order a menu at the wrong time : order possible 11h to 14h
      alert(
        "Nous sommes désolés, il n'est possible de commander un menu qu'entre 11h et 14h."
      );
    } else {
      //Validate the cart
      if (value !== "" && checked) {
        history.push({
          pathname: "/home/paiement",
          delivery: { value, comment },
        });
        setError(false);
        setErrorCGV(false);
      } else {
        if (value == "") {
          setError(true);
        }
        if (!checked) {
          setErrorCGV(true);
        }
      }
    }
  };

  const total = calculTotal(baskets);

  const zoneVerify = (event) => {
    if (Number(zoneValue) === valZone1 && total < valZone1) {
      alert(
        "Le minimum de commande pour cette zone est de" +
          valZone1 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else if (Number(zoneValue) === valZone2 && total < valZone2) {
      alert(
        "Le minimum de commande pour cette zone est de " +
          valZone2 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else if (Number(zoneValue) === valZone3 && total < valZone3) {
      alert(
        "Le minimum de commande pour cette zone est de " +
          valZone3 +
          "€. Veuillez compléter votre panier, merci :)"
      );
      setZoneValue(-1);
    } else {
        handleSubmit();
    }
  };

  return (
    <div className="panier__fieldset">
      <p className="product--info-title">
        Commentaire
      </p>
      <TextField
        id="outlined-full-width"
        style={{ marginBottom: "2rem" }}
        placeholder="Commentaire"
        helperText="Indiquez ici toute information complémentaire sur votre commande"
        fullWidth
        margin="normal"
        rows={2}
        variant="outlined"
        onChange={handleCommentChange}
      />

      <Grid md={12} justifyContent='center'>
          <p className="product--info-title" id="mode_livraison">Mode de Livraison</p>
      </Grid>

      <RadioGroup
        aria-label="panier__choice-delivery"
        name="panier__choice-delivery"
        value={value}
        onChange={handleChange}
      >
        <Grid container justifyContent="center" xs={12}>
            
            
              <FormControlLabel
                className="radio__panier-choice"
                value="à emporter"
                id="radio_emporter"
                control={<Radio />}
                label="À emporter"
              />
         
           
              {isOpened[0] !== undefined && isOpened[0].disponibilite_livraison ? (
                <FormControlLabel
                  value="livraison"
                  className="radio__panier-choice"
                  control={<Radio />}
                  label="Livraison"
                />
                ) : null}
            
            
        </Grid>

      </RadioGroup>

      {error && (
        <p className="error error_cart">
          Veuillez choisir un mode de livraison
        </p>
      )}

      {livraison ? (
        <>
          <div className="livraison__container">
            <h2>
              Minimum de commande selon la zone
              <br />
              Délai livraison : 45min/1heure
            </h2>
            <p>Veuillez choisir votre zone de livraison</p>
          </div>

          <div className="zones__container">
            <RadioGroup
              aria-label="panier__choice-delivery"
              name="panier__choice-delivery"
              value={zoneValue}
              onChange={handleChangeZone}
            >
              <FormControlLabel
                value="20"
                className="radio__panier-zone"
                control={<Radio />}
                label={affichageZone1()}
              />
              <FormControlLabel
                value="25"
                className="radio__panier-zone"
                control={<Radio />}
                label={affichageZone2()}
              />
              <FormControlLabel
                value="30"
                className="radio__panier-zone"
                id="last-panier-radio"
                control={<Radio />}
                label={affichageZone3()}
              />
            </RadioGroup>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="CGV__container">
        <Checkbox
          checked={checked}
          onClick={() => {
            setChecked(!checked);
            setErrorCGV(false);
          }}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <p>
          J'ai lu et j'accepte les{" "}
          <a href={CGV} target="_blank">
            Conditions Générales de Vente
          </a>
        </p>
      </div>

      {errorCGV && (
        <p className="error error_cart">
          Veuillez accepter les conditions générales de vente
        </p>
      )}

      <Button
        onClick={zoneVerify}
        type="submit"
        variant="contained"
        color="secondary"
        className="panier__container--btn-valider"
      >
        Commander
      </Button>
    </div>
  );
};

export default RadioButtonsGroup;
