import React, { useEffect /*, useRef */ } from "react";

import "./contact.css";
//import fileDownload from "js-file-download";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  // Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import ExpandedIcon from "../product/ExpandedIcon";
import axios from "axios";
import { URL } from "../../../middlewares/request";
// import { useHistory } from "react-router";
import MessageContainer from "./MessageContainer";

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
    position: "relative",
    border: "1px solid gray",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
  },
}));

export default function Contact({ contact: { id } }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState({});
  const [seen, setSeen] = useState(null);
  // const history = useHistory();

  const fechContactById = async () => {
    axios.get(URL + "contacts/" + id + "/").then((res) => {
      setMessage(res.data);
    });
  };

  const deleteData = async () => {
    axios.delete(URL + "contacts/" + id).then((res) => {
      window.location.reload();
      // history.push("/admin/fichier-contact");
    });
  };

  const updateVu = async () => {
    if (!message.vu) {
      const newContact = { ...message, vu: true };
      axios
        .put(URL + "contacts/" + message.id + "/", newContact)
        .then((res) => {
          setSeen(res.data.vu);
        });
    }
  };

  useEffect(() => {
    fechContactById();
  }, [seen]);

  return (
    <Accordion
      className={classes.accordion}
      key={message.id}
      onChange={(e, expand) => {
        setExpanded(expand);
        updateVu();
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <i
              className={
                message.vu
                  ? "far fa-envelope-open icon  "
                  : "far fa-envelope icon unseen-icon"
              }
            ></i>
            <p className={classes.p}>{message.prenom}</p>
            <p className={classes.p}>{message.nom}</p>
            {/* <p className={classes.p}>{message.email}</p> */}
            <p className={classes.p}>{message.objet}</p>
            <p className={classes.p}>
              {new Date(message.date_envoie).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="contact__container">
          <MessageContainer contact={message} />
          <div className="contact__button">
            <a href={`mailto:${message.email}`}>
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
  );
}
