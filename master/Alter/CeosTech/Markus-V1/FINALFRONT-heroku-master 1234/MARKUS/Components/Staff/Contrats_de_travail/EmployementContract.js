import React from 'react';
import { Alert, Dimensions, Text, View, TextInput, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';


import { getRestaurantOwnerDetail } from '../../../API/AccountsData';


    /* Title for the differents inputs */
        const convention = "Convention collective"
        const civility = "Civilité"
        const name = "Nom"
        const firstName = "Prénom"
        const employee_phone = "Numéro de téléphone"
        const employee_mail = "Adresse mail"
        const birthdate = "Date de naissance"
        const nationality = "Nationalité"
        const birthplace = "Lieu de naissance"
        const social_number = " N° de sécurité sociale"
        const adress = "Adresse du salarié"
        const postal_code = "Code postal"
        const city = "Ville"
        const qualification = "Statut"
        const statut = "Poste"
        const level = "Niveau"
        const rung = "Échelon"
        const contract_reason = "Raison du contrat"
        const number_duration = "Durée du contrat (mois)"
        const type_duration = "Type"
        const start_date = "Début du contrat"
        const end_date = "Fin du contrat" 
        const weekly = "Nombre d'heures par semaine"
        const houry_rate = "Taux horaire brut en euros"
        const periode_essai = "Période d'essai"
        const signatureDate = "Date signature"
        /* Siège sociale */
        const  nomPatron = "Nom du représentant de l'entreprise"
        const  prenomPatron = "Prénom du représentant de l'entreprise"
        const denominationSociale = "Dénomination Sociale"
        const adresseSiegeSocial = "Adresse du siège social"
        const codePostalSiegeSocial = "Code postal du siège social"
        const villeSiegeSocial = "Ville du siège social"
        const nomCaisseRetraite = "Nom de la caisse retraite"
        const adresseCaisseRetraite = "Adresse de la caisse de retraite"
        const codePostalRetraite = "Code postal de la caisse de retraite"
        const villeRetraite = "Ville de la caisse de retraite"
        /* Etablissement */
        const nomEntreprise = "Nom de l'établissement"
        const villeEntreprise = "Ville de l'entreprise"
        const adresseEntreprise = "Adresse de l'établissement"
        const codePostalEntreprise = "Code postal de l'établissement"
        




export default class EmployementContract extends React.Component{
    constructor(props){
        super(props);
        this.state={
            contratType: [
                {label: 'CDD' , value: "CDD"},
                {label: 'CDI' , value: "CDI"},
            ],

            civilities: [
                {label : 'Mme' , value: 'Mme'},
                {label : 'M.' , value: 'M.'}
            ],

            qualifications: [
                {label: 'Employé' , value: "Employé"},
                //  {label: 'Ouvrier' , value: "Ouvrier"},
                 {label: 'Agent de maitrise' , value: "Agent de maitrise"},
                 {label: 'Cadre', value: "Cadre"},
                //  {label: 'Cadre-dirigeant', value: "Cadre-dirigeant"},
                //  {label: 'Technicien', value: "Technicien"}


           
                // {label: 'Barman' ,value: "Barman"},
                // {label: 'Commis de cuisine' ,value: "Commis de cuisine"},
                // {label: 'Commis de salle' ,value: "Commis de salle"},
                // {label: 'Chef de cuisine' ,value: "Chef de cuisine"},
                // {label: 'Chef de partie' ,value: "Chef de partie"},
                // {label: 'Chef de rang' ,value: "Chef de rang"},
                // {label: "Maîtres d'hôtel", value: "Maîtres d'hôtel"},
                // {label: 'Demi chef de rang' ,value: "Demi chef de rang"},
                // {label: 'Demi chef de partie' ,value: "Demi chef de partie"},
                // {label: 'Cuisinier' ,value: "Cuisinier"},
                // {label: 'Employé restauration' ,value: "Employé restauration"},
                // {label: 'Plongeur' ,value: "Plongeur"},
                // {label: 'Second de cuisine' ,value: "Second de cuisine"},
                // {label: 'Serveur' ,value: "Serveur"},
                // {label: 'Runner' ,value:'Runner' }
            ],

            statuts:[
                {label: 'Barman' ,value: "Barman"},
                {label: 'Commis de cuisine' ,value: "Commis de cuisine"},
                {label: 'Commis de salle' ,value: "Commis de salle"},
                {label: 'Chef de cuisine' ,value: "Chef de cuisine"},
                {label: 'Chef de partie' ,value: "Chef de partie"},
                {label: 'Chef de rang' ,value: "Chef de rang"},
                {label: 'Demi chef de rang' ,value: "Demi chef de rang"},
                {label: 'Demi chef de partie' ,value: "Demi chef de partie"},
                {label: 'Cuisinier' ,value: "Cuisinier"},
                {label: 'Employé restauration' ,value: "Employé restauration"},
                {label: 'Plongeur' ,value: "Plongeur"},
                {label: 'Second de cuisine' ,value: "Second de cuisine"},
                {label: 'Serveur' ,value: "Serveur"},
                {label: 'Runner' ,value:'Runner' }

            ],

            // statuts:[
            //     {label: 'Employé' , value: "Employé"},
            //     {label: 'Ouvrier' , value: "Ouvrier"},
            //     {label: 'Agent de maitrise' , value: "Agent de maitrise"},
            //     {label: 'Cadre', value: "Cadre"},
            //     {label: 'Cadre-dirigeant', value: "Cadre-dirigeant"},
            //     {label: 'Technicien', value: "Technicien"}
            // ],

            conventions : [
                {label: "HCR (Hôtel, café, restaurant)" , value: "HCR"},
                {label: "SNARR (Restauration rapide)" , value: "SNARR"},
                // {label: "Convention de la restauration rapide" , value: "Convention de la restauration rapide"},
                // {label: "Convention personnelle des entreprises de restauration de collectivités" , value: "Convention personnel des entreprises de restauration de collectivités"},
                // {label: "Convention collective de la boucherie, boucherie-charcuterie, boucherie-hippophagique, triperie, commerces de volailles et gibiers (traiteur)" , value: "Convention collective de la boucherie, boucherie-charcuterie, boucherie-hippophagique, triperie, commerces de volailles et gibiers (traiteur)"},
                // {label: "Convention collective de la charcuterie de détail" , value: "Convention collective de la charcuterie de détail"},
            ],

            reasons: [
                {label : "Remplacement d'une absence", value: "Remplacement d'une absence"},
                {label : "Accroissement temporaire de l'activité",value: "Accroissement temporaire de l'activité"},
                {label : "Emploi saisonnier",value: "Emploi saisonnier"},
                {label : "CDD d'usage",value: "CDD d'usage"},
                
            ],

            // reasons: [
            //     {label : "Accroissement temporaire de l’activité", value: "Accroissement temporaire de l’activité"},
            //     {label : "Remplacement d’un salarié",value: "Remplacement d’un salarié"},
            //     {label : "Emploi Saisonier",value: "Emploi Saisonier"}
            // ],

            durations:[
                {label : "mois",value: "mois"},
                {label :"semaine(s)",value: "semaine(s)"},
                {label : "jour(s)" , value: "jour(s)"},
            ],

            tasks:{
                    barman:[
                    "Service et vente",
                    "Réalisation de cocktails et boissons diverses à la demande",
                    "Accueil du client et suivi du client",
                    "Approvisionnement et mise en place"],

                    commis:[
                        "Réalisation des préparations préliminaires (épluchage des légumes, fonds, courts bouillons…)",
                        "Réalisation de mets simples",
                        "Organisation du poste de travail",
                        "Dressage, distribution",
                        "Entretien de la cuisine et des locaux annexes"
                    ],

                    chefc:[
                        "Organisation de l’approvisionnement et du travail",
                        "Production culinaire",
                        "Analyse du coût des recettes",
                        "Management (planning délégation, évaluation des compétences…)",
                        "Contrôle du respect des règles d’hygiène"
                    ],

                    chefp:[
                        "Création et réalisation de desserts, entremets salés ou sucrés",
                        "Préparation des commandes, dressage des préparations et distribution",
                        "Contrôle de la qualité",
                        "Application stricte des normes d’hygiène et de sécurité alimentaires"
                    ],

                    chefr:[
                        "Relations avec la clientèle",
                        "Mise en place",
                        "Accueil et accompagnement du client",
                        "Prise de commande et service"
                    ],

                    cuisinier:[
                        "Approvisionnement/stockage (réception et vérification des livraisons, réalisation d’inventaires…)",
                        "Organisation du travail et de la production (planification des tâches…)",
                        "Production culinaire",
                        "Dressage et envoi des préparations",
                        "Application et contrôle des normes d’hygiène et de sécurité"      
                    ],

                    aidec:[
                        "Production culinaire",
                        "Préparations préliminaires",
                        "Dressage distribution",
                        "Dressage, distribution",
                        "Entretien de la cuisine et des locaux annexes"
                    ],

                    employep:[
                        "Application des principes fondamentaux du nettoyage",
                        "Application des consignes de production (fiches recettes, grammage, bons de production,...)",
                        "Application des consignes de vente"
                    ],

                    plongeur:[
                        "Approvisionnement en produits lessiviels",
                        "Lavage à la main, utilisation du lave-vaisselle",
                        "Tri de la vaisselle avant et après lavage, utilisation de la sécheuse",
                        "Application stricte des normes d’hygiène et de sécurité",
                        "Vérification de la propreté et tri en sortie"
                    ],

                    secondc:[
                        "Management, animation d’équipe (en lien avec le Chef de Cuisine)",
                        "Gestion des budgets et des stocks",
                        "Production culinaire"
                    ],

                    serveur:[
                        "Mise en place de la salle",
                        "Accueil, conseil et service du client",
                        "Réalisation et vérification des opérations d’encaissement"
                    ],

                    runner:[
                        "Mise en place de la salle",
                        "Accueil, conseil et service du client",
                        "Réalisation et vérification des opérations d’encaissement"
                    ],      

                    commisS:[
                        "Dresser les tables",
                        "Réaliser la mise en place de la salle et de l’office",
                        "Accueillir le client à son arrivée au restaurant, l’installer à une table et lui présenter la carte",
                        "Conseiller les clients dans ses choix de plats selon ses goûts, les suggestions du jour et prendre les commandes",
                        "Traiter les commande",
                        "Réaliser le service en salle",
                        "Veiller à la satisfaction des clients",
                        "Débarrasser les tables",
                        "Nettoyer la salle de réception",
                    ],
                    demiChefR: [
                        "Effectuer le nettoyage et l’entretien de la salle de restauration.",
                        "Effectuer la mise en place de la salle de restauration et des annexes en fonction de l’activité.",
                        "Accueillir la clientèle en salle de restauration ou au bar et présenter les différentes prestations commerciales.",
                        "Réaliser la prise de commande manuelle ou numérique du ou des clients.",
                        "Préparer et servir les boissons.",
                        "Préparer, vérifier une note et l’encaisser.",
                        "Réaliser la mise en place d’un banquet ou d’un buffet à partir des consignes données.",
                        "Effectuer le service et le débarrassage d’un buffet/banquet",
                    ],
                    
                    demiChefP: [
                        "Assurer la mise en place",
                        "Assurer le nettoyage",
                        "Réalisation des préparations préliminaires",
                        "Réalisation de recettes à partir de fiches techniques",
                        "Réalisation des plats et envoi des plats durant le service",
                        "Approvisionnement stockage",
                        "Réalisation d’inventaires",
                        "Stockage des denrées selon les méthodes prescrites dans l’établissement",
                        "Préparation du matériel de service",
                        "Dressage et envoi des assiettes",
                        "Réponse aux annonces et commandes",
                        "Mise en valeur des présentations"
                    ],
            },

            tasks_temp:{
                temps_plain: ["TEMPS PLEIN"],
                temps_partiel:["TEMPS PARTIEL"]

            },

            rungs:[
                {label: "1", value:"1"},
                {label: "2", value:"2"},
                {label: "3", value:"3"}
                
                // "echelon 1",
                // "echelon 2",
                // "echelon 3"
            ],

            levels:[
                {label: "I", value:"I"},
                {label: "II", value:"II"},
                {label: "III", value:"III"},
                {label: "IV", value:"IV"},
                {label: "V", value:"V"}
      
                // "niveaux 1",
                // "niveaux 2",
                // "niveaux 3",
                // "niveaux 4",
                // "niveaux 5"
            ],

            tasks_essai:{
                CDI:[
                    "2 mois",
                    "3 mois",
                    "4 mois",
                ],
                CDD:[
                    "2 jours",
                    "1 mois",
                    "Pas de période d'essai"
                ]

            },

            periode_essai_CDI:[
                    {label : "2 mois",value: "2 mois"},
                    {label :"3 mois",value: "3 mois"},
                    {label : "4 mois" , value: "4 mois"}
                ],

            periode_essai_CDD:[
                    {label : "2 jours",value: "2 jours"},
                    {label :"1 mois",value: "1 mois"},
                    {label : "Pas de période d'essai" , value: "Pas de période d'essai"}
                ],


            /* Values for the contract to fill in the pdf employement contract*/
            type: this.props.route.params.contract,
            civility: "",
            firstName: "" , 
            name: "",
            employeePhone: "",
            employeeMail: "",
            birthDate: "",
            placeBirth: "",
            socialNumber: "",
            adress: "",
            postalCode: "",
            city: "",
            nationality: "",
            qualification: "",
            level:"",
            rung:"",
            task: [],
            task_temp: '',
            task_essai: '',
            coefEch: "",
            statut: "",
            convention: '',
            contratReason: "",
            numberDuration: "",
            typeDuration: "",
            weeklywork: "",
            startDate: "",
            endDate: "" , 
            hourlyRate: "",
            signature: "",
            signatureDate: "",  
            denominationSociale: "",
            adresseSiegeSocial: "",
            codePostalSiegeSocial: "",
            villeSiegeSocial: "",
            nomCaisseRetraite: "",
            adresseCaisseRetraite: "",
            codePostalRetraite: "",
            villeRetraite: "",
            nomPatron: "",
            prenomPatron: "",
            nomEntreprise: "",
            villeEntreprise: "",     
            adresseEntreprise: "",
            codePostalEntreprise: "", 
            

            /*add an item*/
            addBool: false,
            action: "",
            add: "",

            /* show information */
            showInfo: false,

            /*error per type*/
            errorDuration: {bool: false, message: ""},
            errorSocialNumber: {bool: false, message: ""},
            errorBirthDate: {bool: false, message: ""},
            errorWeeklyWork: {bool: false, message: ""},
            errorHourlyRate: {bool: false, message: ""}
      }
    }

  

    _infosOwner(tab)
    {
        console.log(tab)
        this.setState({
            denominationSociale: tab.company.name,
            adresseSiegeSocial: tab.company.address,
            codePostalSiegeSocial: tab.company.postal_code,
            villeSiegeSocial: tab.company.city,
            nomCaisseRetraite: tab.company.retirement_fund_name,
            adresseCaisseRetraite: tab.company.retirement_fund_address,
            villeRetraite: tab.company.retirement_fund_city,
            codePostalRetraite: tab.company.retirement_fund_postal_code,
            nomPatron: tab.nom,
            prenomPatron: tab.prénom,
            nomEntreprise: tab.restaurant.name,
            villeEntreprise: tab.restaurant.city,     
            adresseEntreprise: tab.restaurant.address,
            codePostalEntreprise: tab.restaurant.postal_code, 

        })
    }

    
    componentDidMount()    {
         getRestaurantOwnerDetail().then( (data) => this._infosOwner(data[0]))
    }

    /* Go to the page "generation employement contract" */
    _goTo(){
        try {
            // this.saveSign()
            this.props.navigation.navigate("CreateEmployementContract", 
            {
                typeContract: this.state.type,
                civility: this.state.civility,
                firstName: this.state.firstName ,
                name: this.state.name,
                employeePhone: this.state.employeePhone,
                employeeMail: this.state.employeeMail,
                birthDate: this.state.birthDate,
                placeBirth: this.state.placeBirth,
                socialNumber: this.state.socialNumber,
                adress: this.state.adress,
                postalCode: this.state.postalCode +", "+ this.state.city,
                code_postal: this.state.postalCode,
                city: this.state.city,
                nationality: this.state.nationality,
                qualification: this.state.qualification,
                task: this.state.task,
                task_temp:this.state.task_temp,
                task_essai:this.state.task_essai,
                coefEch: this.state.coefEch,
                statut: this.state.statut,
                level: this.state.level,
                rung: this.state.rung,
                contratReason: this.state.contratReason,
                duration: this.state.numberDuration + " " + this.state.typeDuration,
                weeklyWork: this.state.weeklywork,
                startDate: this.state.startDate,
                hourlyRate: this.state.hourlyRate,
                signature: this.state.signature,
                signatureDate: this.state.signatureDate,
                periode_essai: this.state.periode_essai,
                endDate : this.state.endDate,
                convention : this.state.convention, 

                denominationSociale: this.state.denominationSociale,
                adresseSiegeSocial: this.state.adresseSiegeSocial,
                codePostalSiegeSocial: this.state.codePostalSiegeSocial,
                villeSiegeSocial: this.state.villeSiegeSocial,
                nomCaisseRetraite: this.state.nomCaisseRetraite,
                adresseCaisseRetraite: this.state.adresseCaisseRetraite,
                codePostalRetraite: this.state.codePostalRetraite,
                villeRetraite: this.state.villeRetraite,
                nomPatron: this.state.nomPatron,
                prenomPatron: this.state.prenomPatron,

                nomEntreprise: this.state.nomEntreprise,
                villeEntreprise: this.state.villeEntreprise,    
                adresseEntreprise: this.state.adresseEntreprise,
                codePostalEntreprise: this.state.codePostalEntreprise,

            });
        } catch (error) {
            console.log(error)
        }
    }

    /*Show specific field for a type of contract*/
    _hiddenField(){
        if(this.state.type == "CDD"){
            return(
                
              <>
                    <DropDownPicker
                        placeholder={contract_reason}
                        items={this.state.reasons}
                        
                        containerStyle= {
                            {   
                                marginTop : '3%',
                                height:55,
                                width:'90%'
                            }
                        }
                        style={{borderColor:'#04295D'}}
                        dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                        placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                        labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                        arrowColor = {'#04295D'}
                        onChangeItem={ (item) => this.setState({contratReason: item.value})}
                        />
                   

                                                  
                        <TextInput 
                            placeholder={number_duration}
                            placeholderTextColor={'#04295D'} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }} 
                            containerStyle = {styles.textinput}
                            containerStyle= {{ marginRight:5, height:55, width:"90%"}}
                            autoCorrect={false} 
                            keyboardType='numeric' 
                            value={this.state.numberDuration} 
                            onChangeText={(value)=>{ this.setState({ numberDuration: value.replace(',', '.') }); 
                            this._hasErrors("duration", value);}} 
                            />
                    

                     
                        { this.state.errorDuration.bool ? <Text style={{backgroundColor: "red", color: "white"}}>{this.state.errorDuration.message}</Text> : null}
                    
                   </>
                
            )
        }

    }

 

    _hiddenField4(){
        if(this.state.type == "CDI"){
            return(
                <DropDownPicker   
                            placeholder={periode_essai}
                            placeholderTextColor={'#04295D'} 
                            items={this.state.periode_essai_CDI}
                            style = {{backgroundColor: 'white', borderColor:'#04295D'}}
                            containerStyle= {
                                {   
                                    height:55,
                                    width:'90%',
                                    marginTop:'3%'
                                }
                            }
                            style={{borderColor:'#04295D'}}
                            dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                            placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                            labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                            arrowColor = {'#04295D'}
                            onChangeItem={ (item) => this.setState({task_essai: item.value})}
                        />
            )
        }
        if(this.state.type == "CDD"){
            return(
                <DropDownPicker   
                            placeholder={periode_essai} 
                            items={this.state.periode_essai_CDD}
                            style = {{backgroundColor: 'white'}}
                            // defaultValue={this.state.periode_essai}
                            containerStyle= {
                                {   
                                   
                                    height:55,
                                    width:'90%',
                                    marginTop:'3%'
                                }
                            }
                            style={{borderColor:'#04295D'}}
                            dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                            placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                            labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                            arrowColor = {'#04295D'}
                            onChangeItem={ (item) => this.setState({periode_essai: item.value})}
                        />
            )
        }
    }


    /* Get task according to the qualification selected */
   
    getTask(){
        if(this.state.statut == "Barman"){
            this.setState({task: this.state.tasks.barman})
        }
        else if( this.state.statut == "Commis de cuisine"){
            this.setState({task: this.state.tasks.commis})
        }
        else if( this.state.statut == "Commis de salle"){
            this.setState({task: this.state.tasks.commisS})
        }
        else if( this.state.statut == "Chef de cuisine"){
            this.setState({task: this.state.tasks.chefc})
        }
        else if( this.state.statut == "Chef de partie"){
            this.setState({task: this.state.tasks.chefp})
        }
        else if( this.state.statut == "Chef de rang"){
            this.setState({task: this.state.tasks.chefr})
        }     
        else if( this.state.statut == "Demi chef de rang"){
            this.setState({task: this.state.tasks.demiChefR})
        }              
        else if( this.state.statut == "Demi chef de partie"){
            this.setState({task: this.state.tasks.demiChefP})
        }        
        else if( this.state.statut == "Cuisinier"){
            this.setState({task: this.state.tasks.cuisinier})
        }
        else if( this.state.statut == "Aide de cuisine"){
            this.setState({task: this.state.tasks.aidec})
        }
        else if( this.state.statut == "Employé restauration"){
            this.setState({task: this.state.tasks.employep})
        }
        else if( this.state.statut == "Plongeur"){
            this.setState({task: this.state.tasks.plongeur})
        }
        else if( this.state.statut == "Second de cuisine"){
            this.setState({task: this.state.tasks.secondc})
        }
        else if( this.state.statut == "Serveur"){
            this.setState({task: this.state.tasks.serveur})
        }
        else if ( this.state.statut == "Runner"){
            this.setState({task: this.state.tasks.runner})
        }

        if( this.state.weeklywork < 35){
            this.setState({task_temp: this.state.tasks_temp.temps_partiel})
        }
        else if( this.state.weeklywork >= 35){
            this.setState({task_temp: this.state.tasks_temp.temps_plain})
        }
    }


    /* Monitoring for differents specific input */
    _hasErrors(action, value){ // "action" is the specific input and "value" is the value the user tap that we want to control
        switch(action) {
            case "duration":
                if(this.state.typeDuration != "" && this.state.typeDuration == "mois"){
                    return(parseFloat(value) > 18.0 ?  this.setState({errorDuration: {bool: true, message: "Le nombre de mois maximum est de 18 mois."}}) : this.setState({errorDuration: {bool: false}})) 
                } else if (this.state.typeDuration != "" && this.state.typeDuration == "jour(s)"){
                    return(parseFloat(value) > 547.501 ?  this.setState({errorDuration: {bool: true, message: "Le nombre de jours maximum est de 547 jours."}}) : this.setState({errorDuration: {bool: false}})) 
                } else if (this.state.typeDuration != "" && this.state.typeDuration == "heure(s)"){
                    return(parseFloat(value) > 13140 ?  this.setState({errorDuration: {bool: true, message: "Le nombre d'heures maximum est de 13140 heures."}}) : this.setState({errorDuration: {bool: false}})) 
                }

            case "socialnumber":
                if(value != ""){
                    return( value.length < 13 ? this.setState({ errorSocialNumber: { bool: true, message: "Attention le numéro de sécurité sociale doit faire 13 chiffres" } })  : this.setState({ errorSocialNumber: { bool: false, message: "" } }) )
                }
            
            case "birthdate":
                if(value != ""){
                    const age = this.getAge(this.state.birthDate)
                    return( parseFloat(age) < 18.0 ? this.setState({ errorBirthDate: {bool: true, message: "Attention l'âge minimum est de 18 ans" } }) : this.setState({ errorBirthDate: { bool: false} }) )
                }
            
            case "weekly":
                if(value != ""){
                    return( parseFloat(value) > 44.0 ? this.setState({ errorWeeklyWork: {bool: true, message: "Attention le travail d'heure par semaine ne peux pas excéder 44h/semaine"} }) : this.setState({ errorWeeklyWork: {bool: false, message: ""} }) )
                }

            case "hourlyRate":
                if(value != ""){
                    return( parseFloat(value) < 10.25 ? this.setState({ errorHourlyRate: {bool: true, message: "Attention le taux horaire brut ne peut pas être inférieur à 10.25€/h"} }) : this.setState({ errorHourlyRate: {bool: false, message: ""} }) )
                }
        
        }
    }

    /* Add a value into an array for the dropdown */
    _addItem = (action) =>{ //"action" is the specific input
        let newArray = []
        switch(action) {

            case "qualification":
                newArray = this.state.qualifications.slice();
                newArray.push({value: this.state.add});
                this.setState({qualification: this.state.add, qualifications: newArray, add: "", addBool: false });
                break;

            case "contractReason":
                newArray = this.state.reasons.slice();
                newArray.push({value: this.state.add});
                this.setState({contratReason: this.state.add, reasons: newArray, add: "", addBool: false });
                break;
            
            case "hourlyRate":
                newArray = this.state.hourlies.slice();
                newArray.push({value: this.state.add});
                this.setState({hourlyRate: this.state.add, hourlies: newArray, add: "", addBool: false });
                break;
            
            case "statut":
                newArray = this.state.statuts.slice();
                newArray.push({value: this.state.add});
                this.setState({statut: this.state.add, status: newArray, add: "", addBool: false });
                break;

        }
    }

    /* Little pop-up to add an value */
    _showAdd(){
        const hauteur = Dimensions.get('window').height;
        if(this.state.addBool && (typeof this.state.action != "undefined" || this.state.action != null)){
            if(this.state.action == "qualification" || this.state.action == "contractReason" || this.state.action == "hourlyRate" || this.state.action == "statut"){
                return(
                    <View style={{zIndex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', flex:1, height:hauteur, alignItems: "center"}}>
                        <View style={{top: "30%",width: "70%", backgroundColor: 'white', borderRadius: 6, alignItems: 'center'}}>
                            <Text>Ajout de valeur:</Text>
                            <TextInput placeholder="Entrez la valeur ici" style={styles.textname} onChangeText={(text) => {
                                this.setState({add: text})
                            }} autoCorrect={false} />
                            <View style={{flexDirection: "row"}}>
                                <TouchableOpacity onPress = {() => {this.setState({showInfo: false})}} style={{width:'30%', marginBottom: 10, marginRight: 5}}>
                                    <View style = {styles.button}>
                                        <Text style = {{color:'white'}}>Annuler</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {this._addItem(this.state.action);}} style={{width:'30%', marginBottom: 10}}>
                                    <View style = {styles.button}>
                                        <Text style = {{color:'white'}}>Ajouter</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        }
    }

    /*Show information to modify or confirm*/
    _showInformation(){
        return(
            <View style={styles.popup}>
                
                <View style={styles.popup_container}>

                <Text style={{color:"white"}}>Type de contrat : {this.state.type}</Text>

                <View style={{flexDirection: "row", marginTop: 5}}>
                    <View style={{borderBottomColor: 'white', borderBottomWidth: 2, width:"40%", marginBottom: 5, marginTop: 5}}></View>
                    <FontAwesomeIcon icon={ faUser } size={15} style={{color: "white"}}/>
                    <Text style={{color: "white"}}> Profil </Text>
                    <View style={{borderBottomColor: 'white', borderBottomWidth: 2, width:"40%", marginBottom: 5, marginTop: 5}}></View>
                </View>

                <Text style={{color:"white"}}>{this.state.civility+'.'+this.state.name+ " " +this.state.firstName}</Text>
                <Text style={{color:"white"}}>Né(e) le : {this.state.birthDate}</Text>
                <Text style={{color:"white"}}>A : {this.state.placeBirth}</Text>
                <Text style={{color:"white"}}>Numero Sécurité Sociale : {this.state.socialNumber}</Text>
                <Text style={{color:"white"}}>Adresse : {this.state.adress + ', ' + this.state.postalCode + ' ' + this.state.city}</Text>
                <Text style={{color:"white"}}>Nationalité : {this.state.nationality}</Text>

                <View style={{flexDirection: "row", marginTop: 5}}>
                    <View style={{borderBottomColor: 'white', borderBottomWidth: 2, width:"30%", marginBottom: 5, marginTop: 5}}></View>
                    <Text style={{color: "white"}}> Détail Emploi </Text>
                    <View style={{borderBottomColor: 'white', borderBottomWidth: 2, width:"30%", marginBottom: 5, marginTop: 5}}></View>
                </View>

                <Text style={{color:"white"}}>Statut : {this.state.qualification}</Text>
                <Text style={{color:"white"}}>Poste : {this.state.statut}</Text>
                {this.state.type == "CDD" ? <Text style={{color:"white"}}>{this.state.contratReason}</Text> : null}
                {this.state.type == "CDD" ? <Text style={{color:"white"}}>Durée de la mission : {this.state.numberDuration + " " + this.state.typeDuration} mois</Text>: <Text style={{color:"white"}}>{this.state.weeklywork}h/semaine</Text>}
                <Text style={{color:"white"}}>Date de début : {this.state.startDate}</Text>
                <Text style={{color:"white"}}>Taux brut horaire : {this.state.hourlyRate}€/heure</Text>

                    <View style={{flexDirection: "row"}}>
                                <TouchableOpacity onPress = {() => {this.setState({showInfo: false})}} style={{width:'30%', marginBottom: 10, marginRight: 5}}>
                                    <View style = {styles.button}>
                                        <Text style = {{color:'#04295D'}}>Modifier</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => {this._goTo()}} style={{width:'30%', marginBottom: 10}}>
                                    <View style = {styles.button}>
                                        <Text style = {{color:'#04295D'}}>Confirmer</Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    /* Validation du champs */
    validateBp = (postalCode) => {
        var re = /^[0-9]{5,5}$/;
        return re.test(postalCode);
      };

      
    _validateEmail = (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email);
      }
  
      _validatePhoneNumber = (phone) => {
          var re = /^(0)[1-9]( *[0-9]{2}){4}$/;
          return re.test(phone)
      }

    /* Verify all the input */
    _verify(){
        if(this.state.civility == ""){
            return(Alert.alert('Veuillez renseigner la civilité de l\'employé'))
        }
        if( this.state.name== ""){
            return(Alert.alert('Veuillez renseigner le nom et le prénom de l\'employé'))
        }
        if( this.state.employeePhone== ""){
            return(Alert.alert('Veuillez renseigner le numéro de téléphone de l\'employé'))
        }        
        if (!this._validatePhoneNumber(this.state.employeePhone)) {
            return(Alert.alert("Le format du numéro de téléphone de l\'utilisateur n'est pas valide. "))
        }
        if( this.state.employeeMail== ""){
            return(Alert.alert('Veuillez renseigner le mail de l\'employé'))
        }
        
        if (!this._validateEmail(this.state.employeeMail)) {
            return(Alert.alert("Le format du mail de l\'utilisateur n'est pas valide. Exemple: contact@contact.com"))
        }
        if( this.state.birthDate== ""){
            return(Alert.alert('Veuillez renseigner la date de naissance de l\'employé'))
        }
        if( this.state.placeBirth== ""){ 
            return(Alert.alert('Veuillez renseigner le lieu de naissance de l\'employé'))
        }
        if( this.state.socialNumber== ""){ 
            return(Alert.alert('Veuillez renseigner le numéro de la sécurité sociale de l\'employé'))
        }
        if( this.state.adress== ""){ 
            return(Alert.alert("Veuillez renseigner l'adresse de l\'employé"))
        }
        if( this.state.postalCode== ""){ 
            return(Alert.alert('Veuillez renseigner le code postal de l\'employé'))
        }
        if (!this.validateBp(this.state.postalCode)) {
			return Alert.alert("Le code postal de l\'employé est invalide. Exemple: 75000");
    }
        if( this.state.city== ""){ 
            return(Alert.alert('Veuillez renseigner la ville de l\'employé'))
        }
        if( this.state.nationality== ""){ 
            return(Alert.alert('Veuillez renseigner la nationalité de l\'employé'))
        }
        if( this.state.statut== ""){ 
            return(Alert.alert('Veuillez renseigner le poste'))
        }
        if( this.state.qualification== ""){ 
            return(Alert.alert('Veuillez renseigner la qualification'))
        }
        if( this.state.level== ""){ 
            return(Alert.alert('Veuillez renseigner le niveau'))
        }
        if( this.state.rung== ""){ 
            return(Alert.alert('Veuillez renseigner l\'échelon'))
        }
        if( this.state.weeklywork== ""){ 
            return(Alert.alert('Veuillez renseigner le nombre d\'heures de travail par semaine'))
        }
        if( this.state.contratReason== "" && this.state.type == "CDD"){ 
            return(Alert.alert('Veuillez renseigner la raison du contrat'))
        }
        // if( this.state.typeDuration == "" && this.state.type == "CDD"){
        //     return(Alert.alert('Veuillez rentrer le type de durée'))
        // }
        if( this.state.numberDuration == "" && this.state.type == "CDD"){
            return(Alert.alert('Veuillez renseigner la durée du contrat'))
        }
        if( this.state.hourlyRate== ""){ 
            return(Alert.alert('Veuillez renseigner le taux horaire brut'))
        }
        if( this.state.errorDuration.bool ){
            return(Alert.alert('Veuillez renseigner une durée de contrat valide'))
        }
        // if( this.state.errorSocialNumber.bool ){
        //     return(Alert.alert('Le numéro de sécurité sociale faire moins de 13 chiffres'))
        // }
        if( this.state.startDate == ""){
            return(Alert.alert('Veuillez renseigner la date de début du contrat'))
        }
        if( this.state.errorBirthDate.bool){
            return(Alert.alert("L'âge minimal pour le contrat est de 18 ans, veuillez renseigner une autre date de naissance"))
        }
        if( this.state.errorWeeklyWork.bool && this.state.type == "CDI"){
            return(Alert.alert("Le nombre d'heures par semaine ne doit pas dépasser les 44h/semaine"))
        }
        else{
            this.getTask();
            // this.getCoefEch();
            this.setState({showInfo: true})
        }
    }

    /* Get the age of a person with his birthdate */
    getAge = (dateString)=>{
        var today = new Date();
        const newDate = dateString.split('-')
        var birthDate = new Date(newDate[2]+ '-' + newDate[1] + '-' + newDate[0]);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    /* Save the signature */
    // saveSign() {
    //     this.refs["sign"].saveImage();
    // }

    // Reset the signature
    // resetSign() {
    //     this.refs["sign"].resetImage();
    // }

    render(){
        return(
            
            <View style={styles.container}>
                
                <View style={{flex:1,position:"absolute", width: '100%'}}>{this._showAdd()}</View>
                { this.state.showInfo ? <View style={{flex:1,position:"absolute", zIndex:7, top:"0.1%"}}>{this._showInformation()}</View> : null }

            <ScrollView style={{flex:1, width: '100%'}}>
                <View style={styles.container}>
    
                    
{/* PROFIL */}
                    <View style={{flexDirection: "row", marginTop: 15}}>
                        <Text style={{color: "#04295D", fontSize: 20, fontWeight: 'bold'}}> Profil </Text>
                    </View>

                    
{/* CIVILITE */}
                    <DropDownPicker
                            placeholder={civility}
                            items={this.state.civilities}
                            style = {{backgroundColor: 'white', borderColor:'#04295D', color:'#04295D'}}
                            containerStyle = {styles.textinput}
                            containerStyle= {{marginTop : 23, marginRight:5, height:55, width:"90%"}}
                            dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", fontStyle: "italic"}}
                            placeholderStyle={{color: '#04295D', fontSize: 15, paddingLeft:'3%', fontStyle: "italic"}}
                            labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                            arrowColor = {'#04295D'}
                            onChangeItem={ (item) => this.setState({civility: item.value})}
                            /> 

{/* NOM */}
                        <TextInput placeholder={name} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"

                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.name} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({name: value})}}
                            keyboardType="email-address"
                        />
                    {/* </View> */}
                   
{/* PRENOM */}
                        <TextInput placeholder={firstName} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.firstName}
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({firstName: value})}} 
                            />

