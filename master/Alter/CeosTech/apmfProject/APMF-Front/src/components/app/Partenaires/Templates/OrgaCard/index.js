import './styles.css';
import PropTypes from 'prop-types';

const OrgaCard = ({...Orga}) => {
    return (
        <div id="orgas-card__container">
            
            <div class="head">
                <img src={Orga.img} />
                <h5>{Orga.name}</h5>
            </div>

            <p>{Orga.description}</p>
        </div>
    )
}

OrgaCard.propTypes = {
    Orgas: PropTypes.object.isRequired,
};

export default OrgaCard;