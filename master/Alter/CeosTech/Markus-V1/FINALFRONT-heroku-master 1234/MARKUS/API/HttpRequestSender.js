
import {AsyncStorage} from 'react-native';
import "../Components/Connexion/Connexion";

//const URL = "http://10.0.2.2:8000"
const URL = "https://markus-app.herokuapp.com"


/**
 * global function to send http requests using fetch api
 * @param {method : GET, POST, DELETE, ... http method}
 * @param {url : string the url}
 * @param {data: formular to be sent to backend, can be null :> GET, DELETE}
 * @param {token: the token provided when the user logged in or subscribed, use AsyncStorage to retrieve with key: 'token'}
 */
export async function sendrequest(method, url, data, token){
    return await fetch(URL+url, {
        method: method,
        headers: data ? {
            'Accept': 'application/json', 
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        } 
        : {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: data ? JSON.stringify(data) : ''
    })
    .then(async response=>{
        const responseJSON = await response.json()
        if(response.status >= 400){
            const error = new Error("Request Failed, status :: " + response.status)
            error.data = responseJSON
            throw error
        }
        return responseJSON
    })
}
