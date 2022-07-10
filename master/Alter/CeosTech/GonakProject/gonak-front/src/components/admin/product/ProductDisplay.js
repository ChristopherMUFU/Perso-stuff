import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import "./productDisplay.css";
import { splitPrix } from "../../../utilities";


const ProductDisplay = ({ produit }) => {
  const [panierItem, setPanierItem] = useState(null);
  const [supplements, setSupplements] = useState(null);
  const [supplementsPayants, setSupplementsPayants] = useState([]);

 //console.log(produit)

  return (
    <div>
      {produit ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="title-details">
              {produit.quantite}x {produit.nom}{" "}
            </p>

            {/* tester si c'est pizza, car sa structure est differente des autres*/}
            {produit.entreeSelected && (
              <>
                <p className="bold-details">Entrée</p>
                <p>{produit.entreeSelected}</p>
              </>
            )}
            {produit.sandPlatSelected && (
              <>
                <p className="bold-details">Plats</p>
                <p>{produit.sandPlatSelected}</p>
              </>
            )}
            {produit.dessertSelected && (
              <>
                <p className="bold-details">Dessert</p>
                <p>{produit.dessertSelected}</p>
              </>
            )}
            {produit.boissonSelected && (
              <>
                <p className="bold-details">Boisson</p>
                <p>{produit.boissonSelected}</p>
              </>
            )}
            {produit.sauceSelected && (
              <>
                <p className="bold-details">Sauce</p>
                <p>{produit.sauceSelected}</p>
              </>
            )}
            {produit.marinadeSelected && (
              <>
                <p className="bold-details">Marinade</p>
                <p>{produit.marinadeSelected}</p>
              </>
            )}
            {produit.marinadeSelected && (
              <>
                <p className="bold-details">Marinade</p>
                <p >{produit.marinadeSelected}</p>
              </>
            )}
            </div>
          

        </div>
      ) : (
        <p>Erreur, panier pas reçu</p>
      )}
    </div>
  );
};

export default ProductDisplay;
