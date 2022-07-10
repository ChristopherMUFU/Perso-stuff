export function createCDD(
    civility,
    firstName,
    name, 
    birthdate,
    socialN,
    adress,
    postalC,
    qualification,
    statut,
    startD,
    hourlyR,
    weeklyWork,
    // signature,
    signatureDate,
    contratReason,
    task,
    task_temp,
    convention,
    duration,
    periode_essai,
    rung,
    level,  
    /* Siege social */
    denominationSociale,
    adresseSiegeSocial,
    codePostalSiegeSocial,
    villeSiegeSocial,
    /* Caisse de retraite */
    nomCaisseRetraite,
    adresseCaisseRetraite,
    codePostalRetraite,
    villeRetraite,
    prenomPatron,
    nomPatron,

    //nomEntreprise,
    villeEntreprise,
    adresseEntreprise,
    codePostalEntreprise,
    )
{
    /* Etablissement => (Lieu de travail)
    - nom de l'etablissement => remplace dénomination sociale (article(3) lieu de travail)
    - adresse de l'etablissement
    - code postal de l'etablissement
    - ville de l'etablissement
    Voir avec Laurent if(denominationSociale == nomEntreprise) || if(!denominationSociale == nomEntreprise)
    */

    
    // const sup = getSup(qualification)

    
    const tasks = generateTask(task)
    
    const monthlyRenumeration = generateMonthlyR(hourlyR,weeklyWork,duration)
    const endDate = generateTimeLaspe(startD,duration)
    // signature = generateSignature(signature)
    
       
    statut = statut.toLowerCase()
    qualification = qualification.toLowerCase()

    
    const correctPastParticiple = feminineOrMasculine(civility)
    const correctArticle = isFirstLetterAVowel(qualification)

    // ICI MISE EN FORME DU HTML pour le convertire en PDF / HERE FORMATTING HTML to convert to PDF
    return(
        "<h2 align='right'>"+
        '<strong>CONTRAT DE TRAVAIL<br/>À DURÉE DÉTERMINÉE (CDD) À '+ task_temp+'</strong>'+
        "</h2>"+
        "<p>Entre les soussignés :</p>"+
        "L'entreprise "+ denominationSociale +" dont le siège social est situé "+ adresseSiegeSocial +" à "+ villeSiegeSocial +", "+ codePostalSiegeSocial +", représentée par "+ prenomPatron +" "+ nomPatron +", agissant en qualité d'employeur"+  "." +
        "</p>"+
        "<p>"+
            "(ci-après désignée \" l'Entreprise \")"+
        "</p>"+
        "<p>D'une part,</p>"+
        "<p>ET</p>"+

        "<p>"+
            ""+civility+ "."+firstName+ " " +name+", " + correctPastParticiple + " le "+birthdate+", dont le N° de Sécurité "+
            ""+"Sociale est "+socialN+", demeurant à l'adresse suivante : "+adress+", "+postalC+ "." +
        "</p>"+

        "<p>(ci-après désigné \"le salarié\")</p>"+

        "<p>"+
            "D'autre part,<br/>"+
            "Il a été convenu et arrêté ce qui suit :"+
        "</p>"+

        "<h3>Article 1 - Objets du contrat</h3>"+

        "<p>"+
            "Le salarié est engagé en contrat à durée déterminée "+ generateContratReason(contratReason) + "." +
        "</p>"+

        "<h3>Article 2 : Durée du contrat</h3>"+

        "<p>"+
            "Ce contrat prend effet à compter du "+startD+" et prendra fin de plein droit le "+endDate+", soit pour une "+
            "durée de "+duration+" mois, en exerçant la fonction de "+ statut + "." +
        "</p>"+

        "<h3>Article 3 : Fonctions et lieu d'exercice</h3>"+

        "<p>"+
            "Le salarié est engagé en qualité de " + correctArticle  + qualification + ", au niveau " + level +' et à l\'échelon ' + rung + ", sous l'autorité du dirigeant d'entreprise ou référent hiérarchique désigné par ce dernier. " +
            "Il exercera ses fonctions à "+ denominationSociale + ", " + adresseEntreprise + " " + codePostalEntreprise + " " + villeEntreprise + " et aura pour principales missions : "  + tasks + "." + "<br><br>"+
            "Ses horaires seront les suivants : "+weeklyWork+"h/semaine et peuvent être amenés à être modifiés selon les besoins de "+
            "l'entreprise sous réserve d'un délai de prévenance de 8 jours."+
        "</p>"+

        "<h3>Article 4 : Période d'essai</h3>"+

        "<p>"+
            "Il est convenu entre l'employeur et le salarié une période d'essai de "+ periode_essai +", au cours de "+
            "laquelle chacune des parties pourra rompre le présent contrat sans motifs, préavis, ni indemnités. En cas de "+
            "suspension du contrat de travail, cette période d'essai sera prolongée d'autant."+
        "</p>"+


        "<h3>Article 5 : Rémunération et frais</h3>"+

        "<p>"+
            "En contrepartie de son activité, le salarié percevra une rémunération mensuelle brute de "+monthlyRenumeration+" euros pour une durée "+
            "mensuelle, soit l'équivalent d'un salaire de base horaire de "+hourlyR+" €/h." +
            "Les frais professionnels du salarié engagés dans l'exercice de ses fonctions lui seront remboursés sur présentation "+
            "des justificatifs à son supérieur hiérarchique."+
        "</p>"+

        "<h3>Article 6 - Horaires de travail</h3>"+

        "<p>"+
        "Le salarié est engagé pour un horaire hebdomadaire de " + weeklyWork +"h par semaine."+
        "Ces horaires pourront être modifiés selon les nécessités de l'activité de l'Entreprise, sans que cela ne constitue une modification du contrat de travail.  Conformément à la législation en vigueur, il est également convenu que le salarié pourra effectuer des heures supplémentaires, en fonction des besoins et impératifs de l'Entreprise.  Il s'engage expressément à accepter les heures supplémentaires demandées par l'employeur pour la bonne marche de l'Entreprise. Ces heures sont réglementées dans la limite du contingent autorisé et selon les conditions légales et conventionnelles en vigueur.<br/>"+
        "<p>"+

        "<h3>Article 7 : Congés payés </h3>"+

        "<p>"+
            "Le salarié bénéficiera des mêmes droits aux congés payés que les autres salariés. S'il n'a pu prendre ses congés"+
            " payés, le salarié bénéficiera d'une indemnité compensatrice de congés payés à la fin de son contrat."+
        "</p>"+


        "<h3>Article 8 : Droits collectifs </h3>"+

        "<p>"+
            "Le présent contrat est soumis à la convention collective "+convention+
            ". Le salarié bénéficie en outre des mêmes droits et avantages sociaux que les autres salariés.<br/><br/>"+
            "Il cotise à la caisse de retraite complémentaire et à l'organisme de prévoyance. "+
        "</p>"+


        "<h3>Article 9 : Règlement intérieur </h3>"+

        "<p>"+
            "Le salarié s'engage à respecter le règlement intérieur de l'entreprise consultable à l'accueil de l'entreprise et "+
            "sur le réseau intranet de l'entreprise."+
        "</p>"+

        "<h3>Article 10 : Fin du contrat</h3>"+

        "<p>"+
            "Au terme de son contrat, le salarié percevra une indemnité de fin de contrat aux conditions légales en vigueur qui"+
            "sera versée en même temps que son dernier salaire."+
        "</p><br/>"+



        "<p>Fait en double exemplaire le "+signatureDate+" à "+ villeEntreprise +"</p>"+


        "<div style='margin-left: 10%;' 'margin-bottom: 10%;'>"+ prenomPatron +" "+ nomPatron + ":</div>"+
        "<div style='margin-left: 10%;'>"+firstName+ " " +name+":</div>"
    )

}

