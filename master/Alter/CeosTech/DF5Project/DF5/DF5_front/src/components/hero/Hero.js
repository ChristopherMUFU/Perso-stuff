import React from "react";
import "./hero.css";

import kebab from "../../images/kebab.png";
import desserts from "../../images/nosdesserts_df5.png";
import pizza from "../../images/nospizzas_df5.png";
import tacos from "../../images/nostacos_df5.png";

import Carousel from "react-bootstrap/Carousel";

import { Link } from "react-router-dom";

const datas = [
  {
    en_tete: "Le goût de l'Italie dans votre assiette",
    texte: (
      <p className="hero__text">
        Découvrez nos recettes de <span>pizzas cuites au feu de bois</span>, un
        choix varié qui comblera tous les <span>tiffosis </span>de la cuisine
        italienne 😊
      </p>
    ),
    images: [
      {
        nom: pizza,
        alt: "logo olokoso",
      },
    ],
    alt: "Olokosso logo",
    lien: { route: "/commander", nom: "Commander" },
  },
  {
    en_tete: "Compose ton french Tacos selon ton goût",
    texte: (
      <p className="hero__text">
        Une viande, deux ou trois viandes, <span>à toi de choisir </span>parmis
        une liste variée d'ingrédients et de viandes de qualités !
      </p>
    ),
    images: [
      {
        nom: tacos,
        alt: "plat",
      },
    ],
    alt: "photo du plat mafe",
    lien: { route: "/commander", nom: "Commander" },
  },
  {
    en_tete: "Notre carte de dessert à dévorer !",
    texte: (
      <p className="hero__text">
        Après un bon repas, rien de tel qu'un bon dessert gourmand,
        <span> Smoothie, Milkshakes, Tiramisu, Paris-Brest</span>, à toi de
        chosir 😊
      </p>
    ),
    images: [
      {
        nom: desserts,
        alt: "plat",
      },
    ],
    alt: "photo du plat yassa",
    lien: { route: "/commander", nom: "Commander" },
  },
];

const hero = () => {
  return (
    <>
      <div className="hero" id="hero">
        <div className="hero__container">
          <Carousel pause={false}>
            {datas.map((data) => (
              <Carousel.Item interval={8000} className="px-5" key={data.alt}>
                <div className="hero_title">Nos spécialités</div>
                <div className="carousel__item">
                  <div className="hero__hero">
                    <div className="hero__hero-hadings">
                      <p className="hero__entete">{data.en_tete}</p>
                      <p className="hero__text"> {data.texte} </p>
                      <Link to={data.lien.route} className="telecharger-btn">
                        {data.lien.nom}
                      </Link>
                    </div>

                    <div className="hero__hero-image">
                      {data.images.map((image) => (
                        <img
                          key={image.nom}
                          className={`hero__image ${image.alt}`}
                          src={image.nom}
                          alt={image.alt}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default hero;
