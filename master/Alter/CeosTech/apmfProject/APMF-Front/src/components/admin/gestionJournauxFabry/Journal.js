import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./Journal.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import ExpandedIcon from "../product/ExpandedIcon";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import { useHistory } from "react-router";

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

export default function Journal({ journal }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    history.push({
      pathname: "/admin/journal-fabry",
      state: { journalToUpdate: journal },
    });
  };

  const history = useHistory();

  const val = journal.id;

  const deleteData = async () => {
    axios.delete(URL + "journaux/" + val);
    let currentPath = window.location.pathname;
    history.replace(`${currentPath}/replace`);
    setTimeout(() => {
      history.replace(currentPath);
    }, 1000);
  };

  const date_journal = new Date(journal.date_publication).toLocaleDateString();

  return (
    <Accordion
      className={classes.accordion}
      key={journal.id}
      onChange={(e, expand) => setExpanded(expand)}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <p className={classes.p}>{journal.titre}</p>
            <p className={classes.p}>{date_journal}</p>
          </div>
        ) : (
          <div></div>
        )}

        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="journal__container">
          <div className="journal__photo">
            <img className="photo_fact" src={journal.photo} alt="" />
          </div>
          <div className="container darker">
            {ReactHtmlParser(journal.text)}
          </div>
          {journal.journal && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <a
                href={journal.journal}
                target="_blank"
                rel="noreferrer"
                style={{ marginTop: "1rem" }}
              >
                <i className="fas fa-file-pdf fa-3x"></i>
              </a>
              <span>télécharger le pdf</span>
            </div>
          )}
          <span style={{ marginTop: "1rem" }}>
            {new Date(journal.date_publication).toLocaleTimeString()}
          </span>

          <div className="journal__button">
            <button
              className="registre__button"
              onClick={() => {
                handleEdit();
              }}
            >
              <i className="fas fa-edit fa-2x"></i>
            </button>

            <button
              className="supp_button"
              onClick={() => {
                deleteData(journal.id);
              }}
            >
              <i className="far fa-trash-alt fa-2x"></i>
            </button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
