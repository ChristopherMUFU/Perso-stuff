import React from "react";

import { Link } from "react-router-dom";

import "./values.css";

const Values = () => {
  return (
    <div className="values" id="values">
      <div className="values_figure">
        <div className="values__container">
          <h2 className="values__descrih2tion">Nos horaires</h2>
          <p>Du lundi au dimanche</p>
          <p>De 11h à 00h</p>
        </div>

        <div className="values__container">
          <h2 className="values__descrih2tion">Contact</h2>
          <a class="footer-link" href="tel:01 49 51 42 71"><p>01 49 51 42 71</p></a>
          <span>01 49 51 42 71</span>
        </div>

        <div className="values__container">
          <h2 className="values__descrih2tion">Nous retrouver</h2>
          <a 
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://goo.gl/maps/f8obEHMbS7uAcdwJ6"                    
                      >
          <p>  96 Avenue Lénine </p>
          <p>93380 Pierrefitte-sur-Seine</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Values;
