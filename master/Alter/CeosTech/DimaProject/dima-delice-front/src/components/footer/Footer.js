import React from "react";
import { useLocation } from "react-router-dom";
import { Grid } from '@material-ui/core';
import "./footer.css";
import logo from "../../images/Logo_DD.png";
import Logo_Fb from '../../images/Logo_Fb.png';
import Logo_Insta from '../../images/Logo_Insta.png';
import CGV from "../../Documents/CGV.pdf";
import ML from "../../Documents/MentionsLegalesOlokoso.pdf";

const Footer = () => {
  const location = useLocation();

  const regex = /^\/admin/g;
  //   ne pas afficher dans la page admin
  if (!location.pathname.match(regex)) {
    return (
      <div>
        <Grid container id="footer">
              <Grid container className="footer-logo-border" justifyContent="center" xs={12} md={2}>
                <a href="/#header">
                  <img src={logo} alt="logo"></img>
                </a>
              </Grid>
              <Grid container className="footer-text" direction="row" xs={12} md={10}>
                  <Grid xs={12} sm={4} md={4} id='grid_dimadelice'>
                    <h4>Dima Délice </h4>
                    <p>
                      <a 
                        className="footer-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://goo.gl/maps/f8obEHMbS7uAcdwJ6"                    
                      >
                        96 Avenue Lénine,<br></br> 93380 Pierrefitte-sur-Seine
                      </a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={4} md={4}>
                    <h4>Mentions légales</h4>
                    <h4> CGV </h4>
                     
                  
                  </Grid>
                  
                  <Grid xs={12} sm={4} md={3}>
                    <h4>REJOIGNEZ-NOUS !</h4>
                    <p>
                      <a href="https://www.facebook.com/Dimadelice.ddburger/" target="_blank" rel="noreferrer" >
                        <img src={Logo_Fb}></img>
                      </a>
                       &nbsp; 
                      <a href="https://www.instagram.com/dimadelice.ddburger/" target="_blank" rel="noreferrer" >
                      <img src={Logo_Insta}></img>
                      </a>
                    </p>
                  </Grid>

                  <p className="footer-copyright">Copyright 2021 ©  |  Made by 
                    <a 
                      className="footer-link" 
                      target="_blank" 
                      rel="noreferrer" 
                      href="http://www.ceostech.fr/"
                    > Ceos Tech </a>
                     </p>

                  

              </Grid>
            </Grid>
      </div>
    );
  }

  return null;
};

export default Footer;
