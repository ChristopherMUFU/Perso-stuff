import './styles.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { setSubMenuId, getSiteState } from "../../../app/Redux-slices/siteSlice";

const SubMenu = ({ menu }) => {
    // By default, the id of the active menu is set to 1 (first item of the menu)
    const siteState = useSelector(getSiteState);
    const subMenuId = siteState.subMenuId;
    const dispatch = useDispatch(); 

    return (
        <div className="submenu__container">
            <ul id="submenu-list">
                {menu.menu.map((menuItem) => 
                    <li                         
                        // When the item selected changes (onClick action), so does the className of the menu items, so as to display properly the active entry of the menu 
                        className={menuItem.id === subMenuId ? "subMenu-active" : ""} 
                        key={menuItem.id}
                        onClick={() => {
                            dispatch(setSubMenuId(menuItem.id));
                        }}
                    >
                        {menuItem.name}
                    </li>
                )}
            </ul>
        </div>
    )
}

SubMenu.propTypes = {
    menu: PropTypes.object.isRequired,
};

export default SubMenu;