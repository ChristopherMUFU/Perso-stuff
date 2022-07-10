import React, { useEffect, useRef } from "react";

import "./contact.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { getPrixAvecTTC, splitPrix } from "../../../utilities";
import ExpandedIcon from "../product/ExpandedIcon";
//import ReadMoreReact from 'read-more-react';
import axios from "axios";
import {URL} from "../../../middlewares/request";


const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    minHeight: "100px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 15,
    width: "20%",
  },

  detail: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 12,
  },

  message: {
    marginTop: "5%",
    fontSize: 13,
    maxWidth: "150px",
    wordWrap: "break-word",
    textAlign: "justify",
  },

  message_header: {
   marginHorizontal: 10,
  },

  headerStyle: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 15,
  },

  message_container: {
    display: "flex",
    flexDirection: "column",
  },

  message_content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
    marginLeft: "15%",
    marginRight: "15%",
  },

  message_response: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "3%",
    marginBottom: "2%",
  },

  contentStyle: {
    textAlign: "justify",
  },

  '@media(minWidth: 780px)' : {
    width: '80%'
  }
}));




const Contact = ({ contact, contact: {id}}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  //console.log("abc" + id)
  //delete data
  const deleteData = async () => {
    axios.delete(URL + "gonak/contact/" + contact.id +"/").then((res) => {
      window.location.reload();
      // history.push("/admin/fichier-contact");
    });
  };

  return (
    <>
      <Accordion
        className={classes.accordion}
        key={contact.id}
        onChange={(e, expand) => setExpanded(expand)}>
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <div className={classes.table}>
                <div>
                  <p className={classes.p}>{contact.nom}</p>
                </div>
                <div>
                <p className={classes.p}>{contact.prenom}</p>
                </div>
                <div>
                <p className={classes.p}>{contact.telephone}</p>
                </div>
                <div>
                <p className={classes.p}>{new Date(contact.date_message).toLocaleDateString()}</p>
                </div>
                
            </div>
          ) : (
            <div className={classes.table}>
                
            </div>
          )}
        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.message_container}>
            <div className={classes.message_content}>
              <div className="message_box">
                <p><b>Nom:</b> {contact.nom}</p>
                <p><b>Prénom:</b> {contact.prenom}</p>
                <p><b>Telephone:</b> {contact.telephone}</p>
                <p><b>Mail:</b> {contact.email}</p>
                <p><b>Societe:</b> {contact.societe}</p>
                <p><b>Prestation:</b> {contact.prestation}</p>
                <p><b>Date:</b> {new Date(contact.date_message).toLocaleDateString()}</p>
                <p className={classes.contentStyle}><b>Message:</b> <br></br>{contact.message}</p>
              </div>
            </div>
            
            <div style={{ textAlign: "center" }}>
              <a href={`mailto:${contact.email}`}>
                <button className="registre__button">
                  <i className="fas fa-reply "></i>
                </button>
              </a>
              <button
                className="supp_button"
                onClick={() => {

                  deleteData();
                }}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
            
          </div>
       
    
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Contact;
