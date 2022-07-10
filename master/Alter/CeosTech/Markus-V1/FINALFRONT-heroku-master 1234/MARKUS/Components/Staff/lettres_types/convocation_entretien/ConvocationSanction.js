export function createConvocationSanction(
    name, 
    firstName, 
    adress,
    postalC,
    dateFaute, 
    motif,
    dateEntretien,
    denominationSociale,
    adresseSiegeSocial,
    lieuConvocation,
    codePostalSiegeSocial,
    villeSiegeSocial,
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

    return(
        '<p><h2 align="right"><strong>NOTIFICATION DE SANCTION</strong></h2></p>' +

        `<p> ${denominationSociale} ${adresseSiegeSocial} ${codePostalSiegeSocial} ${villeSiegeSocial}</p>` +

        `<p>${userPosition}, ${date}</p>` +
        
        `<p>${name} ${firstName} ${adress} ${postalC}</p>` +

        "<p>Objet: Notification d'une sanction disciplinaire'</p>"+

        '<p>Lettre recommandée avec avis de réception ou lettre remise contre récépissé</p>'+
    
        '<p>Madame, Monsieur,</p>'+
    
        '<p>En date du ' + dateFaute + ', nous avons eu à déplorer de votre part, le comportement fautif suivant : ' + motif + '. </p>' +
        '<p>Votre conduite ayant altéré la bonne marche de l\'entreprise, nous vous avons convoqué à un entretien préalable le ' + dateEntretien + 'afin de recueillir vos explications.</p>' +

        '<p>Pendant cette période, votre contrat de travail sera suspendu, ce qui aura pour effet de vous dispenser de travailler, mais aussi de nous dispenser de vous verser la partie de votre salaire afférente à cette période.</p>' +
    
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