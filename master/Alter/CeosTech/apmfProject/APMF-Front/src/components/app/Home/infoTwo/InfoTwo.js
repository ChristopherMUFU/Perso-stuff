/* 
    Use Grid in MaterializeCSS for this component
    Link: https://materializecss.com/grid.html 
*/

import React, { Component } from 'react';
import "./infoTwo.css";
import { NavLink } from 'react-router-dom';

import {contentInfoTwos} from '../../../../data/app/contentInfoTwo'; //import file json

import { useDispatch } from "react-redux";
import { setSubMenuId } from "../../../../app/Redux-slices/siteSlice";

const InfoTwo = () => {
    const dispatch = useDispatch();
        return (
            <section className="infoTwo" id="infoTwo">
                <div className="infoTwo__container">
                    {/* Use map to get through all the database contentInfoTwo file */}
                    { contentInfoTwos.map((contentInfo) => (
                        <div style={{height: '100%'}} alignItems="stretch" key={contentInfo.id}>
                            <div height={1} className="asso__card-panel white-text">    
                                <div className="imgIcone">
                                    <img src={contentInfo.link} alt="Heart"></img>
                                </div>
                                <div className="asso__card-body">
                                <h5 className="asso__card-title">{contentInfo.title}</h5>
                                    <p>{contentInfo.text}</p>
                                </div>
                                <NavLink 
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                        {contentInfo.id == 2 ? (
                                            dispatch(setSubMenuId(2))
                                          ) : (
                                            dispatch(setSubMenuId(1))                                       
                                        )}
                                    }}
                                    to={`/${contentInfo.navLink}`}
                                >
                                    <div className="asso__cardFooter">
                                        <button className="btnPlus">En savoir plus</button>
                                    </div>
                                </NavLink>
                            </div>
                            
                        </div>
                    )) }
                        
                    </div>
            </section>
        )
    }

    export default InfoTwo;