import React from 'react'
import './styles.css';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

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

const Gallerie = () => {
  const classes = useStyles();

    return (
      <div id="gallerie">
            <h1>Gallerie</h1>
            <div className={classes.sectionDesktop}>
              <div className="gallerie-desktop-version">
                <Grid container direction="row">
                  <Grid container direction="column" alignItems="center" xs={1} md={4}>
                    <div className="gallerie-image-up">
                      <img src="/images/site/gallerie/Gallerie-(3).png" alt="Gallerie 3" ></img>
                      <img src="/images/site/gallerie/Gallerie-(6).png" alt="Gallerie 6" ></img>
                    </div>
                  </Grid>
                  <Grid container direction="column" alignItems="center" xs={1} md={4}>
                    <div className="gallerie-image-down">
                      <img src="/images/site/gallerie/Gallerie-(4).png" alt="Gallerie 4" ></img>
                      <img src="/images/site/gallerie/Gallerie-(2).png" alt="Gallerie 2" ></img>
                    </div>                  
                  </Grid>
                  <Grid container direction="column" alignItems="center" xs={1} md={4}>
                    <div className="gallerie-image-up">
                      <img src="/images/site/gallerie/Gallerie-(1).png" alt="Gallerie 1" ></img>
                      <img src="/images/site/gallerie/Gallerie-(5).png" alt="Gallerie 5" ></img>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <div className="gallerie-mobile-version">
                <Grid container >
                  <Grid container direction="column" alignItems="center" xs={6}>
                      <img src="/images/site/gallerie/Gallerie-(3).png" alt="Gallerie 3" ></img>
                      <img src="/images/site/gallerie/Gallerie-(6).png" alt="Gallerie 6" ></img>
                      <img src="/images/site/gallerie/Gallerie-(4).png" alt="Gallerie 4" ></img>
                  </Grid>
                  <Grid container direction="column" alignItems="center"  xs={6}>
                    <div className="gallerie-image-down-mobile">
                      <img src="/images/site/gallerie/Gallerie-(2).png" alt="Gallerie 2" ></img>
                      <img src="/images/site/gallerie/Gallerie-(1).png" alt="Gallerie 1" ></img>
                      <img src="/images/site/gallerie/Gallerie-(5).png" alt="Gallerie 5" ></img>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
        </div>
  
    )
  };
  export default Gallerie;