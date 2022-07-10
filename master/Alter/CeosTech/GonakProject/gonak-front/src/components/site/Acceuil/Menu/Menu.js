import { useEffect, useState } from "react";
import { Card, Container, Row } from 'react-bootstrap';
import './Menu.css'
import { MenuContent } from '../../../../data/site/menuContent';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Carousel } from 'react-bootstrap';
// eslint-disable-next-line
import { HashLink } from "react-router-hash-link";

const Menu = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
     };

     useEffect(() => {
         window.addEventListener("resize", handleResize);
      }, []);


        return (
            <div id="homeMenu">
                <Container fluid className="container-fluid">
                    <Row className="row Div_Container_Acceuil_Menu">

                        <div className="Div_Acceuil_Menu">
                            <h1 id="Text_Div_Acceuil_Menu">NOTRE MENU</h1>
                        </div>
                        {windowWidth >= 900 ? (
                            <div className="container-fluid">
                                <div className="containerMenu">
                                    <div className='row'> 
                                        {MenuContent.map((content) => (
                                            <div key={content.id} className='col'>
                                                <Card style={{ width: '14vw' }} className="Card_Acceuil">
                                                    <Card.Img className="Card_Img1" src={content.img} alt="Card image" />
                                                    <Card.ImgOverlay>
                                                        <Card.Text className="Card_Accueil_Text">{content.titre}</Card.Text>
                                                        <ArrowRightAltIcon className="Arrow_Card_Accueil" />
                                                    </Card.ImgOverlay>
                                                </Card>
                                            </div>       
                                        ))}
                                    </div> 
                                </div>
                            </div>
                        ) : (
                            <Carousel pause={false}>
                                {MenuContent.map((content) => (
                                  <Carousel.Item interval={5000} className="px-3" key={content.titre}>
                                        <Card style={{ width: '12rem' }} className="Card_Acceuil">
                                            <Card.Img className="Card_Img1" src={content.img} alt="Card image" />
                                            <Card.ImgOverlay>
                                                <Card.Text className="Card_Accueil_Text">{content.titre}</Card.Text>
                                                <ArrowRightAltIcon className="Arrow_Card_Accueil" />
                                            </Card.ImgOverlay>
                                        </Card>
                                  </Carousel.Item>
                                ))}
                              </Carousel>

                        )}
                            <div id="btn-carte">
                                <form className="form-inline">
                                    <a 
                                        href="/home/carte" 
                                        style={{textDecoration: "none"}}
                                    >
                                        <button
                                            className="btn btn-outline mr-auto Btn_Carte_Menu" 
                                            type="button">
                                                VOIR NOTRE CARTE
                                        </button>
                                    </a>
                                </form>
                            </div>
                            
                        
                    </Row>
                </Container>
            </div>
        );
};

export default Menu;