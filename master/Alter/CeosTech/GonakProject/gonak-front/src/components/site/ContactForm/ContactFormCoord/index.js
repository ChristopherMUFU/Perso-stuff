import React, { useState } from 'react';
import "./styles.css";
import {Grid, makeStyles, TextField} from '@material-ui/core';
import Modal from "../modal/Modal";
import useForm from "../../../../hooks/useForm";
import { sendrequest } from "../../../../middlewares/request";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },
  }));

const ContactFormCoord = () => {
    const classes = useStyles();

    //Connect to the database if correct, if not show error
    const initial = {
        nom: "",
        prenom: "",
        societe: "",
        email: "",
        telephone:"",
        prestation: "",
        message: "",
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

        if ("email" in fieldValues)
            validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
                ? null
                : "Le format du mail n'est pas valide";

        if ("telephone" in fieldValues)
            validator.telephone = (/([0-9.+])/.test(telephone) && telephone.length >= 10)
                ? null
                : "Le format du telephone n'est pas valide";
        
        if ("prestation" in fieldValues)
          validator.prestation =
            prestation.length > 10
              ? null
              : "Le champ prestation doit comprendre au moins 10 caractères";
            
        if ("message" in fieldValues)
            validator.message =
            message.length > 10
                ? null
                : "Le champ message doit comprendre au moins 10 caractères";
    
        setErrors({ ...validator });
    
    // return boolean if and only if we pass a parameter for the function
    if (fieldValues === state) {
        return Object.values(validator).every((el) => !el);
        }
    };

    const { state, handleInputChange, errors, setErrors, reinitialiserState } =
    useForm(initial, isValid);

  const { nom, prenom, societe, email, telephone, prestation, message } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const response = await sendrequest("post", "restaurant/contact/", state);  
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
        <div className="contact-coord">
            <h2>Entrez vos coordonnées</h2>
            <form 
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
            <Grid container direction="row">
                <Grid  xs={12} md={6}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            id="filled-basic" 
                            label="Nom" required
                            name="nom"
                            variant="filled" 
                            value={nom}
                            onChange={handleInputChange}
                        />
                       <div className="error">{errors.nom}</div>

                        <TextField id="filled-basic" 
                            label="Prénom" required
                            name="prenom"
                            value={prenom}
                            onChange={handleInputChange}
                            variant="filled" />
                        <div className="error">{errors.prenom}</div>

                        <TextField id="filled-basic" 
                            label="Société/Etablissement" 
                            name="societe"
                            value={societe}
                            onChange={handleInputChange}
                            variant="filled" />

                        <TextField id="filled-basic" 
                            label="Votre mail" required
                            name="email"
                            value={email}
                            onChange={handleInputChange}          
                            variant="filled" />
                        <div className="error">{errors.email}</div>

                        <TextField id="filled-basic" 
                            label="Téléphone" required
                            name="telephone"
                            value={telephone}
                            onChange={handleInputChange}          
                            variant="filled" />
                        <div className="error">{errors.telephone}</div>
                            
                        <TextField id="filled-basic" 
                            label="Préstation" required
                            name="prestation"
                            value={prestation}
                            onChange={handleInputChange}          
                            variant="filled" />
                        <div className="error">{errors.prestation}</div>

                    </form>
                </Grid>
                <Grid xs={12} md={6}>
                    <form className={classes.root}>
                        <TextField fullWidth multiline required
                            rows={18} id="filled-basic" 
                            label="Message" 
                            name="message"
                            value={message}
                            onChange={handleInputChange}
                            variant="filled" />
                        <div className="error">{errors.message}</div>

                    </form>
                </Grid>
            </Grid>
            <button type="submit" className="btnEnvoyer" 
                >ENVOYER</button>
            
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
    );
}
export default ContactFormCoord;