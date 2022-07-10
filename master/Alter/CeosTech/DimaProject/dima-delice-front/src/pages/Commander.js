import { useEffect, useState } from "react";

import Carte from "../components/Carte";
import MenuType from "../components/Menu/MenuType";
import Card from "../components/Carte/card";
import Cardfour from "../components/Carte/cardFour";
import Cardburger from "../components/Carte/cardMenuBurger";
import Cardburgersolo from "../components/Carte/cardBurger";
import Cardtacos from "../components/Carte/cardMenuTacos";
import Cardcroque from "../components/Carte/cardCroque";
import Cardmenucroque from "../components/Carte/cardMenuCroque";
import Cardmenupanini from "../components/Carte/cardMenuPanini";
import Cardcrepessal from "../components/Carte/cardCrepesalees";
import Cardcrepessuc from "../components/Carte/cardCrepesucree";
import Cardmenucrepesal from "../components/Carte/cardMenuCrepesSalees";
import Cardpaninis from "../components/Carte/cardPaninis";
import Cardaccompagnement from "../components/Carte/cardAccompagnement";
import Cardpizzatomate from "../components/Carte/cardPizzaTomate";
import Cardpizzacreme from "../components/Carte/cardPizzaCreme";
import Cardpizzabarbecue from "../components/Carte/cardPizzaBarbecue";
import Cardmilkshake from "../components/Carte/cardMilkshakes";
import Cardsmoothie from "../components/Carte/cardSmoothie";
import Cardboissons from "../components/Carte/cardBoissons";
import Cardassiette from "../components/Carte/cardAssiettes";
import Cardmenuenfant from "../components/Carte/cardMenuEnfant";
import Carddessert from "../components/Carte/cardDesserts";
import Cardsaladepate from "../components/Carte/cardSaladePate";
import CardChickenWings from "../components/Carte/cardchickenwings"



import "./commander.css";

import { sendrequest } from "../middlewares/request";

import { IconButton } from "@material-ui/core";

