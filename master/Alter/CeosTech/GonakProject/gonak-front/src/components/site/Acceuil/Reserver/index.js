import React from 'react';
import './styles.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles, createTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Grid } from '@material-ui/core';
//Smooth Scroll with the link
import { HashLink } from 'react-router-hash-link';

const Theme_Custom = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
})



const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const Reserver = () => {

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
          width: "100%",
          [Theme_Custom.breakpoints.up('md')]: {
            width: "25%",
          },
          
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          border: "2px solid #FFFFFF",
          borderRadius: "5px",
          color: "#FFFFFF",
          
        },
      }));
      const classes = useStyles();

      
      const [Heure, setHeure] = React.useState('');
      const handleChangeHeure = (event) => {
        setHeure(event.target.value);
      };

      const [Personnes, setPersonnes] = React.useState('');
      const handleChangePersonnes = (event) => {
        setPersonnes(event.target.value);
      };

    return(
        <div id="reserver">
            
                <div className="container-fluid Container_Reserver_Accueil">
                        <div className="row Div_Reserver_Accueil">
                            <div className="col-md-12">
                                <h1 id="Titre_Reserver_Accueil">Réserver</h1>
                                    <div className="Sous_Div_Reserver_Accueil">   

                                      <Grid container alignItems="center" className="Grid_Container">
                                        <Grid container justifyContent="center" className={classes.container}>         
                                          <div className="reserver-form">
                                            <form  noValidate>
                                                <TextField fullWidth
                                                    id="date"
                                                    label="Date"
                                                    type="date"
                                                    defaultValue=""
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </form>
                                          </div>
                                          
                                        </Grid>
                                       
                                        <Grid container justifyContent="center" className={classes.container}>
                                          <div className="reserver-form">
                                            <FormControl className={classes.margin}>
                                                <NativeSelect
                                                id="demo-customized-select-native"
                                                value={Heure}
                                                onChange={handleChangeHeure}
                                                input={<BootstrapInput />}
                                                >
                                                <option label="Heure" disabled></option>
                                                <option value={10}>11H</option>
                                                <option value={20}>12H</option>
                                                <option value={30}>13H</option>
                                                </NativeSelect>
                                            </FormControl>
                                          </div>
                                        </Grid>
                                        <Grid container justifyContent="center" className={classes.container}>
                                          <div className="reserver-form">
                                            <FormControl className={classes.margin}>
                                              <NativeSelect
                                              id="demo-customized-select-native"
                                              value={Personnes}
                                              onChange={handleChangePersonnes}
                                              input={<BootstrapInput />}
                                              >
                                              <option label="Nb personnes" disabled></option>
                                              <option value={10}>1</option>
                                              <option value={20}>2</option>
                                              <option value={30}>3</option>
                                              </NativeSelect>
                                          </FormControl>
                                          </div>
                                        </Grid>

                                        <Grid container justifyContent="center" className={classes.container}>
                                          <div className="reserver-form">
                                            <HashLink 
                                              onClick={() => {
                                                window.scrollTo({
                                                  top: 0,
                                                  behavior: "smooth",
                                                });
                                              }}
                                              to="#">
                                              <form className="form-inline">
                                                <button className="btn btn-outline mr-auto Btn_Reserver_Acceuil_Reserver" type="button">RESERVER</button>
                                              </form>
                                            </HashLink>
                                           

                                          </div>
                                        </Grid>

                                    </Grid>
                                         
                                    </div>



                            </div>
                        </div>

                        
                        
                    
                </div>


               
            
        </div>
    );
}
export default Reserver;