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
          <a href="https://dima-delice.web.app/commander">
          <img 
            src='https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDnvIZCJeWKeA5x35eUEDCXdNn5uLU195n5CwjqbgfysclYqceRRS1%252BJLDQaUcijITZOoyfvGMDzTzabSYgJ8KnbAfWP5fZheR56z08kAVmmqPahMw2Bvu6gXL92ZrZdsJA%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJsq5sKV%252FFGOvVMEgJZ2sY297F0DnJf4vxDV1d%252BJXY7hr2g%253D%253D'
            alt='QR Code'
            />
          </a>
        </div>
        <div className="societe_button">
          <a
            href={
            'https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDnvIZCJeWKeA5x35eUEDCXdNn5uLU195n5CwjqbgfysclYqceRRS1%252BJLDQaUcijITZOoyfvGMDzTzabSYgJ8KnbAfWP5fZheR56z08kAVmmqPahMw2Bvu6gXL92ZrZdsJA%253D%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJsq5sKV%252FFGOvVMEgJZ2sY297F0DnJf4vxDV1d%252BJXY7hr2g%253D%253D'
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
