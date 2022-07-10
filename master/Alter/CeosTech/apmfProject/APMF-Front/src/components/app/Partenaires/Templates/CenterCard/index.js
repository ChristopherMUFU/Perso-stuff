import './styles.css';
import PropTypes from 'prop-types';

const CenterCard = ({...Center}) => {
    return (
        <div id="centers-card__container">
            <h2>{Center.name}</h2>
            <p class="centres_p">{Center.description}</p>
            <p><a href={Center.numberCall}>{Center.number}</a></p>
        </div>
    )
}

CenterCard.propTypes = {
    Centers: PropTypes.object.isRequired,
};

export default CenterCard;