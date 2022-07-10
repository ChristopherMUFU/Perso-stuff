import { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  Select,
  MenuItem,
  // Modal,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useForm from "../../../hooks/useForm";
import "./paiement.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { sendrequest } from "../../../middlewares/request";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";

import { selectBaskets, emptyBasket } from "../../../app/Redux-slices/basketsSlice";
import { calculPrixProduitAvecQuantite, calculTotal } from "../../../utilities";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../Carte/MyModal/Modal";
import { URL } from "../../../middlewares/request";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  marginLeftRight: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },

  buttonIcon: {
    paddingLeft: 1,
  },

  border: {
    "& label.Mui-focused": {
      color: "#ccc",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ccc",
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
      },
    },
  },
}));

const initial = {
  nom: "",
  prenom: "",
  email: "",
  num_tel: "",
  adresse: "",
  ville: "",
  code_postale: "",
};

const Paiement = (props) => {
  const baskets = useSelector(selectBaskets);
  // With location we can retrieve the kind of delivery chosen (was passed in props of history)
  const [paiment_process, setPaiement_process] = useState("livraison");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [prixTotal, setPrixTotal] = useState(baskets.prixTotal);
  // const [supplements, setSupplements] = useState([]);

  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  console.log(baskets);

  const typeOfDelivery =
    location.delivery !== undefined
      ? location.delivery.value
      : "veuillez choisir un mode de livraison dans le panier";


   const estValide = (fieldValues = state) => {
      const validator = {};
      if ("nom" in fieldValues)
        validator.nom = state.nom ? null : "le champ nom est obligatore";
      if ("prenom" in fieldValues)
        validator.prenom = state.prenom ? null : "le champ prenom est obligatore";

      if ("email" in fieldValues)
        validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
          ? null
          : "Email n'est pas valide";

      if ("num_tel" in fieldValues)
        validator.num_tel =
          /(?:(\+(\d{1,2})?)[ -]?)?\(?(?<first>\d{3})\)?[-\s]?(\d{3})[- ]?(\d{4})/.test(
            num_tel
          )
            ? null
            : "Numéro de téléphone n'est pas valide";

      if ("adresse" in fieldValues)
        validator.adresse = state.adresse
          ? null
          : "le champ adresse est obligatore";
      if ("ville" in fieldValues)
        validator.ville = state.ville ? null : "le champ ville est obligatore";

      if ("code_postale" in fieldValues)
        validator.code_postale = /\d+/.test(code_postale)
          ? null
          : "Code postale n'est pas valide";

      if (location.delivery === undefined)
        validator.delivery =
          "Veuillez choisir un mode de livraison dans le panier";

      setErrors({ ...validator });

      // retourne boolean si et seulement si on passe un parametre pour la fonction
      if (fieldValues === state) {
        return Object.values(validator).every((el) => !el);
      }
    };

  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, estValide);

  const { nom, prenom, email, num_tel, adresse, ville, code_postale } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (estValide()) {
      setPaiement_process("paiement");
    }
  };

 

  const handleChange = (event) => {
    // Listen for changes in CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Fonction liée au paiement ainsi qu'à l'enregistrement des infos du clients
  const Payer = async (e) => {
      e.preventDefault();

      const { data } = await axios.post(URL + "paiement/create-client-secret", {
        amount: parseInt((calculTotal(baskets) * 100).toFixed(2), 10),
        email,
      });

      try 
      {
        console.log("test")
        console.log(data)
          const payload = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });
          if (payload.error) 
          {
            setError(`Paiement échoué: ${payload.error.message}`);
            setProcessing(false);
          } 
          else 
          {
              setError(null);
              setProcessing(false);
              //setDisabled(false);
              //etSucceeded(true);
              const produits = baskets;
              //const produits = [];

              console.log(JSON.stringify(baskets))


              const config = {
                headers: {
                  "Content-Type": "application/json", 
                },
              };

              await axios.post(URL + "paiement/create-commande", {
                  panier: {
                    infos_produits: JSON.stringify(produits),
                    //produits: [],
                  },
                  client: {
                    nom,
                    prenom,
                    email,
                    telephone: num_tel,
                    adresse,
                    ville,
                    code_postale,
                  },
                  methode_vente: typeOfDelivery,
                  commentaire: location.delivery.comment,
                  prix_total: calculTotal(baskets),
                })
                .then((response) => {
                  if (response !== false) {
                    reinitialiserState();
                    dispatch(emptyBasket());
                    history.replace("/home/felicitation", { payer: true });
                  } else {
                    console.log(data)
                    setError(
                      "Un problème s'est produit lors du paiement, veuillez réessayer"
                    );
                  }
                });
          }
    }
    catch (err) 
    {
      // setError(err.message);
      console.log(err.message)
    }
  };


  const handleClose = (e) => {
    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShowModal(false);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <div className="paiment">
      <div className="paiement__container">
        <h1>Paiement</h1>
        <div className="paiement__process">
          <div
            className={
              "paiement__process--option1 paiement__process--options active"
            }
          >
            <span>1</span>
            <p>Adresse de facturation</p>
          </div>
          <hr />
          <div
            className={
              "paiement__process--option2 paiement__process--options " +
              (paiment_process === "paiement" ? "active" : "")
            }
          >
            <span>2</span>
            <p>Détails de paiement</p>
          </div>
        </div>
        {paiment_process === "livraison" ? (
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ flexDirection: "column" }}
          >
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Nom</InputLabel>
              <Input
                value={nom}
                name="nom"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.nom}</div>
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Prenom</InputLabel>
              <Input
                value={prenom}
                name="prenom"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.prenom}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl>
            <div className="error">{errors.email}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Numéro de Téléphone</InputLabel>
              <Input
                value={num_tel}
                name="num_tel"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.num_tel}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse</InputLabel>
              <Input
                value={adresse}
                name="adresse"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.adresse}</div>

            <div style={{ display: "flex" }}>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Ville</InputLabel>
                <Input
                  value={ville}
                  name="ville"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.ville}</div>
              </FormControl>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Code Postal</InputLabel>
                <Input
                  value={code_postale}
                  name="code_postale"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.code_postale}</div>
              </FormControl>
            </div>

            {/* The type of delivery chosen */}
            <div className="delivery-infos__container">
              <p className="paiement__delivery-informations">
                Choix de livraison : {typeOfDelivery}
              </p>
              <div className="error">{errors.delivery}</div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="paiement--btn"
              endIcon={<NavigateNextIcon />}
            >
              Suivant
            </Button>
          </form>
        ) : (
          <div className="paiement__details">
            <div className="paiement__details__recapitualitfs">
              <h2>Récapitulatif de commande</h2>
              {baskets.map((product) => (
                <div
                  className="paiement__details__product__details"
                  key={product.nom}
                >
                  <div className="paiement__details__product__details-info">
                    <p>{product.nom}</p>
                    <p className="paiement__details__product__details-info-quantite">
                      Quantité: <span> {product.quantite} </span>{" "}
                    </p>
                  </div>
                  <div className="paiement__details__product__details-prix">
                    <p>{calculPrixProduitAvecQuantite(product)}€</p>
                  </div>
                </div>
              ))}
              <div className="paiement__details__recapitualitfs-total">
                <p>TOTAL (TTC)</p>
                <p className="paiement__details__recapitualitfs-total-prix">
                  {calculTotal(baskets)}€
                </p>
              </div>
            </div>

            <div className="paiement__details__modePaiement">
              <h2>Paiement sécurisé par carte bancaire</h2>
              <p>CB et VISA acceptées</p>

              <form className="paiement__form">
                <CardElement
                  id="card-element"
                  onChange={handleChange}
                  options={cardStyle}
                />
                {error && (
                  <div className="paiement__details__error">* {error}</div>
                )}

                <Button
                  onClick={Payer}
                  variant="contained"
                  color="primary"
                  className="paiement--btn-payer"
                >
                  <span className="paiement--btn-payer-text">
                    {processing ? (
                     {/* <img src={spinner} alt="spinner" /> */}
                    ) : (
                      <>Payer {calculTotal(baskets)}€</>
                    )}
                  </span>
                </Button>
              </form>
              <p className="paiement__details__securise">
                <i className="fas fa-lock"></i> Paiement 100% sécurisé
              </p>
            </div>
          </div>
          )}  
      <div className="paiement__close">
          <IconButton onClick={handleOpen}>
            <i className="fas fa-times"></i>
          </IconButton>
        </div>
        <div
          className={
            "paiement__back " + (paiment_process === "paiement" ? "active" : "")
          }
        >
          <IconButton onClick={() => setPaiement_process("livraison")}>
            <i className="fas fa-arrow-left"></i>
          </IconButton>
        </div>

        <Modal
          closeButton={false}
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleClose}
        >
          <Modal.Header>
            <h2>
              Etes-vous sûr de vouloir quitter cette page et retourner à l'écran
              de commande ?
            </h2>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              className="myModal__modal__close-btn"
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              className="myModal__modal__close-btn"
              onClick={(e) => {
                handleClose(e);
                history.replace("/home/carte");
              }}
            >
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};


const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aaa",
        backgroundColor: "#fff",
      },
      ":-webkit-autofill": {
        color: "#fff",
      },
      ":focus": {
        color: "#aaa",
      },
    },

    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};



export const Wrapper = (props) => {

  //const config = useSelector(state => state.config.info);
  //const stripe = window.Stripe(config.stripe);
  const test = loadStripe("pk_test_51JQ9d2G8uFuhwMtfeIIgrp9mSsWPuVqmTeqZVNc58ukTd42QqUEsnWf8vXIXS5q6Mu6bKS2PfElbRySFMeMHTaQK00WyHNKcuX  ");

  return (
    <Elements stripe={test}>
      <Paiement />
    </Elements>
  );
}

export default Wrapper;
