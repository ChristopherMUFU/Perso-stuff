import React, { Fragment } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

import {
  getSubMenuBySlug,
  getSubSubMenu,
  getSubSubMenuContent,
} from "../../../utilities/app/menu";

import { useSelector } from "react-redux";
import { getSiteState } from "../../../app/Redux-slices/siteSlice";

import Informations from "./Informations";

const Fabry = ({ menuLink, slug }) => {
  // We have to select the content that matches the subsubmenu selected by the user
  // First we have the menu selected
  const subMenu = getSubMenuBySlug(menuLink, slug);
  // Then the list of the subMenus that match that menu
  const subSubMenu = getSubSubMenu(subMenu);
  //Then the id of the specific submenu selected
  const subSubMenuId = useSelector(getSiteState).subMenuId;

  const content = () => {
    if (slug !== "informations") {
      // Thanks to this id, we can find the specific subMenu selected, and thus the content associated
      const contentToDisplay = getSubSubMenuContent(subSubMenu, subSubMenuId);
      return <Fragment>{parse(contentToDisplay)}</Fragment>;
    } else 
      return <Informations />;
  };

  return <div id="fabry-page">{content()}</div>;
};

Fabry.propTypes = {
  slug: PropTypes.string.isRequired,
  menuLink: PropTypes.string.isRequired,
};

export default Fabry;
