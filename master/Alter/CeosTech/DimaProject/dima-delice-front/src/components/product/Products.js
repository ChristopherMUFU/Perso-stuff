import React from "react";
import "./product.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
  incrementQauntite,
  decrementQauntite,
  deleteProduct,
} from "../../app/Redux-slices/basketsSlice";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { splitPrix, calculTotalSupplements } from "../../utilities";

const Products = ({
  image_url,
  nom,
  prix,
  id,
  quantite,
  categorie,
  prixTotal,
  nom_categorie, // à modif
  boissonSelected,
  garnitureSelected, // tab
  painSelected,
  viande_1_selected,
  viande_2_selected,
  viande_3_selected,
  sauceSelected, // tab
  supplementSelected, // tab
  information,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product-list">
        <p className="product--info-title">
          {quantite}x {nom}
        </p>
        <>
          {painSelected && (
            <>
              <p className="menu__details-title">Pain</p>
              <p className="menu__details">{painSelected}</p>
            </>
          )}

          {viande_1_selected && (
            <>
              <p className="menu__details-title">Viande 1</p>
              <p className="menu__details">{viande_1_selected}</p>
            </>
          )}

          {viande_2_selected && (
            <>
              <p className="menu__details-title">Viande 2</p>
              <p className="menu__details">{viande_2_selected}</p>
            </>
          )}
          {viande_3_selected && (
            <>
              <p className="menu__details-title">Viande 3</p>
              <p className="menu__details">{viande_3_selected}</p>
            </>
          )}

          {garnitureSelected && (
            <>
              <p className="menu__details-title">Garniture</p>
              {garnitureSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                );
              })}
            </>
          )}

          {sauceSelected && (
            <>
              <p className="menu__details-title">Sauce</p>
              {sauceSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {item}
                  </p>
                );
              })}
            </>
          )}

          {supplementSelected && (
            <>
              {supplementSelected.length>0 &&
                <p className="menu__details-title">
                Suppléments {calculTotalSupplements(supplementSelected)}€
              </p>
              }
              {supplementSelected?.map((item) => {
                return (
                  <p key={item} className="menu__details">
                    {JSON.parse(item).nom_supplement}{" "}
                    {JSON.parse(item).prix_supplement}€
                  </p>
                );
              })}
            </>
          )}

          {boissonSelected && (
            <>
              <p className="menu__details-title">Boisson</p>
              <p className="menu__details">{boissonSelected}</p>
            </>
          )}
          {information && (
            <>
              <p className="menu__details-title">information</p>
              <p className="menu__details">
                <i>{information}</i>
              </p>
            </>
          )}
        </>
      </div>

      <div className="product--quantite">
        <IconButton
          onClick={() => {
            if (quantite > 0) {
              dispatch(decrementQauntite({ nom }));
            }
          }}
        >
          <RemoveIcon />
        </IconButton>

        <span>{quantite}</span>

        <IconButton onClick={() => dispatch(incrementQauntite({ nom }))}>
          <AddIcon />
        </IconButton>
      </div>

      <p className="product--info-prix">{prixTotal?splitPrix(prixTotal * quantite):splitPrix(prix * quantite)}</p>

      <DeleteIcon
        className="delete__product"
        onClick={() => dispatch(deleteProduct({ nom }))}
      />
    </div>
  );
};

export default Products;
