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
      <div className="nom">Gonak</div>
      <div className="Gestioncommercial">
        <div className="QrcodeContent">
          <a href="https://sitegonak.web.app/home/carte">
            <img
              src="https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDtKqeacHV%252FGJfjczaLWz%252F0LPkjM2tDzFQAePdudDMqmICpUAoDCmRbU%252FVC3wc0KEtAQ0Hhg68vW2LcUsy0ERyZJEbVJy0p26RImWkS5GO2vkr06rvvkTNrLHICWinGrVBA%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJso3Pi9QK3G8XTiPQe2sKFJgrhP8IqKfCitD3tmpBpBDhg%253D%253D"
              alt="QR Code"
            />
          </a>
        </div>
        <div className="societe_button">
          <a
            href={
              "https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDtKqeacHV%252FGJfjczaLWz%252F0LPkjM2tDzFQAePdudDMqmICpUAoDCmRbU%252FVC3wc0KEtAQ0Hhg68vW2LcUsy0ERyZJEbVJy0p26RImWkS5GO2vkr06rvvkTNrLHICWinGrVBA%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJso3Pi9QK3G8XTiPQe2sKFJgrhP8IqKfCitD3tmpBpBDhg%253D%253D"
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
