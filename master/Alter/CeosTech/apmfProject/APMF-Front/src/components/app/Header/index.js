/* 
    Use Navbar in MaterializeCSS for this component
    Link: https://materializecss.com/navbar.html
*/

import React, { Component } from "react";
import "materialize-css/dist/css/materialize.css"; //import materialize
import ImgLogo from "../../../images/site/logo.png";
import "./styles.css";

import { NavLink } from "react-router-dom";
// HashLink allows to scroll to a specific div when clicking on a link
import { HashLink } from "react-router-hash-link";

import MenuItem from "./MenuItem";
import { menuInfos } from "../../../data/app/subMenus";
import { getSubSubMenu } from "../../../utilities/app/menu";

// Redux to handle menu => landing to the right page
import { useDispatch } from "react-redux";
import { setSubMenuId } from "../../../app/Redux-slices/siteSlice";

// hook window dimensions
import useDimensions from "../../../hooks/useDimensions";

// Material UI menu Lists and collapsable lists

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// React bootstrap burger menu
import { MDBNavbar, MDBNavbarBrand, MDBCollapse, MDBContainer } from "mdbreact";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: "4px",
  },
  root__List: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested__List: {
    paddingLeft: theme.spacing(4),
  },
  sectionDesktop: {
    display: "flex",
  },
  sectionMobile: {
    display: "flex",
    width: "100% !important",
    padding: 0,
    margin: 0,
    maxWidth: "1500px !important",
  },
  collapsableContainer: {
    height: "calc(100vh - 100px)",
    overflowY: "auto",
  },
  listItemContainer: {
    justifyContent: "center",
  },
  listItem: {
    display: "flex",
    justifyContent: "left",
    borderBottom: "1px solid gray",
    padding: "0 2em !important",
    width: "80%",
    marginLeft: "10%",
  },
  subListItem: {
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "23px",
    backgroundColor: "var(--primary-color)",
    color: "white",
    padding: "1em 2em !important",
  },
  subSubListItem: {
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "21px",
    backgroundColor: "var(--secondary-color-variation)",
    color: "white",
    padding: "1em 2em !important",
  },
  hamburgerLine: {
    width: "35px",
    height: "5px",
    backgroundColor: "var(--secondary-color)",
    margin: "6px 0",
  },
}));

