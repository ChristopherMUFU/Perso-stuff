import "../Components/Connexion/Connexion";

//const url = 'http://127.0.0.1:8000/stocks'
//const url = 'http://10.0.2.2:8000/main'
const url = 'http://markus-app.herokuapp.com/main'


// ****IMPORTANT******
// Remplacer le 1 du pk restaurant par un id dynamique
// qui se récupère aprés connection de l'utilisateur
// Si l'id est inexistant il faudra créer une page
// pour s'affilier ou créer un restaurant


// FOURNISSEUR -----------------------
export async function getCompany() {
 const response = await fetch(url+"/company/", {
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

export async function getCompanyDetail() {
 const response = await fetch(url+"/company/"+ 1 +"/", { //id Company à l'avenir (après connexion User)
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

export async function setCompany(form) {
 const response = await fetch(url + "/company/", {
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
 console.log("form :: " + form);
 const json = await response.json();
 console.log("json :: "+ json);
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
 console.log(json);
 return json;
}




