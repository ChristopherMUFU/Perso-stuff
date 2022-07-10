import './styles.css';

import MemberCard from "../Templates/MemberCard";
import MissionCard from "../Templates/MissionCard";
import { memberList } from "../../../../data/app/members";
import { missionsList } from "../../../../data/app/missions";

const Nous = () => {
    return (
        <div id="nous-page">
            <h1>Les membres du bureau</h1>
            <div className = "page-card__container">
                {memberList.map((member) => {
                        return (
                            <MemberCard {...member} key={member.id}/>
                        )
                })}
            </div>

            <h1>Les 8 missions de l'APMF</h1>
            <div className = "page-card__container">
                {missionsList.map((mission) => 
                    <MissionCard {...mission} key={mission.id}/>
                )}
            </div> Nos statuts :
            <p className="footer_link"> télécharger les statuts de l'APMF (pdf)</p>
        </div>
    )
}

export default Nous;