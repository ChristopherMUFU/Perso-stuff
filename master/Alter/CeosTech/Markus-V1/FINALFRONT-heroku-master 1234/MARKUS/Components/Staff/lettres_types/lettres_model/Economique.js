export function createEconomique(
    name, 
    firstName, 
    adress,
    postalC,
    dateEntretien, 
    motif,
    dateStartNoticePrior, 
    dateEndNoticePrior,
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
        '<h2 align="right"><strong>LETTRE DE LICENCIEMENT  POUR MOTIF ÉCONOMIQUE INDIVIDUEL</strong></h2>' +

        
        `<p>${denominationSociale}, ${adresseSiegeSocial}, ${codePostalSiegeSocial} ${villeSiegeSocial}</p>` +        

        `<p>${userPosition}, ${date}</p>` +

        `<p>${name} ${firstName}, ${postalC}, ${adress}</p>` +

        "<p>Objet: notification d’un licenciement pour motif économique</p>"+

        '<p>Lettre recommandée avec avis de réception ou lettre remise contre récépissé</p>'+
    
        '<p>Madame, Monsieur,</p>'+
    
        '<p>À la suite de notre entretien qui s’est tenu le '+ dateEntretien + ', nous vous informons de notre décision de vous licencier pour le(s) motif(s) économique(s) suivant(s) dans les conditions posées à l’article L. 1233-3 du code du travail : </p>'+
        motif +
    
        '<p>En dépit des recherches que nous avons effectuées au sein de notre entreprise, conformément à l’article L. 1233-4 du code du travail, nous n’avons pas trouvé de poste de reclassement. </p>'+  
    
        '<p>Vous pouvez bénéficier d’une priorité de réembauche pendant une durée d’un an à compter de la date de prise d’effet de votre licenciement, si vous en faites la demande par écrit dans ce même délai.  </p>' + 
    
        '<p>Nous vous dispensons d’effectuer votre préavis qui débute le ' + dateStartNoticePrior + 'et se termine le ' + dateEndNoticePrior + ', date à laquelle vous quitterez les effectifs de l’entreprise. Néanmoins, votre salaire continuera de vous être versé durant cette période.</p>'+
    
        '<p>À l’expiration de votre contrat de travail, nous vous adresserons par courrier votre certificat de travail, votre reçu pour solde de tout compte et votre attestation Pôle emploi.  </p>'+ 
    
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