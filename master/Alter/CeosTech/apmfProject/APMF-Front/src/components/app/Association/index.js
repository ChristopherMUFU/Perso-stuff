import './styles.css';
import PropTypes from 'prop-types';

import {
  getSubMenuBySlug,
  getSubSubMenu,
  getSubSubMenuPerId
} from "../../../utilities/app/menu";

import { useSelector } from "react-redux";
import { getSiteState } from "../../../app/Redux-slices/siteSlice";

const Association = ({ menuLink, slug }) => {
    // We have to select the content that matches the subsubmenu selected by the user
    // First we have the menu selected
    const subMenu = getSubMenuBySlug(menuLink, slug);        
    // Then the list of the subMenus that match that menu. If there is no subSubMenu, it will return false, and we can display the component of the SubMenu
    const subSubMenu = getSubSubMenu(subMenu);
    //Then the id of the specific submenu selected. We will display the component of the subSubMenu selected.
    const subSubMenuId = useSelector(getSiteState).subMenuId;

    const getSubSubMenuComponent = () => {
        // Then the exact subSuBMenu selected
        const subSubMenuSelected = getSubSubMenuPerId(subSubMenu, subSubMenuId);
        return subSubMenuSelected.component;        
    }

    return (
        <div id="association-page">
            {subSubMenu === false && (
                subMenu.component
            )}
            {subSubMenu !== false && (
                getSubSubMenuComponent()
            )}     
        </div>
    )
}

Association.propTypes = {
    slug: PropTypes.string.isRequired,
    menuLink: PropTypes.string.isRequired,
};

export default Association;