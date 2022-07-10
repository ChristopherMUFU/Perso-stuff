
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Block } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  title: {    
    fontWeight: 'bold',
    fontSize: '24px',
    color: 'black',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  container: {
    width: '100%',
  },
  radioInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginBottom: "1rem",
  },
  errors: {
    position: 'absolute',
    bottom: '-1em',
  }
}));

const Step3 = ({ currentStep, handleChange, state, errors}) => {
  const classes = useStyles();

    if (currentStep !== 3) { 
      return null
    }

    const { position, complementaryInfos, complementaryInfosCouple, complementaryInfosFamily, complementaryInfosFriend } = state;

    // The markup for the Step 3 
    return(
      <div className="form-group-donation-step3">
        <FormControl component="fieldset" className={classes.container}>
          <FormLabel component="legend" className={classes.title}>Vous êtes :</FormLabel>
          <RadioGroup 
            aria-label="qualite" 
            name="position" 
            value={position} 
            onChange={handleChange}
          >
            <FormControlLabel value="patient" control={<Radio />} label="Patient" />
            
            <div className={classes.radioInput}>
              <FormControlLabel value="conjoint" control={<Radio />} label="Conjoint-e :" />
              <TextField  
                  id="outlined-basic" 
                  label="Nom et prénom" 
                  variant="outlined" 
                  name="complementaryInfosCouple"
                  value={complementaryInfosCouple} 
                  onChange={handleChange}
                  className={classes.input}                  
              />
            </div>

            <div className={classes.radioInput}>
              <FormControlLabel value="famille" control={<Radio />} label="Membre de la famille de :" />
              <TextField  
                  id="outlined-basic" 
                  label="Nom et prénom" 
                  variant="outlined" 
                  name="complementaryInfosFamily"
                  value={complementaryInfosFamily} 
                  onChange={handleChange}
                  className={classes.input}
              />              
            </div>            
            
            <div className={classes.radioInput}>
              <FormControlLabel value="ami" control={<Radio />} label="Ami-e de : " />            
              <TextField  
                id="outlined-basic" 
                label="Nom et prénom" 
                variant="outlined"
                name="complementaryInfosFriend"
                value={complementaryInfosFriend} 
                onChange={handleChange}
                className={classes.input}
              />   
            </div>            

            <FormControlLabel value="médecin" control={<Radio />} label="Médecin" />
            <FormControlLabel value="professionnel de santé" control={<Radio />} label="Professionnel de santé" />
            <FormControlLabel value="acteur social" control={<Radio />} label="Acteur social" />

            <div className={classes.radioInput}>
              <FormControlLabel value="autre" control={<Radio />} label="Autre : " />            
              <TextField  
                id="outlined-basic" 
                variant="outlined" 
                name="complementaryInfos"
                value={complementaryInfos} 
                onChange={handleChange}
                className={classes.input}
                />   
            </div>                       
            
          </RadioGroup>
          
          <FormHelperText className={classes.errors}>
            {errors.complementaryInfosCouple}
          </FormHelperText>
          <FormHelperText className={classes.errors}>
              {errors.complementaryInfosFamily}
          </FormHelperText>                     
          <FormHelperText className={classes.errors}>
            {errors.complementaryInfosFriend}
          </FormHelperText>
          <FormHelperText className={classes.errors}>
              {errors.complementaryInfos}
          </FormHelperText>

          <FormHelperText className={classes.errors}>{errors.position}</FormHelperText>          
        </FormControl>
      </div>
    )
}

export default Step3;