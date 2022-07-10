/* 
    Use Grid in MaterializeCSS for this component
    Link: https://materializecss.com/grid.html 
*/

import React, { useState } from 'react';
import '../../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './ContactForm.css';
import Modal from "../../../modal/Modal";

import ImgChild from "../../../../images/site/Photos/photo-1524503033411-c9566986fc8f.png";

import useForm from "../../../../hooks/useForm"; //Form has already in Hooks
import { sendrequest } from "../../../../middlewares/request";

// This part connect to the database if correct, if not, show message error
const ContactForm = () => {
  const initial = {
    nom: "",
    prenom: "",
    email: "",
    message: "",
    objet: "",
  };

  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isValid = (fieldValues = state) => {
    const validator = {};
    if ("nom" in fieldValues)
      validator.nom = state.nom ? null : "Le champ nom est obligatoire";

    if ("prenom" in fieldValues)
      validator.prenom = state.prenom
        ? null
        : "Le champ prénom est obligatoire";

    if ("objet" in fieldValues)
      validator.objet = state.objet ? null : "Le champ objet est obligatoire";

    if ("message" in fieldValues)
      validator.message =
        message.length > 10
          ? null
          : "Le champ message doit comprendre au moins 10 caractères";

    if ("email" in fieldValues)
      validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
        ? null
        : "Le format du mail n'est pas valide";

    setErrors({ ...validator });

    // return boolean if and only if we pass a parameter for the function
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, isValid);

  const { nom, prenom, email, objet, message } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const response = await sendrequest("post", "contacts/", state);  
      if (response !== false) {
        setSuccess(true);
        handleShow();
        reinitialiserState();
      }   
      else {
        setSuccess(false);
        handleShow();
      }
    }
  };

  return (
    <section id="contactForm">
      <div className="container container-contactForm">
        <h4>
          <b>Prendre contact avec nous</b>
        </h4>
        <div className="row">
          <div className="col s12 m6">
            <p>
              <b>Association de Patient de la Maladie de Fabry</b>
              <br></br>
              21, rue Monge - 21160 Marsannay-la-Côte <br></br>
              (Siège Social & Siège Administratif) <br></br>
              <br></br>
              Trois moyens de contacter l’APMF :
            </p>
            <div className="row">
              <div className="col s12 m6">
                Par courrier postal : <br></br>
                APMF <br></br>
                21 rue Monge <br></br>
                21160 Marsannay-la-côte <br></br>
              </div>
              <div className="col s12 m6">
                Par mail : <br></br><b>
                <a class="footer_link" href="mailto:presidence@apmf-fabry.org">
                presidence@apmf-fabry.org </a> </b><br></br>
                <br></br>
                Par téléphone : <br></br><b>
                <a class="footer_link" href="tel:06-32-26-25-69">
                06 32 26 25 69 </a> </b><br></br>
              </div>
            </div>
            <img src={ImgChild} alt="children"></img>
          </div>

          <form
            className="col s12 m6"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col s6">
                <p className="black-text left">Prénom:</p>
                <textarea
                  name="prenom"
                  value={prenom}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.5rem' }}
                ></textarea>
                <div className="error">{errors.prenom}</div>
              </div>

              <div className="col s6">
                <p className="black-text left">Nom:</p>
                <textarea
                  name="nom"
                  value={nom}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.5rem' }}
                ></textarea>
                <div className="error">{errors.nom}</div>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <p className="black-text left">Adresse mail:</p>
                <textarea
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.5rem' }}
                ></textarea>
                <div className="error">{errors.email}</div>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <p className="black-text left">Objet:</p>
                <textarea
                  name="objet"
                  value={objet}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.5rem' }}
                ></textarea>
                <div className="error">{errors.objet}</div>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <p className="black-text left">Message:</p>
                <textarea
                  className="inscreaseHeight"
                  rows="10"
                  name="message"
                  value={message}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '0.5rem' }}
                ></textarea>
                <div className="error">{errors.message}</div>
              </div>
            </div>

            <div className="row center">
              <button className="btnValider" type="submit">
                <b>Valider</b>
              </button>
            </div>

            <Modal
              handleClose={handleClose}
              show={show}
              title={
                <>
                  {success ? "Envoyé" : "Oups"}
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
              {success
                ? "Votre message a bien été envoyé."
                : "Une erreur s'est produite, veuillez réessayer."}
            </Modal>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
