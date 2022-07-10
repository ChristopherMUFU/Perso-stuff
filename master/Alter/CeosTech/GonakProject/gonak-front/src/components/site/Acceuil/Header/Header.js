import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
    render() {
        return (
            <div id="homeAcceuil">
                    <div className="container-fluid Fond_Acceuil_Gonak">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                 <span className="Text_Fond_Acceuil">GONAK<br></br>
                                    L'ATELIER DES GOURMANDS
                                         
                                    </span>
                                    <a href="/home#reserver">
                                        <form className="form-inline">
                                                <button  className="btn btn-outline mr-auto Btn_Reserver_Acceuil" type="button">RESERVER</button>
                                        </form>
                                    </a>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Header;