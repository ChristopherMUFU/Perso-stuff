import './styles.css';
import Img_groupama from "../../../../images/site/Partenaires/groupama.png"
import Img_genzyme from "../../../../images/site/Partenaires/genzyme.png"
import Img_shire from "../../../../images/site/Partenaires/shire.png"



const PartenairesAPMF = () => {
    return (

        <div id="partenairesAPMF-page">
            
            <div className="row">
                <div className="col-md-12 text-center text_partenaires">
                    
                    <h1>Ils nous font confiance et nous soutiennent.</h1>
                    <h4 className="APMFPartenaires__subtitle"><strong>Merci à eux</strong></h4>
                    
                </div>
            </div>
            <div className="partenairesAPMF_contenaire">
                
                            <div className="Img_shire partenairesAPMF_subcontainer">
                                <img src={Img_shire} alt="shire" className="Img_shire partenairesAPMF-images"></img>
                                <p>Shire est une entreprise qui est spécialisée dans le secteur du commerce de produit pharmaceutique pour des entreprises</p>
                            </div>
                        

                        
                            <div className="Img_genzyme partenairesAPMF_subcontainer">
                                <img src={Img_genzyme} alt="genzyme" className="Img_genzyme partenairesAPMF-images"></img>
                                <p>Genzyme est une entreprise de biotechnologie spécialisée dans le secteur des maladies rares ou orphelines</p>
                            </div>
                        

                        
                            <div className="Img_groupama partenairesAPMF_subcontainer "><a target="_blank" href="https://www.groupama.fr/">
                                <img src={Img_groupama} alt="groupama"  className="Img_groupama partenairesAPMF-images"></img></a>
                                <p>Groupama est une société d'assurance mutuelle française</p>
                            </div>
                
            </div>
        </div>
    )
}

export default PartenairesAPMF;