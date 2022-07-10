import React, { useState, useEffect } from "react";
import "./galerie.css";

const MEDIA_ENDPOINT =
  "https://graph.instagram.com/me/media?fields=id,media_url";

export default function Galerie() {
  const [tokenInstagram, setTokenInstagram] = useState(
    "IGQVJYUElmNWphTVdGRV9JWHJQMU9Vb1I0NV90bXpCaUdsUjg0UjZA6aWhfUEJJT3Q1SmN2NHlacEI0NHpVNDJVaDR5aFhqLXhGMTBNSldnWE00SXN6LXExcFhNby1sdk5iQkdlTTBuMDhDN2U3akdCdAZDZD"
  );
  const [items, setItems] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(6);
  const [expanded, setexpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const showMore = () => {
    if (rowsToDisplay === 6) {
      setRowsToDisplay(items?.length);
      setexpanded(true);
    } else {
      setRowsToDisplay(6);
      setexpanded(false);
    }
  };

  // to fetch data
  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "https://token-guy-12098.herokuapp.com/token.js";
    // script.async = true;

    // document.body.appendChild(script);

    fetch(`${MEDIA_ENDPOINT}&access_token=${tokenInstagram}`) /*InstagramToken*/
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result["data"]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    return () => {
      // document.body.removeChild(script);
      setItems([]);
    };
  }, []);

  return (
    <>
      {error && <div>Erreur : error</div>}
      {!isLoaded && <div className="">Chargement…</div>}

      <div className="galeriePhotos" id="galeriePhotos">
        <h1 className="galerie_title">Galerie Photos</h1>
        <h2>Delice DF5</h2>
        <div className="photos">
          <ul className="photos__list">
            {items?.slice(0, rowsToDisplay).map((item) => (
              <li key={item.id}>
                <img className="photo" src={item.media_url} alt="img" />
              </li>
            ))}
          </ul>
        </div>
        <div className="more__photos" onClick={showMore}>
          {expanded ? <span>Voir moins</span> : <span>Voir plus</span>}
        </div>
      </div>
    </>
  );
}
