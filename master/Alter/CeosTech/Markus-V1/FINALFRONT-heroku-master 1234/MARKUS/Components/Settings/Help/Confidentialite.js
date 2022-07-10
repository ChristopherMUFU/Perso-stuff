import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Confidentialite extends React.Component {
  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };
  render() {
    return (
      <ScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#FFFFFF" }}
        ref={(c) => {
          this.scroll = c;
        }}
      >
        <View style={styles.container}>
          {/* <Text style={styles.titleH1}>Politique de confidentialité</Text>*/}
          <Text style={styles.titleH2}>1- Préambule</Text>
          <Text style={styles.paragraph}>
            La présente Politique de confidentialité concerne la collecte,
            l’utilisation, la divulgation et la conservation des informations
            que vous, en tant qu’utilisateur de nos Services (incluant les
            applications mobiles développées pour Android, iOS ou toutes autres
            plateformes telles que MARKUS) ou visiteur de notre site Web, nous
            communiquez et qui sont détenues et contrôlées par CEOS TECH (« CEOS
            TECH », « nous », « nos », « notre »).
            {"\n"}En utilisant les Services, vous êtes censé avoir lu et compris
            les termes et conditions de la présente Politique de
            confidentialité. Si vous n’êtes pas d’accord avec cette politique de
            confidentialité, n’utilisez pas les services. Vous pouvez envoyer
            vos questions concernant la présente Politique à notre responsable
            de la confidentialité, à l’adresse contact@markus-app.com.
          </Text>
          <Text style={styles.titleH2}>
            2- Définition et nature des données à caractère personnel
          </Text>
          <Text style={styles.paragraph}>
            Lors de votre utilisation des solutions logicielles (ci-après : les
            « Solutions »), nous pouvons être amenés à vous demander de nous
            communiquer des données à caractère personnel vous concernant.
            {"\n"}Le terme « données à caractère personnel » (données
            personnelles) désigne toutes les données qui permettent d’identifier
            un individu directement ou indirectement, par agrégation de
            plusieurs données, ce qui correspond notamment à vos nom, prénoms,
            adresse de courrier électronique, adresse postale, numéros de
            téléphone, données relatives à votre utilisation des Solutions,
            notamment vos date et lieu de naissance, nationalité, sexe, lieu de
            travail, ancienneté, nature du contrat de travail, emploi occupé,
            éléments de rémunération, numéro de sécurité sociale, ainsi qu’à
            tout autre renseignement que nous pourrons vous demander et que vous
            choisirez de nous communiquer à votre sujet.
          </Text>
          <Text style={styles.titleH2}>
            3- Collecte des données personnelles
          </Text>
          <Text style={styles.paragraph}>
            Dans le cadre de la prestation des Services :{"\n"}• Lorsque vous
            vous enregistrez auprès de nos services, CEOS TECH collecte vos
            données personnelles. Ces informations peuvent notamment inclure
            votre nom, votre adresse e-mail et vos mots de passe, ainsi que
            d’autres renseignements personnels;
            {"\n"}• CEOS TECH collecte des informations sur vos employés afin
            que vous puissiez les configurer dans le système. Ces informations
            peuvent inclure leur nom, leur adresse e-mail, leur numéro de
            téléphone, leur date de naissance, leur adresse postale et leur date
            de recrutement ;{"\n"}• Si vous voulez créer un nouveau fournisseur,
            nous lui demanderons son nom, son adresse e-mail, son adresse
            postale et son numéro de téléphone ;
          </Text>
          <Text style={styles.titleH2}>
            4- Utilisation des données personnelles
          </Text>
          <Text style={styles.paragraph}>
            CEOS TECH n’utilisera les Données personnelles qu’aux fins suivantes
            :{"\n"}• Fournir les Services que vous avez demandés ;{"\n"}•
            Élaborer des rapports ;{"\n"}• Vous proposer les Services
            susceptibles de vous intéresser ;
            {"\n"}• Se soumettre aux demandes des autorités et aux obligations
            légales, conformément à la loi régissant la Protection des données
            personnelles dans le secteur privé (RSQ, c P-39.1), au règlement
            général sur la protection des données (RGPD) promulgué par l’Union
            européenne, et autres lois en vigueur.
            {"\n"}Si vous souhaitez vous abonner à notre bulletin d’information
            ou recevoir nos e-mails marketing, nous utiliserons votre nom et
            votre adresse e-mail pour vous envoyer ces communications. Par
            respect pour votre vie privée, nous vous offrons la possibilité
            d’annuler votre abonnement. Pour ce faire, il vous suffit de cliquer
            sur le lien de désabonnement situé au bas de chaque communication ou
            de nous envoyer un e-mail à l’adresse contact@markus-app.com.
            {"\n"}À de rares occasions, lorsque les circonstances l’imposent,
            nous vous enverrons des annonces strictement liées aux services. Par
            exemple, si notre service est temporairement suspendu pour des
            raisons de maintenance, nous vous enverrons probablement un e-mail.
            {"\n"}Sur la base des données personnelles que vous nous avez
            communiquées, nous vous enverrons un e-mail de bienvenue pour
            vérifier votre adresse e-mail. Nous communiquerons également avec
            vous en réponse à vos requêtes, pour vous fournir les services
            demandés et pour gérer votre compte.
            {"\n"}CEOS TECH partagera vos données personnelles avec des tiers
            uniquement selon les méthodes décrites dans la présente politique de
            confidentialité. Nous ne vendons pas vos données personnelles à des
            tiers.
            {"\n"}Il peut arriver que nous fournissions vos données personnelles
            à des sociétés assurant des services destinés à nous aider dans nos
            activités commerciales comme l’envoi d’e-mails en notre nom ou la
            prestation du service à la clientèle. Ces sociétés sont autorisées à
            utiliser vos données personnelles uniquement dans la mesure où cela
            est nécessaire pour nous fournir les services demandés.
            {"\n"}CEOS TECH peut également utiliser et divulguer vos données
            personnelles quand la loi l’exige, par exemple pour répondre à une
            assignation ou agir dans toute autre procédure judiciaire, pour
            enquêter sur toutes activités potentiellement frauduleuses,
            susceptibles de menacer l’intégrité de notre Service ou de notre
            réseau et participer à la prévention de telles activités, pour
            enquêter sur les fraudes ou les violations de nos Conditions de
            service, lorsque nous avons toutes les raisons de croire, de bonne
            foi, qu’une telle divulgation est nécessaire à la protection de nos
            droits, ou pour assurer votre sécurité ou celle de tiers, pour
            répondre à une requête des autorités publiques.
          </Text>
          <Text style={styles.titleH2}>
            5- Droit d'accès, de rectification et droit à l'effacement
          </Text>
          <Text style={styles.paragraph}>
            {"\n"}L'utilisateur peut prendre connaissance, mettre à jour,
            modifier ou demander la suppression des données le concernant, en
            respectant la procédure ci-après :{"\n"}L'utilisateur doit envoyer
            un e-mail au responsable du traitement des données personnelles, en
            précisant l'objet de sa demande et en utilisant l'adresse e-mail de
            contact qui est fournie plus haut.
            {"\n"}S'il en possède un, l'utilisateur a le droit de demander la
            suppression de son espace personnel en suivant la procédure suivante
            : L'utilisateur doit envoyer un e-mail au responsable du traitement
            des données, en précisant son identifiant client.
            {"\n"}La demande de suppression des données sera traitée dans les
            plus brefs délais.
            {"\n"}De plus, le responsable du traitement des données s'engage à
            garantir à l'utilisateur que le nécessaire a été fait, en cas de
            rectification ou de suppression des données, à moins que cela
            n'entraîne pour lui des formalités, coûts et démarches
            disproportionnés.
            {"\n"}L'utilisateur a le droit de demander la portabilité de ses
            données personnelles, détenues par le site, vers un autre site, en
            se conformant à la procédure ci-après : L'utilisateur doit faire une
            demande de portabilité de ses données personnelles auprès du
            responsable du traitement des données, en envoyant un e-mail à
            l'adresse prévue ci-dessus.
          </Text>
        </View>

        <View style={{ bottom: 4, alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={this.goToTop}>
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              style={{ color: "white" }}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: "1%",
    width: "100%",
  },
  // title
  titleH1: {
    fontSize: 23,
    color: "#04295D",
    marginTop: "10%",
    fontWeight: "bold",
    marginBottom: "10%",
    textAlign: "center",
  }, // subtitle
  titleH2: {
    color: "#3BB9E0",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 17,
    marginLeft: 8,
  },
  paragraph: {
    color: "#04295D",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "3%",
    marginRight: "2%",
    lineHeight: 22,
  },
});