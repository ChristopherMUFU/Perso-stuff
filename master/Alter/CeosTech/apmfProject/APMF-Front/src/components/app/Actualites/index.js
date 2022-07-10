import './styles.css';
import PropTypes from 'prop-types';

import { getSubMenuBySlug } from '../../../utilities/app/menu';


const Actualites = ({ menuLink, slug }) => {
    const subMenu = getSubMenuBySlug(menuLink, slug);
    
    return (
        <div id="actualites-page">
            <div>{subMenu.component}</div>
        </div>
    )
}

Actualites.propTypes = {
    slug: PropTypes.string.isRequired,
    menuLink: PropTypes.string.isRequired,
};

export default Actualites;