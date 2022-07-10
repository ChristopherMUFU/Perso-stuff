import React from "react";
import { useLocation } from "react-router-dom";

import "./footer.css";
import df5_logo from "../../images/logo_df5_b.png";
import facebook from "../../images/logo-facebook.png";
import insta from "../../images/logo-insta.png";
import snapchat from "../../images/logo-Snapchat.png";

import CGV from "../../Documents/CGV.pdf";
import ML from "../../Documents/MentionsLegalesOlokoso.pdf";

const Footer = () => {
  const location = useLocation();

  const regex = /^\/admin/g;
  //   ne pas afficher dans la page admin
  if (!location.pathname.match(regex)) {
    return (
      <div className="footer">
        <div id="footer__container" className="footer__container">
          <div className="footer__part2 footer__mobile">
            <img className="footer__logo" src={df5_logo} alt="df5 logo" />
            <p>
              Made by <span><a href="http://www.ceostech.fr/">Ceos Tech</a></span>
            </p>
            <p>Tout droits réservés ©</p>
          </div>

          <div className="footer__part1">
            <div className="footer__olokoso-adress">
              <h3 className="footer__title">DF5</h3>
              <p className="footer__adress">
              182 Avenue Aristide Briand
                <br />
                93150 Le Blanc-Mesnil
              </p>
              {/* <p className='olokosso__siret'>
                Immatriculé au RCS de Bobigny
                <br />
                Numéro SIRET : {"85076914200017"}
    </p> */}
            </div>
            {/*
            <div className="footer__link-administrative">
              <a href = {CGV} target = "_blank">CGV</a>
              <a href = {ML} target = "_blank">Mentions légales</a>
             </div>*/}
          </div>

          <div className="footer__part2 footer__desktop">
            <img className="footer__logo" src={df5_logo} alt="Olokosso logo" />
            <p>
              Made by <span>Ceos Tech</span>
            </p>
            <p>Tout droits réservés ©</p>
          </div>

          <div className="footer__part3">
            <h3 className="footer__title">Rejoignez-nous</h3>
            <div className="footer__social-medias">
              <a
                href="https://web.facebook.com/OLokoso-363831301133851"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="footer__logo-social-medias"
                  src={facebook}
                  alt="Facebook logo"
                />
              </a>
              <a
                href="https://web.facebook.com/OLokoso-363831301133851"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="footer__logo-social-medias"
                  src={snapchat}
                  alt="Facebook logo"
                />
              </a>
              <a
                href="https://www.instagram.com/olokoso91/?hl=fr"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="footer__logo-social-medias"
                  src={insta}
                  alt="Instagram logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Footer;
