export function createConvocationEntretien(
    name, 
    firstName, 
    adress,
    postalC,
    dateEntretien, 
    timeEntretien,
    adresseEntretien,  
    adresseInspectionTravail,
    adresseMairie,
    denominationSociale,
    adresseSiegeSocial,
    codePostalSiegeSocial,
    villeSiegeSocial,
    lieuConvocation,
    dateConvocation,
    userFirstName,
    userLastName,
    userPosition,
    signature)
{
    
    signature = generateSignature(signature)

    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    const date = dd + '/' + mm + '/' + yyyy;

    /* Input siége sociale + lieu et date 
    Voir que veut dire lieu  ...*/


    return(
        '<h2 align="right"><strong>CONVOCATION A UN ENTRETIEN</strong></h2>' +

        `<p> ${denominationSociale} ${adresseSiegeSocial} ${codePostalSiegeSocial} ${villeSiegeSocial}</p>` +

        `<p>${userPosition}, ${date}</p>` +
        
        `<p>${name} ${firstName} ${adress} ${postalC}</p>` +

        "<p>Objet: Convocation à un entretien préalable au licenciement</p>" +

        '<p>Lettre recommandée avec avis de réception ou lettre remise contre récépissé</p>'+
    
        '<p>Madame, Monsieur,</p>'+
    
        '<p>Nous envisageons à votre encontre une éventuelle mesure de licenciement. </p>' +
        '<p>En application des dispositions des articles L1232-2 et R1232-1 du code du travail, nous vous demandons de bien vouloir vous présenter le ' + dateEntretien + 'à ' + timeEntretien + ' à l’adresse précisée ci-dessous : '+
         adresseEntretien + '</p>' +

        '<p>Nous vous précisons que vous avez la possibilité de vous faire assister, lors de cet entretien, soit par une personne de votre choix appartenant au personnel de l’entreprise soit par un conseiller du salarié. '+
        'La liste et les coordonnées des conseillers sont consultables : </br>' +
        '- Dans les locaux de l’inspection du travail : ' + adresseInspectionTravail + '</br>' +
        '- A la mairie dont celle située à l’adresse suivante : ' + adresseMairie + '</br>' +
        'Si vous souhaitez vous faire assister, je vous prie de nous en informer pour des raisons d’organisation.</p>' +
    
        '<p>Veuillez agréer, Madame, Monsieur, l’expression de ma considération distinguée. </p>' +
    
        `<p>${userLastName} ${userFirstName}</p>` +    
        
        `<p>${userPosition}</p>` +

        signature

    )
}

function generateSignature(signature){
    if(signature !== "" || signature !== null || signature !== undefined){
        return("<img src='"+signature+"' style='float: right;' />")
    }else{
        return("")
    }
}