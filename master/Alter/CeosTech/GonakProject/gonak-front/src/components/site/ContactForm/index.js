import React from 'react';
import './styles.css';
import { Grid } from '@material-ui/core';

import ContactFormCoord from './ContactFormCoord';
import ContactFormInfo from './ContactFormInfo';

const ContactForm = () => {

    return(
        <div id="contact-form">
            <Grid container direction="column">
                <Grid container justifyContent="center">
                    <ContactFormInfo />
                </Grid>
                <Grid container justifyContent="center">
                    <ContactFormCoord />
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactForm;