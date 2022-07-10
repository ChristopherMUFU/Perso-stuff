import React, { Component, Fragment } from 'react';
import './Acceuil.css';
import Description from './Description/Description';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import Reserver from './Reserver';
import Traiteur from './Traiteur';


class Acceuil extends Component {
    render() {
        return (
            <Fragment id="acceuil">
                <Header />
                <Description />
                <Menu />
                <Traiteur />
                <Reserver />
            </Fragment>
            
        );
    }
}

export default Acceuil;