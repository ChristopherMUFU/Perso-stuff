import React, { Fragment } from "react";
import './styles.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { Card } from "react-bootstrap"; // import react-bootstrap

import { getDate } from "../../../../utilities";

// We need to parse because the string contains HTML tags (from the text editor)
import parse from "html-react-parser";

const ActualitesCard = ({...actualite}) => {
    return (
        <Card className="card__new-homepage" key={actualite.id}>
            <Card.Img className="cardImg" src={actualite.photo} />
            <Card.Body className="cardContainer__news-homepage">
                <Card.Title className="cardTitle__news-homepage">
                    <b>{actualite.titre}</b>
                </Card.Title>
                <Card.Text className="cardDate__news-homepage">
                    {getDate(actualite.date_publication)}
                </Card.Text>
                <Card.Text className="cardText__news-homepage">
                    <Fragment>{parse(actualite.description)}</Fragment>
                </Card.Text>
            </Card.Body>
            
            
            <div className="cardFooter__news-homepage">
                <NavLink 
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                    }}
                    to={`/actualites/articles/${actualite.id}`}
                >
                    <button className="btnPlus">En savoir plus</button>
                </NavLink>
            </div>
        </Card>
    )
}

ActualitesCard.propTypes = {
    actualite: PropTypes.object.isRequired,
};

export default ActualitesCard;