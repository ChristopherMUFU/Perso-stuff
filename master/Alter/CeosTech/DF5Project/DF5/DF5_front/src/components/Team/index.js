import React from "react";
import olokoso_logon from "../../images/olokoso_logonoir.png";
import "./team.css";

import kouad from "../../images/kouad.png";
import T from "../../images/chef-T.png";
import norvegien from "../../images/norvegien.png";
import fatou from "../../images/fatou.png";
import pdg from "../../images/pdg.png";

const Team = () => {

  return (
    <div className='team' id='team'>
      <div className='team_header'>
        <img className='logo__team-page' src={olokoso_logon} alt='Logo olokoso' />
        <div className="team__introduction">
          <h2 className='team_title'>Notre équipe à votre service</h2>        
          <p className='team_text'><span>O’lokoso</span> est une équipe de <span>passionnés</span> et <span>amoureux</span> de la cuisine africaine, formés aux techniques traditionnelles auprès de leurs Mamas. O’lokoso a pour objectif de <span>faire découvrir la richesse gustative de la cuisine africaine</span>.
          </p>
        </div>
      </div>
        
        <div className='team_figure'>

          <div className="team__top-row">
            <div className='personnel__container'>
              <img className='team__drawing' src={pdg} alt='dessin personnel' />
              <h2>Le PDG</h2>
            </div>

            <div className='personnel__container'>
              <img className='team__drawing' src={T} alt='dessin personnel' />
              <h2>Chef T</h2>
            </div>
          </div>
    
          <div className="team__bottom-row">
            <div className='personnel__container'>          
              <img className='team__drawing' src={norvegien} alt='dessin personnel' />
              <h2>V le norvégien</h2>
            </div>
            
            <div className='personnel__container'>  
              <img className='team__drawing' src={fatou} alt='dessin personnel' />
              <h2>Fatou la Cheffe</h2>
            </div>

            <div className='personnel__container'>  
              <img className='team__drawing' src={kouad} alt='dessin personnel' />
              <h2>Le Kouad</h2>
            </div>
          </div>
          
        </div>
        {/*
        <img className='team__bitmoji' src={bitmoji} />
        <img className='team__bitmoji2' src={bitmoji} />
        <img className='team__bitmoji3' src={bitmoji} />
        */}
  
    </div>
  );
};

export default Team;