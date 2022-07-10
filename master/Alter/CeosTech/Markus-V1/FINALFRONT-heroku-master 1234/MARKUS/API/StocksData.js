import "../Components/Connexion/Connexion";
import { saveIngredId } from '../actions/stocks';
import Store from '../configureStore'

  //const url = 'http://127.0.0.1:8000/stocks'
  //const url = 'http://10.0.2.2:8000/stocks'
  const url = 'https://markus-app.herokuapp.com/stocks'


// ****IMPORTANT******
// Remplacer le 1 du pk restaurant par un id dynamique
// qui se récupère aprés connection de l'utilisateur
// Si l'id est inexistant il faudra créer une page
// pour s'affilier ou créer un restaurant


// FOURNISSEUR -----------------------
export async function getFournisseur() {
    console.log(global.sessionToken)
   const response = await fetch(url+"/fournisseur/?restaurant="+global.sessionRestaurant, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();
   console.log('RES');
   console.log(json);
   return json;
}

export async function setFournisseur(form) {
   const response = await fetch(url + "/fournisseur/", {
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

export async function updateFournisseur(form, id){
   const response = await fetch(url + "/fournisseur/" + id + "/",
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

// A modifier
export async function deleteFournisseur(id){
   const response = await fetch(url + "/fournisseur/" + id + "/",
   {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
   })
   const json = await response.json();
   return json;
}



// PRODUITS FOURNISSEUR ------------------------------
/*
export async function getProduitFournisseur(idFournisseur) {
   const response = await fetch(url+"/produitfournisseur/" + idFournisseur, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + authToken
      }
   })
   const json = await response.json();
   return json;
}
*/
// COMMANDE ------------------------------
export async function getCommande() {
   const response = await fetch(url+"/commande/?restaurant="+global.sessionRestaurant,
      {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();
   return json;
}

export async function getCommandeById (idCommande) {
   const response = await fetch(url+"/commande/" + idCommande,
      {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();
   return json;
}
export async function setCommande(obj) {
   const response = await fetch(url+"/commande/", {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(
         obj
      )
   })
   const json = await response.json();
   return json;
}

// INVENTAIRE ------------------------------
 

 export async function setProduitEnStock (formular) {
       const response = await fetch(url+ "/produitenstock/", ///inventaire/1/   
      {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(formular),
   })
   const json = await response.json();
   console.log('GET PROBB => ' + json );
   return json;
}

export async function getProduitEnStock () {
   const response = await fetch(url+ "/produitenstock/?restaurant="+global.sessionRestaurant, ///inventaire/1/
      {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      }
   })   
   const json = await response.json();
   console.log('GET PROD => ' + json );
   return json;
}

export async function getDetailProduitEnStock(id) {
   const response = await fetch(url + "/produitenstock/" + id + "/", ///inventaire/1/
      {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();
   return json;
}

export async function deleteProduitEnStock(id){
   const response = await fetch(url + "/produitenstock/" + id + "/",
   {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
   })
   const json = await response.json();
   return json;
}


export async function updateProduitEnStock(form, id){
   console.log('le nouveau produit :: ' + JSON.stringify(form))
   const response = await fetch(url + "/produitenstock/" + id + "/",
    {
     method: 'PUT',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + global.sessionToken
     },
     body: JSON.stringify(form),
   })
   const json = await response.json();
   console.log('la reponse ' + JSON.stringify(json));
   return json;

}


// export async function setProduitEnStock(idCommande) {
//    const response = await fetch(url+"/inventaire/", {
//       method: 'POST',
//       headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(
//          {idCommande : idCommande}
//       )
//    })
//    const json = await response.json();
//    return json;
// }

export async function getFicheTechnique() {
   console.log('get les fiches')
   const response = await fetch(url+ "/fichetechnique/?restaurant="+global.sessionRestaurant, ///inventaire/1/
      {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + global.sessionToken
      }
   })
   const json = await response.json();
   console.log(json);
   return json;
}

export async function setFicheTechnique(formular) {
   console.log("la fiche :: " + JSON.stringify(formular))
   const response = await fetch(url+"/fichetechnique/", { ///inventaire/produitenstock/1/

      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(formular)
   })
   console.log('SET');
   console.log(formular);
   const json = await response.json();
   console.log(json);
   return json;
}

export async function updateFicheTechnique(form, id){
   console.log('le nouveau produit :: ' + JSON.stringify(form))
   const response = await fetch(url + "/fichetechnique/" + id + "/",
    {
     method: 'PUT',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + global.sessionToken
     },
     body: JSON.stringify(form),
   })
   const json = await response.json();
   console.log('la reponse ' + JSON.stringify(json));
   return json;

}









export async function setIngredient(formular) {

   const response = await fetch(url+"/ingredient/", { ///inventaire/produitenstock/1/

      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(formular)
   })
   const returnIngredient = await response.json();
   console.log("********** Ma reponse *******");
   console.log(returnIngredient.id);
   const IngredId = returnIngredient.id;
   /* Dispatch to the store this information */
   Store.dispatch(saveIngredId(IngredId));
   console.log(response);
   console.log(formular);
   const json = await response.json();
   console.log(json);
   return json;
}


 export async function deleteFicheTechnique(id){
   const response = await fetch(url + "/fichetechnique/" + id + "/",
   {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
      },
   })
   const json = await response.json();
   return json;
}


 export async function getCategorieMenu() {
     const response = await fetch(url + "/categoriemenu/", ///inventaire/1/
        {
           method: 'GET',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + global.sessionToken
        }
     })
     const json = await response.json();
     console.log('GET MENU => ' + json );
     return json;
  }

export async function getCategorieMenuDetail(id) {
    const response = await fetch(url + "/categoriemenu/" + id + "/", ///inventaire/1/
       {
          method: 'GET',
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + global.sessionToken
       }
    })
    const json = await response.json();
    return json;
 }

//registre du personnel => GET POST (Back fonctionnel)
//rajouter une nouvel table qui classerai les personnel selon leur resto
// liee les table personnel avec le pk restaurant