// //fonction qui donne le supèrieur de la personne engagé
// function getSup(qualification){

//     //coté cuisine 
//     if(qualification=='Cuisinier' || qualification=='Plongeur' || qualification == 'Employé de restauration' ){
//         return 'Commis de cuisine'
//     }
//     else if(qualification=='Commis de cuisine'){
//         return 'Demi chef de partie'
//     }
//     else if(qualification=='Demi chef de partie'){
//         return 'Chef de partie'
//     }
//     else if(qualification=='Chef de partie'){
//         return 'Second de cuisine'
//     }
//     else if(qualification=='Second de cuisine'){
//         return 'Chef de cuisine'
//     }

//     //coté Salle 
//     else if ( qualification=='Runner' || qualification=='Serveur' ){
//         return 'Commis de salle'
//     }

//     else if(qualification=='Commis de salle'){
//         return 'Demi chef de rang'
//     }

//     else if(qualification=='Demi chef de rang'){
//         return 'Chef de rang'
//     }

//     else if(qualification=='Chef de rang'){
//         return 'Maîtres d’hôtel'
//     }

//     else if(qualification=='Maîtres d’hôtel'){
//         return 'Responsable Restauration'
//     }

//     //Le patrons des patrons
//     else if ( qualification=='Responsable Restauration' || qualification=='Chef de cuisiner' ){
//         return 'Directeur restauration'
//     }

