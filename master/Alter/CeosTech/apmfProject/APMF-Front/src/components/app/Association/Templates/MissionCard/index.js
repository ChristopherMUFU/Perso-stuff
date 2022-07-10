import './styles.css';
import PropTypes from 'prop-types';

const MissionCard = ({...Mission}) => {
    return (
        <div id="missions-card__container">
            <h2>{Mission.name}</h2>
            <p>{Mission.description}</p>
        </div>
    )
}

MissionCard.propTypes = {
    Missions: PropTypes.object.isRequired,
};

export default MissionCard;