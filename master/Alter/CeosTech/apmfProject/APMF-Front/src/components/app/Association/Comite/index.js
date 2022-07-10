import './styles.css';
import MemberCard from "../Templates/MemberCard";
import { memberList } from "../../../../data/app/members";

const Comite = () => {
    return (
        <div id="Comite-page">
            {/*<div className="Comite-copresident-partie">
                <h5> Nos co-présidentes </h5>
                <div className = "page-card__container">
                    {memberList.map((member) => {
                        if(member.roles.includes('co-president')) {
                            return (
                                <MemberCard {...member} key={member.id}/>
                            )
                        }
                        return null
                    })}
                </div>
                </div> */}
            <div className="Comite-member-partie">
                <h5> Nos membres </h5>
                <div className = "page-card__container">
                    {memberList.map((member) => {
                            return (
                                <MemberCard {...member} key={member.id}/>
                            )
                    })}
                </div>
            </div>
            <div className="Comite-text-partie">
                <div className="paragraph">
                    <h5> Charte d’adhésion et de fonctionnement du Comité Scientifique </h5>
                    <div className="context__Paragraph">
                        <p>
                        La présente charte définit le mode de fonctionnement du Comité Scientifique et la relation éthique qu’entretiennent ses membres avec les patients membres de l’association, leurs familles ou leurs proches.
                        <br></br>Cette charte définit également les relations qu’entretiennent les membres du Comité Scientifique avec les partenaires de l’association (donateurs, prestataires…).
                        </p>
                        <p>
                        Article 1 : Modalités d’entrée du Comité Scientifique de l’APMF
                        </p>
                        <p>
                        Pour être membre du Comité Scientifique de l’APMF, il convient d’exercer tout ou partie de son activité professionnelle dans le domaine de l’accès aux soins ou l’accès aux droits (médicaux et sociaux) des patients atteints de la maladie de Fabry et d’adhérer à la présente charte.
                        <br></br>L’adhésion au Comité Scientifique s’effectue après accord des Co-Présidents du Comité Scientifique et approbation du Conseil d’Administration de l’Association.
                        </p>
                        <p>
                        Article 2 : Engagements des membres du Comité Scientifique de l’APMF
                        </p>
                        <p>
                        Les membres du Comité Scientifique s’engagent à :
                        </p>
                    </div>
                    <div className="context">
                        <ul>
                            <li>
                            Respecter les principes déontologiques et législatifs en rapport avec leur activité.
                            </li>
                            <li>
                            Ne pas utiliser leur participation directe ou indirecte à l’activité de l’Association à des fins de promotion et de publicité. Cette interdiction ne s’applique pas aux opérations conduites par l’Association et destinées à la faire connaître des professionnels ou des patients concernés, dans le respect des règles déontologiques relatives à la publicité et à la concurrence entre confrères.
                            </li>
                            <li>
                            Respecter la prise en charge des patients de l’Association, initiée par leur médecins, tant du point de vue des bilans cliniques que des examens complémentaires ou du choix du traitement et du suivi.
                            </li>
                            <li>
                            Favoriser la prise en charge locale des patients dans des hôpitaux proches de leur domicile.
                            </li>
                            <li>
                            Participer à la réunion annuelle du Comité Scientifique sauf empêchement majeur.    
                            </li>
                            <li>
                            Être force de proposition dans les projets mis en place par l’Association.
                            </li>
                        </ul>
                    </div>
                    <div className="context__Paragraph">
                        <p>
                        Article 3 : Rôle et responsabilité des membres du Comité Scientifique de l’APMF
                        </p>
                        <p>
                        Le Comité Scientifique a principalement pour rôle d’assister l’Association dans le domaine scientifique, d’orienter, de coordonner et de participer à l’avancement des travaux de recherches qui correspondent aux buts de l’Association.
                        </p>
                        <p>
                        Ses membres répondent aux questions médicales que posent les patients et apportent leur caution dans les différents documents qui seront diffusés par l’Association ou lors des forums de discussion.
                        </p>
                        <p>
                        Le Conseil Scientifique décide conjointement avec l’Association des questions d’actualité à mettre à l’ordre du jour des journées annuelles (choix des thèmes scientifiques et des conférenciers).
                        </p>
                        <p>
                        Article 4 : Rémunération et/ou remboursements de frais
                        </p>
                        <p>
                        Les membres du Comité Scientifique de l’APMF ne peuvent recevoir aucune rétribution en raison des fonctions qui leurs sont confiées.
                        <br></br>Des remboursements de frais sont seuls possibles. Des justificatifs doivent être produits et feront l’objet de vérifications.
                        </p>
                        <p>
                        Article 5 : Modalités de sortie du Comité Scientifique de l’APMF 
                        </p>
                        <p>
                        Les membres s’engagent à signer et à respecter la charte.
                        <br></br>Tout manquement au respect de la charte entraine l’exclusion du Comité Scientifique.
                        </p>
                        <p>
                        Les membres du Comité Scientifique sont renouvelés tous les ans par le Conseil d’Administration de l’Association.
                        </p>
                        <p>
                        La démission d’un membre du Comité Scientifique doit être adressée au Président du Bureau de l’Association, par lettre recommandée avec A.R.
                        <br></br>Tout membre démissionnaire perd sa qualité de membre de l’Association à l’expiration de l’année civile en cours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comite;