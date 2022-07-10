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
  Checkbox,
  FormGroup,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { splitPrix } from "../../utilities";

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const Carddessert = ({
  nom,
  prix,
  id,
  description,
  ingredients,
  categories,
  disponibilite,
  image,
  est_boissons,

}) => {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(true);
  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(null);
  const [sideDish, setSideDish] = useState(null);
  const [painSelected, setPainSelected] = useState(null);
  const [garnitureSelected, setGarnitureSelected] = useState(null);
  const [sauceSelected, setSauceSelected] = useState(null);
  const [supplementSelected, setSupplementSelected] = useState(null);
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
    }
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    if (!error) {
      if (value !== null) {
        dispath(
          addProduct({
            nom,
            image,
            prix,
            id,
            quantite,
            categories,
           


          })
        );
        dispath(addAlert({ nom, image, id: uuidv4() }));
        setQuantite(1);
        setShow(false);
        setValue(null);
      } else {
        setError(true);
      }
    } else {
      dispath(
        addProduct({
          nom,
          image,
          prix,
          id,
          quantite,
          categories,
         

        })
      );
      dispath(addAlert({ nom, image, id: uuidv4() }));
      setQuantite(1);
      setShow(false);
      setValue(null);
    }
  };

  /* If the item is available, we can click to add it to the basket */
  const orderIfAvailable = () => {
    setShow(true);
  };

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
                  handleSubmit();
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

export default Carddessert;
