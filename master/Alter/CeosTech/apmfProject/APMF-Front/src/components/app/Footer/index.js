import React, { Component } from 'react';
import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
import './styles.css';
import { NavLink } from 'react-router-dom';



import { useDispatch } from "react-redux";
import { setSubMenuId } from "../../../app/Redux-slices/siteSlice";

const Footer = () => {
    const dispatch = useDispatch();
    return (
        <section id="footer">
            <div className="row footer black-text">
                <div className="col s12 m3">
                    <h5> <b>Contact </b></h5>
                    <p>
                        <b>Association de Patient de la Maladie de Fabry</b>
                        <br></br><br></br>
                        21, rue Monge - 21160 MARSANNAY LA COTE<br></br>
                        (Siège Social & Siège Administratif)
                        <br></br><br></br>Mail : <a class="footer_link" href="mailto:presidence@apmf-fabry.org">
                          presidence@apmf-fabry.org
                        </a>
                        <br></br><br></br>Téléphone : <a class="footer_link" href="tel:06-32-26-25-69">
                          06 32 26 25 69
                        </a>
                        <br></br><br></br>
                    </p>
                </div>
                <div className="col s12 m5">
                    <h5> <b>Aider l'association </b></h5><br></br>
                    <p>
                        <NavLink
                            className="footer_links"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                                dispatch(setSubMenuId(1));
                            }}
                            to='/association/dons'
                        >
                            <div className="asso__cardFooter">
                                <p className="footer_link">Faire un don à l'association</p>
                            </div>                            
                        </NavLink>
                        <NavLink
                            className="footer_links"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                                dispatch(setSubMenuId(2));
                            }}
                            to='/association/dons'
                        >
                            <div className="asso__cardFooter">
                                <p className="footer_link">Adhérer à l'association</p>
                            </div>
                        </NavLink>
                        <br></br><br></br>
                    </p>
                </div>
                <div className="col s12 m2">
                        <h5><b>Informations</b> </h5><br></br>
                        <p>
                            Mentions légales <br></br> <br></br>

                            CGU
                        </p>
                </div>
                <div className="col s12 m2">
                    <h5><b> Nous suivre </b></h5>
                    <p>
                        <div class="icons_footer">
                            <a href="https://www.facebook.com/APMFABRY/">
                                {/* Facebook */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21pt" height="21pt"><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4" /><stop offset="1" stop-color="#007ad9" /></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" /></svg>
                                <p>Facebook</p>
                            </a>

                            <a href="https://twitter.com/apmffabry?lang=fr">
                                {/* Twitter */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="21pt" height="21pt"><path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" /><path fill="#fff" d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12" /></svg>
                                <p>Twitter</p>

                            </a>

                            <a href="https://www.youtube.com/channel/UCHY3gsybqT5SXJ24qJ2Sp_w">
                                {/* Youtube */}
                                <svg height="21pt" viewBox="0 -77 512.00213 512" width="21pt" xmlns="http://www.w3.org/2000/svg"><path d="m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0" fill="#f00" /><path d="m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0" fill="#fff" /></svg>
                                <p>Youtube</p>
                            </a>
                        </div>
                    </p>
                </div>
            </div>
            <div class="footer_down">
                            <p class="footer_down_text">Made by <a class="footer_link" href="http://www.ceostech.fr/">Ceos Tech</a> | Copyright 2021 © | Tout droits réservés</p>
                            <br></br><br></br>
            </div>
                
        </section>
    )
}

export default Footer;
