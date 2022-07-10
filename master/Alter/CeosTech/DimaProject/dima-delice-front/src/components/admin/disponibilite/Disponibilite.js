import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBox from "../../table/Table";
import {URL} from "../../../middlewares/request";

const proprietes = ["Nom", "Disponibilité"];

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: "6rem",
    marginBottom: "2rem",
    color: "rgb(86 85 85)",
  },
});

const Disponibilite = () => {
  const styles = useStyles();
  const [boissons, setBoissons] = useState([]);
  const [desserts, setDesserts] = useState([]);

  const get_Menu=async(id,action)=>{
    const { data } = await axios.get(
      URL + "restaurant/produit/?categorie="+id
    );
    action(data);
  }
  const get_boissons = async () => {
    get_Menu(25,setBoissons);
  };
  const get_desserts = async () => {
    get_Menu(22,setDesserts);
  };
 
  const updateDisponibilite = async (id, disponibilite) => {
    await axios.put(URL + "restaurant/disponibilitePlats/", {
        id,
        disponibilite,
    });
  };

  useEffect(() => {
    get_boissons();
    get_desserts();

  }, []);

  return (
    <div >
       <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        Boissons
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={boissons}
        action={updateDisponibilite}
      />
       <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        Desserts
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={desserts}
        action={updateDisponibilite}
      />
    </div>
  );
};
export default Disponibilite;
