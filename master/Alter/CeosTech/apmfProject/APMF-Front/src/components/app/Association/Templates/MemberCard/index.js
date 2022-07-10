import './styles.css';
import PropTypes from 'prop-types';

const MemberCard = ({...member}) => {
    return (
        <div id="members-card__container">
            <img src={member.img} alt="membre bureau"></img>
            <div className="member-information__container">
                <h2>{member.name}</h2>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
            </div>
        </div>
    )
}

MemberCard.propTypes = {
    members: PropTypes.object.isRequired,
};

export default MemberCard;