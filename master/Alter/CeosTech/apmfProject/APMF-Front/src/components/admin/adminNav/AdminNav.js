import Logo from "../../../images/logo_petit_m.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";
import { useState /*,useEffect */ } from "react";
import "./menu.css";
import { IconButton } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
// import axios from "axios";
// import { URL } from "../../../middlewares/request";

const nbNonVu = (data) => {
  return data.reduce((nonVu, element) => {
    nonVu += !element.vu ? 1 : 0;
    return nonVu;
  }, 0);
};
export default function AdminNav() {
  const admin = useSelector(selectAdmin);

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [active, setActive] = useState(false);
  // const [items, setItems] = useState([]);

  const deconnexion = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir vous déconnecter ?"
      )
    ) {
      localStorage.removeItem("jwtToken");
      history.push("/"); // à voir si il y a mieux
    } else {
      // Code à éxécuter si l'utilisateur clique sur "Annuler"
    }
  };

  return (
    <div className={"adminNav " + (active ? "active" : "")}>
      <div className="adminNav__header">
        <img src={Logo} alt="logo-markus" />
      </div>

      <h3 className="adminNav__title">APMF</h3>

      <div className="adminNav__links">
        {admin.pages.map((page) => (
          <button
            key={page.name}
            className={
              "adminNav__link " +
              (admin.currentPage === page.name ? "active" : "")
            }
            onClick={() => {
              dispatch(changePage(page.name));
              history.push(path + page.path);
              setActive(false);
            }}
          >
            <i className={"fas adminNav__link__icone " + page.icone}></i>{" "}
            <p>{page.libelle}</p>
            {page.name === "don" && nbNonVu(admin.dons) > 0 && (
              <div className="adminNav__nouvelles_commandes__indicator">
                {nbNonVu(admin.dons)}
              </div>
            )}
            {page.name === "fichier_contact" && nbNonVu(admin.contacts) > 0 && (
              <div className="adminNav__nouvelles_commandes__indicator">
                {nbNonVu(admin.contacts)}
              </div>
            )}
            {page.name === "adhesion" && nbNonVu(admin.adhesions) > 0 && (
              <div className="adminNav__nouvelles_commandes__indicator">
                {nbNonVu(admin.adhesions)}
              </div>
            )}
          </button>
        ))}
        <button
          type="submit"
          onClick={() => deconnexion()}
          className="adminNav__link-deconnexion"
        >
          <i className={"fas adminNav__link__icone fa-sign-out-alt"}></i>{" "}
          <p>Déconnexion</p>
        </button>
      </div>

      <div className="adminNav__humburger">
        <IconButton onClick={() => setActive(!active)}>
          <i className="fas fa-bars"></i>
        </IconButton>
      </div>
    </div>
  );
}
