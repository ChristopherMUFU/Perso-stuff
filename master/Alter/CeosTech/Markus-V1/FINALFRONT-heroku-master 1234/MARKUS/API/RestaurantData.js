const url = 'https://markus.herokuapp.com/'  
  export function _dataPerDay(){
    return fetch(url+"turnover?type=day", {
            method: 'POST'
          })
    .then((response) => response.json())
  }

  export function _bestsell(){
    return fetch(url+"bestsell", {
      method: 'POST'
    })
    .then((response) => response.json())
  }

  export function _repartition(){
    return fetch(url+"repartition", {
      method: 'POST'
    }).then((response)=>response.json())
  }