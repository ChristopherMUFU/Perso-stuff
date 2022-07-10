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
  const [burgers, setBurgers] = useState([]);
  const [assietteSaladePate, setAssietteSaladePate] = useState([]);
  const [crepeSalee, setCrepeSalee] = useState([]);
  const [paniniCroque, setPaniniCroque] = useState([]);
  const [accompagnement, setAccompagnement] = useState([]);
  const [pizzaSauceTomate, setPizzaSauceTomate] = useState([]);
  const [pizzaCremeFraiche, setPizzaCremeFraiche] = useState([]);
  const [pizzaSauceBarbecue, setPizzaSauceBarbecue] = useState([]);
  const [milkshakeSmoothie, setMilkshakeSmoothie] = useState([]);
  const [boisson, setBoisson] = useState([]);

  const get_burgers = async () => {
    const { data } = await axios.get(
      URL + "restaurant/produit/?categorie=7"
    );
    setBurgers(data);
  };
  const get_assietteSaladePate = async () => {
    const { data } = await axios.get(
      URL + "restaurant/produit/?categorie=8"
    );
    setAssietteSaladePate(data);
  };
  const get_crepeSalee = async () => {
    const { data } = await axios.get(
      URL + "restaurant/produit/?categorie=9"
    );
    setCrepeSalee(data);
  };

  const updateDisponibilite = async (id, disponibilite) => {
    await axios.put(URL + "restaurant/disponibilitePlats/", {
        id,
        disponibilite,
    });
  };

  useEffect(() => {
    get_burgers();
    get_assietteSaladePate();
    get_crepeSalee();

  }, []);

  return (
    <div >
        <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        Burgers
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={burgers}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Assiettes Salades et Pâtes
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={assietteSaladePate}
        action={updateDisponibilite}
      />

      <h1
        className={styles.title}>
        Crêpes Salées
      </h1>
      <TableBox
        proprietes={proprietes}
        donnees={crepeSalee}
        action={updateDisponibilite}
      />


    </div>
  );
};
export default Disponibilite;