// }

// *********** HERE GRAMMATICAL FUNCTIONS TO CONJUGATE CORRECTLY *********
// Depending on the variables sent by the user, we have to adapt our text so that it remains grammatically correct.
function feminineOrMasculine(civility){
    if (civility == 'Mme'){
        return 'née'
    }
    return 'né'
}

function isFirstLetterAVowel(word) {
    var vowels = ["a","e","i","o","u"];
    if (vowels.indexOf(word[0].toLowerCase()) >= 0) {   
        return "d'" 
    } 
    return "de "
}

//fonction qui fait la mise en forme de la raison du Contrat / function that forms the reason for the Contract
function generateContratReason(contratReason){
    console.log('raison du contrat :: ' + contratReason)
    if(contratReason === "Accroissement temporaire de l’activité"){
        return ("afin de palier à un "+ contratReason)
    }
    else if(contratReason === "Remplacement d'une absence"){
        return "afin de remplacer un salarié"
    }
    else if(contratReason === "Emploi Saisonier"){
        return "afin d'assurer un emploi saisonier'"
    }
    else if(contratReason === "CDD spéciaux (CDD d'insertion, Contrats de professionnalisation et d'apprentissage, CDD à objet défini, CDD senior ou Contrat de vendanges"){
        return "afin d'assurer un CDD à caractère spécial'"
    }
    return ""
}



// ************** HERE ALGORITHMS TO CALCULATE NUMBERS, DURATIONS, SALARIES... **************

//Fonction qui calcule la date de fin du CDD par rapport au temps de la mission / Function that calculates the end date of the CDD in relation to the mission time
function generateTimeLaspe(startD,duration){
    console.log(startD)
    console.log(duration)

    var tmp 
    startD = startD.split("/").reverse().join("-")
    let date1 = new Date(startD)

    tmp = (30.5*24*60*60*1000)*parseInt(duration[0])+date1.getTime()

    /*if(duration.indexOf("mois") != -1){
        tmp = (30.5*24*60*60*1000)*parseInt(duration[0])+date1.getTime()
    }
    else if(duration.indexOf("semaine(s)") != -1){
        tmp = (7*24*60*60*1000)*parseInt(duration[0])+date1.getTime()
    }
    else if(duration.indexOf("jour(s)") != -1){
        tmp = (24*60*60*1000)*parseInt(duration[0])+date1.getTime()
    }*/

    let endDate_tab = new Date(tmp).toLocaleDateString().split("/")
    let endDate = endDate_tab[1]+"/"+endDate_tab[0]+"/"+ parseInt(parseInt(endDate_tab[2])+2000)

    return endDate  
    
}

// The calcul : taux horaire brut * nombre d'heures par SEMAINE * nombre semaines dans l'année / 12 mois
function generateMonthlyR(hourlyRate, weeklyWork){
    const numberOfWeeks= weeksInYear()  
    const monthlyRate = (parseFloat(hourlyRate) * parseFloat(weeklyWork) * numberOfWeeks / 12)   
    const roundedMonthlyRate = precise_round(monthlyRate, 2)
    return roundedMonthlyRate
}

// With these two functions below we can calculate how many weeks there were this year (as some years have 52 weeks, and others 52)
function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    return [d.getFullYear(), weekNo];
  }
  
function weeksInYear() {      
    var date = new Date();
    var thisYear = date.getFullYear();
    var d = new Date(thisYear, 11, 31);
    var week = getWeekNumber(d)[1];
    return week == 1 ? 52 : week;
}

//Function that keeps only two decimals and round the number
function precise_round(num, decimals) {
    var t = Math.pow(10, decimals);   
    return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
 }

// *************** HERE FUNCTIONS TO ADAPTATE THE STYLE TO OUR NEEDS **********
function generateTask(task){
    let i = 0
    let tasks = ""
    while( i < task.length ){
        tasks+="<center>- "+task[i].toString().toLowerCase()+"</center><br/>"
        i++
    }
    return tasks
}