import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./Article.css";
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

export default function Article({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    history.push({
      pathname: "/admin/editer-article",
      state: { articleToUpdate: article },
    });
  };

  const history = useHistory();

  const val = article.id;

  const deleteData = async () => {
    axios.delete(URL + "articles/" + val);
    let currentPath = window.location.pathname;
    history.replace(`${currentPath}/replace`);
    setTimeout(() => {
      history.replace(currentPath);
    }, 1000);
  };

  const date_article = new Date(article.date_publication).toLocaleDateString();

  return (
    <Accordion
      className={classes.accordion}
      key={article.id}
      onChange={(e, expand) => setExpanded(expand)}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <p className={classes.p}>{article.titre}</p>
            <p className={classes.p}>{article.auteur}</p>
            <p className={classes.p}>{date_article}</p>
          </div>
        ) : (
          <div></div>
        )}

        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="article__container">
          <div className="article__photo">
            <img className="photo_fact" src={article.photo} alt="" />
          </div>
          <div className="container darker">
            {ReactHtmlParser(article.text)}
          </div>
          {article.document && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <a
                href={article.document}
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
            {new Date(article.date_publication).toLocaleTimeString()}
          </span>

          <div className="article__button">
            <a
              href={article.photo_article}
              target="_blank"
              rel="noreferrer"
              download
            >
              <button
                className="registre__button"
                onClick={() => {
                  handleEdit();
                }}
              >
                <i className="fas fa-edit fa-2x"></i>
              </button>
            </a>
            <button
              className="supp_button"
              onClick={() => {
                deleteData(article.id);
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
