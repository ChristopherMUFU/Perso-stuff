import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import "./productDisplay.css";
import { splitPrix } from "../../../utilities";


const ProductDisplay = ({ idPanierItem }) => {
  const [panierItem, setPanierItem] = useState(null);
  const [supplements, setSupplements] = useState(null);
  const [supplementsPayants, setSupplementsPayants] = useState([]);

  const fetchPanierItem = async () => {
    const { data } = await axios.get(URL + "paiement/produits/" + idPanierItem);
    setPanierItem(data);
    const supplementTemp = JSON.parse(data.supplements);

    setSupplements(supplementTemp);
    const supplementsPayantsTemp = [];
    // if (supplementTemp?.supplements) {
    supplementTemp?.supplements?.forEach((suppemntItem) => {
      supplementsPayantsTemp.push(JSON.parse(suppemntItem));
    });
    // }
    setSupplementsPayants(supplementsPayantsTemp);
  };


  useEffect(() => {
    fetchPanierItem();
  }, []);

  useEffect(() => {
    console.log(`panierItem`, panierItem);
  }, [panierItem]);

  console.log(supplements);

  return (
    <div>
      {panierItem ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="title-details">
              {panierItem.quantite}x {panierItem.produit.nom}{" "}
            </p>

            {/* tester si c'est pizza, car sa structure est differente des autres*/}
            {panierItem.produit.nom.includes("Pizza") ? (
              <p>
                {supplements?.prixPizzaSelected &&
                  splitPrix(
                    supplements.prixPizzaSelected * panierItem.quantite
                  )}
              </p>
            ) : (
              <p>{splitPrix(panierItem.produit.prix * panierItem.quantite)}</p>
            )}
          </div>
          {supplements?.painSelected && (
            <>
              <p className="bold-details">Pain : </p>
              <p>{supplements.painSelected}</p>
            </>
          )}

          {supplements?.viande_1_selected && (
            <>
              <p className="bold-details">1 Viande : </p>
              <p>{supplements.viande_1_selected}</p>
            </>
          )}
          {supplements?.viande_2_selected && (
            <>
              <p className="bold-details">2 Viande : </p>
              <p>{supplements.viande_2_selected}</p>
            </>
          )}
          {supplements?.viande_3_selected && (
            <>
              <p className="bold-details">3 Viande : </p>
              <p>{supplements.viande_3_selected}</p>
            </>
          )}
          {/* {supplements?.viande_2_selected?.length === 0 ? ("") : (
            <>
              <p className="bold-details">2 Viandes :</p>
              {supplements?.viande_2_selected?.map((item) => {
                return (
                  <p key={item} style={{margin: 0}}>
                    {item}
                  </p>
                 );
              })}
            </>
          )} */}
          {/* {supplements?.viande_3_selected?.length === 0 ? ("") : (
            <>
              <p className="bold-details">3 Viandes :</p>
              {supplements?.viande_3_selected?.map((item) => {
                return (
                  <p key={item} style={{margin: 0}}>
                    {item}
                  </p>
                 );
              })}
            </>
          )} */}

          {supplements?.sauce?.length !== 0 && (
            <p className="bold-details">Sauces :</p>
          )}
          {supplements?.sauce?.map((sauceItem) => (
            <p key={sauceItem} style={{margin: 0}}>{sauceItem}</p>
          ))}

          {supplements?.hasOwnProperty("garniture") &&
            supplements?.garniture?.length !== 0 && (
              <p className="bold-details">Garnitures :</p>
            )}
          {supplements?.garniture?.map((garnitureItem) => (
            <p key={garnitureItem} style={{margin: 0}}>{garnitureItem}</p>
          ))}

          {supplementsPayants?.length !== 0 && (
            <p className="bold-details">Supplements :</p>
          )}
          {supplementsPayants?.map((supplementsPayantsItem) => (
            <div key={supplementsPayantsItem} className="ecarter-prix">
              <p style={{margin: 0}}>{supplementsPayantsItem.nom_supplement}</p>
              <p style={{margin: 0}}>{supplementsPayantsItem.prix_supplement}€</p>
            </div>
          ))}

          {supplements?.boisson && (
            <>
              <p className="bold-details">Boisson : </p>
              <p>{supplements.boisson}</p>
            </>
          )}
          {panierItem?.information && (
            <>
              <p className="bold-details">Information :</p>
              <p>{panierItem.information}</p>
            </>
          )}
        </div>
      ) : (
        <p>Erreur, panier pas reçu</p>
      )}
    </div>
  );
};

export default ProductDisplay;
