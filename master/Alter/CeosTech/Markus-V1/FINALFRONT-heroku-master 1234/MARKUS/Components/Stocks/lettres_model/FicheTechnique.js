export function createFicheTechnique(
    denomination,
    processus_preparation,
    rechauffage,
    temp_preparation,
    categorieMenu,
    restaurant, 
    ingredients)
{
    
    return(
        '<h1 align="center"><strong>Fiche technique</strong></h2>' +
        
        `<h2 align="center"><strong>${denomination}</strong></h2>` +

        `
            <table border=1 cellpadding=20 align="center"">            
                <tbody>
                    <tr>
                        <td size=20>Dénomination du plat</td>
                        <td>${denomination}</td>
                    </tr>
                    <tr>
                        <td>Ingrédients</td>
                        <td><ul>${makeList(JSON.parse(ingredients))}</ul></td>
                    </tr>
                    <tr>
                        <td>Processus de réalisation</td>
                        <td>${processus_preparation}</td>
                    </tr>
                    <tr>
                        <td>Réchauffage</td>
                        <td>${rechauffage}</td>
                    </tr>
                    <tr>
                        <td>Catégorie</td>
                        <td>${categorieMenu}</td>
                    </tr>
                    <tr>
                        <td>Temps de préparation</td>
                        <td>${temp_preparation}</td>
                    </tr>
                </tbody>
            </table>
        `       
       
    )
}


const makeList = (array) => {
    console.log(array)
    let list = ''
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        console.log(item)        
        list = list + `<li>${item.key}</li>`
        // ...
    }
    
    return list
    /*array.forEach((item) => {
        return `<li>${item.key}</li>`
    })*/
}