{/* DATE DE NAISSANCE */}
                    <DatePicker 
                        style={{
                        
                            marginTop: '3%',
                            width: '90%',
                            height: 55,
                            borderWidth : 1.0,
                            borderRadius: 7,
                            borderColor:'#04295D',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            color: '#04295D',
                            //paddingLeft: '4%',
                            marginBottom: 2,
                            fontStyle: "italic"
                      }}
                      customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                        date={this.state.birthDate}
                        mode="date"
                        placeholder={birthdate}
                        format="DD/MM/YYYY"
                        confirmBtnText="Confirm"
                        onDateChange={(date) => {this.setState({birthDate: date}); this._hasErrors("birthdate", date)}}
                    />
                    { this.state.errorBirthDate.bool ?<View><Text style={{backgroundColor: "red", color: "white"}}>{this.state.errorBirthDate.message}</Text></View> : null}

{/* LIEU DE NAISSANCE */}
                    <TextInput placeholder={birthplace} 
                        style={{
                            marginTop: '3%',
                            width: '90%',
                            height: 55,
                            borderWidth : 1.0,
                            borderRadius: 7,
                            borderColor:'#04295D',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            color: '#04295D',
                            paddingLeft: '4%',
                            marginBottom: 2,
                            fontStyle: "italic"
                        }}
                        placeholderTextColor='#04295D' 
                        value={this.state.placeBirth} 
                        autoCorrect={false} 
                        onChangeText={(value)=>{this.setState({placeBirth: value})}} 
                        />

