import { useHistory } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import "./qrcode.css";
function Menucode() {
  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/Gestion_commerciale";
    history.push(url);
  };

  return (
    <div className="Container">
      <div className="Qrcode-header">
        <h1>Menu QR Code</h1>
      </div>
      <div className="nom">Menu Délice DF5</div>
      <div className="Gestioncommercial">
        <div className="QrcodeContent">
          <a href="https://df5site.web.app/commander">
            <img
              src="https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDk%252B7dep%252Bt5pu%252Br9GxjmUemtOGb3dWgiRMGsFRXRo8a78jXKhO2pjJCit7G9Lls8PdulAdHnkiIEJ8OicvUuXs0nHVuY84krv97DOqySQ2E6LnSnPDx5CNxefajxi1LoUug%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJspLOFwK1GrRDIycsqAWvuhAYSkJjy8Hwo5zLOgz84s1Qw%253D%253D"
              alt="QR Code"
            />
          </a>
        </div>
        <div className="societe_button">
          <a
            href={
              "https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDk%252B7dep%252Bt5pu%252Br9GxjmUemtOGb3dWgiRMGsFRXRo8a78jXKhO2pjJCit7G9Lls8PdulAdHnkiIEJ8OicvUuXs0nHVuY84krv97DOqySQ2E6LnSnPDx5CNxefajxi1LoUug%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJspLOFwK1GrRDIycsqAWvuhAYSkJjy8Hwo5zLOgz84s1Qw%253D%253D"
            }
            target="_blank"
            download
          >
            <button className="reg_button" type="submit">
              Télecharger
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Menucode;
