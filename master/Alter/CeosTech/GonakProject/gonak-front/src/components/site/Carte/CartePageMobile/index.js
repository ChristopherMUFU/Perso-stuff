import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { CarteContent } from '../../../../data/site/carteContent';
import Grid from '@material-ui/core/Grid';
import { URL, sendrequest } from "../../../../middlewares/request";
import ProduitDetail from "../CartePage/produitDetail";

const CartePageMobile = (props) => {
    const idMenu = props.idMenuPageMobile;
    const [produits, setProduits] = useState([]);

    const fetchProduit = () => {
      axios.get(URL + "gonak/produit/?categorie=" + idMenu).then((res) => {
        setProduits(res.data);
        console.log(res.data);
      });
    };

    useEffect(() => {
      fetchProduit();
      //console.log(produitsCarte);
    }, []);

    return (
        <div id="menu-page-mobile">
                <Grid container direction="row" justifyContent="center">
                    { produits.map((data) => (
                      
                          <ProduitDetail detail={data}/> 
                        
                    ))}
                  </Grid>
        </div>
    );
};

export default CartePageMobile;