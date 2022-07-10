import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../middlewares/request";
import ArticlesList from "./JournauxList";
// import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";

export default function GestionJournauxPublies() {
  const [journaux, setJournaux] = useState([]);

  const fetchJournaux = async () => {
    await axios
      .get(`${URL}journaux/`)
      .then((response) => {
        setJournaux(response.data);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  useEffect(() => {
    fetchJournaux();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Journaux de Fabry
      </h1>
      <ArticlesList journaux={journaux} />
    </>
  );
}
