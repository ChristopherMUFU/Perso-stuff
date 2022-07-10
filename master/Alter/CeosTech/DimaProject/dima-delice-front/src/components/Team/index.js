import React from "react";
import olokoso_logon from "../../images/olokoso_logonoir.png";
import "./team.css";

import kouad from "../../images/kouad.png";
import T from "../../images/chef-T.png";
import norvegien from "../../images/norvegien.png";
import fatou from "../../images/fatou.png";
import pdg from "../../images/pdg.png";
import { Link } from "react-router-dom";

const Team = () => {
  return (
    <div className="team" id="team">
      <div className="team_header">
        <div className="team__introduction">
          <h2 className="team_title">BIENVENUE CHEZ DIMA DELICE</h2>
          <p className="team_text">
            <strong>Ici, tout est permis !</strong><br></br>
            Viens découvrir la carte du DD et déguste tous nos plats <strong><br></br>sans restriction !</strong>
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

export default Team;