{/*Numéro de téléphone */}
                        <TextInput
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            placeholder="Numéro de téléphone"
                            keyboardType = 'numeric'
                            value={this.state.employeePhone}
                            onChangeText={(value) => this.setState({ employeePhone : value})}
                        />
                        
{/*Email*/}

                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                style={{
                                    marginTop: '3%',
                                    width: '90%',
                                    height: 55,
                                    borderWidth : 1.0,
                                    borderRadius: 7,
                                    borderColor:'#04295D',
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    color: '#04295D',
                                    paddingLeft: '4%',
                                    marginBottom: 2,
                                    fontStyle: "italic"
                                }}
                                placeholderTextColor='#04295D'
                                placeholder="Email"
                                value={this.state.employeeMail}
                                onChangeText={(value) => this.setState({ employeeMail : value})}
                            />

                        </View>

{/* N SECURITE SOCIAL */}
                    <TextInput placeholder={social_number} 
                        value={this.state.socialNumber} 
                        maxLength={13} 
                        keyboardType="numeric" 
                        style={{
                            marginTop: '3%',
                            width: '90%',
                            height: 55,
                            borderWidth : 1.0,
                            borderRadius: 7,
                            borderColor:'#04295D',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            color: '#04295D',
                            paddingLeft: '4%',
                            marginBottom: 2,
                            fontStyle: "italic"
                        }}
                        placeholderTextColor='#04295D'
                        autoCorrect={false} 
                        onChangeText={(value)=>{this.setState({socialNumber: value}); 
                        this._hasErrors("socialnumber", value)}} 
                        />
                        { this.state.errorSocialNumber.bool ? 
                        <Text style={{backgroundColor: "red", color: "white"}}>
                            {this.state.errorSocialNumber.message}
                        </Text> : null }
{/* ADRESSE DU SALARIE*/}
                    <TextInput placeholder={adress} 
                        value={this.state.adress} 
                        style={{
                            marginTop: '3%',
                            width: '90%',
                            height: 55,
                            borderWidth : 1.0,
                            borderRadius: 7,
                            borderColor:'#04295D',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            color: '#04295D',
                            paddingLeft: '4%',
                            marginBottom: 2,
                            fontStyle: "italic"
                        }}
                        placeholderTextColor='#04295D'
                        autoCorrect={false} 
                        onChangeText={(value)=>{this.setState({adress: value})}} 
                        />
{/* VILLE*/}
                    <View style={{flexDirection: "row", flex: 1}} >

                        <TextInput placeholder={city} 
                            style={{
                                marginTop: '3%',
                                width: '50%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.city} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({city: value})}} 
                            />
{/* CP */}
                        <TextInput placeholder={postal_code} 
                            maxLength={5} 
                            style={{
                                marginTop: '3%',
                                marginLeft:'4%',
                                width: '36%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={ this.state.postalCode}
                            autoCorrect={false} 
                            keyboardType='numeric' 
                            onChangeText={(value)=>{this.setState({postalCode: value})}} />
                    
                    </View>
{/* NATIONALITE */}
                        <TextInput placeholder={nationality} 
                            value={this.state.nationality} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({nationality: value})}} 
                        />
                    

                    {/****************** PARTIE ENTREPRISE ****************  */}

                  

{/* ENTREPRISE */}
                    {<View style={{flexDirection: "row", marginTop: 15}}>
                        <Text style={{color: "#04295D", fontSize: 20, fontWeight: 'bold'}}> Siège social </Text>
                    </View>}

{/* Dénomination Sociale */}
                    <TextInput placeholder={denominationSociale} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.denominationSociale} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({denominationSociale: value})}}
                            
                            />

