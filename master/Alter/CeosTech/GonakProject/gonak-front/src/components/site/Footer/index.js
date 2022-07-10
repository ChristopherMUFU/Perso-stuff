import React from 'react'
import './styles.css';

import { Grid } from '@material-ui/core';
import FacebookIcon from '../../../data/icon/facebookIcon';
import InstagramIcon from '../../../data/icon/instagramIcon';
import SnapChatIcon from '../../../data/icon/snapchatIcon';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {

    return (
      <div id="footer">
            <Grid container>
              <Grid container className="footer-logo-border" justifyContent="center" xs={12} md={2}>
                <HashLink to="/home#homeAcceuil">
                  <img src="/images/site/logo-Gonak-footer.png" alt="logo Gonak Footer"></img>
                </HashLink>
              </Grid>
              <Grid container className="footer-text" direction="row" xs={12} md={10}>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>ADRESSE</h5>
                    <p>
                      <a 
                        className="footer-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/maps/place/33+Av.+du+Manet,+78180+Montigny-le-Bretonneux/"                    
                      >
                        33 Avenue du Manet, <br></br> 78180 Montigny-le-Bretonneux
                      </a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>HORAIRES</h5>
                    <p>Ouvert du Lundi au Samedi <br></br> De 11h00 à 22h00</p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>CONTACT</h5>
                    <p>
                    <a class="footer-link" href="tel:01-72-56-31-08"> 01 72 56 31 08 </a>
                       <br></br> 
                    <a 
                      className="footer-link" 
                      href="mailto:gonak@gmail.com"
                      rel="noreferrer"
                    > gonak@gmail.com </a>
                    </p>
                  </Grid>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>REJOIGNEZ-NOUS !</h5>
                    <p>
                      <a href="/" target="_blank" rel="noreferrer" >
                        <FacebookIcon /> 
                      </a>
                      &nbsp; &nbsp; 
                      <a href="/" target="_blank" rel="noreferrer" >
                        <SnapChatIcon />  
                      </a>
                      &nbsp; &nbsp; 
                      <a href="https://www.instagram.com/gonak_latelierdesgourmands/?hl=en" target="_blank" rel="noreferrer" >
                        <InstagramIcon />  
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
                      |  CGV  |  Mentions Légales </p>

              </Grid>
            </Grid>
        </div>
  
    )
  };
  export default Footer;