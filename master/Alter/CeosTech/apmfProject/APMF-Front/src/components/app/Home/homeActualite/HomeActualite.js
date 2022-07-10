/*
    Use react-bootstrap for the card
    Link: https://react-bootstrap.github.io/components/cards/
*/
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import React from 'react';

import ActualitesCard from "../../Actualites/Templates/ActualitesCard";

import "./HomeActualite.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return <h4>Désolé, quelque chose s'est mal passé...</h4>;
    }

    return this.props.children;
  }
}


const HomeActualite = ({ ...newsData }) => {
  const news = newsData.newsData;
  // We only display the three most recent news and check if the array received by the API does exist. If it does not exist, a message will be displayed
  const newsToDisplay = news !== undefined ? news.slice(0, 3) : undefined;

  return (
    <section id="HomeActualite">
      <div className="container center">
        <h4>
          <b>Notre actualité</b>{" "}
        </h4>
        <div className="homeactualite-news">  
          <ErrorBoundary>

            {news !== undefined &&
              newsToDisplay.map((contentActual) => {
                return(
                  <ActualitesCard 
                  key={contentActual.id}
                  {...contentActual}
                  />
                )
            })}  

          </ErrorBoundary>
       
        </div>

        {news === undefined && (
          <p style={{textAlign: 'center', margin:'2rem, auto'}}>Patience, nos actualités seront bientôt publiées</p>
        )}

        <div className="ActualFooter">
          <NavLink           
              onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
              }}
              to="/actualites/actualite/"
          >
            <button className="btnActual">
              <b>Voir toute notre actualité</b>
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

HomeActualite.propTypes = {
  newsData: PropTypes.array.isRequired,
};

export default HomeActualite;
