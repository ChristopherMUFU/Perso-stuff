import React from "react";
import { Link } from "react-router-dom";

import olokoso_logon from "../../images/olokoso_logonoir.png";
import brunch from "../../images/Brunch.png";

import { useNavBarStateValue } from "../../contexts/Navbar/navbarState";
import { SET_ACTIVE } from "../../contexts/Navbar/actiontypes";

import "./styles.css";


const BrunchPage = () => { 
  const { dispatch } = useNavBarStateValue();

  const setActiveButton = (navLinkActive) => {
    dispatch({
      navLinkActive,
      type: SET_ACTIVE,
    });
  }

  return (
    <div className='brunch__container' id='brunch'>
      <div className='brunch_header'>
        <img className='logo__brunch-page' src={olokoso_logon} alt='Logo olokoso' />
        <div className="brunch__introduction">
            <h2 className='brunch_title'>Découvrez notre brunch !</h2>        
            <p className='brunch_text'><span>O’lokoso</span> vous propose uniquement <span>les samedis et dimanches de 11h à 15h un brunch gourmands</span> avec des spécialités d’Afrique de l’Ouest et de France ;)

            </p>
        </div>
      </div>

      <div className="brunch__informations">
        <div className="brunch__left-part">
          <div className="prestation__brunch">
              <h2 className='brunch_subTitle'>Un Brunch savoureux et varié</h2>        
              <p className='brunch_text2'>
                <span>Convivial</span>, <span>varié</span> et <span>copieux</span>, notre Brunch africain et continental vous offrira un choix varié de plats qui combleront les appétits de tous vos convives ;)
              </p>

              <h2 className='brunch_subTitle'>Uniquement les Samedis et Dimanches</h2>        
              <p className='brunch_text2'>
                <span>O’lokoso</span> vous propose uniquement les samedis et dimanches, <span>de 11h à 15h en pré-commande (24h)</span>, un brunch gourmand avec des spécialités diverses et variées !
              </p>

              <div className= "brunch__link-container">
                <Link
                  to='/' 
                  onClick={() => setActiveButton('contact')}
                  className='telecharger_btn brunch__button'
                >
                  Pré-commander
                </Link>
              </div>
          </div>
        </div>

      <div className="brunch__right-part">
        <img src={brunch} alt="brunch" className="brunch__picture" />
      </div>
    </div>
  </div>
  );
};

export default BrunchPage;
