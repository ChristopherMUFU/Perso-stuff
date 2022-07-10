//import { sendrequest} from '../API/HttpRequestSender';
import "../Components/Connexion/Connexion";
import { Alert } from 'react-native';


//const url = 'http://10.0.2.2:8000'
const url = 'https://markus-app.herokuapp.com'

/*
const API_TOKEN = "uz6y7krxuj";

  export function _verifyConnexion (userV, passwordV) {
    const url = 'https://'+API_TOKEN+'.execute-api.eu-west-3.amazonaws.com/v2/login/'
    return fetch(url, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userV,
                password: passwordV
            })
          })
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
*/

/**
 * check if user credentials are valid
 */
 
 
 
export async function verifyConnexion(form){
  const response = await fetch(url + '/accounts/token/', {
      method: 'POST',
      headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         //'Authorization': 'Bearer ' + global.sessionToken
      },
      body: JSON.stringify(
         form
      )
   })
   .then(async response=>{
      const responseJSON = await response.json()
      if(response.status >= 400){
          const error = new Error("Request Failed, status :: " + response.status)
          console.log(error)
          error.data = responseJSON
          return null
      } else {
        console.log('le retour de la connexion ::' + JSON.stringify(responseJSON))
        return responseJSON
      }
  })
  return response
}

export async function sendConnexion(formData){  
  return await sendrequest('POST', '/accounts/token/', formData)
  .then(data=>{    
      return data
  })
  .catch(error=>{
    console.log("validate subscription failed :: "+error.message)
    if(error.data != null){
      console.log("Details :: "+JSON.stringify(error.data))
    }
    return null
  })
}

export async function setForgotResetEmail(form){
  const response = await fetch(url + "/accounts/password-reset/", {
      method: 'POST',
      headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         //'Authorization': 'Bearer ' + global.sessionToken
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

export async function setForgotResetPassword(form){
  const response = await fetch(url + "/accounts/password-reset/confirm/", {
      method: 'POST',
      headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         //'Authorization': 'Bearer ' + global.sessionToken
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
export async function setForgotReset(formData){
  return await sendrequest('POST', '/accounts/password-reset/comfirm', formData)
  .then(data=>{
    
      return data
  })
  .catch(error=>{
    console.log("validate subscription failed :: "+error.message)
    if(error.data != null){
      console.log("Details :: "+JSON.stringify(error.data))
    }
    return null
  })
}

/**
 * validate user subscription
 * formData: informations provided by user
 * call sendrequest: POST
 */
/* export async function validateUserSubscription(formData){
  return await sendrequest('POST', '/accounts/register/', formData)
  .then(data=>{
      return data
  })
  .catch(error=>{
      console.log("validate subscription failed :: "+error.message)
      let message = ""
      if(error.data != null){
        console.log("Details :: "+JSON.stringify(error.data))
        message = error.data['details']
      }
      Alert.alert("Echec d'Inscription", message)
      return null
  })
} */
/* export async function validateUserSubscription(formData){
  return await sendrequest('POST', '/accounts/user/', formData)
  .then(data=>{
      return data
  })
  .catch(error=>{
      console.log("validate subscription failed :: "+error.message)
      console.log(formData + "element envoyé***********************")
      let message = ""
      if(error.data != null){
        console.log("Details :: "+JSON.stringify(error.data))
        message = error.data['details']
      }
      Alert.alert("Echec d'Inscription", message)
      return null
  })
} */

/* export async function validateUserSubscription(formData){  
  return await sendrequest('POST', '/accounts/register/', formData)
  .then(data=>{
      return data
      
  })
  .catch(error=>{
      console.log("validate subscription failed :: "+error.message)
      let message = ""
      if(error.data != null){
        console.log(formData + "element envoyé***********************")
        
        console.log("Details :: "+JSON.stringify(error.data))
        message = error.data['details']
      }
      Alert.alert("Echec d'Inscription", message)
      return null
  })
    
}
 */
export async function validateUserSubscription(formData) {
  console.log(JSON.stringify(formData))
  const response = await fetch(url+"/accounts/register/", {

     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
     },
     body: JSON.stringify(formData)
  })
  .then(async response=>{
    const responseJSON = await response.json()
    if(response.status >= 400){
        const error = new Error("Request Failed, status :: " + response.status)
        console.log(response)
        console.log(error.data)
        error.data = responseJSON
        return null
    } else {
      return responseJSON
    }
  })
  return response
}
/* export async function validateToken(formData) {
  const response = await fetch(url + "/accounts/token/", {
     method: 'POST',
     headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
     },
     body: JSON.stringify(
      formData
     )
  })
  const json = await response.json();
  console.log(json);
  const MyToken = json.access;
  
  console.log(MyToken);

  
  return json;
} */

/* export async function validateResto(formData) {
  const response = await fetch(url + "/accounts/restaurant/", {
     method: 'POST',
     headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
     },
     body: JSON.stringify(
      formData
     )
  })
  
  const json = await response.json();
  console.log(json.access);
  const MyToken = json.access;
  console.log(MyToken);
  
  return json;
} */

/* export async function validateCompany(formData) {
  const response = await fetch(url + "/accounts/company/", {
     method: 'POST',
     headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + MyToken
     },
     body: JSON.stringify(
      formData
     )
  })
  
  const json = await response.json();
  console.log(json.access);
  const MyToken = json.access;
  console.log(MyToken);
  console.log(formData + "----------------");
  console.log(json);
  
  
  return json;
} */
