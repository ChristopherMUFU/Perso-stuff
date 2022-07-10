import React, {useState, useEffect} from 'react'
import './styles.css';
import axios from "axios";
import { URL, sendrequest } from "../../../../middlewares/request";
//import { CarteContent } from '../../../../data/site/carteContent';
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

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ProduitDetail from "./produitDetail.js";


const CartePage = (props) => {
  const idMenu = props.idMenuPage;
  const [produits, setProduits] = useState([]);
  const [salades, setSalades] = useState([]);
  const [pates, setPates] = useState([]);
  const [wraps, setWraps] = useState([]);
  const [sandwichs, setSandwichs] = useState([]);
  const [entrees, setEntrees] = useState([]);
  const [accompagnements, setAccompagnements] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [idModal, setIdModal] = useState(1);
  const [show, setShow] = useState(false);


    const fetchProduit = () => {
      axios.get(URL + "restaurant/produit/?categorie=" + idMenu).then((res) => {
        setProduits(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=2").then((res) => { // Entrée
        setEntrees(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=3").then((res) => { // Salade
        setSalades(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=7").then((res) => { // Pâte
        setPates(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=8").then((res) => { // Wrap
        setWraps(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=9").then((res) => { // Sandwich
        setSandwichs(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=10").then((res) => { // Accompagnements
        setAccompagnements(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/produit/?categorie=11").then((res) => { // Desserts
        setDesserts(res.data);
        console.log(res.data);
      });
      axios.get(URL + "restaurant/ingredient/").then((res) => { // Boissons + Marinades + Sauces + Milkshakes + Smoothies
        setIngredients(res.data);
        console.log(res.data);
      });

    };



    useEffect(() => {
      fetchProduit();
      //console.log(produitsCarte);
    }, []);

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
      }
    };


    return(
        <div id="menu-page">
                  <Grid container direction="row" justifyContent="center">
                    { produits.map((data) => (
                      
                          <ProduitDetail 
                            detail={data}
                            entrees={entrees}
                            salades={salades}
                            pates={pates}
                            wraps={wraps}
                            sandwichs={sandwichs}
                            accompagnements={accompagnements}
                            desserts={desserts}
                            ingredients={ingredients}
                          /> 
                        
                    ))}
                  </Grid>
        </div>

        
     
    );
};
 export default CartePage;
