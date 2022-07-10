import React, {useState, useEffect} from 'react'
import './styles.css';
import axios from "axios";
import { URL, sendrequest } from "../../../../middlewares/request";
//import { CarteContent } from '../../../../data/site/carteContent';
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { selectBaskets } from "../../../../app/Redux-slices/basketsSlice";
import { addProduct } from "../../../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../../../app/Redux-slices/alertsSlice";
import Grid from '@material-ui/core/Grid';
import ShowMoreText from "react-show-more-text";
import { Button, IconButton, TextField } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../../../utilities";
import ExpandedIcon from "./ExpandedIcon";
import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

// hook window dimensions
import useDimensions from "../../../../hooks/useDimensions";


let accompagnement_x2 = [];
let compteurAccompagnement = 0;


const ProduitDetail = (props) => {
  const dispath = useDispatch();
  const baskets = useSelector(selectBaskets);

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorAccompagnements, setErrorAccompagnements] = useState(false);

  const [quantite, setQuantite] = useState(1);
  const [tailleSelected, setTailleSelected] = useState(null); // type de prix pour les produits à plusieurs prix
  const [sandPlatSelected, setSandPlatSelected] = useState(null);
  const [entreeSelected, setEntreeSelected] = useState(null);
  const [dessertSelected, setDessertSelected] = useState(null);
  const [boissonSelected, setBoissonSelected] = useState(null);
  const [sauceSelected, setSauceSelected] = useState(null);
  const [marinadeSelected, setMarinadeSelected] = useState(null);

  const [accompgnementSelected, setAccompgnementSelected] = useState(null);
  const [accompgnementSoloSelected, setAccompgnementSoloSelected] = useState(null);
  const [accompgnementSoloTabSelected, setAccompgnementSoloTabSelected] = useState([]);
  const [accompgnementSuppSelected, setAccompgnementSuppSelected] = useState(null);
  const [accompgnementSuppTabSelected, setAccompgnementSuppTabSelected] = useState([]);

  const [showBoissonClassique, setShowBoissonClassique] = useState(false);
  const [showJusFruit, setShowJusFruit] = useState(false);
  const [showFreezeGazeuse, setShowFreezeGazeuse] = useState(false);

  const [comment, setComment] = useState("");
  const [prixTotal, setPrixTotal] = useState(props.detail.prix);

  const { width } = useDimensions();

    const initStates = () => {
          setError(false);
          setErrorAccompagnements(false);
          setQuantite(1);
          setTailleSelected(null);
          setSandPlatSelected(null);
          setEntreeSelected(null);
          setDessertSelected(null);
          setBoissonSelected(null);
          setSauceSelected(null);
          setMarinadeSelected(null);
          setShowBoissonClassique(false);
          setShowJusFruit(false);
          setShowFreezeGazeuse(false);
          accompagnement_x2 = [];
          compteurAccompagnement = 0;
          setAccompgnementSelected(null);
          setAccompgnementSoloSelected(null);
          setAccompgnementSoloTabSelected([]);
          setAccompgnementSuppSelected(null);
          setAccompgnementSuppTabSelected([]);
          setShowBoissonClassique(false);
          setShowJusFruit(false);
          setShowFreezeGazeuse(false);
          setComment("");
          //setPrixTotal(null);

    }

    const handleClose = (e) => {
        if (
          e.target.classList.contains("myModal__backdrop") ||
          e.target.classList.contains("myModal__modal__close-btn") ||
          e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
          e.target.parentNode.parentNode.classList.contains(
            "myModal__modal__close-btn"
          )
        ) {

          initStates();
          setShow(false);
      }
    };

    const handleSubmit = (test) => {
      if(props.detail.categorie === 3 || props.detail.categorie === 5 || props.detail.categorie === 7 ||
         props.detail.categorie === 8 || props.detail.categorie === 9 || props.detail.categorie === 10 ||
         props.detail.categorie === 11 || props.detail.categorie === 13 )
      {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
      }
      else if(props.detail.categorie === 4)
      {
        if(marinadeSelected !== null && accompagnement_x2 !== [] && compteurAccompagnement !== 0 &&
           props.detail.nom.includes('avec'))
        {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              marinadeSelected: marinadeSelected,
              accompagnement_x2: accompagnement_x2,
              accompagnement_supp: accompgnementSuppTabSelected,
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
        }
        else if(marinadeSelected !== null && props.detail.nom.includes('sans'))
        {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              marinadeSelected: marinadeSelected,
              accompagnement_supp: accompgnementSuppTabSelected,
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
        }

      }
      else if(props.detail.categorie === 6)
      {
        if(accompgnementSoloTabSelected !== [] && accompgnementSoloSelected !== null)
        {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              accompagnement_solo: accompgnementSoloTabSelected,
              accompagnement_supp: accompgnementSuppTabSelected,
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
        }

      }
      else if(props.detail.categorie === 2)
      {
        if(!props.detail.nom.includes('5') && !props.detail.nom.includes('1O'))
        {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
        }
        else
        {
          if(sauceSelected !== null)
          {
              dispath(
              addProduct({
                id: props.detail.id,
                nom: props.detail.nom,
                prix: props.detail.prix,
                image: props.detail.image,
                quantite: quantite,
                categorie: props.detail.categorie,
                prixTotal: parseFloat(prixTotal.toFixed(2)),
                sauceSelected: sauceSelected,
                information: comment,
              })
            );
              dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
              initStates();
              setShow(false);
          }
        }



      }
      else if(props.detail.categorie === 1)
      {
        if(!props.detail.nom.includes('sandwich') && !props.detail.nom.includes('salade') &&
           !props.detail.nom.includes('pâte'))
        {
          dispath(
            addProduct({
              id: props.detail.id,
              nom: props.detail.nom,
              prix: props.detail.prix,
              image: props.detail.image,
              quantite: quantite,
              categorie: props.detail.categorie,
              prixTotal: parseFloat(prixTotal.toFixed(2)),
              information: comment,
            })
          );
          dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);;
        }
        else
        {
          if(props.detail.nom.includes('intense') && entreeSelected !== null && sandPlatSelected !== null &&
            dessertSelected !== null && boissonSelected !== null)
          {
              dispath(
              addProduct({
                id: props.detail.id,
                nom: props.detail.nom,
                prix: props.detail.prix,
                image: props.detail.image,
                quantite: quantite,
                categorie: props.detail.categorie,
                prixTotal: parseFloat(prixTotal.toFixed(2)),
                entreeSelected: entreeSelected,
                sandPlatSelected: sandPlatSelected,
                dessertSelected: dessertSelected,
                boissonSelected: boissonSelected,
                information: comment,
              })
            );
              dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
          }
          else if(props.detail.nom.includes('gourmande') && sandPlatSelected !== null &&
            dessertSelected !== null && boissonSelected !== null)
          {
            dispath(
              addProduct({
                id: props.detail.id,
                nom: props.detail.nom,
                prix: props.detail.prix,
                image: props.detail.image,
                quantite: quantite,
                categorie: props.detail.categorie,
                prixTotal: parseFloat(prixTotal.toFixed(2)),
                sandPlatSelected: sandPlatSelected,
                dessertSelected: dessertSelected,
                boissonSelected: boissonSelected,
                information: comment,
              })
            );
            dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
          }
        }

      }
      else if(props.detail.categorie === 12)
      {
        if(boissonSelected !== null)
        {
          dispath(
              addProduct({
                id: props.detail.id,
                nom: props.detail.nom,
                prix: props.detail.prix,
                image: props.detail.image,
                quantite: quantite,
                categorie: props.detail.categorie,
                prixTotal: parseFloat(prixTotal.toFixed(2)),
                boissonSelected: boissonSelected,
                information: comment,
              })
            );
            dispath(addAlert({nom: props.detail.nom, image: props.detail.image, id: uuidv4()}));
          initStates();
          setShow(false);
        }
      }
      
  };

    const handleTailleSelected = (event) => { // +++ prix
      setTailleSelected(event.target.value);
      setError(false);
    };

    const handleSandPlatSelected = (event) => {
      setSandPlatSelected(event.target.value);
      setError(false);
    };

    const handleEntreeSelected = (event) => {
      setEntreeSelected(event.target.value);
      setError(false);
    };

    const handleDessertSelected = (event) => {
      setDessertSelected(event.target.value);
      setError(false);
    };

    const handleBoissonSelected = (event) => {
      setBoissonSelected(event.target.value);
      setError(false);
    };

    const handleSauceSelected = (event) => {
      setSauceSelected(event.target.value);
      setError(false);
    };

    const handleMarinadeSelected = (event) => {
      setMarinadeSelected(event.target.value);
      setError(false);
    };
    

    const info_accompagnement = (data, nom_produit) => {
      let prix = 0;

      if(nom_produit.includes('avec')){prix = 3;}
      else{ prix = data.prix;}

      let tabSupp = { nom_accompagnement: data.nom, prix_accompagnement: prix };
      let inf_supp = JSON.stringify(tabSupp);
      return inf_supp;
    };

    const handleAccompagnementSelected = (event) => { // +++ prix
      let testCompteur = event.target.checked;
      let prixAcc = JSON.parse(event.target.value);

      if (testCompteur) {
        compteurAccompagnement += 1;
        setPrixTotal(prixTotal + prixAcc.prix_accompagnement);
        accompagnement_x2.push(event.target.value);
        console.log(accompagnement_x2);

        if (compteurAccompagnement >= 3) {
          setErrorAccompagnements(true);
        } else {
          setErrorAccompagnements(false);
        }
      } else {
        compteurAccompagnement -= 1;
        setPrixTotal(prixTotal - prixAcc.prix_accompagnement);
        for (let i in accompagnement_x2) {
          if (accompagnement_x2[i] === event.target.value) {
            accompagnement_x2.splice(i, 1);
            console.log(accompagnement_x2);
          }
        }

        if (compteurAccompagnement >= 3) {
          setErrorAccompagnements(true);
        } else {
          setErrorAccompagnements(false);
        }
      }
    };

    const handleAccompagnementSuppSelected = (event) => { // +++ prix
      setAccompgnementSuppSelected(event.target.value);
      setError(false);
    };

    const handleAccompagnementSoloSelected = (event) => { // +++ prix
      setAccompgnementSoloSelected(event.target.value);
      setError(false);
    };

    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };


    const showMultiplePrice = (data) => {
      if(data?.categorie === 12 && data?.prix === 0){
        return (<p><b>{"À partir de " + data?.moyen + " €"} </b> </p>)
      }
      else{
        return (<p><b>{data.prix.toFixed(2) + " €"} </b></p>)
      }
      
    }

    
    return(

          <>
              <div 
                className="menu-item"
                style={!props.detail.disponibilite ? ({opacity: "70%"}): ({opacity: "100%"})} 
                onClick={() => setShow(true)}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    
                    <p className="menu-item-img">
                      <img src={props.detail.image} alt={props.detail.nom}></img>
                    </p>

                    <div className="menu-item-info">
                      <p className="menu-item-titre">{props.detail.nom}</p><br/>
                      <ShowMoreText
                            /* Default options */
                            lines={2}
                            more=""
                            less=""
                            className="content-css"
                            anchorClass="my-anchor-css-class"
                            /*onClick={this.executeOnClick}*/
                            expanded={false}
                            width={280}
                            truncatedEndingComponent={"... "}
                            className="menu-item-text"
                        >
                            {props.detail.description}
                        </ShowMoreText><br/>
                      {showMultiplePrice(props.detail)}<br/>
                    </div>
                  </Grid>
                </div>
                
                  <Modal
                    showModal={show}
                    setShowModal={setShow}
                    handleClose={handleClose}
                  >
                    <Modal.Header>
                      <img src={props.detail.image} alt={props.detail.nom} />
                    </Modal.Header>
                    <Modal.Body>
                      <Modal.Body.Heading>{props.detail.nom}</Modal.Body.Heading>
                      {showMultiplePrice(props.detail)}
                    </Modal.Body>

                    <Modal.Body>
                      <Modal.Body.Heading>Description</Modal.Body.Heading>
                      <p>{props.detail.description ? props.detail.description : props.detail.nom}</p>
                    </Modal.Body>

                  {/****************************** FORMULES *******************************/}

                  {props.detail.categorie === 1 &&
                   props.detail.nom.includes('sandwich') ||
                   props.detail.nom.includes('pâte') ||
                   props.detail.nom.includes('salade') ?
                
                    <>
                    {props.detail.nom.includes('intense') ?
                        <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})} >
                            <Modal.Body.Heading
                              style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                            >
                             Entrée
                            </Modal.Body.Heading>
                       
                            <FormControl component="fieldset">
                              <RadioGroup
                                name="entree"
                                value={entreeSelected}
                                onChange={handleEntreeSelected}
                              >
                               
                                {props.entrees?.map((data) => (
                                  <>
                                    {data.nom.includes('Burrata') ? ("") : ( 
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                    )}
                                  </>
                                ))}
                                  
                              </RadioGroup>
                            </FormControl>
                 
                            {error && (
                              <p className="error">Veuillez sélectionner au moins un élément</p>
                            )}
                            <div className="separation_ligne"> </div>
                        </Modal.Body>
                    :null}
                
                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                        {props.detail.nom.includes('sandwich') ? ("Sandwich/wraps") : ("")}
                        {props.detail.nom.includes('pâte') ? ("Pâtes") : ("")}
                        {props.detail.nom.includes('salade') ? ("Salades") : ("")}
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="plats"
                            value={sandPlatSelected}
                            onChange={handleSandPlatSelected}
                          >
                              {props.detail.nom.includes('sandwich') ? (
                                  <>
                                    
                                    {props.wraps?.map((data) => (
                                 
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                        
                                    ))}
                                    {props.sandwichs?.map((data) => (
                                 
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                        
                                    ))}
                                    </>
                                  ) : ("")}

                                  {props.detail.nom.includes('pâte') ? (
                                  <>
                                    
                                    {props.pates?.map((data) => (
                                 
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                        
                                    ))}
                                    </>
                                  ) : ("")}

                                  {props.detail.nom.includes('salade') ? (
                                  <>
                                    
                                    {props.salades?.map((data) => (
                                 
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                        
                                    ))}
                                    </>
                                  ) : ("")}
                      
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>
                  
                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Dessert
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="dessert"
                            value={dessertSelected}
                            onChange={handleDessertSelected}
                          >
                           
                            {props.desserts?.map((data) => (
                       
                                  <div className="sides-radioGroup" key={data.id}>
                                    <FormControlLabel
                                      value={data.nom}
                                      control={<Radio />}
                                      id={data.id}
                                      className="radio-choice__menu"
                                      onClick={() => {
                                        setError(false);
                                        //setTailleSelected(data);
                                      }}
                                    />
                                    <span>{data.nom}</span>
                                  </div>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>

                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Soft drinks
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="boisson"
                            value={boissonSelected}
                            onChange={handleBoissonSelected}
                          >

                            <div className="boisson_choice_container">
                              <span>Boissons classiques</span>
                              <p onClick={() => setShowBoissonClassique(!showBoissonClassique)}>
                                <ExpandedIcon expanded={showBoissonClassique} setExpanded={setShowBoissonClassique} />
                              </p>
                            </div>
                           
                            {props.ingredients?.map((data) => (
                              <>
                                  {showBoissonClassique && data.type_ingredient === "boisson_classique" ?
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            setPrixTotal(props.detail.prix);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                    :null}
                                </>
                                  
                              ))}

                              <div className="boisson_choice_container">
                                <span>Jus de fruits</span>
                                <p onClick={() => setShowJusFruit(!showJusFruit)}>
                                  <ExpandedIcon expanded={showJusFruit} setExpanded={setShowJusFruit} />
                                </p>
                              </div>
                           
                            {props.ingredients?.map((data) => (
                              <>
                                  {showJusFruit && data.type_ingredient === "jus_fruit" ?
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            setPrixTotal(props.detail.prix);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                    :null}
                                </>
                                  
                              ))}

                              <div className="boisson_choice_container">
                                <span>Freeze boissons gazeuses</span>
                                <p onClick={() => setShowFreezeGazeuse(!showFreezeGazeuse)}>
                                  <ExpandedIcon expanded={showFreezeGazeuse} setExpanded={setShowFreezeGazeuse} />
                                </p>
                              </div>
                           
                            {props.ingredients?.map((data) => (
                              <>
                                  {showFreezeGazeuse && data.type_ingredient === "freez_boisson_gazeuse" ?
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            setPrixTotal(props.detail.prix + 1);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom + " (+ 1.00 €)"}</span>
                                      </div>
                                    :null}
                                </>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>

                        
                    </Modal.Body>



              </>
              :null}


              {/****************************** ENTREES *******************************/}

                  {props.detail.categorie === 2 &&
                   props.detail.nom.includes('5') ||
                   props.detail.nom.includes('10') ?
                
                    <>
                    
                  
                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Sauce
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="sauce"
                            value={sauceSelected}
                            onChange={handleSauceSelected}
                          >
                           
                            {props.ingredients?.map((data) => (
                              <>
                                  {data.type_ingredient === "sauce" ?
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                    :null}
                                </>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>


              </>
              :null}



            {/****************************** ROTISSERIE *******************************/}

                  {props.detail.categorie === 4 &&
                   props.detail.nom.includes('sans') ||
                   props.detail.nom.includes('avec') ?
                
                    <>
                    
                  
                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Marinade
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="marinade"
                            value={marinadeSelected}
                            onChange={handleMarinadeSelected}
                          >
                           
                            {props.ingredients?.map((data) => (
                              <>
                                  {data.type_ingredient === "marinade" ?
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={data.nom}
                                          control={<Radio />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                    :null}
                                </>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>

                    {props.detail.nom.includes('avec') ? 
                        <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                            <Modal.Body.Heading
                              style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                            >
                             Accompagnements
                            </Modal.Body.Heading>
                            <FormControl component="fieldset">
                              <FormGroup>
                               
                                {props.accompagnements?.map((data) => (
                           
                                      <div className="sides-radioGroup" key={data.id}>
                                        <FormControlLabel
                                          value={info_accompagnement(data, props.detail.nom)}
                                          control={<Checkbox onChange={handleAccompagnementSelected} />}
                                          id={data.id}
                                          className="radio-choice__menu"
                                          onClick={() => {
                                            setError(false);
                                            //setTailleSelected(data);
                                          }}
                                        />
                                        <span>{data.nom}</span>
                                      </div>
                                      
                                  ))}
                                  
                              </FormGroup>
                            </FormControl>
                            {error && (
                              <p className="error">Veuillez sélectionner au moins un élément</p>
                            )}
                            {errorAccompagnements && (
                              <p className="error">
                                Veuillez sélectionner jusqu'à 2 éléments maximum
                              </p>
                            )}
                            <div className="separation_ligne"> </div>
                        </Modal.Body>
                    :null}


                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Accompagnement supplémentaire
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="accompagnement_supp"
                            value={accompgnementSuppSelected}
                            onChange={handleAccompagnementSuppSelected}
                          >

                          <div className="sides-radioGroup" key={1}>
                                <FormControlLabel
                                  value=""
                                  control={<Radio />}
                                  id={1}
                                  className="radio-choice__menu"
                                  onClick={() => {
                                    setAccompgnementSuppTabSelected([]);
                                    setPrixTotal(props.detail.prix);
                                
                                  }}
                                />
                                <span>Sans accompagnements</span>
                          </div>
                           
                            {props.accompagnements?.map((data) => (
                       
                                  <div className="sides-radioGroup" key={data.id}>
                                    <FormControlLabel
                                      value={data.nom} 
                                      control={<Radio />}
                                      id={data.id}
                                      className="radio-choice__menu"
                                      onClick={() => {
                                        setError(false);
                                        setAccompgnementSuppTabSelected(data);
                                        if(props.detail.nom.includes('avec')){
                                          setPrixTotal(props.detail.prix + 3);
                                        }
                                        else{setPrixTotal(props.detail.prix + data.prix);}
                                        console.log(data);
                                      }}
                                    />
                                    <span>
                                      {props.detail.nom.includes('sans') ? 
                                        (<span>{data.nom + " (+ " + data.prix.toFixed(2) + "€)"}</span>) : (<span>{data.nom + " (+ 3.00€)"}</span>)
                                      }
                                    </span>
                                  </div>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>


              </>
              :null}



            {/****************************** BAR GRILL *******************************/}

                  {props.detail.categorie === 6 ?
                
                    <>

                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Accompagnement
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                              name="accompagnement_supp"
                              value={accompgnementSoloSelected}
                              onChange={handleAccompagnementSoloSelected}
                            >
                           
                            {props.accompagnements?.map((data) => (
                       
                                  <div className="sides-radioGroup" key={data.id}>
                                    <FormControlLabel
                                      value={data.nom}
                                      control={<Radio />}
                                      id={data.id}
                                      className="radio-choice__menu"
                                      onClick={() => {
                                        setError(false);
                                        setAccompgnementSoloTabSelected(data);
                                        console.log(data);
                                      }}
                                    />
                                    <span>{data.nom}</span>
                                  </div>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>
              


                    <Modal.Body>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Accompagnement supplémentaire
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="accompagnement_supp"
                            value={accompgnementSuppSelected}
                            onChange={handleAccompagnementSuppSelected}
                          >

                            <div className="sides-radioGroup" key={1}>
                                <FormControlLabel
                                  value=""
                                  control={<Radio />}
                                  id={1}
                                  className="radio-choice__menu"
                                  onClick={() => {
                                    setAccompgnementSuppTabSelected([]);
                                    setPrixTotal(props.detail.prix);
                                
                                  }}
                                />
                                <span>Annuler</span>
                            </div>
                           
                            {props.accompagnements?.map((data) => (
                       
                                  <div className="sides-radioGroup" key={data.id}>
                                    <FormControlLabel
                                      value={data.nom}
                                      control={<Radio />}
                                      id={data.id}
                                      className="radio-choice__menu"
                                      onClick={() => {
                                        setError(false);
                                        setAccompgnementSuppTabSelected(data);
                                        setPrixTotal(props.detail.prix + data.prix);
                                        console.log(data);
                                      }}
                                    />
                                    <span>
                                      {data.nom + " (+ " + data.prix.toFixed(2) + "€)"} 
                                    </span>
                                  </div>
                                  
                              ))}
                              
                          </RadioGroup>
                        </FormControl>
                        {error && (
                          <p className="error">Veuillez sélectionner au moins un élément</p>
                        )}
                        <div className="separation_ligne"> </div>
                    </Modal.Body>

              </>
              :null}


            {/****************************** BOISSON *******************************/}


              {props.detail.categorie === 12 && 
                props.detail.est_boisson_classique ||
                props.detail.est_jus_fruit ||
                props.detail.est_freez_boisson_gazeuse ||
                props.detail.est_ode_bio ||
                props.detail.est_limonaide_bio ||
                props.detail.est_smoothie ||
                props.detail.est_jus_orange ?

                 <>

                  {props.detail.est_jus_orange ? (

                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                          <Modal.Body.Heading
                            style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                          >
                           Taille de la Boisson
                          </Modal.Body.Heading>
                          <FormControl component="fieldset">
                            <RadioGroup
                              name="jus_orange"
                              value={tailleSelected}
                              onChange={handleTailleSelected}
                            >
                             
                         
                                <div className="sides-radioGroup" key={1}>
                                  <FormControlLabel
                                    value="moyenne"
                                    control={<Radio />}
                                    id={1}
                                    className="radio-choice__menu"
                                    onClick={() => {
                                      setError(false);
                                      setPrixTotal(props.detail.moyen);
                                    }}
                                  />
                                  <span>{"Moyenne (" + props.detail.moyen.toFixed(2) + "€)"}</span>
                                </div>

                                <div className="sides-radioGroup" key={2}>
                                  <FormControlLabel
                                    value="grande"
                                    control={<Radio />}
                                    id={2}
                                    className="radio-choice__menu"
                                    onClick={() => {
                                      setError(false);
                                      setPrixTotal(props.detail.grand);
                                    }}
                                  />
                                  <span>{"Grande (" + props.detail.grand.toFixed(2) + "€)"}</span>
                                </div>
           
                            </RadioGroup>
                          </FormControl>
                          {error && (
                            <p className="error">Veuillez sélectionner au moins un élément</p>
                          )}
                          <div className="separation_ligne"> </div>
                    </Modal.Body>

                  ) : (
                    
                  
                    <Modal.Body style={!props.detail.disponibilite ? ({display: "none"}) : ({display: "block"})}>
                        <Modal.Body.Heading
                          style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
                        >
                         Choix de la boisson
                        </Modal.Body.Heading>
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="boisson"
                            value={boissonSelected}
                            onChange={handleBoissonSelected}
                          >
                           
                            
                              {props.ingredients?.map((data) => (
                                <>
                                    {props.detail.est_boisson_classique && data.type_ingredient === "boisson_classique" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_jus_fruit && data.type_ingredient === "jus_fruit" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_freez_boisson_gazeuse && data.type_ingredient === "freez_boisson_gazeuse" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_ode_bio && data.type_ingredient === "ode_bio" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_limonaide_bio && data.type_ingredient === "limonaide_bio" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_milkshake && data.type_ingredient === "milkshake" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}
                                      {props.detail.est_smoothie && data.type_ingredient === "smoothie" ?
                                        <div className="sides-radioGroup" key={data.id}>
                                          <FormControlLabel
                                            value={data.nom}
                                            control={<Radio />}
                                            id={data.id}
                                            className="radio-choice__menu"
                                            onClick={() => {
                                              setError(false);
                                              //setTailleSelected(data);
                                            }}
                                          />
                                          <span>{data.nom}</span>
                                        </div>
                                      :null}

                                  </>
                                    
                                ))}
                              
                            </RadioGroup>
                          </FormControl>
                          {error && (
                            <p className="error">Veuillez sélectionner au moins un élément</p>
                          )}
                          <div className="separation_ligne"> </div>
                      </Modal.Body>

                      )}

                    </>
                    :null}
                
{/* ---------------------------------Informations Importants---------------------------------------------------- */}
                {props.detail.disponibilite ?
                  <Modal.Body>
                    <Modal.Body.Heading
                        style={{ marginTop: "20px" }}
                      >
                      Informations Importantes
                      </Modal.Body.Heading>
                      <TextField
                        id="outlined-full-width"
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        placeholder="Informations importantes"
                        helperText="Indiquez ici toute information importante"
                        fullWidth
                        margin="normal"
                        rows={2}
                        variant="outlined"
                        onChange={handleCommentChange}
                      />
                    </Modal.Body>
                  :null}
                  
                  
                  <Modal.Footer style={{justifyContent: "space-between", marginTop: "30px", marginBottom: "10px"}}>

                    <Modal.Body.Heading>
                      Prix Total
                      <span style={{ fontSize: "0.8rem", color: "black" }}>(TTC)</span>
                    </Modal.Body.Heading>
                    <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                      {(quantite * prixTotal).toFixed(2)}€
                    </p>
                  </Modal.Footer>
             

                    <Modal.Footer>
                        <div
                          style={{
                            marginRight: "15px",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "var(--secondary-color)",
                            color: "white",
                          }}
                          className="produit-quantite"
                        >
                          <IconButton
                            style={{ margin: "0 5px" }}
                            onClick={() => {
                              if (quantite > 0) {
                                setQuantite(quantite - 1);
                              }
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <span>{quantite}</span>

                          <IconButton
                            style={{ margin: "0 5px" }}
                            onClick={() => setQuantite(quantite + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>

                      <div className="add-panier">
                       
                          {/* If the item is non available, this will be displayed */}
                          {!props.detail.disponibilite && 
                            <div className="produit-non-dispo">Produit non disponible</div>}
                       
                       
                        {props.detail.disponibilite && (
                          <Button
                            disabled={quantite === 0}
                            onClick={() => {
                              handleSubmit(true);
                            }}
                            className="btn-add-produit"
                          >
                            {width < 600 
                              ? <AddShoppingCartIcon style={{ fontSize: "25px" }} /> 
                              : <>Ajouter au panier</>}
                          </Button>
                        )}
                        </div>
              
                      </Modal.Footer>
                  </Modal>
           
            </>
    );
};
export default ProduitDetail;
