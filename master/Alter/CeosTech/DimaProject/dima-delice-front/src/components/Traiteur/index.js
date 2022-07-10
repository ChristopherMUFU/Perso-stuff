import React from "react";
import olokoso_logon from "../../images/olokoso_logo.png";

import traiteur1 from "../../images/traiteur.png";
import traiteur2 from "../../images/traiteur-2.png";
import traiteur3 from "../../images/traiteur-3.png";

import { useNavBarStateValue } from "../../contexts/Navbar/navbarState";
import { SET_ACTIVE } from "../../contexts/Navbar/actiontypes";

import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import "./traiteur.css";

const Traiteur = () => {

  const setActiveButton = (navLinkActive) => {
    dispatch({
      navLinkActive,
      type: SET_ACTIVE,
    });
  }

  const { state, dispatch } = useNavBarStateValue();

    const datas = [
        {
          image: traiteur1,
          alt: "photo du plat mafe",
        },
        {
          image: traiteur2,
          alt: "photo du plat yassa",
        },
        {
          image: traiteur3,   
          alt: "photo de plats à emporter",
        },
      ];

  return (
    <div className='traiteur' id='traiteur'>
        <div className='traiteur_header'>
            <img className='logo__traiteur-page' src={olokoso_logon} alt='Logo olokoso' />
            <div className="traiteur__introduction">
                <h2 className='traiteur_title'>Nos prestations traiteur</h2>        
                <p className='traiteur_text'>O’lokoso vous offre également une <span>gamme de prestations traiteurs de qualité</span> pouvant être personnalisées pour vos évènements privés ou bien professionnels.
                </p>
            </div>
        </div>

        <div className="traiteur__informations">
            <div className='hero__container__traiteur'>
            <Carousel pause={false}>
                {datas.map((data) => (
                <Carousel.Item interval={5000} className='px-5' key={data.alt}>
                    <div className='carousel__item__traiteur'>            

                        <div className='hero__hero-image__traiteur'>
                        <img
                            className='hero__image__traiteur'
                            src={data.image}
                            alt={data.alt}
                        />
                        </div>
                    </div>
                </Carousel.Item>
                ))}
            </Carousel>
            </div>

            <div className="prestation__traiteur">
                <h2 className='traiteur_title'>Notre expérience à votre service !</h2>        
                <p className='traiteur_text2'>
                  Chez <span className="span-olokoso">O’lokoso</span>, nous portons une attention particulière au <span>choix des ingrédients</span>, à la <span>confection de nos plats</span> ainsi qu’à la présentation et à la <span>décoration de nos buffets</span>.<br/>
                  
                  O’lokoso met à votre service une <span>équipe compétente, passionnée et son savoir-faire</span> pour répondre à vos attentes et vos besoins !<br/>
                  
                  <span>Confiez-nous vos réceptions et ravivez les papilles de vos convives !</span>
                </p>

                <div className= "traiteur__link-container">
                  <Link 
                    to="/"
                    onClick={() => setActiveButton('contact')}
                    className='telecharger_btn traiteur__button'
                  >
                    Nous contacter
                  </Link>
                </div>
            </div>

        </div>

    </div>
  );
};

export default Traiteur;