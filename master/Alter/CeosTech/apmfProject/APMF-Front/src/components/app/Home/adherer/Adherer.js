/* 
    Use Grid in MaterializeCSS for this component
    Link: https://materializecss.com/grid.html 
*/

import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './Adherer.css';
import ImgGirl from '../../../../images/site/Photos/pexels-liza-summer-6348123.png'; //import Image Girl

import { useDispatch } from "react-redux";
import { setSubMenuId } from "../../../../app/Redux-slices/siteSlice";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
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

const Adherer = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <section id="adherer" className="adherer">
            <div className={classes.sectionDesktop}>
                <div className={classes.root}>
                    {/*   ------ Fix later in page "Accueil" -----
                <div className="paragraph1">
                        <p className="para"><b>Chaque engagement participe à mieux accompagner les familles et aide à la recherche</b></p>

                        <p className="para"><b>Chaque engagement est déductible d’impôts</b></p>

                        <p className="para"><b>Chaque engagement est déductible d’impôts</b></p>
                </div>
                */}
                    <Grid container >
                        <Grid item xs={12} sm={12} md={5}>
                            <div className="paragraph_one">
                            <div className="paragraph_one_title">
                                <h4><b>Pour ne pas rester seul face à la maladie, venez nous rejoindre !</b></h4>
                                
                                    {/* Purple line */}
                                    <svg class="svg_line" width="710" height="2" viewBox="0 0 523 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 1H523" stroke="#90268E"/>
                                    </svg>
                                    {/* Blue line */}
                                    <svg class="svg_line" width="510" height="2" viewBox="0 0 523 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 1H523" stroke="#06ADEF"/>
                                    </svg>
                                </div>
                                <h5>S’engager contre la maladie</h5>
                                <p>
                                L’APMF est la première association française exclusivement dédiée aux patients de la maladie de Fabry. Elle regroupe des patients et des personnes impliquées dans la maladie.Nous consacrons toute notre énergie dans l’amélioration des connaissances sur la maladie de Fabry. Retrouvez dans la rubrique ’Tout savoir’ toutes les réponses à vos questions.
                                Nous sommes toujours à vos disposition si pour vos demandes particulière en matière de traitement, de prise en charge ou simplement pour échanger...
                                </p>
                                <br></br>
                                <div >
                                    <NavLink 
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth',
                                            });
                                            dispatch(setSubMenuId(2));
                                        }}
                                        to='/association/dons'
                                    >
                                        <div className="btnAd"><b>Adhérer</b></div>
                                    </NavLink>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <div className="paragraph_two">
                                <p>Chaque engagement participe à mieux accompagner les familles et aide à la recherche</p>

                                <p>Chaque engagement est déductible d’impôts</p>

                                <p>Chaque engagement est déductible d’impôts</p>
                            </div>                        
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <img src={ImgGirl} alt="Girl" className="ImgGirl"></img>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.sectionMobile}>
                <Grid container alignItems="center" >
                    <Grid item xl={12} sm={12} md={12}>
                        <img src={ImgGirl} alt="Girl" class="responsive-img"></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                            <div className="paragraph_two_mobile">
                                <p>Chaque engagement participe à mieux accompagner les familles et aide à la recherche</p>

                                <p>Chaque engagement est déductible d’impôts</p>

                                <p>Chaque engagement est déductible d’impôts</p>
                            </div>                        
                        </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className="paragraph_one_mobile">
                            <h4>Pour ne pas rester seul face à la maladie, venez nous rejoindre !</h4>
                            <div>
                                {/* Purple line */}
                                <svg class="svg_line" width="323" height="2" viewBox="0 0 523 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1H523" stroke="#90268E"/>
                                </svg>
                                {/* Blue line */}
                                <svg class="svg_line" width="323" height="2" viewBox="0 0 523 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1H523" stroke="#06ADEF"/>
                                </svg>
                            </div>
                            <h5>S’engager contre la maladie</h5>
                            <p>
                            L’APMF est la première association française exclusivement dédiée aux patients de la maladie de Fabry. Elle regroupe des patients et des personnes impliquées dans la maladie.Nous consacrons toute notre énergie dans l’amélioration des connaissances sur la maladie de Fabry. Retrouvez dans la rubrique ’Tout savoir’ toutes les réponses à vos questions.
                            Nous sommes toujours à vos disposition si pour vos demandes particulière en matière de traitement, de prise en charge ou simplement pour échanger...
                            </p>
                            <br></br>
                            <div>
                                <NavLink 
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                    to='/association/dons'
                                >
                                    <div className="btnAd"><b>Adhérer</b></div>
                                </NavLink>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </section>
    )
}

export default Adherer;