import React from "react";

import deliveryLogo from "../../images/logo__delivery.svg";
import clockLogo from "../../images/logo__opening-hours.svg";
import phoneLogo from "../../images/Vector.png";
import logo from "../../images/df5_logo.png";
import "./restaurant.css";
import MapDisplay from "../Map/index";

const Restaurant = (mapKey) => {
  return (
    <div className="restaurent" id="restaurent">
      <div className="restaurent_title">Nous contacter</div>
      <div className="restaurent_figure">
        <div className="restaurent__container">
          <h2 className="restaurent__descrih2tion">Nos horaires</h2>
          <p>Du lundi au dimanche</p>
          <p>De 11h à 00h</p>
        </div>

        <div className="restaurent__container">
          <h2 className="restaurent__descrih2tion">Contact</h2>
          <div className="restaurent_logo">
            <h3>
              <img
                className="restaurant__informations-logophone"
                src={phoneLogo}
                alt="phone"
              />
              <a href="tel:0954106569">09 54 10 65 69</a>
            </h3>
          </div>
          <span>09 54 10 65 69</span>
        </div>

        <div className="restaurent__container">
          <h2 className="restaurent__descrih2tion">Nous retrouver</h2>
          <p>182 Avenue Aristide Briand</p>
          <p>93150 Le Blanc-Mesnil</p>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
