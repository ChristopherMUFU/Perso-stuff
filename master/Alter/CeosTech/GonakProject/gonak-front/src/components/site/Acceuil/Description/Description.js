import React, { Component, Fragment } from 'react';
import './Description.css'

class Description extends Component {
    render() {
        return (
            <div id="description">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 p-5 DivBas_Acceuil">
                            <div className="Grande_Div">
                                <span className="Text_DivBas_Acceuil"><p id="Text_Principal">Nous vous accueillons du lundi au samedi de 11h à 22h pour vous régaler !
                                Venez profitez de notre bonne ambiance mêlant bonne humeur, gourmandise et détente sans contrainte.<br/></p>
                                
                                    <strong>“La gourmandise est le péché des bonnes âmes” !</strong><br/>
                                    <div className="Div_Citation"> 
                                    <p id="Text_PaulBocuse">Paul Bocuse</p>
                                    </div>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Description;