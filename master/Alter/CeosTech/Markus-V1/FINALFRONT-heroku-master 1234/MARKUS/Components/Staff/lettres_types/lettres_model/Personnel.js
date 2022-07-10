export function createPersonnel(
    name,  
    firstName,
    adress,
    postalC,  
    dateEntretien,
    motif,
    typeOfFault,
    denominationSociale, 
    adresseSiegeSocial, 
    codePostalSiegeSocial, 
    villeSiegeSocial,userFirstName,
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
        '<p><h2 align="right"><strong>LETTRE DE LICENCIEMENT POUR MOTIF PERSONNEL DISCIPLINAIRE (FAUTE(S) GRAVE(S) OU LOURDE(S))  ARTICLES L.1232-1 ET L.1331-1 DU CODE DU TRAVAIL </strong></h2><p>' +

        `<p>${denominationSociale} ${adresseSiegeSocial} ${codePostalSiegeSocial} ${villeSiegeSocial}</</p>` +        

        `<p>${userPosition}, ${date}</p>` +

        `<p>${name} ${firstName} ${adress} ${postalC}</p>` +

        '<p>Objet: notification d’un licenciement pour faute ' + typeOfFault +'.</p>'+

        '<p>Lettre recommandée avec avis de réception ou lettre remise contre récépissé</p>'+
    
        '<p>Madame, Monsieur,</p>'+
    
        '<p>À la suite de notre entretien qui s’est tenu le '+ dateEntretien + ', nous vous informons de notre décision de vous licencier pour le(s) motif(s) économique(s) suivant(s) dans les conditions posées à l’article L. 1233-3 du code du travail : </p>'+
        motif +
    
        '<p>Compte tenu de la gravité des faits qui vous sont reprochés, votre maintien dans l’entreprise est impossible. Votre licenciement prend donc effet immédiatement, sans indemnité de préavis ni de licenciement.  </p>'+  
    
        '<p>À l’expiration de votre contrat de travail, nous vous adresserons par courrier votre certificat de travail, votre reçu pour solde de tout compte et votre attestation Pôle emploi.   </p>' + 
    
        '<p>Vous pouvez faire une demande de précision des motifs du licenciement énoncés dans la présente lettre, dans les quinze jours suivant sa notification, par lettre recommandée avec avis de réception ou remise contre récépissé. Nous avons la faculté d’y donner suite dans un délai de quinze jours après réception de votre demande, par lettre recommandée avec avis de réception ou remise contre récépissé. Nous pouvons également, le cas échéant et dans les mêmes formes, prendre l’initiative d’apporter des précisions à ces motifs dans un délai de quinze jours suivant la notification du licenciement. </p>' +
    
        `<p>${userLastName} ${userFirstName}</p>` +    
        
        `<p>${userPosition}</p>` +

        signature

    )
}

function generateSignature(signature){
    if(signature !== "" || signature !== null || signature !== undefined){
        console.log('la signature ::: ' + signature)
        return(`<img src="${signature}" style='float: right;'>`)
    }else{
        console.log(signature)
        return("")
    }
}