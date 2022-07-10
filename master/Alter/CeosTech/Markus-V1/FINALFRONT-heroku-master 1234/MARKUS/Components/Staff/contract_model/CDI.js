import Registration from '../../Connexion/Inscription/Registration'

export function createCDI(
    civility,
    firstName,
    name,
    birthdate,
    nationality,
    birthplace,
    socialN,
    adress,
    postalC,
    qualification,
    statut,
    startD,
    hourlyR,
    task,
    task_temp,
    coefEch,
    weeklyWork,
    signatureDate,
    periode_essai,
    rung,
    level,
    denominationSociale,
    adresseSiegeSocial,
    codePostalSiegeSocial,
    villeSiegeSocial,
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
    // signature
    ) {
    
   const tasks = generateTask(task)
    const monthlyRenumeration = generateMonthlyR( hourlyR, weeklyWork)
    const hourly_to_monthly = generate_Hourly_to_Monthly(weeklyWork)
    statut = statut.toLowerCase()
    qualification = qualification.toLowerCase()

    const correctPronoun = feminineOrMasculine(civility)
    const correctArticle = isFirstLetterAVowel(qualification)

    return(
        '<h2 align="right"><strong>CONTRAT DE TRAVAIL<br/>' +
        'À DURÉE INDÉTERMINÉE (CDI) À '+ task_temp+'</strong></h2>' +

        'Entre les soussignés :<br/>'+

        "L'entreprise "+ denominationSociale +" dont le siège social est situé à "+ adresseSiegeSocial +" à "+ villeSiegeSocial +" "+ codePostalSiegeSocial +", représentée par "+ prenomPatron +" "+ nomPatron +", agissant en qualité d'employeur<br/>"+

        "(ci-après désignée \""+"l'Entreprise\")<br/>"+

        "D'une part,<br/><br/>"+

        'ET<br/><br/>' +

        civility+'.'+name+", né le "+birthdate+", dont le N° de Sécurité Sociale : "+socialN+" demeurant à "+adress+", "+postalC+ '<br/><br/>' +

        "(ci-après désigné \"le salarié\")<br/>"+

        "<br/>D'autre part, <br/>"+

        "Il a été convenu et arrêté ce qui suit : <br/>"+

        "<br/><h3>Article 1 - Engagement</h3>"+

        "À compter du "+ startD +", l'Entreprise engage " +civility+'.'+name+" à "+ task_temp.toString().toLowerCase() +" et pour une durée indéterminée. Pour ce faire, "+ correctPronoun +" se déclare libre de tout engagement.  Le présent contrat ne deviendra définitif qu'après la visite médicale d'embauche décidant de l'aptitude physique à l'emploi de Poste du salarié.  La déclaration préalable d'embauche a été faite auprès de l'URSSAF. Il pourra être exercé auprès de cet organisme un droit d'accès et de rectification que confère la loi n° 78-17 du 06 janvier 1978 aux salariés."
        +"<br/><br/>"+
        "<br/><h3><strong>Article 2 - Période d'essai et Préavis</strong></h3>"+

        "En accord avec la convention collective applicable, le présent contrat ne deviendra définitif qu'à l'issue d'une période d'essai de "+periode_essai+". Cette période d'essai est renouvelable une fois.  Durant cette période d'essai, chacune des parties pourra rompre à tout moment le contrat, sans préavis ni indemnité, sous respect du délai de prévenance prévu aux articles L. 1221-25 et L. 1221-26 du Code du travail.  Toute suspension qui se produirait pendant la période d'essai (maladie, congés, ...) prolongerait d'autant la durée de cette période, qui doit correspondre à un travail effectif.  Au terme de la période d'essai, si cette dernière s'est avérée satisfaisante, le présent contrat deviendra définitif et se poursuivra pour une période indéterminée.<br/>"+

        "<br/><h3><strong>Article 3 - Durée du contrat</strong></h3>"+

        "Sous condition de validation de la période d'essai, le présent contrat est à durée indéterminée. Il pourra prendre fin à tout moment, à l'initiative du salarié ou de l'Entreprise, sous respect des dispositions légales et conventionnelles en vigueur et hormis cas de faute grave ou lourde ou cas de force majeure.  Le délai de préavis dû par l'Entreprise en cas de rupture du contrat de travail est fixé par les articles L 122-5 et L 122-6 du Code du travail, ainsi que par la convention collective applicable dans l'Entreprise, en fonction de l'ancienneté que le salarié aura acquise au moment de son départ.<br/>"+

        "<br/><h3><strong>Article 4 - Emploi et Qualification</strong></h3>"+

        "Le salarié est engagé en qualité " +correctArticle + qualification+ ", au niveau " + level +' et à l\'échelon ' + rung + ', ainsi qu\'au statut suivant : '+statut+". Ses fonctions, effectuées pour le compte de l'Entreprise, consisteront notamment en les suivantes :"+
        
        tasks

        +"Ces fonctions sont néanmoins données à titre indicatif et ne sont ni exhaustives ni définitives."+


        "<br/><h3><strong>Article 5 - Lieu de travail</strong></h3>"+

        "Le salarié exercera ses fonctions à "+denominationSociale+", "+adresseEntreprise+" à "+villeEntreprise+" "+codePostalEntreprise+". Il pourra être amené à se déplacer partout où les nécessités de ses fonctions l'exigeront, dans le même secteur géographique.<br/>"+


        "<br/><h3><strong>Article 6 - Clause de mobilité</strong></h3>"+

        "Le lieu de travail, défini à l'article 5 du présent contrat, pourra être modifié par l'Entreprise, temporairement ou de manière permanente, pour des impératifs liés à l'activité, à l'organisation et/ou au bon fonctionnement de l'Entreprise. Il pourra donc être amené à exercer ses fonctions en tout lieu du territoire national.<br/>"


        +"<br/><h3><strong>Article 7 - Rémunération</strong></h3>"+

        "En contrepartie de son travail, il percevra une rémunération mensuelle brute de "+ monthlyRenumeration + "€, pour " + hourly_to_monthly + " heures par mois. Ce qui équivaut à un taux horaire brut de "+hourlyR+" euros par heure.<br/>"+

        "<br/><h3><strong>Article 8 - Horaires de travail</strong></h3>"+

        "Le salarié est engagé pour un horaire hebdomadaire de " + weeklyWork +"h par semaine."+

        "Ces horaires pourront être modifiés selon les nécessités de l'activité de l'Entreprise, sans que cela ne constitue une modification du contrat de travail.  Conformément à la législation en vigueur, il est également convenu que le salarié pourra effectuer des heures supplémentaires, en fonction des besoins et impératifs de l'Entreprise.  Il s'engage expressément à accepter les heures supplémentaires demandées par l'employeur pour la bonne marche de l'Entreprise. Ces heures sont réglementées dans la limite du contingent autorisé et selon les conditions légales et conventionnelles en vigueur.<br/>"+


        "<br/><h3><strong>Article 9 - Congés payés</strong></h3>"+

        "Le salarié bénéficiera des congés payés institués par les dispositions légales et conventionnelles, soit actuellement 2,5 jours ouvrables de congés payés par mois de travail effectif, soit 30 jours ouvrables pour une période de travail calculée du 1er juin de l'année précédente au 31 mai de l'année en cours.  Les dates de congés seront déterminées par accord entre la direction et le salarié, selon les nécessités de l'activité et les impératifs d'organisation de l'Entreprise.<br/>"+


        "<br/><h3<strong>Article 10 - Heures d'absences</strong></h3>"+

        "Les heures d'absences ou d'aménagement d'horaires pour convenance personnelle, devront obligatoirement recevoir l'accord du chef d'Entreprise, faute de quoi ces absences seront considérées comme injustifiées.  En cas d'absence pour maladie, le salarié devra prévenir de son absence dans les plus brefs délais. Il devra ensuite justifier son absence dans les 48 heures, par la production d'un certificat médical, faute de quoi cette absence sera considérée comme injustifiée et constituera une faute grave.<br/>"+


        "<br/><h3><strong>Article 11 - Retraite et Prévoyance</strong></h3>"+

        "Dès son entrée dans l'Entreprise, le salarié sera affilié à la caisse de retraite de l'Entreprise, à savoir "+nomCaisseRetraite+", "+adresseCaisseRetraite+", "+codePostalRetraite+" "+villeRetraite+".<br/>"+


        "<br/><h3><strong>Article 12 - Confidentialité</strong></h3>"+

        "Le salarié s'engage à conserver une discrétion totale sur toutes les informations auxquelles il aurait pu avoir accès au cours de l'exercice de ses fonctions, que ces informations concernent l'Entreprise ou les clients de l'Entreprise. Il s'engage à ne communiquer à des tiers aucune information touchant aux travaux, aux inventions, aux procédés, aux méthodes, à l'organisation de l'Entreprise.  Cette obligation se prolongera après la cessation du contrat de travail, qu'elle qu'en soit la cause.<br/>"+


        "<br/><h3><strong>Article 13 - Conditions d'exécution du présent contrat</strong></h3>"+

        "<p>Le salarié s'engage à observer toutes les instructions et consignes particulières de travail qui lui seront données.  Il s'engage à faire connaître à l'Entreprise sans délai toutes modifications de son état civil, sa situation de famille, son adresse, etc., pouvant intervenir après son engagement.  Il reconnaît avoir pris connaissance du présent contrat, en accepte les modalités et s'engage expressément à les respecter.  Le présent contrat est établi en deux exemplaires originaux dont l'un devra être retourné signé à l'Entreprise dans les plus brefs délais.</p><br/>"+


        "<p>Fait à "+villeEntreprise+", le "+signatureDate+".</p>"+

        "<div style='margin-left: 10%;' 'margin-bottom: 10%;'>"+ prenomPatron +" "+ nomPatron + ":</div>"+
        "<div style='margin-left: 10%;'>"+firstName+ " " +name+":</div>"


    )

}

