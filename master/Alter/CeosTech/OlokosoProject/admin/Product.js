import React, { useEffect, useRef } from "react";

import "./product.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { getPrixAvecHT, splitPrix } from "../../../utilities";
import ExpandedIcon from "./ExpandedIcon";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
  },
}));

const Product = ({
  commande,
  action = () => {},
  btn = null,
  estPrisConnaissance = false,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [menus, setMenus] = useState([]);

  const fetchMenus = () => {
    console.log(commande.panier.infos_menus);
    setMenus(JSON.parse(commande.panier.infos_menus));
  }

    useEffect(() => {
        fetchMenus();
        console.log(menus);
    return () => {
      setMenus([]);
    };
  }, []);

  
  return (
    <>
      <Accordion
        className={classes.accordion}
        key={commande.id}
        onChange={(e, expand) => setExpanded(expand)}>
        <AccordionSummary
          className={classes.accordion}
          // expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <div className={classes.table}>
              <p className={classes.p}>
                {new Date(commande.date_commande).toLocaleDateString()}
              </p>
              <p className={classes.p}>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
              {/* <p className={classes.p}>{commande.reference}</p> */}
              <p className={classes.p}>
                {commande.client.nom[0] + "." + commande.client.prenom}
              </p>
              <p className={classes.p}>{commande.livraison}</p>
              <p className={"commande__prix " + classes.p}>
                {commande.prix_totale}€
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}>
              <p style={{ marginRight: "10px" }}>
                {new Date(commande.date_commande).toLocaleDateString()},{" "}
              </p>
              <p>
                {new Date(commande.date_commande)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join("h")}
              </p>
            </div>
          )}

          <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
        </AccordionSummary>
        <AccordionDetails>
          <div className='product__container'>
            {/* <CommandeList commandeItem={commande.panier.produits} /> */}
            <div className='commande__product'>
              {menus != null ? (
                    menus.map((menu) => (
                    <div
                      className='commande__menu-container'
                      >
                      <div className='commande__menu-header'>
                        <div className='commande__menu-test'>
                          <h2 className='commande__menu-quantite'>{menu.quantite}x</h2>
                          <h2 className='commande__menu-nom'>{menu.menu_type}</h2>
                         </div>
                          <h2>{splitPrix(menu.prix)}</h2>
                      </div>
                      {menu.menu_produits.entrée != null ? (
                          <div className='commande__menu'>
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.entrée}</p>
                            </div>
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.plat}</p>
                            </div>
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.boisson}</p>
                            </div>
                            {menu.menu_produits.accompagnement != null ? (
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.accompagnement}</p>
                            </div>
                            ):("")}
                          </div>
                          ) : (
                        <div className='commande__menu'>
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.plat}</p>
                            </div>
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.boisson}</p>
                            </div>
                            {menu.menu_produits.dessert != null ? (
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.dessert}</p>
                            </div>
                            ):("")}
                            {menu.menu_produits.accompagnement != null ? (
                            <div className='commande__menu-test'>
                                <p className='commande__menu-val'>{menu.quantite}x</p>
                                <p className='commande__menu-val'>{menu.menu_produits.accompagnement}</p>
                            </div>
                            ):("")}
                          </div>
                          )}
	                </div>
              ))) : ("")}
              {commande.panier.produits.map((produit) => (
                <div
                  className='test'
                  key={commande.id.toString() + produit.id.toString()}>
                  <div className='commande__product-content'>
                      <div className='commande__menu-test'>
                        <h2 className='commande__product-quantite'>
                          {produit.quantite}x
                        </h2>
                        <h2 className='commande__product-nom'>
                          {produit.produit.nom}
                        </h2>
                      </div>
                    <h2>{splitPrix(produit.produit.prix)}</h2>
                  </div>
                  {produit.accompagnement != null ? (
                    <div className='commande__produit-test'>
                        <p className='commande__menu-val'>{produit.quantite}x</p>
                        <p className='commande__menu-val'>{produit.accompagnement}</p>
                    </div>
                    ):("")}
                    <div className='space'></div>
                </div>
              ))}
            </div>

            <div className='commande__totale'>
                <div className='commande__commentaire'>
                    <p>{"commentaire : " + commande.commentaire}</p>
                </div>
              <div className='commande__totale__sous-totale'>
                <p>Sous Total HT </p>
                <p>{splitPrix(getPrixAvecHT(commande.prix_totale, 10))}</p>
              </div>

              <div className='commande__totale-details'>
                <div className='commande__totale-mode__container'>
                  <p className='commande__totale-mode'>
                    {commande.livraison}
                  </p>
                  <p className='commande__ref'>{commande.reference}</p>
                </div>

                <div className='commande__totale-ttc'>
                  <p>
                    Total <span>(TTC)</span>
                  </p>
                  <p>{commande.prix_totale}€</p>
                </div>
              </div>
            </div>

            <div className='commande__client'>
              <p className='commande__client__nom'>
                {commande.client.nom + " " + commande.client.prenom}
              </p>
              <p className='commande__client__adresse'>
                {commande.client.adresse}, {commande.client.code_postale}{" "}
                {commande.client.ville}
              </p>
              <p className='commande__client__telephone'>
                {commande.client.telephone}
              </p>
            </div>

            {btn && (
              <button
                className={[
                  "commande__valider_btn",
                  estPrisConnaissance ? "terminer" : "",
                ].join(" ")}
                variant='contained'
                color='primary'
                onClick={() => action(commande.id)}>
                {btn}
              </button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Product;
