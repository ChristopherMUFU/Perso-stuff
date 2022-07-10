export function createAvenant(
    type,
    typeMod ,
    convention,  
    employe ,
    signDate,
    signDateVigeur,
    numArticle ,
    titreArticle, 
    redaction,
    signature

){
    //Mise au format de l'objets Date / Format object Date 
    const nowDate_tab = new Date(Date.now()).toLocaleDateString().split("/")
    const nowDate = nowDate_tab[1]+"/"+nowDate_tab[0]+"/"+ parseInt(parseInt(nowDate_tab[2])+2000)
    return(
        "<!DOCTYPE html>"+
        "<html>"+
        "   <head>"+
        "       <meta charset='utf-8' />"+
        "       <title>HTMLiveCode</title>"+
        "       <style type='text/css'>"+
        "           p{font-size : 1.1em}"+
        "       </style>"+
        "  </head>"+

        "<body>"+
       
        "   <hr>"+
        "   <h1 style='text-align: center;'>AVENANT AU CONTRAT DE TRAVAIL<br>"+type+"</h1>" +
        "   <hr>" +
        "   <br><br>"+
        "   <p>Le present avenant est conclu entre les soussignés : </p>"+
        "   <p>"+
        "       L'entrprise [Nom Entreprise] dont le siège social est située à [adress Entreprise]<br>"+
        "       représentée par [nom du représentant] , agissant en qualité d'employeur<br>"+
        "       (ci-après designée \"l'Entreprise\")"+
        "       D'une part,"+
        "   </p>"+

        "   <p>ET</p>"+

        "   <p>"+
        "       "+employe.civility+" "+employe.firstName+" "+employe.name+", né le "+employe.bornDate+" ,dont le N° de Sécurité Sociale:"+
        "       "+employe.numSecu+" deumerant à "+employe.adress+", "+employe.ville+" ,"+employe.postalC+
        "   </p>"+

        "   <p>"+
        "       D'autre part,<br>"+
        "       Il a été convenu et arrêté ce qui suit:"+
        "   </p>"+

        "   <h3>Préambule</h3>"+

        "   <p>"+
        "       Les partie on signé le contrat de travaille le "+signDate+
        "       Les parties se sont mises d'accord afin [d'ajouter/modifier] 1 article"+
        "       dudit contrat de"+
        "       travail de la façons suivante : [if suppr 'Est supprimé l'article suivant:'+li]"+
        "   </p>"+

        "   <h3>Les autres articles reste inchangés.</h3>"+

        "   <p>La date d'entrée en vigeur du présent avenant est le "+signDateVigeur+"</p>"+
        "   <p>Fait le "+nowDate+"</p><br>"+
        "   <div style='margin-left: 10%; word-spacing: 300px;'>Employeur: Salarié:</div>"




    )
}