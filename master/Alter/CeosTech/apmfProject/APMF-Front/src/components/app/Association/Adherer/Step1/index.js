
import { makeStyles } from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  errors: {
    marginBottom: '1rem',
  }
}));

const Step1 = ({ currentStep, handleChange, state, errors}) => {
    const classes = useStyles();

    if (currentStep !== 1) { 
      return null
    }

    const { amount, donation } = state;

    // The markup for the Step 1 UI
    return(
      <div className="form-group-donation-step1">
        <FormControl component="fieldset" className={classes.container}>
          <FormLabel component="legend" className={classes.title}>Type d'adhésion</FormLabel>
          <RadioGroup 
            aria-label="donation" 
            name="donation" 
            value={donation} 
            onChange={handleChange}
          >
            <FormControlLabel value="20" control={<Radio />} label="Adhésion pour une personne (20€)" />
            <FormControlLabel value="35" control={<Radio />} label="Adhésion pour un couple (35€)" />

            <div className={classes.radioInput}>
              <FormControlLabel value="Autre" control={<Radio />} label="Adhésion membre bienfaiteur - Autre montant : " />            
              <TextField  
                id="outlined-basic" 
                label="Montant" 
                variant="outlined" 
                name="amount"
                value={amount} 
                onChange={handleChange}
              />
            </div>
            <FormHelperText className={classes.errors}>{errors.amount}</FormHelperText>

          </RadioGroup>
          <FormHelperText className={classes.errors}>{errors.donation}</FormHelperText>
        </FormControl>
      </div>
    )
}

export default Step1;