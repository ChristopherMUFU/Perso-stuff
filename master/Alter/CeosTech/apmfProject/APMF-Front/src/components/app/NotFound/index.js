import './styles.css';
import { NavLink } from 'react-router-dom';

import wheelAnimation from '../../../utilities/app/404';

const NotFound = () => {
    wheelAnimation();
    return (
        <div className="not-found__page">
                <div className="container-not-found">
                    <h1 className="first-four-not-found">4</h1>
                    <div className="cog-wheel1">
                        <div className="cog1">
                        <div className="top-not-found"></div>
                        <div className="down-not-found"></div>
                        <div className="left-top-not-found"></div>
                        <div className="left-down-not-found"></div>
                        <div className="right-top-not-found"></div>
                        <div className="right-down-not-found"></div>
                        <div className="left-not-found"></div>
                        <div className="right-not-found"></div>
                    </div>
                    </div>
                    
                    <div className="cog-wheel2"> 
                    <div className="cog2">
                        <div className="top-not-found"></div>
                        <div className="down-not-found"></div>
                        <div className="left-top-not-found"></div>
                        <div className="left-down-not-found"></div>
                        <div className="right-top-not-found"></div>
                        <div className="right-down-not-found"></div>
                        <div className="left-not-found"></div>
                        <div className="right-not-found"></div>
                    </div>
                    </div>
                <h1 className="second-four-not-found">4</h1>
                <p className="wrong-para">
                    Oh Oh! Il semble que vous soyez perdu!
                    <br></br>
                    <NavLink
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}
                        to={`/home/`}
                    >
                        Retour à l'accueil
                    </NavLink>
                </p>
                
            </div>
        </div>
    )
}

export default NotFound;