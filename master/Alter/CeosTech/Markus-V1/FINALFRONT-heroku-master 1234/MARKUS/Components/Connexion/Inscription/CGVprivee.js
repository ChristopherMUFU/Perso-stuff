import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, Button, TouchableOpacity} from 'react-native';
import * as Theme from '../../Styles/Theme';
import { faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class CGVprivee extends React.Component {
   goToTop = () => {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
   }
   render() {
      return(
         <ScrollView style={{flex:1, width: '100%',backgroundColor: '#3C3C3C'}} 
         ref={(c) => {this.scroll = c}}>
           <View style={CGUStyle.container}>
            <Text style={CGUStyle.title}> CGU </Text>
            
            
            <View style={CGUStyle.container}>
            <Text style={CGUStyle.paragraphe}>
            Les présentes conditions générales d’utilisation ont pour objet d’encadrer l’accès et les modalités d’utilisation des services de EKTOR. Nous vous invitons à en prendre attentivement connaissance.
            En créant un compte d’utilisateur, vous acceptez les conditions d’utilisation générales suivantes et les modalités spécifiques à chacun des services utilisés, lesquelles gouvernent l’utilisation 
            que vous ferez des services EKTOR. A défaut d’accepter les CGU dans leur intégralité, les Utilisateurs sont tenus de s’abstenir d’accéder et d’utiliser le Service. 
            Les présentes CGU peuvent être révisées à tout moment.{'\n'}
            Tout autre document que les présentes CGU, et notamment catalogues, prospectus, publicités, manuels n’a qu’une valeur informative et indicative non contractuelle.
             </Text>
             </View>
          </View>
          
          <Text style={CGUStyle.soustitre}> 1. La société prestataire </Text>
          <Text style={CGUStyle.paragraphe}>
          Les présentes Conditions Générales d’Utilisation (ci-après les CGU) visent à décrire les 
          conditions d’utilisation des {'\n'} services proposés par CEOS TECH, société par actions simplifiée au capital
           social de 100 euros dont le siège social est situé au 7 place de l’hôtel de ville, 93600 Aulnay-sous-Bois, immatriculée 
           au registre du commerce et des sociétés de Paris sous le numéro 889 892 550 (désignée ci-après EKTOR). Le Directeur 
           de la publication est Laurent Goulenok, Président de CEOS TECH. L’application EKTOR est hébergée par la société Heroku Inc., 
           650 7th Street, San Francisco, CA (tel : +33 1 (877) 563-4311). Le stockage des données personnelles des utilisateurs est assuré par 
           la société Amazon Inc., 410 Terry Avenue North, Seattle. L’application est mise à disposition par les stores AppStore (Apple) et PlayStore (Android).

                </Text>

                <Text style={CGUStyle.soustitre}> 2.Définitions </Text>
          <Text style={CGUStyle.paragraphe}>
          “Date d’entrée en vigueur ” signifie la première des dates suivantes : soit la date à laquelle vous cliquez pour confirmer votre acceptation de l’Entente ou la date à laquelle vous créez un compte d’utilisateur.{'\n'}
          “Droits de propriété intellectuelle” signifie tous les droits de propriété, dont notamment ceux relatifs : (i) aux brevets ; (ii) aux droits d’auteur ; (iii) aux marques de commerce ; (iv) au design industriel ; (v) toute autre disposition statutaire ou principe de common law qui peut conférer un droit relatif au savoir-faire ou à la propriété intellectuelle.{'\n'}
          « Service » ou « Services » ou « Services EKTOR » signifie l’application, le logiciel et le site Internet ektor.fr offrant des fonctionnalités de gestion des stocks et de management des ressources humaines qui permettent de piloter entièrement son activité via l’application depuis un mobile ou une tablette ainsi que tout autre service offert et disponible de temps à autre par l’entremise du Site ektor.fr. {'\n'}
         Application mobile : programme téléchargeable et exécutable à partir du système d’exploitation d’un appareil électronique mobile, ci-après appelé « Smartphone », qui permet une connexion à internet.{'\n'}
         Conditions Générales d’Utilisation ou CGU : les présentes Conditions Générales d’Utilisation. {'\n'}
         Compte : le compte créé au nom de l’Utilisateur et attribué à ce dernier par le distributeur donnant droit d’accès aux Services EKTOR. {'\n'}
         Distributeur : CEOS TECH, exploitant l’application et offrant à ses Utilisateurs d’ouvrir un compte. {'\n'}
         Espace personnel : l’espace personnel de l’Utilisateur sur l’application accessible par la saisie des Identifiants de connexion et permettant l’accès aux Services EKTOR. {'\n'}
         Identifiant : les données nécessaires à l’identification d’un Utilisateur se composant d'un User (adresse email valide) et d'un mot de passe. {'\n'}
         Jour ouvré : un jour calendrier, à l’exception des samedi, dimanche et jours fériés en France métropolitaine. {'\n'}
         Site : l’application mobile ou site internet ektor.fr permettant l’accès aux Services EKTOR. {'\n'}
         Services : l’ensemble des services fournis par EKTOR, payants ou gratuits. {'\n'}
         Utilisateur : personne physique ayant installé l’Application Mobile et ayant lu et accepté les présentes Conditions Générales d’Utilisation. {'\n'}
         Le client : le CLIENT souhaite pouvoir utiliser le Logiciel exclusivement pour les besoins internes de son entreprise (usage au profit des seuls Users) et, de manière générale, bénéficier des services proposés par EKTOR dans les conditions qui suivent. 
         </Text>

         
          <Text style={CGUStyle.soustitre}> 3. La prestation </Text>
          <Text style={CGUStyle.paragraphe}>
          Le prestataire de service, ci-après EKTOR, offre aux commerçants un service d’accompagnement dans le pilotage de leurs établissements professionnels en proposant une application de gestion pour mobile et tablette.
          Les services proposés assistent l’Utilisateur dans : {'\n'}
          - La gestion des stocks, {'\n'}
          - La gestion des ressources humaines, {'\n'}
          - L’analyse de données et des performances de l’activité.

         </Text>

         <Text style={CGUStyle.soustitre}> 4. Champ d'application </Text>
          <Text style={CGUStyle.paragraphe}>
          Les présentes CGU s’appliquent sans restriction ni réserve, à l’ensemble des Services proposées par EKTOR sur son application mobile et site web.
          Ces CGU prévalent sur toutes autres conditions générales ou particulières non expressément agréées par EKTOR. Nous attirons votre attention sur le
         fait que seuls les utilisateurs ayant lu et accepté les présentes CGU peuvent bénéficier des Services proposés par EKTOR.
         </Text>

         <Text style={CGUStyle.soustitre}> 5. Les obligations de l’utilisateur </Text>
          <Text style={CGUStyle.paragraphe}>
          L'Utilisateur s'oblige à transmettre des renseignements exacts et véritables.
          En premier lieu concernant sa civilité à savoir son nom, son ou ses prénoms, son adresse email, 
          sa date de naissance, son numéro de téléphone.
          Dans un second temps, les informations concernant son siège social ainsi que son établissement commercial à savoir le nom, l’adresse, 
          le siret (ou siren) et la complémentaire santé.
          L’Utilisateur s’engage à ne pas :
          utiliser le service d'une manière susceptible de nuire à EKTOR ou aux tiers ;
          utiliser une partie du service en tant qu'outil pouvant induire en erreur des commerçants ou envoyer des messages commerciaux indésirables ;
          utiliser un processus ou un service automatisé pour accéder et/ou utiliser le service ;
          endommager, désactiver, surcharger ou détériorer le service (ou le(s) réseau(x) connecté(s) au service), ni interférer avec son utilisation et sa jouissance par quiconque.

         </Text>

         <Text style={CGUStyle.soustitre}> 6. Identification et mot de passe </Text>
          <Text style={CGUStyle.paragraphe}>
          Lors de son inscription aux services de l’application EKTOR, l’Utilisateur sera invité à créer un identifiant et un mot de passe lui permettant 
          d’accéder à son Espace Personnel. Ces identifiants sont personnels et confidentiels. Ils ne peuvent être changés que sur demande de l’Utilisateur ou à l’initiative de EKTOR.
          L’Utilisateur est l’unique responsable de l’utilisation des identifiants le concernant et s’engage à mettre tout en œuvre pour conserver secret ses identifiants 
          et ne pas les divulguer, à qui que ce soit, sous quelque forme que ce soit et pour quelque raison que ce soit.
          L’Utilisateur est responsable de l’utilisation de ses identifiants par des tiers et en conséquence des actions ou déclarations faites par l’intermédiaire de son Compte EKTOR, 
          qu’elles soient frauduleuses ou non et garantir EKTOR contre toute demande à ce titre.
          EKTOR n’ayant pas l’obligation et ne disposant pas des moyens techniques de vérification des identités des personnes qui s’inscrivent sur son application, celui-ci ne sera pas 
          responsable en cas d’usurpation d’identité de l’Utilisateur. Si l’Utilisateur a des raisons de penser que son identité a été frauduleusement utilisée, il doit en informer EKTOR immédiatement.
          En cas de perte ou de vol de son Smartphone, l’Utilisateur est responsable de toute conséquence dommageable de cette perte ou de ce vol, et doit utiliser la procédure adéquate afin de changer ses identifiants.
          Dans l’hypothèse où il aurait connaissance de l’accès d’une autre personne à son Espace Personnel, l’Utilisateur en informera immédiatement nos services par e-mail à l’adresse applicationektor@gmail.com ou 
          bien via l’option assistance située dans les paramétrages « COMPTE » de l’application.

         </Text>

         <Text style={CGUStyle.soustitre}> 7. Données à caractère personnel </Text>
          <Text style={CGUStyle.paragraphe}>
          EKTOR collecte les données à caractère personnel de l'Utilisateur lors du processus d’inscription effectué sur l’application ou bien via le formulaire de contact sur le site web ektor.fr.
          Les données personnelles collectées auprès de l’Utilisateur ont donc pour objectif la mise à disposition du Service mais également son amélioration et le maintien d’un environnement sécurisé.
          Plus précisément, les utilisations des données personnelles sont les suivantes :

         accès et utilisation des services de l’application EKTOR
         gestion du fonctionnement et optimisation des services en ligne
         vérification, identification et authentification des données transmises par l’Utilisateur
         mise en œuvre d’une assistance Utilisateur
         la personnalisation des services en affichant des publicités en fonction des préférences de l’Utilisateur
         La prévention et la détection des fraudes, malwares (malicious softwares ou logiciels malveillants) et la gestion des incidents de sécurité

         Afin de protéger au mieux les données à caractère personnel de l'Utilisateur, EKTOR met en place une Politique de confidentialité conforme aux dispositions du Règlement (UE) 16/679 et de la Loi 78/17 du 6 janvier 1978 modifiée.
         EKTOR met donc en œuvre des mesures organisationnelles, techniques, logicielles et physiques en matière de sécurité du numérique pour protéger les données personnelles contre les altérations, destructions, et accès non autorisés. 
         Toutefois, il est à signaler qu’internet n’est pas un environnement complètement sécurisé de sorte que EKTOR ne peut pas garantir la sécurité de la transmission ou du stockage des informations sur internet.

         </Text>

         <Text style={CGUStyle.soustitre}> 8. Limitations et modifications du service </Text>
          <Text style={CGUStyle.paragraphe}>
          EKTOR fera des efforts raisonnables pour maintenir son service opérationnel. Cependant, certaines difficultés techniques, la maintenance, les tests ou les mises à jour nécessaires pour tenir compte des modifications apportées aux 
          lois et aux exigences réglementaires pertinentes peuvent, de temps à autre, provoquer des interruptions temporaires. EKTOR se réserve le droit, périodiquement, et à tout moment, de modifier ou d'interrompre, temporairement ou définitivement, 
          les fonctions et caractéristiques de l’application, avec ou sans préavis, le tout sans encourir de responsabilité envers l’Utilisateur, excepté lorsque cela est interdit par la loi.
          Vous comprenez, convenez et acceptez que EKTOR n'a aucune obligation de maintenir, prendre en charge, mettre à niveau, ou mettre à jour le Service, ou de fournir tout ou partie de tout contenu spécifique par l'intermédiaire du Service. EKTOR peut, 
          de temps à autre, supprimer tout Contenu, sans notification. Cette section sera appliquée dans les limites autorisées par la loi en vigueur.

         </Text>

         <Text style={CGUStyle.soustitre}> 9. Droit de propriété intellectuelle  </Text>
          <Text style={CGUStyle.paragraphe}>
          EKTOR est titulaire de tous les droits titres et intérêts, soit à titre de propriétaire ou de détenteur de licence, y compris tous droits de Propriété intellectuelle, relatifs aux Services et à la technologie sous-jacente. Le contenu des Services et 
          du site Internet, ou des composantes de ceux-ci, sont notamment protégés par les droits d’auteur de EKTOR, et par toute demande de brevet effectuée à ce jour ou à l’avenir en vertu de toute loi sur les brevets ou en vertu du Traité de coopération sur les brevets.
          La présente entente n’est pas une convention d’achat et ne vous transmet aucun droit de propriété relatif aux Services, à la technologie sous-jacente ou aux droits de Propriété intellectuelle de EKTOR. Les noms et les logos de EKTOR et de ektor.com, ainsi que les 
          noms de produits associés aux Services sont des marques de commerce de CEOS TECH ou de tierces parties et aucun droit, ni aucune licence d’utilisation de ceux-ci ne vous est accordé. 
          CEOS TECH est titulaire de tous les droits de propriété, titres et intérêts relatifs à toute suggestion, idée, demande visant l’amélioration, rétroaction, recommandation ou autre information que vous ou quiconque formulerez au sujet des Services.
          Vous n’êtes pas autorisé à copier, modifier, distribuer, vendre ou louer une partie ou la totalité de nos Services ou des logiciels qui en font partie. De même, vous n’êtes pas autorisé à décompiler ou tenter d’extraire de code source.

          
         </Text>

         <Text style={CGUStyle.soustitre}> 10. Limitation de responsabilité  </Text>
          <Text style={CGUStyle.paragraphe}>
          A. EKTOR fournit le Service « en l'état », « avec toutes ses imperfections » et « tel que disponible ». EKTOR ne garantit pas l’exactitude des informations fournies dans le cadre du service. EKTOR n’accorde aucune garantie expresse.{'\n'}
          B. EKTOR ne garantit aucunement et de quelque façon que ce soit les produits, services et/ou pratiques commerciales des tiers présents sur son site.{'\n'}
          C. Compte tenu des spécificités du réseau Internet, EKTOR n'offre aucune garantie de continuité du service, n'étant tenue à cet égard que d'une obligation de moyens.{'\n'}
          D. La responsabilité de CEOS TECH ne peut pas être engagée en cas de dommages liés à l'impossibilité temporaire d'accéder à l'un des services proposés par la plateforme EKTOR.{'\n'}
          E. Toutes les informations contenues sur la plateforme EKTOR sont susceptibles d'être modifiées à tout moment, compte tenu de l'interactivité du site, sans que cela puisse engager la responsabilité de EKTOR.{'\n'}
          H. L’Utilisateur s’engage à exonérer la société CEOS TECH dans tous les cas de responsabilité, de dommages, de pertes ou de dépenses pour tous dommages ou pertes causées à des biens ou à des tiers trouvant leur origine de quelque manière que ce soit dans le Service.{'\n'}
          I. L’Utilisateur ne peut prétendre à aucune indemnisation pour tout dommage, y compris les dommages conséquents, spéciaux, indirects, incidents, les pertes de bénéfices. Cette limitation s'applique également si EKTOR avait ou aurait dû avoir connaissance de l'éventualité de tels dommages.
       
         </Text>

         <Text style={CGUStyle.soustitre}> 11. Manquement aux CGU </Text>
          <Text style={CGUStyle.paragraphe}>
          En cas d'inexécution ou de non-respect par l'Utilisateur de l'une des obligations et stipulations prévues par les présentes CGU, EKTOR pourra modifier, suspendre, limiter ou supprimer l'accès au service, sans que celui-ci ne puisse réclamer aucune indemnité quelconque.
          En cas d’inexécution ou de non-respect par l’Utilisateur de l’une des obligations et stipulations prévues aux présentes, EKTOR supprimera à son profit le compte de l’utilisateur et ce dernier restera seul tenu responsable.
          Ainsi, l’Utilisateur s’engage à s’abstenir d’exploiter ou utiliser, faire des copies ou créer des fichiers des données personnelles à ses propres fins ou pour le compte de tiers. Le traitement d’une donnée personnelle correspondra strictement à l’exécution des finalités stipulées ci-avant, dans le seul cadre de l’utilisation des services fournis par EKTOR.
          EKTOR sera en droit de réclamer des indemnités destinées à compenser le préjudice subi du fait du manquement aux CGU par l’Utilisateur.

         </Text>

         <Text style={CGUStyle.soustitre}> 12.Droit applicable et juridiction compétent </Text>
          <Text style={CGUStyle.paragraphe}>
          Les présentes CGU sont soumises au droit français. Toute contestation et/ou difficulté d'interprétation ou d'exécution des présentes CGU doit être référé aux représentants de chaque partie, qui travaillera de concert avec son homologue pour résoudre la dispute en temps opportun.
          {'\n'} Si le litige perdure, les parties conviennent que les tribunaux de Bobigny seront exclusivement compétents pour en juger.
         
         </Text>
         

         <View style={CGUStyle.container}>
         <Text style={CGUStyle.title}> Mentions légales </Text>
         <Text style={CGUStyle.paragraphe}>
            Les présentes conditions générales d’utilisation ont pour objet d’encadrer l’accès et les modalités d’utilisation des services de EKTOR. Nous vous invitons à en prendre attentivement connaissance.
            En créant un compte d’utilisateur, vous acceptez les conditions d’utilisation générales suivantes et les modalités spécifiques à chacun des services utilisés, lesquelles gouvernent l’utilisation 
            que vous ferez des services EKTOR. A défaut d’accepter les CGU dans leur intégralité, les Utilisateurs sont tenus de s’abstenir d’accéder et d’utiliser le Service. 
            Les présentes CGU peuvent être révisées à tout moment.{'\n'}
            Tout autre document que les présentes CGU, et notamment catalogues, prospectus, publicités, manuels {'\n'} n’a qu’une valeur informative et indicative non contractuelle.
         
         </Text>
         
         </View>

        
            <View style={{bottom:4,alignSelf:'flex-end',}}>
               <TouchableOpacity onPress = {this.goToTop} >
                  <FontAwesomeIcon icon={faArrowAltCircleUp} style={CGUStyle.icon} size={30} /> 
               
               </TouchableOpacity>
      
           </View>
      

         </ScrollView>    
         
      )
   }
}

const CGUStyle = StyleSheet.create({
   //containers
   container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      paddingTop:'1%',
      width: "100%",
      marginTop: 17
   },
   //titles
   title:{
       color: 'white',
       fontSize: 25,
       fontWeight: 'bold',
       alignItems: 'center'
   },

   soustitre:{
      color: '#3BB9E0',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 17,
      marginLeft: 8
      
  },

   paragraphe: {
      
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: '3%',
      marginRight: '2%',
      lineHeight: 22
      
   },
   icon:{
      color:'white',
      
   }
})