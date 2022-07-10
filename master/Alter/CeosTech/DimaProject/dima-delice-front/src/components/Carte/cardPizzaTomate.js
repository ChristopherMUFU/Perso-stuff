import { useState, useEffect } from "react";
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
  Checkbox,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../utilities";

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

let compteurSupplement = 0;
let compteurUnique = 0;
let compteurDouble = 0;
let compteurTriple = 0;
let prix_total = 0;
let tabGarniture = [];
let tabSauce = [];
let tabSupplement = [];

let nomCategorie = "Pizza sauce tomate"; // à modifier selon la catégorie

const Cardpizzatomate = ({
  nom,
  prix,
  id,
  description,
  ingredients,
  categorie,
  disponibilite,
  image,
  choixSupplementPizza,
  setChoixSupplementPizza,
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
  //const [limitation, setLimitation] = useState(false);

  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(null);
  const [TailleSelected, setTailleSelected] = useState("");
  const [prixTailleSelected, setPrixTailleSelected] = useState(0);
  const [supplementSelected, setSupplementSelected] = useState(null);
  const [prixTotal, setPrixTotal] = useState(0);
  const [comment, setComment] = useState("");

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
      prix_total = 0;
      tabSupplement = [];
      setSupplementSelected(null);
      setPrixTotal(0);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  let prix_supplement = 0;

  const info_supplement = (val) => {
    let tabSupp = { nom_supplement: val.nom, prix_supplement: val.prix };
    let inf_supp = JSON.stringify(tabSupp);
    return inf_supp;
  };

  //prix_total = prix;

  const handleChangeSupplement = (event) => {
    let testCompteur = event.target.checked;
    let prixSupp = JSON.parse(event.target.value);

    if (testCompteur === true) {
      compteurSupplement += 1;
      setPrixTotal(prixTotal + prixSupp.prix_supplement);
      tabSupplement.push(event.target.value);

      if (compteurSupplement >= 9) {
        setErrorSupplement(true);
      } else {
        setErrorSupplement(false);
      }
    } else {
      compteurSupplement -= 1;
      setPrixTotal(prixTotal - prixSupp.prix_supplement);

      for (let i in tabSupplement) {
        if (tabSupplement[i] === event.target.value) {
          tabSupplement.splice(i, 1);
        }
      }

      if (compteurSupplement >= 9) {
        setErrorSupplement(true);
      } else {
        setErrorSupplement(false);
      }
    }
  };

  const handleSubmit = (test) => {
    dispath(
      addProduct({
        nom,
        image,
        prix: prixTailleSelected,
        id,
        quantite,
        categorie,
        prixTotal: parseFloat(prixTotal.toFixed(2)),
        nomCategorie: nomCategorie,
        supplementSelected: tabSupplement,
        information: comment,
      })
    );
    dispath(addAlert({ nom, image, id: uuidv4() }));
    setQuantite(1);
    setError(false);
    setShow(false);
    setValue(null);
  };

  /* If the item is available, we can click to add it to the basket */
  const orderIfAvailable = () => {
    setShow(true);
  };

  const verifySeletedDishes = () => {
    if (
      errorSupplement !== true &&
      errorDouble !== true &&
      errorTriple !== true
    ) {
      setError(false);
      handleSubmit(true);

      compteurSupplement = 0;
      compteurUnique = 0;
      compteurDouble = 0;
      compteurTriple = 0;
      tabGarniture = [];
      tabSauce = [];
      tabSupplement = [];

      setSupplementSelected(null);
      setPrixTotal(prixTailleSelected);
    } else {
    }
  };

  // const Prix = splitPrix(prix);
  let freePizza = () => {
    return (
      <>
        <TextField
          id="outlined-full-width"
          placeholder="Choix de la 2ème pizza offerte"
          helperText="Offre valable sur les pizzas Senior et Méga UNIQUEMENT VENTE À EMRPORTER"
          fullWidth
          margin="right"
          rows={2}
          variant="outlined"
          onChange={handleCommentChange}
        />
      </>
    );
  };

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
            <p> à partir de {splitPrix(choixTaille[0].prix)}</p>
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
          </Modal.Header>
          <Modal.Body>
            <Modal.Body.Heading>Description</Modal.Body.Heading>
            <p>{description}</p>
          </Modal.Body>

          {/*------------------------- Choix Taille Pizza ------------------------------------------*/}

          <Modal.Body.Heading
            style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
          >
            Taille Pizza
          </Modal.Body.Heading>
          <FormControl component="fieldset">
            <RadioGroup>
              {choixTaille.map((data) => {
                if (1 === 1)
                  return (
                    <div className="sides-radioGroup" key={data.id}>
                      <FormControlLabel
                        value={data.nom}
                        control={
                          <Radio
                            onChange={(e) => {
                              setTailleSelected(e.target.value);
                              setPrixTailleSelected(data.prix);
                              setPrixTotal(data.prix);
                            }}
                          />
                        }
                        id={data.id}
                        className="radio-choice__menu"
                      />
                      {TailleSelected === data.nom &&
                      TailleSelected !== "Seul" ? (
                        <>
                          <div className="zones__container">
                            <FormControlLabel
                              className="radio__panier-zone"
                              control={<FormControl />}
                              label={freePizza()}
                            />
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <Modal.Body.Heading>
                        {data.nom + " (" + data.prix.toFixed(2) + "€)"}
                      </Modal.Body.Heading>
                    </div>
                  );
                else return null;
              })}
            </RadioGroup>
          </FormControl>
          {error && (
            <p className="error">Veuillez sélectionner au moins un élément</p>
          )}

          <div className="separation_ligne"> </div>

          {/*------------------------- Choix Supplement ------------------------------------------*/}

          <Modal.Body.Heading
            style={{ marginBottom: "1.5rem", marginTop: "1.3rem" }}
          >
            Supplement(s)
          </Modal.Body.Heading>
          <FormControl component="fieldset">
            <FormGroup>
              {choixSupplementPizza.map((data) => {
                if (1 === 1)
                  return (
                    <div className="sides-radioGroup" key={data.id}>
                      <FormControlLabel
                        value={info_supplement(data)}
                        control={<Checkbox onChange={handleChangeSupplement} />}
                        id={data.id}
                        className="radio-choice__menu"
                      />
                      <Modal.Body.Heading>
                        {data.nom} <span>({data.prix.toFixed(2)}€)</span>
                      </Modal.Body.Heading>
                    </div>
                  );
                else return null;
              })}
            </FormGroup>
          </FormControl>
          {errorSupplement && (
            <p className="error">
              Veuillez sélectionner jusqu'à 8 suppléments maximum
            </p>
          )}

          <div className="separation_ligne"> </div>

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
              {(quantite * prixTotal).toFixed(2)}€
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

export default Cardpizzatomate;
