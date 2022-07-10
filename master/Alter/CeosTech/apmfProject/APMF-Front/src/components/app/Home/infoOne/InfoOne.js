/* 
    Use Grid in MaterializeCSS for this component
    Link: https://materializecss.com/grid.html 
*/

import React from "react";
import { NavLink } from 'react-router-dom';
import "./InfoOne.css";

export default function InfoOne() {

    return (
      <section id="infoOne" className="infoOne">
        <div class="container">
          <div className="row">
            <div className="col s12 m6">
              <NavLink 
                onClick={() => {
                  window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                  });
                }}
                to={`/association/qui-sommes-nous`}
              >
              <div className="imgOne">
                  <img
                    href="#"
                    src="/images/site/association.png"
                    alt="association"
                  ></img>
                </div>
              </NavLink>
            </div>

            <div className="col s12 m6">
              <div className="imgTwo">
                <NavLink 
                  onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                  }}
                  to={`/fabry/maladie`}
                >
                  <img
                    href="#"
                    src="/images/site/La-maladie-de-Fabry.png"
                    alt="fabry"
                  ></img>
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <div className="imgThree">
                  <NavLink 
                    onClick={() => {
                      window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                      });
                    }}
                    to={`/fabry/traitements`}
                  >
                    <img
                      href="#"
                      src="/images/site/Traitements.png"
                      alt="traitement"
                    ></img>
                  </NavLink>
                </div>
              </div>

              <div className="col s12 m6">
                <div className="imgFour">
                  <NavLink 
                    onClick={() => {
                      window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                      });
                    }}
                    to={`/partenaires-hopitaux/centres`}
                  >
                    <img
                      href="#"
                      src="/images/site/centres.png"
                      alt="centre de références"
                    ></img>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