{/* Adresse du siège social */}
                    <TextInput placeholder={adresseSiegeSocial} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.adresseSiegeSocial} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({adresseSiegeSocial: value})}}
                            
                            />
{/* Code Postal */}
                    <TextInput placeholder={codePostalSiegeSocial} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.codePostalSiegeSocial} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({codePostalSiegeSocial: value})}}
                           
                            />
{/* Ville */}
                    <TextInput placeholder={villeSiegeSocial} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.villeSiegeSocial} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({villeSiegeSocial: value})}}
                            
                            />
{/* Nom de la caisse retraite */}
                    <TextInput placeholder={nomCaisseRetraite} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.nomCaisseRetraite} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({nomCaisseRetraite: value})}}
                            
                            />
{/* Adresse de la caisse de retraite */}
                    <TextInput placeholder={adresseCaisseRetraite} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.adresseCaisseRetraite} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({adresseCaisseRetraite: value})}}
                            
                            />
{/* Code Postal */}
                    <TextInput placeholder={codePostalRetraite} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.codePostalRetraite} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({codePostalRetraite: value})}}
                            
                            />
{/* Ville */}
                    <TextInput placeholder={villeRetraite} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.villeRetraite} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({villeRetraite: value})}}
                           
                            />

{/* ETABLISSEMENT (Lieu de travail)*/}
                    {<View style={{flexDirection: "row", marginTop: 15}}>
                        <Text style={{color: "#04295D", fontSize: 20, fontWeight: 'bold'}}> Établissement (lieu de travail)</Text>
                    </View>}   