// *********** HERE GRAMMATICAL FUNCTIONS TO CONJUGATE CORRECTLY *********
// Depending on the variables sent by the user, we have to adapt our text so that it remains grammatically correct.
function feminineOrMasculine(civility){
    if (civility == 'Mme'){
        return 'elle'
    }
    return 'il'
}

function isFirstLetterAVowel(word) {
    var vowels = ["a","e","i","o","u"];
    if (vowels.indexOf(word[0].toLowerCase()) >= 0) {   
        return "d'" 
    } 
    return "de "
}



// ************** HERE ALGORITHMS TO CALCULATE NUMBERS, DURATIONS, SALARIES... **************

// The calcul : taux horaire brut * nombre d'heures par SEMAINE * nombre semaines dans l'année / 12 mois
function generateMonthlyR(hourlyRate, weeklyWork){
    const numberOfWeeks= weeksInYear()  
    const monthlyRate = (parseFloat(hourlyRate) * parseFloat(weeklyWork) * numberOfWeeks / 12)   
    const roundedMonthlyRate = precise_round(monthlyRate, 2)
    return roundedMonthlyRate
}

// The calcul : nombre d'heures par SEMAINE * nombre semaines dans l'année / 12 mois
function generate_Hourly_to_Monthly(weeklyWork){  
    const numberOfWeeks= weeksInYear()   
    const monthlyHour = (parseFloat(weeklyWork) * numberOfWeeks / 12)
    return precise_round(monthlyHour, 0)
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