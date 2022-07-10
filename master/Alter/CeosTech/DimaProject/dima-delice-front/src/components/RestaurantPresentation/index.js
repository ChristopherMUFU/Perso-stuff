import React from "react";

import deliveryLogo from '../../images/logo__delivery.svg';
import clockLogo from '../../images/logo__opening-hours.svg';
import phoneLogo from '../../images/logo__phone.svg';

import "./restaurant.css";
import MapDisplay from "../Map/index";

const Restaurant = (mapKey) => {

  return (
    <div className='restaurant' id='restaurant'>
      <div className='restaurant__header'>
        <h2 className='restaurant__title'>Tous les chemins mènent à O'lokoso</h2>        
        <p className='restaurant__text'>Venez découvrir nos <span>spécialités culinaires d'Afrique !</span>
        </p>
      </div>

      <div className="restaurant__container">
        
        <div className="restaurant__ligne2"></div>
        
        <div className="restaurant__informations-container">

          <div className="restaurant__information">
            <img className="restaurant__informations-logo" src={deliveryLogo} alt="livraison"/>       
          
            <div className="restaurant__information-details">
              <h3>Horaires d'ouverture</h3>
              <h4> OUVERT 7J/7</h4>
              <p>Lundi - Jeudi : 11h00 - 14h00 / 18h30 - 22h30</p>
              <p>Vendredi - Samedi : 11h00 - 14h00 / 18h30 - 23h30</p>
              <p>Dimanche : 18h30-22h30</p>
            </div>
          </div>

          <div className="restaurant__information">
            <img className="restaurant__informations-logo" src={clockLogo} alt="time-schedule"/>   
          
            <div className="restaurant__information-details">
              <h3>Zones de livraison</h3>
              <p>Livraison en <span className="restaurant__bold">45 min</span></p>
              <p><span className="restaurant__bold">- Zone 1 (20€ minimum)</span> : Athis-Mons, Savigny-sur-orge, Chilly-Mazarin, Morangis, Juvisy-sur-Orge, Rungis, Wissous,
               Longjumeau, Vitry-Châtillon, Paray-Veille-Poste
              </p>
              <p><span className="restaurant__bold">- Zone 2 (25€ minimum)</span> : Massy, Draveil, Saulx-les-Chartreux, Champlain, Villebon-surYvette, Palaiseau</p>
              <p><span className="restaurant__bold">- Zone 3 (30€ minimum)</span> : Épinay sur orge, Morsang-sur-Orge, Sainte-Geneviève-des-Bois,
              Vigneux-sur-Seine, Villemoisson, Évry, Ris-Orangis
              </p>
              <p>Autres villes : minimum selon la ville</p>
            </div>          
          </div>


          <div className="restaurant__information">            
            <img className="restaurant__informations-logo" src={phoneLogo} alt="phone"/>   
            <div className="restaurant__information-details">
              <h3>Téléphone</h3>
              <button>01 69 72 10 01</button>
            </div>
          </div>
        </div>
        
        <div className="restaurant__ligne"></div>

        <div className="restaurant__position">        
          <h3>O'lokoso</h3>
          <p>114 avenue de verdun,<br/>91550 Paray-Vieille-Poste</p>  

          <MapDisplay {...mapKey} />
       
        </div>

      </div>
    </div>
  );
};

export default Restaurant;