{/* nomPatron */}
                    <TextInput placeholder={nomPatron} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.nomPatron} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({nomPatron: value})}}
                            
                            />
{/* prenomPatron */}
                    <TextInput placeholder={prenomPatron} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D'
                            value={this.state.prenomPatron} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({prenomPatron: value})}}
                            
                            />

{/* nom de l'etablissement */}
                    <TextInput placeholder={nomEntreprise} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.nomEntreprise} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({nomEntreprise: value})}}
                           
                            />
{/* adresse de l'etablissement */}
                    <TextInput placeholder={adresseEntreprise} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.adresseEntreprise} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({adresseEntreprise: value})}}
                           
                            />
{/* code postal de l'etablissement */}
                    <TextInput placeholder={codePostalEntreprise} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.codePostalEntreprise} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({codePostalEntreprise: value})}}
                           
                            />
{/* ville de l'etablissement */}
                    <TextInput placeholder={villeEntreprise} 
                            style={{
                                marginTop: '3%',
                                width: '90%',
                                height: 55,
                                borderWidth : 1.0,
                                borderRadius: 7,
                                borderColor:'#04295D',
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: '#04295D',
                                paddingLeft: '4%',
                                marginBottom: 2,
                                fontStyle: "italic"
                            }}
                            placeholderTextColor='#04295D' 
                            value={this.state.villeEntreprise} 
                            autoCorrect={false} 
                            onChangeText={(value)=>{this.setState({villeEntreprise: value})}}
                           
                            />



