import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import ExpandedIcon from "../product/ExpandedIcon";
import "./AdhesionItem.css";
import { URL } from "../../../middlewares/request";

import { RecuAdhesion } from "./RecuAdhesion";

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
    marginBottom: "1rem",
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
  span: {
    fontWeight: "normal",
  },
  bodyText: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    margin: "5px",
  },
}));

export default function AdhesionItem({ adhesion: { id } }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [adhesionItem, setAdhesionItem] = useState({});
  const [seen, setSeen] = useState(null);
  const date_adhesion = new Date(
    adhesionItem.date_adhesion
  ).toLocaleDateString();

  const fechAdhesionItemById = async () => {
    axios.get(URL + "adhesions/" + id + "/").then((res) => {
      setAdhesionItem(res.data);
    });
  };

  const updateVu = async () => {
    if (!adhesionItem.vu) {
      const newAdhesion = { ...adhesionItem, vu: true };

      axios.put(URL + "adhesions/" + id + "/", newAdhesion).then((res) => {
        setSeen(res.data.vu);
      });
    }
  };
  useEffect(() => {
    fechAdhesionItemById();
  }, [seen]);
  return (
    <Accordion
      className={classes.accordion}
      key={adhesionItem.id}
      onChange={(e, expand) => {
        setExpanded(expand);
        updateVu();
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <span style={{ color: adhesionItem.vu ? "white" : "green" }}>
              <i className={adhesionItem.vu ? "" : "fas fa-plus "}></i>
            </span>
            <p className={classes.p}>{adhesionItem.adherent?.prenom}</p>
            <p className={classes.p}>{adhesionItem.adherent?.nom}</p>
            <p className={classes.p}>{date_adhesion}</p>
            <p className={classes.p}>{adhesionItem.montant}€</p>
          </div>
        ) : (
          <div></div>
        )}

        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="adhesion__container">
          <div className={classes.table}>
            <p className={classes.p}>{adhesionItem.adherent?.prenom}</p>
            <p className={classes.p}>{adhesionItem.adherent?.nom}</p>
            <p className={classes.p}>{date_adhesion}</p>
            <p className={classes.p}>{adhesionItem.montant}€</p>
          </div>
          <p className={classes.bodyText}>
            Adresse :{" "}
            <span>
              {adhesionItem.adherent?.adresse},{" "}
              {adhesionItem.adherent?.code_postale}{" "}
              {adhesionItem.adherent?.ville} {adhesionItem.adherent?.pays}
            </span>
          </p>
          <p className={classes.bodyText}>
            Email : <span>{adhesionItem.adherent?.email}</span>
          </p>
          <p className={classes.bodyText}>
            Téléphone : <span>{adhesionItem.adherent?.telephone}</span>
          </p>
          <p className={classes.bodyText}>
            Position : <span>{adhesionItem.adherent?.position}</span>
          </p>
          <p className={classes.bodyText}>
            NewsLetter :{" "}
            {adhesionItem.adherent?.news_letter ? (
              <span>oui</span>
            ) : (
              <span className={classes.span}>non</span>
            )}
          </p>
          <p style={{ width: "100%", textAlign: "end" }}>
            {adhesionItem.reference}
          </p>
          <RecuAdhesion
            montant={adhesionItem.montant}
            date_don={date_adhesion}
            nom={adhesionItem.adherent?.nom}
            prenom={adhesionItem.adherent?.prenom}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
