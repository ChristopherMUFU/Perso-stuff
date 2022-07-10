import React, {useState, useEffect} from 'react'
import './styles.css';

import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Offcanvas} from 'react-bootstrap';
import CartePage from './CartePage';
import CartePageMobile from './CartePageMobile';
import { URL } from "../../../middlewares/request";

// hook window dimensions
import useDimensions from "../../../hooks/useDimensions";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Carte = () => {
  const classes = useStyles();
  const [idMenu, setIdMenu] = useState(1);
  const [show, setShow] = useState(false);

  const [produitsCarte, setProduitsCarte] = useState([]); //nom de variable à mofifier

  const { width } = useDimensions();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCategorieProduit = () => {
    axios.get(URL + "restaurant/categorie/").then((res) => setProduitsCarte(res.data));
  };

  useEffect(() => {
    fetchCategorieProduit();
    console.log(produitsCarte);
  }, []);

  

    return (

      <div id="carte">

        {/* Button for Side Menu */}
          <div className={classes.sectionMobile} >
            <div className="menu-arrow-forward" onClick={handleShow}>
            <ArrowForwardIcon  /> 
            </div>

          {/* Side Menu */}
          {width <= 960 && 
                      <Offcanvas show={show} onHide={handleClose} className="menu-offcanvas">
                        <Offcanvas.Body>
                          <div className="menu-side" >
                          
                          <div className="menu-arrow-back" onClick={handleClose}>
                            <ArrowBackIcon  /> 
                          </div>
                          <Grid container direction="column" justifyContent="center" alignItems="center" xs={12} >
                              <ul className="menu-lelf">
                            
                              { produitsCarte.map((content) => (
                                  <NavLink 
                                  key={content.id}
                                  
                                    onClick={() => {
                                        window.scrollTo(0,0);
                                        setIdMenu(content.id);
                                        handleClose();
                                    }}
                                    to={'/home/carte'}
                                    style={{textDecoration:'none'}}
                                > 
                                {/* Create hightlight when click on it */}
                                  {idMenu === content.id 
                                      ? ( <li className="menu-click">{content.nom}</li> ) 
                                      : ( <li className="menu-not-click">{content.nom}</li> )}
                                </NavLink>
                              ))}
                              </ul>
                            </Grid>
                        </div>
                        </Offcanvas.Body>
                      
                    </Offcanvas>
          }
            {/* End of Side Menu */}
          </div>


        <h1> CARTE </h1>
        <div className={classes.sectionDesktop}>
          <div className="menu-desktop">
            <Grid container direction="row">
              <Grid container direction="column" alignItems="center" xs={12} md={4} >
                <ul className="menu-lelf">
              
                { produitsCarte.map((content) => (
                    <NavLink 
                    key={content.id}
                    
                      onClick={() => {
                          window.scrollTo(0,0);
                          setIdMenu(content.id);
                      }}
                      to={'/home/carte'}
                      style={{textDecoration:'none'}}
                  > 

                  {/* Create hightlight when click on it */}
                 {idMenu === content.id 
                    ? ( <li className="menu-click">{content.nom}</li> ) 
                    : ( <li className="menu-not-click">{content.nom}</li> )}
                    
                  </NavLink>
                ))}
                
                </ul>
              </Grid>
              <Grid container direction="column" alignItems="center" xs={12} md={8} className="menu-info">
                 
                  <CartePage key={idMenu} idMenuPage={idMenu} />
                   
              </Grid>
            </Grid>
          </div>
        </div>

        {/* Mobile version width <= 960px */}
        <div className={classes.sectionMobile}>

        <Grid container direction="column" alignItems="center">
                  <CartePageMobile key={idMenu} idMenuPageMobile={idMenu} />
        </Grid>  
        </div>
      </div>
  
    )
  };
  export default Carte;