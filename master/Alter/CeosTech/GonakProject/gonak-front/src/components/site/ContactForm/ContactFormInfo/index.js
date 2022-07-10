import React from 'react';
import "./styles.css";
import {Grid} from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';

const ContactFormInfo = () => {

    return (
        <div className="contact-info">
            <h1>Commander une prestation</h1>
            <p>Pour commander, vous pouvez nous contacter par mail ou par téléphone, ou bien remplir notre formulaire de contact </p>
            <Grid container direction="row" justifyContent="space-between">
                <Grid container justifyContent="center" xs={12} md={6} >
                    <p className="contact-phone">
                        <CallIcon />&nbsp;
                        <a class="footer-link" href="tel:01-72-56-31-08"> 01 72 56 31 08 </a>
                    </p>
                </Grid>
                <Grid container justifyContent="center" xs={12} md={6} >
                    <p className="contact-phone">
                        <MailIcon />&nbsp;
                        <a 
                            className="footer-link" 
                            href="mailto:gonak@gmail.com"
                        > gonak@gmail.com </a>
                    </p>
                </Grid>
            </Grid>
        </div>
    );
}
export default ContactFormInfo;