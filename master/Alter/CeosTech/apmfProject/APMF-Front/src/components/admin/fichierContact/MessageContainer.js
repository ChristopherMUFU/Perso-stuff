import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./message.css";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor:"#04295D"
    },
}));
export default function MessageContainer({contact:{message,date_envoie,email}}) {
    const classes=useStyles();
    return (
        <div className="container__message darker">
            <div className="message-header">
                <div>{email} </div>
                <Avatar className={classes.avatar} />
            </div>
            <p>{message}</p>
            <span className="time-left">{new Date(date_envoie).toLocaleTimeString()}</span>
        </div>
    )
}
