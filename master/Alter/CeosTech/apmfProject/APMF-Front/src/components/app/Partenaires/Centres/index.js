import './styles.css';
import CenterCard from "../Templates/CenterCard";
import { centersParis, centersRegion, centersCompetence } from "../../../../data/app/centers";
import OrgaCard from "../Templates/OrgaCard";
import { orgasList } from "../../../../data/app/orgas";


const Centres = () => {
    return (
        <div id="centres-page">
            <h2>Les centres de référence (mise à jour le 02/11/2015)</h2>

            <h3 class="city">Paris :</h3>

            <div className = "page-card__container">
                {centersParis.map((center) => 
                    <CenterCard {...center} key={center.id}/>
                )}
            </div>
            <h3 class="city">Régions :</h3>

            <div className = "page-card__container">
                {centersRegion.map((center) => 
                    <CenterCard {...center} key={center.id}/>
                )}
            </div>
            <h3 class="city">Centres de compétence :</h3>

            <div className = "page-card__container">
                {centersCompetence.map((center) => 
                    <CenterCard {...center} key={center.id}/>
                )}
            </div>

            <p className="page-card-PS">* Cette liste n'est pas exhaustive. N'hésitez pas à nous contacter si vous souhaitez la compléter.</p>
            <div class="orga">
            <h4 class="orga_title">Organismes affiliés</h4>

            <div className = "page-card__container">
                {orgasList.map((orga) => 
                    <OrgaCard {...orga} key={orga.id}/>
                )}
            </div>


            </div>
        </div>
    )
}

export default Centres;