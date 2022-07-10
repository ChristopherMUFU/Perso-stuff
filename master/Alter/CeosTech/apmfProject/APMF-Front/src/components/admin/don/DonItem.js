import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import ExpandedIcon from "../product/ExpandedIcon";
import "./DonItem.css";
import { URL } from "../../../middlewares/request";

import { RecuDon } from "./RecuDon";

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

export default function Don({ don: { id } }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [seen, setSeen] = useState(null);
  const [donItem, setdonItem] = useState({});
  const date_donItem = new Date(donItem.date_don).toLocaleDateString();

  const fechdonItemById = async () => {
    axios.get(URL + "dons/" + id + "/").then((res) => {
      setdonItem(res.data);
    });
  };

  const updateVu = async () => {
    if (!donItem.vu) {
      const newDon = { ...donItem, vu: true };

      axios.put(URL + "dons/" + id + "/", newDon).then((res) => {
        setSeen(res.data.vu);
      });
    }
  };

  useEffect(() => {
    fechdonItemById();
  }, [seen]);

  return (
    <Accordion
      className={classes.accordion}
      key={donItem.id}
      onChange={(e, expand) => {
        setExpanded(expand);
        updateVu();
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <span style={{ color: donItem.vu ? "white" : "green" }}>
              <i className={donItem.vu ? "" : "fas fa-plus "}></i>
            </span>
            <p className={classes.p}>{donItem.donneur?.prenom}</p>
            <p className={classes.p}>{donItem.donneur?.nom}</p>
            <p className={classes.p}>{date_donItem}</p>
            <p className={classes.p}>{donItem.montant}€</p>
          </div>
        ) : (
          <div></div>
        )}

        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="don__container">
          <div className={classes.table}>
            <p className={classes.p}>{donItem.donneur?.prenom}</p>
            <p className={classes.p}>{donItem.donneur?.nom}</p>
            <p className={classes.p}>{date_donItem}</p>
            <p className={classes.p}>{donItem.montant}€</p>
          </div>
          <p className={classes.bodyText}>
            Adresse :{" "}
            <span>
              {donItem.donneur?.adresse}, {donItem.donneur?.code_postale}{" "}
              {donItem.donneur?.ville} {donItem.donneur?.pays}
            </span>
          </p>
          <p className={classes.bodyText}>
            Email : <span>{donItem.donneur?.email}</span>
          </p>
          <p className={classes.bodyText}>
            Téléphone : <span>{donItem.donneur?.telephone}</span>
          </p>
          <p className={classes.bodyText}>
            NewsLetter :{" "}
            {donItem.donneur?.news_letter ? (
              <span>oui</span>
            ) : (
              <span className={classes.span}>non</span>
            )}
          </p>
          <p style={{ width: "100%", textAlign: "end" }}>{donItem.reference}</p>
          <RecuDon
            montant={donItem.montant}
            date_don={date_donItem}
            nom={donItem.donneur?.nom}
            prenom={donItem.donneur?.prenom}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
