import React, { useEffect,useState } from "react";
import "./adminPage.css";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  selectAdmin,
  changeDon,
  changeContact,
  changeAdhesion,
  changePage } from "../../app/Redux-slices/adminSlice";
import AdminNav from "./adminNav/AdminNav";
import EditerArticle from "./editerArticle/EditerArticle";
import GestionArticlesPublies from "./gestionArticlesPublies/GestionArticlesPublies";
import JournalFabry from "./journalFabry/JournalFabry";
import Adhesion from "./adhesion/Adhesion";
import Don from "./don/Don";
import Activite from "./activite/Activite";
import FichierContact from "./fichierContact/FichierContact";
import GestionJournauxFabry from "./gestionJournauxFabry/GestionJournauxFabry";
import axios from "axios";
import { URL } from "../../middlewares/request";

const fetchData = async (url,setData) => {
  await axios
    .get(url)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

export default function AdminPage() {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const [contacts, setContacts] = useState([]);
  const [dons,setDons]=useState([]);
  const [adhesions, setAdhesions] = useState([])
  const { path, url } = useRouteMatch();

  useEffect(() => {
    // a chaque fois que commande change, on met a jour la longueur de nouvelle commande
    contacts && dispatch(changeContact(contacts));
    dons && dispatch(changeDon(dons));
    adhesions && dispatch(changeAdhesion(adhesions));
  
  }, [adhesions,contacts,dons, dispatch]);

  useEffect(() => {
    let timeoutId;
    function getLatestData() {
      fetchData(`${URL}contacts/`,setContacts);
      fetchData(`${URL}dons/`,setDons);
      fetchData(`${URL}adhesions/`,setAdhesions);
      // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
      timeoutId = setTimeout(getLatestData, 1000 * 60);
    }
    getLatestData();

    return () => {
      clearTimeout(timeoutId);
      setContacts([]);
      setDons([]);
      setAdhesions([]);
    };
  }, []);





  useEffect(() => {
    dispatch(changePage(admin.currentPage));
    history.push(path + "/editer-article");
  }, []);

  return (
    <div className="adminPage">
      <div className="adminPage__container">
        <AdminNav />
        <div
          style={{
            flex: 1,
            padding: "1rem",
            width: "100%",
          }}
        >
          <Switch>
            <Route exact path={path + "/editer-article"}>
              <EditerArticle />
            </Route>
            <Route exact path={path + "/gestion-articles-publies"}>
              <GestionArticlesPublies />
            </Route>
            <Route exact path={path + "/journal-fabry"}>
              <JournalFabry />
            </Route>
            <Route exact path={path + "/gestion-journal-fabry"}>
              <GestionJournauxFabry />
            </Route>
            <Route exact path={path + "/adhesion"}>
              <Adhesion />
            </Route>
            <Route exact path={path + "/don"}>
              <Don />
            </Route>
            <Route exact path={path + "/activite"}>
              <Activite />
            </Route>
            <Route exact path={path + "/fichier-contact"}>
              <FichierContact />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
