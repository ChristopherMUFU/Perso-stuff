import './styles.css';
import PropTypes from 'prop-types';

const HeaderPage = ({ menu, setDomLoaded }) => {
    return (
        <div className="header-page__container">
            <img 
                src={menu.img} 
                alt="médical"  
                className="header-page__image"
                onLoad={() => setDomLoaded(true)}
            />
            <div className="header-page__description">
                <h1>{menu.name}</h1>
                {menu.subtitle =!null && (
                    menu.subtitle
                )}
                <p>{menu.description}</p>
            </div>
        </div>
    )
}

HeaderPage.propTypes = {
    menu: PropTypes.object.isRequired,
};

export default HeaderPage;