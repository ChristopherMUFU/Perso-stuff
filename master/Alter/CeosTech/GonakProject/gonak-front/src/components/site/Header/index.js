import React, { useState, useEffect } from 'react'
import axios from "axios";
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Logo_Gonak from '../../../images/Logo_Gonak.png';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
// eslint-disable-next-line
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import { HeaderContent } from '../../../data/site/headerContent';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { Nav, Navbar} from 'react-bootstrap';
import { Container } from '@material-ui/core';
import { URL } from "../../../middlewares/request";

//Smooth Scroll with the link
import { HashLink } from 'react-router-hash-link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



const Header = () => {
  const classes = useStyles();
  const [dispoResto, setDispoResto] = useState(true);
  
  const [isClickID, setIsClickID] = useState(1);

  const testPath = (content) => {
    console.log(window.location.pathname);
    if(content.link === window.location.pathname){
      setIsClickID(content.id);
    }
  }

  const currentPath = () => {
    HeaderContent.forEach(content => testPath(content));  
  }

  const getDispoResto = () => {
    axios.get(URL + "restaurant/info_restaurant/1/").then((res) => setDispoResto(res.data["disponibilite_restaurant"]));
  };

  useEffect(() => {
    currentPath();
    getDispoResto();
    //console.log("abc" + dispoResto);
  }, []);

 

    return (
      <AppBar  position="static" position="fixed" variant="white">
          <div id="header" className={classes.root}>
      
      <div className={classes.sectionDesktop}>
        <div className="sous-header-bar">
          <Grid container alignItems="center">
            <Grid container xs={3}
              justifyContent="flex-end"
              >
                {dispoResto 
                  ? (
                      <>
                        <p>Ouvert</p>
                        <div className="icon_ON"><FiberManualRecordIcon /></div>
                      </>
                  ) : (
                    <>
                    <p>Fermé</p>
                    <div className="icon_OFF"><FiberManualRecordIcon /></div>
                  </>
                  )
                }
            </Grid>
            <Grid container xs={2}
              justifyContent="flex-end"
              >
                <div className="icon_Call"><CallOutlinedIcon /></div>
                <p>
                  <a class="footer-link" href="tel:01-72-56-31-08"> 01 72 56 31 08 </a>
                </p>
            </Grid>
            <Grid container xs={7}
              justifyContent="center"
              >
                <div className="icon_Position"><RoomOutlinedIcon /></div>
                <p>
                   <a 
                      className="footer-link"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.google.com/maps/place/33+Av.+du+Manet,+78180+Montigny-le-Bretonneux/"
                    >
                      33 Avenue du Manet, 78180 Montigny-le-Bretonneux
                    </a>
                </p>
            </Grid>
          </Grid>
        </div>
        <div className="header-bar">
          <Grid 
            container
            alignItems="center"
            >
            <Grid container md={3}
              justifyContent="flex-start"
              >
              <NavLink to="/">
                <img src={Logo_Gonak} alt="logo Gonak"></img>
              </NavLink>
            </Grid>
            <Grid container md={6} 
              justifyContent="center"
              >
                <div className="header-text">
                  {HeaderContent.map((content) => (
                    <HashLink className='lien_navbar' exact activeClassName="current"
                        onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                            setIsClickID(content.id);
                        }}
                        to={content.link}
                        style={{textDecoration:'none'}}
                    >
                      {/* Create hightlight when click on it */}
                      {isClickID === content.id 
                              ? ( <div className="btn-header-text-click">{content.titre}</div> ) 
                              : ( <div className="btn-header-text">{content.titre}</div> )}
                    </HashLink>
                  ))}
                  
                  
                </div>
                
            </Grid>
            <Grid container md={3} justifyContent="flex-end">
              <HashLink
                  onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  to="/home/panier" 
                  className="btn-Commander" 
                  type="button">
                      PANIER
              </HashLink>
            </Grid>
          </Grid>
        </div>
      </div>

      <Navbar className="Navbar_Mobile" expand="lg">        
                      <Container>
                          <Grid 
                                  container
                                  alignItems="center"
                                  >
                                  <Grid container xs={2} direction="column" alignItems="center"
                                      justifyContent="center">
                                         {dispoResto 
                                          ? (
                                              <>
                                                <p style={{color:'#686040', fontFamily:'Poppins'}}>Ouvert </p>
                                                <div className="icon_ON-mobile"><FiberManualRecordIcon /></div>  
                                              </>                                           
                                          ) : (
                                            <>
                                              <p style={{color:'#686040', fontFamily:'Poppins'}}>Fermé </p>
                                              <div className="icon_OFF-mobile"><FiberManualRecordIcon /></div>  
                                            </>                                           
                                      )
                                        }
                                      
                                  </Grid>
                                  <Grid container xs={8} 
                                      justifyContent="center">
                                      
                                      <img className="Logo_Gonak" src={Logo_Gonak} alt="logo Gonak"></img>
              
                                  </Grid>
                                  <Grid container xs={2}>
                                    <Navbar.Toggle className="Btn_Nav" aria-controls="basic-navbar-nav" /> 
                                  </Grid>
                          </Grid>
                              
                          <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="me-auto">
                              {HeaderContent.map((content) => (
                                  <HashLink exact activeClassName="current"
                                    onClick={() => {
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                        setIsClickID(content.id);
                                    }}
                                      to={content.link}
                                      style={{textDecoration:'none', textAlign:'center',fontFamily:'Poppins'}}
                                  >
                                    
                                  {/* Create hightlight when click on it */}
                                  {isClickID === content.id 
                                    ? ( <div className="btn-header-text-click">{content.titre}</div> ) 
                                    : ( <div className="btn-header-text">{content.titre}</div> )}
                                  </HashLink>
                              ))}
                              <div className="sous-header-bar">
                                  <Grid container alignItems="center">
                                  <Grid container xs={12} justifyContent="center">
                                      
                                      <p><span className="icon_Call"><CallOutlinedIcon /></span>
                                      <a class="footer-link" href="tel:01-72-56-31-08"> 01 72 56 31 08 </a>
                                      </p>
                                  </Grid>
                                  <Grid container xs={12} justifyContent="center">
                                      
                                      <p><span className="icon_Position"><RoomOutlinedIcon /></span>
                                        <a 
                                            className="footer-link"
                                            target="_blank"
                                            rel="noreferrer"
                                            href="https://www.google.com/maps/place/33+Av.+du+Manet,+78180+Montigny-le-Bretonneux/"
                                          >
                                            33 Avenue du Manet, 78180 Montigny-le-Bretonneux
                                        </a>
                                      </p>
                                  </Grid>
                                  </Grid>
                              </div>
                          </Nav>
                          </Navbar.Collapse>
                      </Container>
                  </Navbar>

         </div>

      </AppBar>
    )
  };
  export default Header;