import "./panier.css";
import { useSelector } from "react-redux";
import { selectBaskets } from "../../../app/Redux-slices/basketsSlice";
import Empty from "../../../images/empty.png";
import Product from "./product/Products";
import RadioButtonsGroup from "./RadioPanier";
import { calculTotal, getNombresArticles } from "../../../utilities";
import { useHistory } from "react-router-dom";

const Panier = () => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);
  console.log(baskets);

  return (
    <div id="panier">
      <h1>Panier</h1>
    <div>
      {/*<button onClick={history.goBack} className="go-back">
            Retour
      </button>*/}

      
    </div>
      {!baskets.length ? (
        <div className="panier__vide">

          <h2>Votre panier est vide</h2>
          <img src={Empty} alt="empty basket" /> 
        </div>
      ) : (
        <div className="panier__container">

            <h2><u>Détail du panier</u></h2>
            <p className="panier__nombre-articles">
              {getNombresArticles(baskets)} article
              {getNombresArticles(baskets) > 1 && "s"}
            </p>
            {baskets.map((product) => {
              return (
                <>
                  <Product key={product.nom} product={product} />
                </>
             );
            })}

            <div className="panier__container--prix">
              <p>
                Prix Total{" "}
                <span style={{ fontSize: "1rem", color: "black" }}>(TTC)</span>
              </p>
              <p>{calculTotal(baskets)} €</p>
            </div>

            <div className="separation_ligne"> </div>

            <RadioButtonsGroup />
        </div>
      )}
    </div>
  );
};

export default Panier;
