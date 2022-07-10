import {AsyncStorage} from 'react-native'
import {sendrequest} from './HttpRequestSender'
import "../Components/Connexion/Connexion";

//const url = 'http://10.0.2.2:8000/staff'
const url = 'https://markus-app.herokuapp.com/staff'


//registre du personnel => GET POST (Back fonctionnel)
//rajouter une nouvel table qui classerai les personnel selon leur resto
// liee les table personnel avec le pk restaurant

// PERSONNEL -----------------------
export async function loadStaff(){
   let token = null

   await AsyncStorage.getItem('token').then(data => {
      token = data
   })
   .catch(error => {
      console.log("error " + error)
   })

   return await sendrequest('GET', '/staff/personnel/', null, token)
   .then(data => {
      return data
   })
   .catch(error=>{
      console.log("loadStaff :: "+error.message)
      if(error.data != null)
         console.log("Details :: "+JSON.stringify(error.data))
      return null
   })
}

export async function getPersonnel() {
   const response = await fetch(url+"/personnel/?restaurant="+global.sessionRestaurant, {
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

 export async function setPersonnel(formula) {
    console.log('le nouveau personnel :: ' + JSON.stringify(formula))
    const response = await fetch(url + "/personnel/", {
       method: 'POST',
       headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.sessionToken
       },
       body: JSON.stringify(
          formula
       )
    })
    const json = await response.json();
    console.log("answer :: " + JSON.stringify(json))
    return json;
 }

 export async function deletePersonnel(id){
    const response = await fetch(url + "/personnel/" + id + "/", // possiblement avec le pk restaurant
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


 export async function updatePersonnel(form, id){
    const response = await fetch(url + "/personnel/" + id + "/",
     {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(form),
    })
    console.log("form  " + form);
    const json = await response.json();
    console.log("json " + json);
    return json;
/*
    const response = await fetch(url + "/personnel/" + id + "/",
    {
       method: 'PUT',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(form)
    })
    const json = await response.json();
    return json;
    */
 }


 // CONTRAT DE TRAVAIL -----------------------
 export async function getContratDeTravail() {
    const response = await fetch(url+"/contrat_travail/", 
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


 export async function getContratDeTravailById(idPersonnel) {
    const response = await fetch(url+"/contrat_travail/" + idPersonnel, {
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

 export async function setContratDeTravail(form) {
    const response = await fetch(url + "/contrat_travail/", {
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
    const json = await response.json();
    return json;
 }


 // PLANNING -----------------------
 export async function getPlanning() {
    const response = await fetch(url+"/planning/", 
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

 export async function getPlanningById(idPersonnel) {
    const response = await fetch(url+"/planning/" + idPersonnel, {
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


 export async function setPlanning(obj) {
    const response = await fetch(url+"/planning/", {
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
    console.log("obj " + obj);
    const json = await response.json();
    console.log("json2 " + json);
    return json;
 }

 // EMARGEMENT -----------------------

 export async function getEmargement() {
    const response = await fetch(url+"/emargement/", 
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
