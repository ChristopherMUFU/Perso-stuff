import { useState } from "react";
import "./card.css";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";

import { Button, IconButton, TextField } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Checkbox
} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../utilities";

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

let compteurSupplement = 0;
let compteurUnique = 0;
let compteurDouble = 0;
let compteurTriple = 0;

let tabSupplement = [];

let nomCategorie = "Accompagnements" // à modifier selon la catégorie


const Cardaccompagnement = ({
  nom,
  prix,
  id,
  description,
  ingredients,
  categorie,
  disponibilite,
  image,
  choixSupplementFrites,
  setChoixSupplementFrites,
  choixTaille,
  setChoixTaille,
}) => {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [showButton, setShowButton] = useState(false);

  const [error, setError] = useState(false);
  const [errorSupplement, setErrorSupplement] = useState(false);
  const [errorUnique, setErrorUnique] = useState(false);
  const [errorDouble, setErrorDouble] = useState(false);
  const [errorTriple, setErrorTriple] = useState(false);

  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(null);
  const [sideDish, setSideDish] = useState(null); //boisson
  const [TailleSelected, setTailleSelected] = useState(null);
  const [supplementSelected, setSupplementSelected] = useState(null);
  const [prixSupplement, setPrixSupplement] = useState(prix);
  const [comment, setComment] = useState('');

  const handleClose = (e) => {
    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShow(false);
      setShowButton(false);

      compteurSupplement = 0;
      compteurUnique = 0;
      compteurDouble = 0;
      compteurTriple = 0;
      tabSupplement = [];

        setSupplementSelected(null)

    }
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  let prix_supplement = 0;

  const info_supplement = (val) =>{
    let tabSupp = []
    tabSupp.push(val.nom)
    tabSupp.push(val.prix)
    let inf_supp = JSON.stringify(tabSupp);
    return inf_supp;
  }
  let prix_total = prix;

  const handleChangeSupplement = (event) => {
    //console.log(prixTotal)
    console.log(prix_supplement)
    console.log(prix_total)
    let testCompteur = event.target.checked
    if (testCompteur === true){
        compteurSupplement += 1;
        tabSupplement.push(event.target.value)
        console.log(tabSupplement)
        //setPrixTotal(prixTotal + data.prix)
        //prix_supplement += data.prix
        //console.log(prix_supplement)

        if(compteurSupplement >= 9){
            setErrorSupplement(true)
        }
        else{setErrorSupplement(false)}
    }
    else{
        compteurSupplement -= 1;
        for (let i in tabSupplement) {
          if(tabSupplement[i] === event.target.value){
            tabSupplement.splice(i, 1)
            console.log(tabSupplement)
          }
        }
        //prix_supplement -= data.prix
        //console.log(prix_supplement)

        if(compteurSupplement >= 9){
            setErrorSupplement(true)
        }
        else{setErrorSupplement(false)}
    }

  };


  const handleSubmit = (test) => {
        dispath(
          addProduct({
            nom,
            image,
            prix,
            id,
            quantite,
            categorie,
            //sideDish: sideDish.nom,
            nom_categorie: nomCategorie,
            supplementSelected: tabSupplement,
            information: comment,

          })
        );
        dispath(addAlert({ nom, image, id: uuidv4() }));
        setQuantite(1);
        setError(false)
        setShow(false);
        setValue(null);
  };

  /* If the item is available, we can click to add it to the basket */
  const orderIfAvailable = () => {
    setShow(true);
  };

  const verifySeletedDishes = () => { //Paramètre elements à modifer?
  
        setError(false);
        console.log(error);
        handleSubmit(true);

        compteurSupplement = 0;
        compteurUnique = 0;
        compteurDouble = 0;
        compteurTriple = 0;
        tabSupplement = [];
        setSupplementSelected(null)
  }

  // const Prix = splitPrix(prix);

  return (
    // Depending on the availability or not of the item, the css style will vary, thanks to a different className
    <div className="card__command__container">
      <div
        className={"card__item " + (!disponibilite ? "item_unavailable" : "")}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        onClick={() => orderIfAvailable()}
      >
        <div className="card_contain">
          <h1 className="card__item__heading">{nom}</h1>
          <div className="card__item__image-container">
            <img src={image} alt={nom} />
          </div>
          <div className="card__item__details">
            <p>
              {/* {Prix[0]}€{Prix[1]} */}
              {splitPrix(prix)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Modal
          showModal={show}
          setShowModal={setShow}
          handleClose={handleClose}
        >
          <Modal.Header>
            <h1>{nom}</h1>
            <img src={image} alt={nom} />
            <p>{splitPrix(prix)}</p>
          </Modal.Header>
          <Modal.Body>
            <Modal.Body.Heading>Description</Modal.Body.Heading>
            <p>{description}</p>
          </Modal.Body>

          {/*------------------------- Choix Supplement ------------------------------------------

<Modal.Body.Heading style={{ marginBottom: "1.5rem", marginTop:"1.3rem" }}>
             Supplement(s)
            </Modal.Body.Heading>
            <FormControl component="fieldset">
              <RadioGroup>
                {choixSupplementFrites.map((data) => {
                  if (1===1)
                    return (
                      <div className="sides-radioGroup" key={data.id}>
                        <FormControlLabel
                          value={info_supplement(data)}
                          control={<Radio/>}
                          id={data.id}
                          className="radio-choice__menu"

                        />
                        <Modal.Body.Heading>
                          {data.nom + " (+"+ data.prix.toFixed(2) + "€)"}
                        </Modal.Body.Heading>
                      </div>
                    );
                  else return null;
                })}
              </RadioGroup>
            </FormControl>
            {errorSupplement && (
                <p className="error">Veuillez sélectionner jusqu'à 8 suppléments maximum</p>
              )}


<div className="separation_ligne" > </div>
*/}

          <TextField
            id="outlined-full-width"
            style={{ marginBottom: "2rem" }}
            placeholder="Informations importantes"
            helperText="Indiquez ici toute information importante"
            fullWidth
            margin="normal"
            rows={2}
            variant="outlined"
            onChange={handleCommentChange}
          />

          <Modal.Footer className="card__item__total__price">
            <Modal.Body.Heading>
              Prix Total
              <span style={{ fontSize: "1rem", color: "black" }}>(TTC)</span>
            </Modal.Body.Heading>
            <p style={{ fontSize: "1.3rem" }}>
              {(quantite * prix).toFixed(2)}€
            </p>
          </Modal.Footer>
          <Modal.Footer>
            <div
              style={{
                marginRight: "15px",
                display: "flex",
                alignItems: "center",
              }}
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

            {/* If the item is non available, this will be displayed */}
            {!disponibilite && <p>Produit non disponible</p>}

            {disponibilite && (
              <Button
                disabled={quantite === 0}
                onClick={() => {
                  verifySeletedDishes();
                }}
                variant="contained"
                color="secondary"
                className="card__item__commander-btn"
                endIcon={<AddShoppingCartIcon style={{ fontSize: "25px" }} />}
              >
                Ajouter au panier
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Cardaccompagnement;

