import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import PropTypes from "prop-types";
// We need to parse because the string contains HTML tags (from the text editor)
import parse from "html-react-parser";

import { useSelector } from "react-redux";
import { getNewsState } from "../../../../app/Redux-slices/newsSlice";
import { getNewsPerId } from "../../../../utilities/app/news";
import { getDate } from "../../../../utilities";



const ActualitePage = ({ slug }) => {
  // We will use history to go back to the previous navigation page
  const history = useHistory();

  // We retrieve the news object from the store
  const newsData = useSelector(getNewsState).news.newsData;
  const newsToDisplay = getNewsPerId(newsData, slug);

  // Since it was already designed with the text editor, we just need to parse it and display
  return (
    <div className="actualite-page__container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button className="go-back-link__actualites" onClick={history.goBack}>
        Retour
      </button>

      <div className="actualite-details__container">
        {newsToDisplay !== undefined && (
          <Fragment>
            <div className="actualite__Page-content">
              <h4 className="center-actualite__Page">
                <b> {parse(newsToDisplay.titre)} </b>
              </h4>
              <p className="center-actualite__Page">
                <b>
                  {" "}
                  Publié le {getDate(
                    parse(newsToDisplay.date_publication)
                  )}{" "}
                </b>
              </p>
              <img
                src={parse(newsToDisplay.photo)}
                alt={parse(newsToDisplay.titre)}
              ></img>
              ``
              <br></br>
              <div> {parse(newsToDisplay.text)} </div>
              <div className="actualite-Download">
                <a href={newsToDisplay.document}>
                  <i className="fas fa-file-pdf fa-3x"></i>
                  <br></br>
                  <p className="actualite-text-Download">
                    <u>
                      <a
                        href={newsToDisplay.document}
                        target="-blank"
                        className="center-actualite__Page"
                      >
                        Télécharger le document
                      </a>
                    </u>
                  </p>
                </a>
              </div>
            </div>
            <div className="actualite__Page-footer">
              <p>
                <b>
                  {" "}
                  Retrouvez également toute notre actualité sur nos réseaux
                  sociaux :{" "}
                </b>
              </p>
              <div className="image-reseaux">
                <a href="https://twitter.com/apmffabry?lang=fr" target="-blank">
                  <img
                    src="/images/site/Actualite/twitter_color.png"
                    alt="Twitter"
                  ></img>
                </a>
                <a href="https://www.facebook.com/APMFABRY/" target="-blank">
                  <img
                    src="/images/site/Actualite/facebook_color.png"
                    alt="Facebook"
                  ></img>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=VPQZYEjAt3c"
                  target="-blank"
                >
                  <img
                    src="/images/site/Actualite/youtube_color.png"
                    alt="Youtube"
                  ></img>
                </a>
              </div>
            </div>
          </Fragment>
        )}

        {newsToDisplay === undefined && (
          <p style={{ textAlign: "center", margin: "2rem, auto" }}>
            Nous sommes désolés, il semble que cette actualité ne soit pas
            consultable, revenez bientôt
          </p>
        )}
      </div>
    </div>
  );
};

ActualitePage.propTypes = {
  actualite: PropTypes.number.isRequired,
};

export default ActualitePage;