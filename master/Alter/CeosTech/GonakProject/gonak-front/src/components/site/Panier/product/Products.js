import React, {useState, useEffect} from 'react';
import "./product.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
  incrementQauntite,
  decrementQauntite,
  deleteProduct,
} from "../../../../app/Redux-slices/basketsSlice";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { splitPrix, calculTotalSupplements } from "../../../../utilities";

const Products = ({
  product
}) => {
  const dispatch = useDispatch();
  const [quantite, setQuantite] = useState(product.quantite);
  const [nom, setNom] = useState(product.nom);
  const [prixTotal, setPrixTotal] = useState(product.prixTotal);
  console.log(product.accompagnement_supp)
  //console.log(viande_2_selected.length);
  //console.log(viande_3_selected.length);
  return (
    <div className="product-container">
        <div className="product">
          <div className="product-list">
            <p className="product--info-title">
              {product.quantite}x {product.nom}
            </p>
            {product.entreeSelected && (
                <>
                  <p className="menu__details-title">Entrée</p>
                  <p className="menu__details">{product.entreeSelected}</p>
                </>
              )}
              {product.sandPlatSelected && (
                <>
                  <p className="menu__details-title">Plats</p>
                  <p className="menu__details">{product.sandPlatSelected}</p>
                </>
              )}
              {product.dessertSelected && (
                <>
                  <p className="menu__details-title">Dessert</p>
                  <p className="menu__details">{product.dessertSelected}</p>
                </>
              )}
              {product.boissonSelected && (
                <>
                  <p className="menu__details-title">Boisson</p>
                  <p className="menu__details">{product.boissonSelected}</p>
                </>
              )}
              {product.sauceSelected && (
                <>
                  <p className="menu__details-title">Sauce</p>
                  <p className="menu__details">{product.sauceSelected}</p>
                </>
              )}
              {product.marinadeSelected && (
                <>
                  <p className="menu__details-title">Marinade</p>
                  <p className="menu__details">{product.marinadeSelected}</p>
                </>
              )}
              {product.marinadeSelected && (
                <>
                  <p className="menu__details-title">Marinade</p>
                  <p className="menu__details">{product.marinadeSelected}</p>
                </>
              )}
              {!product.accompagnement_x2 || product.accompagnement_x2?.length === 0 ? ("") : (
                <>
                  <p className="menu__details-title">Accompagnements x2</p>
                  {product.accompagnement_x2?.map((item) => {
                    return (
                      <p key={JSON.parse(item).nom_accompagnement} className="menu__details">
                        {JSON.parse(item).nom_accompagnement}
                      </p>
                     );
                  })}
                </>
              )}
              {!product.accompagnement_supp || product.accompagnement_supp?.length === 0 ? ("") : (
                <>
                  <p className="menu__details-title">Accompagnements supplémentaire</p>
                  <p className="menu__details">{product.accompagnement_supp?.nom}</p>
                </>
              )}
              {product.information && (
                <>
                  <p className="menu__details-title">Informations</p>
                  <p className="menu__details">
                    <i>{product.information}</i>
                  </p>
                </>
              )}
              

          </div>



          <p className="product--info-prix">{splitPrix(prixTotal * product.quantite)}</p>

          {/*<DeleteIcon
            className="delete__product"
            onClick={() => dispatch(deleteProduct({ nom }))}
          />*/}

        </div>

        
        <div className="product"> 
          <div className="product--quantite">
              <IconButton
                className="product-icon"
                onClick={() => {
                  if (quantite > 0) {
                    dispatch(decrementQauntite({ nom }));
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>

              <span>{product.quantite}</span>

              <IconButton className="product-icon" onClick={() => dispatch(incrementQauntite({ nom }))}>
                <AddIcon />
              </IconButton>
          </div>

          <DeleteIcon
            className="delete__product"
            onClick={() => dispatch(deleteProduct({ nom }))}
          />

        </div>
        <div className="separation_ligne"> </div>
        
  </div>
  );
};

export default Products;