const SmoothScroll = () => {
  // hook window dimension => decide whether we display mobile or desktop navbar
  const { width, height } = useDimensions();

  const dispatch = useDispatch();
  const classes = useStyles();
  // SubMenuOpening
  // Stores id of the menu open
  const [open, setOpen] = React.useState(null);

  const handleClick = (id) => {
    // If we click on a menu already open, then it will close it
    if (id === open) setOpen(null);
    // else it will open it
    else setOpen(id);
  };

  // Burger menu
  const [collapse, setCollapse] = React.useState(false);

  const toggleSingleCollapse = () => {
    setCollapse(!collapse);
  };

  // Active nav bar link
  // - Will store the subMenuSelected and the subSubMenuSelected
  // - That why the item that matches both the subMenu and the subSubMenu will appear as active
  const [subMenuSelected, setSubMenuSelected] = React.useState(null);
  const [subSubMenuSelected, setSubSubMenuSelected] = React.useState(null);

  const handleMenuSelection = (subMenuId, subSubMenuId) => {
    setSubMenuSelected(subMenuId);
    setSubSubMenuSelected(subSubMenuId);
  };

  return (
    <section id="home">
      <AppBar position="fixed" style={{ backgroundColor: "white" }}>
        <div className="header__bar">
          <div className={classes.root}>
            {/*Desktop */}
            {width > 1430 && (
              <div className={classes.sectionDesktop}>
                <Grid
                  container
                  style={{
                    padding: "1em",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item lg={2} style={{ textAlign: "left" }}>
                    <NavLink
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to={`/home/`}
                    >
                      <img src={ImgLogo} className="logo__APMF" alt="logo" />
                    </NavLink>
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <NavLink
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to={`/home/`}
                      style={{
                        padding: "4px 5px",
                        margin: "5px",
                        fontSize: "18px",
                      }}
                    >
                      <Button
                        href="/home/"
                        size="small"
                        className={classes.margin}
                      >
                        <div className="text__header">Accueil</div>
                      </Button>
                    </NavLink>

                    {menuInfos.map((menu) => (
                      <Button
                        key={menu.id}
                        size="small"
                        className={open ? classes.marginActive : classes.margin}
                      >
                        <MenuItem menu={menu} />
                      </Button>
                    ))}

                    <HashLink
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to={`/home#contactForm`}
                      style={{
                        padding: "4px 5px",
                        margin: "5px",
                        fontSize: "18px",
                      }}
                    >
                      <Button
                        href="/home/"
                        size="small"
                        className={classes.margin}
                      >
                        <div className="text__header">Contact</div>
                      </Button>
                    </HashLink>
                  </Grid>
                  <Grid item lg={2} style={{ textAlign: "right" }}>
                    <NavLink
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      to="/association/dons"
                    >
                      <div className="btnSou">NOUS SOUTENIR</div>
                    </NavLink>
                  </Grid>
                </Grid>
              </div>
            )}

            {/* Mobile */}
            {width <= 1430 && (
              <MDBContainer className={classes.sectionMobile}>
                <MDBNavbar style={{ padding: "0em", backgroundColor: "white" }}>
                  <MDBContainer
                    style={{
                      padding: "0em",
                      margin: "0",
                      maxWidth: "1500px",
                      width: "100%",
                    }}
                  >
                    <MDBNavbarBrand style={{ marginLeft: "2em" }}>
                      <a href="#" className="logo__APMF">
                        <img src={ImgLogo} alt="logo" />
                      </a>
                    </MDBNavbarBrand>

                    <div
                      id="hamburger-icon"
                      style={{ marginRight: "2em", cursor: "pointer" }}
                      onClick={toggleSingleCollapse}
                    >
                      <div className={classes.hamburgerLine}></div>
                      <div className={classes.hamburgerLine}></div>
                      <div className={classes.hamburgerLine}></div>
                    </div>

                    <MDBCollapse
                      isOpen={collapse}
                      navbar
                      className={classes.collapsableContainer}
                    >
                      <div>
                        <Grid item xs={12} sm={12} md={12}>
                          {/* Accueil */}
                          <List navbarScroll>
                            <ListItem button className={classes.listItem}>
                              <NavLink
                                onClick={() => {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                  toggleSingleCollapse();
                                }}
                                to={`/home/`}
                                className={`${classes.margin} list-items-non-collapsable`}
                                style={{ padding: 0 }}
                              >
                                <div className="text__header_mobile">Accueil</div>
                              </NavLink>
                            </ListItem>

                            {/* Menu */}
                            {menuInfos.map((menu) => (
                              <div className={classes.listItemContainer}>
                                <ListItem
                                  button
                                  key={menu.id}
                                  onClick={() => {
                                    handleClick(menu.id);
                                  }}
                                  className={`listItem-mobile-navbar ${classes.listItem}`}
                                >
                                  <div className="text__header_mobile">
                                    <p>{menu.name}</p>
                                  </div>

                                  {open === menu.id ? (
                                    <ExpandLess
                                      style={{ position: "absolute", height: "30px", width: "30px", left: "90%"}}
                                    />
                                  ) : (
                                    <ExpandMore
                                      style={{ position: "absolute", height: "30px", width: "30px", left: "90%"}}
                                    />
                                  )}
                                </ListItem>

                                <Collapse
                                  in={open === menu.id}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    {menu.menu.map((subMenu) => (
                                      <div>
                                        <ListItem
                                          key={subMenu.id}
                                          className={classes.subListItem}
                                        >
                                          <NavLink
                                            onClick={() => {
                                              window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                              });
                                              toggleSingleCollapse();
                                            }}
                                            className="nav-mobile"
                                            to={`/${menu.link}/${subMenu.link}`}
                                          >
                                            {subMenu.name}
                                          </NavLink>
                                        </ListItem>

                                        <List>
                                          {getSubSubMenu(subMenu) !== false &&
                                            getSubSubMenu(subMenu).menu.map(
                                              (subSubMenu) => (
                                                <ListItem
                                                  key={subSubMenu.name}
                                                  className={
                                                    classes.subSubListItem
                                                  }
                                                  onClick={() => {
                                                    handleMenuSelection(
                                                      subMenu.id,
                                                      subSubMenu.id
                                                    );
                                                  }}
                                                >
                                                  <NavLink
                                                    onClick={() => {
                                                      window.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth",
                                                      });
                                                      toggleSingleCollapse();
                                                      dispatch(
                                                        setSubMenuId(
                                                          subSubMenu.id
                                                        )
                                                      );
                                                    }}
                                                    to={`/${menu.link}/${subMenu.link}`}
                                                    className={
                                                      subMenuSelected ===
                                                        subMenu.id &&
                                                      subSubMenuSelected ===
                                                        subSubMenu.id
                                                        ? "nav-mobile-active nav-mobile"
                                                        : "nav-mobile"
                                                    }
                                                  >
                                                    {subSubMenu.name}
                                                  </NavLink>
                                                </ListItem>
                                              )
                                            )}
                                        </List>
                                      </div>
                                    ))}
                                  </List>
                                </Collapse>
                              </div>
                            ))}

                            {/* Contact */}
                            <ListItem button className={classes.listItem}>
                              <NavLink
                                to="/home#contactForm"
                                style={{ padding: 0 }}
                                className="list-items-non-collapsable"
                                onClick={() => {
                                  toggleSingleCollapse();
                                }}
                              >
                                <div className="text__header_mobile">Contact</div>
                              </NavLink>
                            </ListItem>

                            {/* Nous soutenir */}
                            {/* As this is a different way of using the menu (we had two subMenus that were not here in the subMenu.js data object), we have to do it separately, and  use redux to set the subSubMenu on adhesion and not don when we click on it => to redirect to the correct page*/}
                            <ListItem
                              button
                              onClick={() => {
                                handleClick("soutenir");
                              }}
                              className={`listItem-mobile-navbar ${classes.listItem}`}
                            >
                              <div
                                className="text__header_mobile"
                                style={{ color: "var(--secondary-color)" }}
                              >
                                <p>Nous Soutenir</p>
                              </div>

                              {open === "soutenir" ? (
                                <ExpandLess
                                  style={{ position: "absolute", height: "30px", width: "30px", left: "90%" }}
                                />
                              ) : (
                                <ExpandMore
                                  style={{ position: "absolute", height: "30px", width: "30px", left: "90%" }}
                                />
                              )}
                            </ListItem>

                            <Collapse
                              in={open === "soutenir"}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                <div>
                                  <ListItem className={classes.subListItem}>
                                    <NavLink
                                      onClick={() => {
                                        window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                        });
                                        toggleSingleCollapse();
                                        dispatch(setSubMenuId(1));
                                      }}
                                      className="nav-mobile"
                                      to="/association/dons"
                                    >
                                      Faire un don
                                    </NavLink>
                                  </ListItem>

                                  <ListItem className={classes.subListItem}>
                                    <NavLink
                                      onClick={() => {
                                        window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                        });
                                        toggleSingleCollapse();
                                        dispatch(setSubMenuId(2));
                                      }}
                                      className="nav-mobile"
                                      to="/association/dons"
                                    >
                                      Adhérer
                                    </NavLink>
                                  </ListItem>
                                </div>
                              </List>
                            </Collapse>
                          </List>
                        </Grid>
                      </div>
                    </MDBCollapse>
                  </MDBContainer>
                </MDBNavbar>
              </MDBContainer>
            )}
          </div>
        </div>
      </AppBar>
    </section>
  );
};

export default class Header extends Component {
  render() {
    return (
      <div>
        <SmoothScroll />
      </div>
    );
  }
}
