import React from "react";
import "./Bienvenue.css";

const Bienvenue = () => {
  return (
    <div>
    <div className="team" id="team">
      <div className="team_header">
          <p className="team_title">BIENVENUE SUR L'APMF <br></br>
            LE SITE DE L'ASSOCIATION DES PATIENTS DE LA <br></br> 
            <b>MALADIE DE FABRY</b>
          </p>
      </div>
    </div>
  
   <div className="textBienvenue">
     L’Association des Patients de la Maladie de Fabry (APMF) est une association loi 1901 qui a 
     été créée en août 2005. C’est la première association française exclusivement dédiée aux 
     patients de la maladie de Fabry. Elle regroupe des patients et des personnes impliquées 
     dans la maladie de Fabry (familles, conjoints, médecins…).
       <br></br><br></br>
     Ses objectifs sont de fournir un lieu d’échanges, d’écoute, 
     de soutien et d’informations pour les patients et leur entourage, 
     ainsi que de permettre l’amélioration des connaissances sur la maladie de Fabry.
     </div>
    </div>
  );
};

export default Bienvenue;


