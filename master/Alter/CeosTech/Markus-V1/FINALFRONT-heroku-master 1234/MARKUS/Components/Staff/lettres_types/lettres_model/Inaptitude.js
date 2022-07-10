export function createInaptitude(    
    name, 
    firstName, 
    adress,
    postalC,
    dateEntretien, 
    dateFinContrat, 
    dateInaptitude,
    denominationSociale,
    adresseSiegeSocial,
    codePostalSiegeSocial,
    villeSiegeSocial,
    userFirstName,
    userLastName,
    userPosition,
    signature)
{

    signature = generateSignature(signature);
    
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    const date = dd + '/' + mm + '/' + yyyy;

    return(
        '<h2 align="right"><strong>LETTRE DE LICENCIEMENT POUR INAPTITUDE  ARTICLES L.1226-2-1 (INAPTITUDE D’ORIGINE NON PROFESSIONNELLE) ET L.1226-12 DU CODE DU TRAVAIL (INAPTITUDE D’ORIGINE PROFESSIONNELLE)</strong></h2>' +

        `<p>${denominationSociale} ${adresseSiegeSocial} ${codePostalSiegeSocial} ${villeSiegeSocial}</</p>` +        

        `<p>${userPosition}, ${date}</p>` +

        `<p>${name} ${firstName} ${adress} ${postalC}</p>` +

        "<p>Objet: notification d’un licenciement pour inaptitude et impossibilité de reclassement</p>"+

        '<p>Lettre recommandée avec avis de réception ou lettre remise contre récépissé</p>'+
    
        '<p>Madame, Monsieur,</p>'+
    
        '<p>Suite à notre entretien qui s’est tenu le '+ dateEntretien + ', nous vous informons de notre décision de vous licencier, en raison de votre inaptitude à occuper votre emploi, constatée le ' + dateInaptitude + ' par le médecin du travail et en raison de l’impossibilité de vous reclasser.</p>'+
    
        '<p>En effet, les recherches qui ont été menées en vue de votre reclassement, après consultation du comité social et économique, tenant compte des conclusions du médecin du travail ainsi que de nos échanges, n’ont pas permis de trouver un autre emploi approprié à vos capacités, parmi les emplois disponibles. </p>'+  
    
        '<p>Votre contrat de travail prend fin à la date d’envoi de cette lettre, soit le ' + dateFinContrat + '. Vous n’effectuerez donc pas de préavis.</p>' + 
    
        '<p>Si l’inaptitude a une origine professionnelle :</p>'+
    
        '<p>Vous percevrez une indemnité égale à l’indemnité compensatrice de préavis (le préavis n’est pas exécuté mais payé) et une indemnité spéciale de licenciement. (cette indemnité est égale au double de l’indemnité légale de licenciement, sauf dispositions conventionnelles plus favorables) </p>'+
    
        '<p>Nous tiendrons à votre disposition votre certificat de travail, votre reçu pour solde de tout compte et votre attestation Pôle emploi. </p>'+ 
    
        '<p>Vous pouvez faire une demande de précision des motifs du licenciement énoncés dans la présente lettre, dans les quinze jours suivant sa notification, par lettre recommandée avec avis de réception ou remise contre récépissé. Nous avons la faculté d’y donner suite dans un délai de quinze jours après réception de votre demande, par lettre recommandée avec avis de réception ou remise contre récépissé. Nous pouvons également, le cas échéant et dans les mêmes formes, prendre l’initiative d’apporter des précisions à ces motifs dans un délai de quinze jours suivant la notification du licenciement. </p>' +
    
        `<p>${userLastName} ${userFirstName}</p>` +    
        
        `<p>${userPosition}</p>` +

        signature


    )

}

function generateSignature(signature){
    if(signature !== "" || signature !== null || signature !== undefined){
        console.log('la signature ::: ' + signature)
        return("<img src='"+signature+"' style='float: right;' />")
    }else{
        console.log(signature)
        return("")
    }
}