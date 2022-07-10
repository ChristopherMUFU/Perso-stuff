import './styles.css';
import PropTypes from 'prop-types';

import { getSubMenuBySlug } from '../../../utilities/app/menu';

const Partenaires = ({ menuLink, slug }) => {
    const subMenu = getSubMenuBySlug(menuLink, slug);
    
    return (
        <div id="partenaires-page">
            <div>{subMenu.component}</div>
        </div>
    )
}

Partenaires.propTypes = {
    slug: PropTypes.string.isRequired,
    menuLink: PropTypes.string.isRequired,
};

export default Partenaires;