{/* EMPLOI */}
                    <View style={{flexDirection: "row", marginTop: 15}}>
                        <Text style={{color: "#04295D", fontSize: 20, fontWeight: 'bold'}}> Emploi </Text>
                    </View>
{/* POSTE */}
                                <DropDownPicker
                                placeholder={statut}
                                items={this.state.statuts}
                                containerStyle = {styles.textinput}
                                containerStyle= {{marginTop : 23, marginRight:5, height:55, width:"90%"}}
                                containerStyle= {
                                    {   
                                        marginTop : '5%',
                                        height:55,
                                        width:'90%',    
                                    }
                                }
                                style={{borderColor:'#04295D'}}
                                dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', width:'100%',fontStyle: "italic"}}
                                placeholderStyle={{color: '#04295D', fontSize: 15,fontStyle: "italic"}}
                                labelStyle = {{color:'#04295D', fontSize: 16,fontStyle: "italic"}}
                                arrowColor = {'#04295D'}
                                onChangeItem={ (item) => this.setState({statut: item.value})}
                            />  


{/* STATUT */}
                            <DropDownPicker
                                placeholder={qualification}
                                items={this.state.qualifications}
                                containerStyle = {styles.textinput}
                                containerStyle= {{ marginRight:5, height:55, width:"90%", marginTop : '4%'}}
                                style={{borderColor:'#04295D'}}
                                dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                                placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                                labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                                arrowColor = {'#04295D'}
                                onChangeItem={ (item) => this.setState({qualification: item.value})}
                            />
{/* NIVEAU */}
                            <DropDownPicker
                                placeholder={level}
                                items={this.state.levels}
                                style={{borderColor:'#04295D'}}
                                containerStyle = {styles.textinput}
                                containerStyle= {{ marginRight:5, height:55, width:"90%"}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'90%',   
                                        marginTop : '4%' 
                                    }
                                }
                                style={{borderColor:'#04295D'}}
                                dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                                placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                                labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                                arrowColor = {'#04295D'}
                                onChangeItem={ (item) => this.setState({level: item.value})}
                                />
{/* ECHELON */}
                            <DropDownPicker
                                placeholder={rung}
                                items={this.state.rungs}
                                style={{borderColor:'#04295D'}}
                                containerStyle = {styles.textinput}
                                containerStyle= {{ marginRight:5, height:55, width:"90%"}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'90%',    
                                        marginTop : '4%'
                                    }
                                }
                                style={{borderColor:'#04295D'}}
                                dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                                placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                                labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                                arrowColor = {'#04295D'}
                                onChangeItem={ (item) => this.setState({rung: item.value})}
                                />