const Commander = () => {
  const [active, setActive] = useState(2);
  const [activeCarte, setActiveCarte] = useState(true);
  const [datas, setDatas] = useState([]);
  const [sideDishes, setSideDishes] = useState([]);
  const [choixPain, setChoixPain] = useState([]);
  const [choixGarniture, setChoixGarniture] = useState([]);
  const [choixSupplement, setChoixSupplement] = useState([]);
  const [choixSupplementPizza, setChoixSupplementPizza] = useState([]);
  const [choixSupplementSucree, setChoixSupplementSucree] = useState([]);
  const [choixSupplementFruits, setChoixSupplementFruits] = useState([]);
  const [choixSupplementFrites, setChoixSupplementFrites] = useState([]);
  const [choixSupplementViande, setChoixSupplementViande] = useState([]);

  const [choixSupplementSal, setChoixSupplementSal] = useState([]);
  const [choixSauce, setChoixSauce] = useState([]);
  const [choixTaille, setChoixTaille] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [dishesDisplayed, setDishesDisplay] = useState(false);

  // Booleans that will only allow the component to render when the requests have returned the datas
  const [isDataLoading, setDataLoading] = useState(false);
  const [isCategoryLoading, setCategoryLoading] = useState(false);
  const [sideDishesLoading, setSideDishesLoading] = useState(false);
  // activeCarte && (window.document.body.style.overflow = "hidden")

  activeCarte
    ? (window.document.body.style.overflow = "hidden")
    : (window.document.body.style.overflow = "auto");

  const fetchData = async () => {
    sendrequest("get", "restaurant/produit/", setDatas, setDataLoading);
    sendrequest(
      "get",
      "restaurant/categorie/",
      setMenuCategories,
      setCategoryLoading,
    );
    sendrequest("get", "restaurant/supplement/?type_supplement=Boisson", setSideDishes); // categorie correspondant aux boissons
    sendrequest("get", "restaurant/ingredient/?type_ingredient=Pain", setChoixPain); // categorie correspondant au pain
    sendrequest("get", "restaurant/ingredient/?type_ingredient=Crudite", setChoixGarniture); // categorie correspondant à la garniture
    sendrequest("get", "restaurant/supplement/?sup_burgers_sandwichs_assiettes=true", setChoixSupplement); // categorie correspondant à tous les supplements
    sendrequest("get", "restaurant/ingredient/?type_ingredient=Sauce", setChoixSauce); // categorie correspondant à la sauce
    sendrequest("get", "restaurant/supplement/?type_supplement=TaillePizza", setChoixTaille); // categorie correspondant à la taille de la pizza
    sendrequest("get", "restaurant/supplement/?sup_pizzas=true", setChoixSupplementPizza); // categorie correspondant aux supplements salees
    sendrequest("get", "restaurant/supplement/?sup_milshake_crepe=true", setChoixSupplementSucree); // categorie correspondant aux supplements sucrees
    sendrequest("get", "restaurant/supplement/?sup_smoothie=true", setChoixSupplementFruits); // categorie correspondant aux supplements fruits
    sendrequest("get", "restaurant/supplement/?sup_sur_frite=true", setChoixSupplementFrites); // categorie correspondant aux supplements frites
    sendrequest("get", "restaurant/supplement/?sup_salade=true", setChoixSupplementSal); // categorie correspondant aux supplements frites
    sendrequest("get", "restaurant/ingredient/?type_ingredient=Viande", setChoixSupplementViande); // categorie correspondant aux ingredients viandes

  };

  useEffect(() => {
    fetchData();
  }, [active]);

  //Function that will check through if id of the selected menu item matches the one of 'Menu'. If so then we will want to display all of the datas, not just a selection.
  const isMenu = () => {
    for (var i = 0; i < menuCategories.length; i++) {
      if (menuCategories[i].id === active && menuCategories[i].nom === "Menus du Midi") {
        return datas;
      }
    }
  };

  const selectDishesPerCategory = () => {
    var menuDishes = isMenu();

    if (menuDishes !== undefined) {
      return  <MenuType
                  datas={datas}
                  menuCategories={menuCategories}
                  dishesDisplayed={dishesDisplayed}
                  setDishesDisplay={setDishesDisplay}
                />;
    } else {
      const selectedDishes = datas
        // We filter the data :
        .filter((data) => {
          // By only selecting the data that belongs to a category (categories is an array in which are the different categories to which a dish belongs) that matches the one selected by the user (var active)
          return (
            data.categorie === active
          )


          /*for (var i = 0; i < data.categories.length; i++) {
            if (data.categories[i] === active) return true;
            return false;
          }*/
        })
        //Once filtered, we can go through the selection to display them
        .map((data) => {
            if(data.est_menu_sandwichs === true){
                  return <Card
                    key={data.id}
                    {...data}
                    sideDishes={sideDishes}
                    setSideDishes={setSideDishes}

                    choixPain={choixPain}
                    setChoixPain={setChoixPain}

                    choixGarniture={choixGarniture}
                    setChoixGarniture={setChoixGarniture}
                    choixSupplementViande={choixSupplementViande}
                    choixSupplement={choixSupplement}
                    setChoixSupplement={setChoixSupplement}

                    choixSauce={choixSauce}
                    setChoixSauce={setChoixSauce}
                   />;
               }

               if(data.est_menu_sandwichs_au_four === true){
                return <Cardfour
                  key={data.id}
                  {...data}
                  sideDishes={sideDishes}
                  setSideDishes={setSideDishes}

                  choixPain={choixPain}
                  setChoixPain={setChoixPain}

                  choixGarniture={choixGarniture}
                  setChoixGarniture={setChoixGarniture}

                  choixSupplement={choixSupplement}
                  setChoixSupplement={setChoixSupplement}

                  choixSauce={choixSauce}
                  setChoixSauce={setChoixSauce}
                 />;
             }
               else if(data.est_menu_burgers === true){
                return <Cardburger
                  key={data.id}
                  {...data}
                  sideDishes={sideDishes}
                  setSideDishes={setSideDishes}

                  choixGarniture={choixGarniture}
                  setChoixGarniture={setChoixGarniture}

                  choixSupplement={choixSupplement}
                  setChoixSupplement={setChoixSupplement}

                  choixSauce={choixSauce}
                  setChoixSauce={setChoixSauce}
                 />;
             }
             else if(data.est_menu_crepe_salee === true){
              return <Cardmenucrepesal
                key={data.id}
                {...data}
                sideDishes={sideDishes}
                setSideDishes={setSideDishes}

                choixSupplementSal={choixSupplementSal}
                setChoixSupplementSal={setChoixSupplementSal}

                choixSauce={choixSauce}
                setChoixSauce={setChoixSauce}
               />;
           }
           
             
             else if(data.est_burger === true ){
              return <Cardburgersolo
                key={data.id}
                {...data}

                choixGarniture={choixGarniture}
                setChoixGarniture={setChoixGarniture}

                choixSupplementSal={choixSupplementSal}
                setChoixSupplementSal={setChoixSupplementSal}

                choixSauce={choixSauce}
                setChoixSauce={setChoixSauce}
               />;
           }
           else if(data.est_assiette === true ){
            return <Cardassiette
              key={data.id}
              {...data}

              choixGarniture={choixGarniture}
              setChoixGarniture={setChoixGarniture}

              choixSupplementViande={choixSupplementViande}
              setChoixSupplementViande={setChoixSupplementViande}
              
              choixSupplement={choixSupplement}
              setChoixSupplement={setChoixSupplement}

              choixSauce={choixSauce}
              setChoixSauce={setChoixSauce}
             />;
         }
           else if(data.est_boissons=== true ){
            return <Cardboissons
              key={data.id}
              {...data}

             />;
         }
         else if(data.est_milkshake === true ){
          return <Cardmilkshake
            key={data.id}
            {...data}

            choixSupplementSucree={choixSupplementSucree}
            setChoixSupplementSucree={setChoixSupplementSucree}


           />;
       }

       else if(data.est_smoothie === true ){
        return <Cardsmoothie
          key={data.id}
          {...data}

          choixSupplementFruits={choixSupplementFruits}
          setChoixSupplementFruits={setChoixSupplementFruits}

         />;
     }
         else if(data.est_dessert=== true ){
          return <Carddessert
            key={data.id}
            {...data}

           />;
       }
       else if(data.est_menu_enfant=== true ){
        return <Cardmenuenfant
          key={data.id}
          {...data}

         />;
     }
           else if(data.est_pizza_sauce_tomate === true){
            return <Cardpizzatomate
              key={data.id}
              {...data}
              choixTaille={choixTaille}
              setChoixTaille={setChoixTaille}

              choixSupplementPizza={choixSupplementPizza}
              setChoixSupplementPizza={setChoixSupplementPizza}

             />;
         }

         else if(data.est_salade_pate === true){
          return <Cardsaladepate
            key={data.id}
            {...data}

            choixSupplementSal={choixSupplementSal}
            setChoixSupplementSal={setChoixSupplementSal}

           />;
       }


         else if(data.est_pizza_sauce_barbecue === true){
          return <Cardpizzabarbecue
            key={data.id}
            {...data}
          

            choixTaille={choixTaille}
              setChoixTaille={setChoixTaille}

              choixSupplementPizza={choixSupplementPizza}
              setChoixSupplementPizza={setChoixSupplementPizza}

           />;
       }
         else if(data.est_pizza_creme_fraiche === true){
          return <Cardpizzacreme
            key={data.id}
            {...data}
          
            choixTaille={choixTaille}
            setChoixTaille={setChoixTaille}

            choixSupplementPizza={choixSupplementPizza}
            setChoixSupplementPizza={setChoixSupplementPizza}

           />;
       }
           else if(data.est_menu_tacos === true ){
            return <Cardtacos
              key={data.id}
              {...data}
              sideDishes={sideDishes}
              setSideDishes={setSideDishes}

              choixGarniture={choixGarniture}
              setChoixGarniture={setChoixGarniture}

              choixSupplementViande={choixSupplementViande}
              setChoixSupplementViande={setChoixSupplementViande}

              choixSupplement={choixSupplement}
              setChoixSupplement={setChoixSupplement}

              choixSauce={choixSauce}
              setChoixSauce={setChoixSauce}
             />;
         }
         else if(data.est_menu_croque === true ){
          return <Cardcroque
            key={data.id}
            {...data}
            setSideDishes={setSideDishes}
            sideDishes={sideDishes}
            choixSauce={choixSauce}
            setChoixSauce={setChoixSauce}
           />;
       }
       else if(data.est_chicken_wings === true ){
        return <CardChickenWings
          key={data.id}
          {...data}
          setSideDishes={setSideDishes}
          sideDishes={sideDishes}
          choixSauce={choixSauce}
          setChoixSauce={setChoixSauce}
         />;
     }
       else if(data.est_accompagnement === true ){
        return <Cardaccompagnement
          key={data.id}
          {...data}

          choixSupplementFrites={choixSupplementFrites}
          setChoixSupplementFrites={setChoixSupplementFrites}
         />;
     }
       else if(data.est_menu_paninis === true ){
        return <Cardmenupanini
          key={data.id}
          {...data}
          choixSupplement={choixSupplement}
          setChoixSupplement={setChoixSupplement}
          setSideDishes={setSideDishes}
          sideDishes={sideDishes}
          choixSauce={choixSauce}
          setChoixSauce={setChoixSauce}
         />;
     }
         else if(data.est_crepe_salee === true ){
          return <Cardcrepessal
            key={data.id}
            {...data}
  
            choixSupplementSal={choixSupplementSal}
            setChoixSupplementSal={setChoixSupplementSal}

            choixSauce={choixSauce}
            setChoixSauce={setChoixSauce}
           />;
       }
       else if(data.est_crepe_sucree=== true ){
        return <Cardcrepessuc
          key={data.id}
          {...data}

          choixSupplementSucree={choixSupplementSucree}
          setChoixSupplementSucree={setChoixSupplementSucree}

         />;
     }
       else if(data.est_panini === true ){
        return <Cardpaninis
          key={data.id}
          {...data}

          choixSupplement={choixSupplement}
          setChoixSupplement={setChoixSupplement}
          setSideDishes={setSideDishes}
          sideDishes={sideDishes}
          choixSauce={choixSauce}
          setChoixSauce={setChoixSauce}
         />;
     }
     else if(data.est_menu_chicken_wings === true ){
      return <CardChickenWings
        key={data.id}
        {...data}
        sideDishes={sideDishes}
        setSideDishes={setSideDishes}

        choixSauce={choixSauce}
        setChoixSauce={setChoixSauce}
       />;
   }
     else if(data.est_croque === true ){
      return <Cardmenucroque
        key={data.id}
        {...data}

        choixSauce={choixSauce}
        setChoixSauce={setChoixSauce}
   
       />;
   }
          else {return ""}
        });
      return selectedDishes;
    }
  };

  return (
    <div className='commander'>

    {/* Loading spining circle displayed */}
    {!isDataLoading && (
      <div className="lds-dual-ring"></div>
    )}

      <div className='commander__container'>
        {isCategoryLoading && (
          <Carte
            active={active}
            setActive={setActive}
            activeCarte={activeCarte}
            setActiveCarte={setActiveCarte}
            categories={menuCategories}
            setDishesDisplay={setDishesDisplay}
          />
        )}

        {isDataLoading && (
          <>
            <div className='commander__container__cards'>
              {selectDishesPerCategory()}
            </div>

            <div
              className={"commander__carte " + (activeCarte ? "white" : null)}>
              <IconButton onClick={() => setActiveCarte(() => !activeCarte)}>
                <i
                  className={
                    "fas fa-arrow-" + (activeCarte ? "left" : "right")
                  }></i>
              </IconButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Commander;
