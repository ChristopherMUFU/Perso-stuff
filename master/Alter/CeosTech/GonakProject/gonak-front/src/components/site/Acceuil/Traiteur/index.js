import { useEffect, useState } from "react";
import './styles.css';
// eslint-disable-next-line
import Img_Traiteur from '../../../../images/Img_Traiteur.png'
// eslint-disable-next-line
import { Image } from 'react-bootstrap';

const Traiteur = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
     };

     useEffect(() => {
         window.addEventListener("resize", handleResize);
      }, []);


    return(

        <div id="traiteur">
            <div className="container-fluid">
                <div className="row text-center Div_Container_Accueil_Traiteur">
                    {windowWidth > 1200 ?
                        <div className="col-6 Div_Img_Traiteur_Accueil">  
                        </div>
                    :null}
                        
                        <div className="col-6 Div_Acceuil_Traiteur">
                                <span id="Text_Div_Acceuil_Traiteur">NOTRE SERVICE TRAITEUR</span><br/><br/><br/>
                                <p id="Sous_Text_Div_Acceuil_Traiteur"> Aussi bien pour vos évènements privés que  professionnels, nous vous proposons un service traiteur de qualité. 
                                Confiez-nous donc vos réceptions et profitez d’une prestation aux saveurs inégalées.</p>
                                

                                <a
                                    href="/home/contact-form">
                                    <form className="form-inline">
                                        <button className="btn btn-outline mr-auto Btn_Commander_Acceuil_Traiteur" type="button">COMMANDER</button>
                                    </form>
                                </a>   
                        </div>
                    {/*windowWidth <= 1200 ?
                        <div className="col-6 Div_Img_Traiteur_Accueil">  
                        </div>
                    :null*/}
                </div>
            </div>
        </div>
    );
}
export default Traiteur;