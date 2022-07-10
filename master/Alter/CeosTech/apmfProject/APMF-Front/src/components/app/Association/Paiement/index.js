  import { useState, useEffect } from "react";
import useForm from "../../../../hooks/useForm"; //Form has already in Hooks
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import Modal from "../../../modal/Modal";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { sendrequest } from "../../../../middlewares/request";
import "./styles.css";

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

// Component used for Adhesion and Don.
// url are passed as props
// dataUser will be displayed in the bill informations and can be modified. They will then be sent to Stripe for billing informations
// dataRegister are the data concerning the donation informations. They will be sent to the API to register the donation
// setPayment will be used to go back to the form page
// setState will be used to set the currentStep of the form page to 1, to the beginning

const Paiement = ({
  dataUser,
  urlRegister,
  urlStripe,
  dataRegister,
  setState,
  setPayment,
}) => {
  //console.log("data after payement called", dataRegister);
  // With location we can retrieve the kind of delivery chosen (was passed in props of history)
  const classes = useStyles();
  const [steps, setSteps] = useState(1);
  const [error, setError] = useState(null);
  const [montant, setMontant] = useState(dataUser.donation);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const estValide = (fieldValues = state) => {
    const validator = {};
    if ("lastName" in fieldValues)
      validator.lastName = state.lastName
        ? null
        : "le champ nom est obligatoire";
    if ("firstName" in fieldValues)
      validator.firstName = state.firstName
        ? null
        : "le champ prénom est obligatoire";

    if ("mail" in fieldValues)
      validator.mail = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(state.mail)
        ? null
        : "L'email n'est pas valide";

    if ("phone" in fieldValues)
      validator.phone =
        /(?:(\+(\d{1,2})?)[ -]?)?\(?(?<first>\d{3})\)?[-\s]?(\d{3})[- ]?(\d{4})/.test(
          state.phone
        )
          ? null
          : "Le numéro de téléphone n'est pas valide";

    if ("address" in fieldValues)
      validator.address = state.address
        ? null
        : "le champ adresse est obligatoire";

    if ("city" in fieldValues)
      validator.city = state.city ? null : "le champ ville est obligatoire";

    if ("postalCode" in fieldValues)
      validator.postalCode = /\d+/.test(state.postalCode)
        ? null
        : "Le code postal n'est pas valide";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  //  dataUser is the data filled up by the user in the form, we give them as an initial state for this form. The user is then free to change them
  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(dataUser, estValide);

  const {
    address,
    firstName,
    lastName,
    postalCode,
    city,
    phone,
    mail,
    newsletter,
  } = state;

  // go to step 2 of the payment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (estValide()) {
      setSteps(2);
    }
  };

  const handleChange = (event) => {
    // Listen for changes in CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Variables and methods to set if the form is valid or not, and display a modal window with the result of the request. Used when the form is submitted
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  // If success of the request, Will close the modal, go back to the first page of the form
  const handleClose = () => {
    if (success) {
      setShow(false);
      setPayment(false);
      setState({
        ...state,
        currentStep: 1,
      });
    } else {
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);

  // Fonction liée au paiement ainsi qu'à l'enregistrement des infos du clients
  const registerDon = async () => {
    const data = dataRegister;
    console.log(data);
    const response = await sendrequest("post", urlRegister, data);
    if (response !== false) {
      setSuccess(true);
      handleShow();
      reinitialiserState();
      //history.replace("/felicitation", { payer: true });
    } else {
      setSuccess(false);
      handleShow();
      setError(
        "Un problème s'est produit lors du paiement, veuillez réessayer"
      );
    }
  };

  const Payer = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { data } = await sendrequest("post", urlStripe, {
      amount: parseInt((parseInt(montant) * 100).toFixed(2), 10),
      email: mail,
    });
    // // *100 : stripe prend l'unité en centimes
    console.log(data)

    await stripe
      .confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((res) => {
        setError(null);
        setProcessing(false);
        setDisabled(false);
        setSucceeded(true);
        registerDon();
      })
      .catch((err) => {
        setError(`Paiement échoué: ${err.message}`);
        setProcessing(false);
        setSuccess(false);
        handleShow();
      });
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
              (steps === 2 ? "active" : "")
            }
          >
            <span>2</span>
            <p>Détails de paiement</p>
          </div>
        </div>

        {steps === 1 ? (
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
                value={lastName}
                name="lastName"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.lastName}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Prenom</InputLabel>
              <Input
                value={firstName}
                name="firstName"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.firstName}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type="email"
                name="mail"
                onChange={handleInputChange}
                value={mail}
                required
              />
            </FormControl>
            <div className="error">{errors.mail}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Numéro de Téléphone</InputLabel>
              <Input
                value={phone}
                name="phone"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.phone}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}
            >
              <InputLabel>Adresse</InputLabel>
              <Input
                value={address}
                name="address"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className="error">{errors.address}</div>

            <div style={{ display: "flex" }}>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Ville</InputLabel>
                <Input
                  value={city}
                  name="city"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.city}</div>
              </FormControl>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}
              >
                <InputLabel>Code Postal</InputLabel>
                <Input
                  value={postalCode}
                  name="postalCode"
                  onChange={handleInputChange}
                  required
                />
                <div className="error">{errors.postalCode}</div>
              </FormControl>
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
              <h2>Récapitulatif de don</h2>
              <div className="paiement__details__recapitualitfs-total">
                <p>Montant</p>
                <p className="paiement__details__recapitualitfs-total-prix">
                  {montant}€
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
                  disabled={montant <= 1 || processing || disabled || succeeded}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="paiement--btn-payer"
                >
                  <span className="paiement--btn-payer-text">
                    {/* {processing ? (
                        <img src={spinner} alt="spinner" />
                        ) : (
                        <>Donner {montant}€</>
                        )} */}
                    Donner {montant}€
                  </span>
                </Button>
              </form>
              <p className="paiement__details__securise">
                <i className="fas fa-lock"></i> Paiement 100% sécurisé
              </p>
            </div>
          </div>
        )}

        <div className="paiement__back active">
          <IconButton
            onClick={() => {
              if (steps === 2) setSteps(1);
              else setPayment(false);
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </IconButton>
        </div>
      </div>

      <Modal
        handleClose={handleClose}
        show={show}
        title={
          <>
            {success ? "Envoyé" : "Erreur"}
            <i
              className={`${
                success ? " fas fa-thumbs-up" : " fas fa-thumbs-down"
              }`}
              style={{
                color: "var(--primary-color)",
                marginLeft: "1rem",
              }}
            ></i>
          </>
        }
      >
        {success ? dataRegister.donneur
          ? "Félicitations ! Nous avons bien reçu votre don et vous remercions."
          : "Une erreur s'est produite, veuillez réessayer."
          ?  "Félicitations ! Nous avons bien reçu votre adhésion et vous remercions."
          : "Une erreur s'est produite, veuillez réessayer." : ""
        }

        {/* 
        {success && dataRegister.donneur !== null
          ? "Félicitations ! Nous avons bien reçu votre don et vous remercions."
          : "Une erreur s'est produite, veuillez réessayer."}
        {success && dataRegister.adherent !== null
          ? "Félicitations ! Nous avons bien reçu votre adhésion et vous remercions."
          : "Une erreur s'est produite, veuillez réessayer."}
          */}
      </Modal>
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

export default Paiement;
