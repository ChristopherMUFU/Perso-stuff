import React from "react";

import kebab from "../../images/imgkebab.png";
import valueImage1 from "../../images/value-image-1.png";
import valueImage2 from "../../images/value-image-2.png";
import valueImage3 from "../../images/value-image-3.png";

import { Link } from "react-router-dom";

import "./values.css";

const Values = () => {
  return (
    <div className="values" id="values">
      <div className="values_header">
        <div className="values__introduction">
          <h2 className="values_title">Delice DF5</h2>
          <p className="values_text">
            Une carte riche et variée qui comblera tous les appétits! Chez nous,
            c'est toi le <span> CHEF 😊</span>
          </p>
        </div>
      </div>
      <div className="command_button">
        <Link to="/commander" className="telecharger_btn values__button">
          Commander
        </Link>
      </div>
    </div>
  );
};

export default Values;