{/* CONVENTION COLECTIVE */}
                            <DropDownPicker
                                placeholder={convention}
                                items={this.state.conventions}
                                style={{borderColor:'#04295D'}}
                                containerStyle = {styles.textinput}
                                containerStyle= {{ marginRight:5, height:55, width:"90%"}}
                                containerStyle= {
                                    {   
                                        marginTop : 23,
                                        height:55,
                                        width:'90%',    
                                        marginTop : '4%'
                                    }
                                }
                                style={{borderColor:'#04295D'}}
                                dropDownStyle = {{backgroundColor: 'white', borderColor:'#04295D', fontStyle: "italic"}}
                                placeholderStyle={{color: '#04295D', fontSize: 16, fontStyle: "italic"}}
                                labelStyle = {{color:'#04295D', fontSize: 16, fontStyle: "italic"}}
                                arrowColor = {'#04295D'}
                                onChangeItem={ (item) => this.setState({convention: item.value})}

                            />
{/* RAISON DU CONTRAT + DUREE DU CONTRAT ->CDD */}

                            {this._hiddenField()}

                            
{/* TEMPS DE TRAVAIL */}
                <View style={styles.container}>
                    <TextInput placeholder={weekly} 
                    style={{
                        marginTop: '3%',
                        width: '90%',
                        height: 55,
                        borderWidth : 1.0,
                        borderRadius: 7,
                        borderColor:'#04295D',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        color: '#04295D',
                        paddingLeft: '4%',
                        marginBottom: 2,
                        fontStyle: "italic"
                    }}
                    placeholderTextColor='#04295D'
                    autoCorrect={false} 
                    keyboardType='numeric' 
                    value={this.state.weeklywork} 
                    onChangeText={(value)=>{this.setState({ weeklywork: value.replace(',', '.') }); this._hasErrors("weekly", value)}} 
                    />
                    {this.state.errorWeeklyWork.bool ? 

                    <Text style={{backgroundColor: "red", color: "grey", textAlign: "center", margin: 7}}>
                    {this.state.errorWeeklyWork.message}
                    </Text> : null }

                </View>

