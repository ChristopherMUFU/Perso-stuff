
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
  title: {    
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'black',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  errors: {
  }
}));

const Step2 = ({ currentStep, handleChange, handleCheckedChange, state, errors}) => {
    const classes = useStyles();

    if (currentStep !== 2) { 
      return null
    }

    const {address, firstName, lastName, postalCode, city, phone, country, mail, newsletter } = state;

    // The markup for the Step 2
    return(
      <div className="form-group-donation-step2">
        <FormControl component="fieldset" className={classes.container}>          
          <Grid container spacing={3}>
          
            <Grid item xs={12}>            
              <FormLabel  component="legend" className={classes.title}>
                Informations complémentaires
              </FormLabel>
            </Grid>

            <Grid item xs={12} md={6}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Prénom" 
                variant="outlined" 
                name="firstName"
                value={firstName} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.firstName}</FormHelperText>
            </Grid>

            <Grid item xs={12} md={6}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Nom" 
                variant="outlined" 
                name="lastName"
                value={lastName} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.lastName}</FormHelperText>
            </Grid>

            <Grid item xs={12} md={9}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Adresse" 
                variant="outlined" 
                name="address"
                value={address} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.address}</FormHelperText>
            </Grid>            
           

            <Grid item xs={12} md={3}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Code postal" 
                variant="outlined" 
                name="postalCode"
                value={postalCode} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.postalCode}</FormHelperText>
            </Grid>

            

            <Grid item xs={12} md={6}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Ville" 
                variant="outlined" 
                name="city"
                value={city} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.city}</FormHelperText>
            </Grid>

            <Grid item xs={12} md={6}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Pays" 
                variant="outlined" 
                name="country"
                value={country} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.country}</FormHelperText>
            </Grid>

            <Grid item xs={12} md={6}> 
              <TextField 
                className={classes.textField}
                id="outlined-basic" 
                label="Téléphone" 
                variant="outlined" 
                name="phone"
                value={phone} 
                onChange={handleChange}
              />
              <FormHelperText className={classes.errors}>{errors.phone}</FormHelperText>
            </Grid> 

            <Grid item xs={12} md={6}> 
            <TextField 
              className={classes.textField}
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              name="mail"
              value={mail} 
              onChange={handleChange}
            />
            <FormHelperText className={classes.errors}>{errors.mail}</FormHelperText>
          </Grid> 

          <FormControlLabel
            control={
              <Checkbox
                checked={newsletter}
                onClick={handleCheckedChange}
                name="newsletter"
                color="primary"
              />
            }
            label="Je souhaite être régulièrement tenu au courant des activités de l’APMF par e-mail"
          />
            

          </Grid>
        </FormControl>
      </div>
    )
}

export default Step2;