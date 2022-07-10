import "../Components/Connexion/Connexion";
import { saveRestaurantOwnerDetails } from '../actions/accountsData';
import Store from '../configureStore'

  //const url = 'http://127.0.0.1:8000/stocks'
  //const url = 'http://10.0.2.2:8000/accounts'
  const url = 'https://markus-app.herokuapp.com/accounts'


//Faire un filtre par email pour obtenir le RestoOwner



export async function getRestaurantOwnerDetail() {
    console.log(global.sessionToken)
   const response = await fetch(url + "/restaurantowner/?email=" + global.email, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();   
   /* Dispatch to the store this information */
   Store.dispatch(saveRestaurantOwnerDetails(json));
   console.log(json);
   return json;
}

export async function setRestaurantOwner(form) {
   const response = await fetch(url + "/restaurantowner/", {
      method: 'POST',
      headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(
         form
      )
   })
   console.log(form);
   const json = await response.json();
   console.log(json);
   return json;
}


//*********************** RAJOUTER le updateFournisseur *****************************//

export async function updateRestaurantOwner(form, id){
   const response = await fetch(url + "/restaurantowner/" + id + "/",
   {
       method: 'PUT',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
       },
       body: JSON.stringify(form),
     })
     console.log(form);
     const json = await response.json();
     console.log(json);
     return json;
 }
 
 