{/* TAUX HORAIRE BRUT */}  
                  
                <View style={styles.container}>
                    <TextInput placeholder={houry_rate} 
                    style={{
                        marginTop: '3%',
                        width: '90%',
                        height: 55,
                        borderWidth : 1.0,
                        borderRadius: 7,
                        borderColor:'#04295D',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        color: '#04295D',
                        paddingLeft: '4%',
                        marginBottom: 2,
                        fontStyle: "italic"
                    }}
                    placeholderTextColor='#04295D'
                    autoCorrect={false} 
                    keyboardType='numeric' 
                    value={this.state.hourlyRate} 
                    onChangeText={(value)=>{this.setState({ hourlyRate: value.replace(',', '.') }); this._hasErrors("hourlyRate", value)}} 
                    />               
                    {this.state.errorHourlyRate.bool ? 
                    <Text style={{backgroundColor: "red", color: "grey", textAlign: "center", margin: 7}}>
                    {this.state.errorHourlyRate.message}
                    </Text> : null }

                </View>         
                
{/* PERIODE D'ESSAI */}

                        {this._hiddenField4()}                      
    

{/* DEBUT DU CONTRAT + MISSIONS */}

                    <DatePicker 
                        style={{
                            marginTop: '3%',
                            width: '90%',
                            height: 55,
                            borderWidth : 1.0,
                            borderRadius: 7,
                            borderColor:'#04295D',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            color: '#04295D',
                            paddingLeft: '0%',
                            marginBottom: 2
                      }}
                        date={this.state.startDate}
                        mode="date"
                        placeholder={start_date}
                        format="DD/MM/YYYY"
                        
                        customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                        onDateChange={(date) => {this.setState({startDate: date})}}
                    />  


{/* TITLE SIGNATURE */}
                    <View style={{flexDirection: "row", marginTop: '4%'}}>
                        <Text style={{color: "#04295D", fontSize: 20, fontWeight: 'bold'}}> Signature </Text>
                    </View>

{/* DATE SIGNATURE */}
                    <DatePicker style={{
                        marginTop: '3%',
                        width: '90%',
                        height: 55,
                        borderWidth : 1.0,
                        borderRadius: 7,
                        borderColor:'#04295D',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        color: '#04295D',
                        paddingLeft: '0%',
                        marginBottom: 2
                  }}
                        date={this.state.signatureDate}
                        mode="date"
                        placeholder={signatureDate}
                        format="DD/MM/YYYY"
                        customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                        onDateChange={(date) => {this.setState({signatureDate: date})}}
                    />

{/* VALIDER */}
                    <TouchableOpacity onPress = {() => { this._verify() }} 
                    style={styles.buttonValider}>
                        
                            <Text style={{
                                fontSize: 18,
                                textAlign: "center",
                                margin: 10,
                                marginBottom: 10,
                                color: "#04295D",
                                fontWeight:'bold',
                                backgroundColor: "transparent",
                            }}>
                                Valider
                            </Text>
                        
                    </TouchableOpacity>

                </View>
            </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop:'1%',
        width: "100%",
    },
    inputAndroid: {
        marginTop : 25 , 
        width : 372, 
        height: 65,
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor:'white'
    },
    buttonValider:{
        width: "90%",
        marginVertical: "3%",
        borderColor: "#3BB9E0",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#3BB9E0",
    },
    textinput:{
        marginTop: '3%',
        width: '90%',
        height: 55,
        borderWidth : 1.0,
        borderRadius: 7,
        backgroundColor: 'white',
        justifyContent: 'center',
        color: 'black',
        paddingLeft: '4%',
        marginBottom: 2
      },
      textname:{
        marginTop: 20,
        height: 40,
        width: '60%',
        height: 65,
        borderWidth : 1.0,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        color: 'black',
        paddingLeft: 35,
        marginBottom: 10
      },
      button:{
        marginTop: 10,
        backgroundColor: '#3BB9E0',
        borderColor: '#3BB9E0',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 7,
      },
      popup:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        alignItems: "center",
      },
      popup_container:{
        top: "10%",
        backgroundColor: "#04295D",
        alignItems: "center",
        width: "90%",
        height: "60%",
        padding: "5%",
        borderColor: "white",
        borderWidth: 0.5,
      },

  });
  