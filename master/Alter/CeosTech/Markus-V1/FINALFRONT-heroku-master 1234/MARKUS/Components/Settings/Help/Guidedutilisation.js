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

export default class Guidedutilisation extends React.Component {
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
        {/* <View style={GUStyle.container}>
            <Text style={GUStyle.title1}> Notice d'utilisation </Text>
      </View> */}

        <Text style={[GUStyle.titre_1, { marginTop: "7%" }]}>
          {" "}
          Inscription{" "}
        </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Lors de la première connexion sur l’application, il est nécessaire de
          remplir le formulaire d’inscription. Il faut {"\n"} renseigner les
          informations du profil utilisateur puis {"\n"} renseigner les
          informations de la société et de l’établissement si celui-ci diffère
          du siège social (= lieu de travail du salarié) avec des informations
          exactes. {"\n"} Une fois les champs renseignés, appuyez sur Confirmer.
          Vous serez redirigé sur la page de connexion. Vous pouvez retrouver
          l’ensemble des informations légales de votre entreprise (SIRET, SIREN
          …) sur votre KBIS.
        </Text>

        <Text style={GUStyle.sstitre1}> Connexion </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Lors de la connexion, il faut renseigner votre identifiant
          correspondant à votre adresse mail- ainsi que votre mot de passe.
        </Text>

        <Text style={GUStyle.sstitre1}> Mot de passe oublié </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          En cas d’oubli de mot de passe, appuyer sur Mot de passe oublié sur la
          page de connexion. Votre mot de passe sera envoyé à votre boîte mail.
          Dans le cas du mot de passe oublié, il sera envoyé à l’adresse mail
          associée au compte.
        </Text>

        <Text style={[GUStyle.titre_1, { marginTop: "10%" }]}>
          {" "}
          Menu principal{" "}
        </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          3 rubriques vous permettent de profiter des fonctionnalités de
          MARKUS :
        </Text>
        <Text style={GUStyle.sstitre1}> STOCK </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Dans ce menu, vous pourrez ajouter un fournisseur, accuser la
          réception de vos marchandises, réaliser l’inventaire de vos produits
          et élaborer les fiches techniques de vos plats.
        </Text>

        <Text style={GUStyle.sstitre2}> Fournisseurs </Text>
        <Text style={GUStyle.sstitre3}> Ajouter un fournisseur </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Pour ajouter un fournisseur à partir du MENU, aller dans STOCK puis
          Fournisseurs. Dans la rubrique fournisseurs, appuyer sur Ajouter
          fournisseur et remplir les différents champs en n’oubliant pas de
          cocher les jours de livraisons opérés par le fournisseur. Une fois le
          fournisseur saisi, appuyer sur Créer. Il apparaîtra ainsi dans la
          liste des fournisseurs avec son délai de livraison correspondant au
          nombre de jours après le jour J de commande.
        </Text>

        <Text style={GUStyle.sstitre3}>
          {" "}
          Modifier/supprimer un fournisseur{" "}
        </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          A partir du fournisseur sélectionné, appuyer sur modifier pour changer
          les informations d’un fournisseur et supprimer pour enlever un
          fournisseur de la liste. Une fois les champs modifiés, appuyer sur
          Confirmer.
        </Text>

        <Text style={GUStyle.sstitre2}> Réception marchandise </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez rentrer vos produits dès leur réception dans votre
          restaurant. Ces marchandises seront automatiquement intégrées dans
          l’inventaire. Commencez par sélectionner la catégorie de marchandise
          souhaitée parmi la liste déroulante. Après avoir rentré le nom, la
          date d’entrée et la DLUO de la marchandise, rentrez la quantité totale
          et le poids total correspondant. Cela permet de pouvoir calculer le
          prix pour 1 unité de marchandise ou une quantité donnée. Le montant en
          euros HT correspond au prix d’achat HT. Enfin, vous pouvez renseigner
          le fournisseur et la référence du produit.
          {"\n"}Pour une utilisation optimale, veuillez rentrer manuellement les
          fournisseurs de vos produits si ces derniers sont différents de ceux
          ajoutés par défaut.
        </Text>

        <Text style={GUStyle.sstitre2}> Inventaire </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          L’inventaire sert à répertorier l’ensemble des produits présents dans
          votre restaurant. Vous avez la possibilité de filtrer l’ensemble par
          date (mois et année) ou par catégorie de produit ou de trier par ordre
          alphabétique ou par DLUO décroissante.
        </Text>
        <Text style={GUStyle.sstitre3}> Mise à jour </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez mettre à jour la quantité présente en sélectionnant le
          produit et en renseignant la quantité utilisée. Appuyez ensuite sur
          Mettre à jour.
        </Text>
        <Text style={GUStyle.sstitre3}> Suppression </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez supprimer un produit de l’inventaire en sélectionnant le
          produit et en appuyant sur le bouton Supprimer.
        </Text>

        <Text style={GUStyle.sstitre2}> Fiches techniques </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Une fiche technique sert à rassembler l’ensemble des connaissances
          relatives à vos recettes de cuisine et est mise à disposition pour les
          futurs cuisiniers.
        </Text>

        <Text style={GUStyle.sstitre3}> Créer fiche technique </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Pour créer une fiche technique à partir du menu fiches techniques,
          appuyez sur Créer fiche technique. Vous pouvez ajouter chaque
          ingrédient de la recette avec la quantité nécessaire et son unité de
          mesure correspondante (gramme ou kilogramme). Appuyez sur Valider pour
          chaque ingrédient rentré et réitérez l’action pour tous les
          ingrédients de la recette. Renseignez le processus de réalisation avec
          les étapes de préparation ainsi que la catégorie de menu et le temps
          de préparation. Pour le réchauffage, il faut renseigner la description
          de réchauffage avec la température et le type de cuisson. Le
          coefficient multiplicateur permet de définir le prix de vente d’un
          plat en fonction du coût matière de ce dernier.
        </Text>

        <Text style={GUStyle.sstitre1}> RESSOURCES HUMAINES </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Le menu Ressources Humaines permet de créer une fiche salarié, générer
          un contrat de travail et obtenir un modèle de lettre type pour
          convocation ou licenciement.
        </Text>
        <Text style={GUStyle.sstitre2}> Registre du personnel </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          A partir du menu RH, appuyer sur Registre du personnel puis Créer
          fiche salarié. Renseignez les différentes informations de la fiche
          salarié puis appuyer sur Confirmer.
        </Text>

        <Text style={GUStyle.sstitre3}>
          {" "}
          Modification/Suppression de fiche salarié{" "}
        </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Pour modifier/supprimer les informations du salarié, appuyez sur le
          salarié puis sur bouton Modifier/Supprimer. Une fois les champs mis à
          jour, appuyez sur Confirmer. Notez que la fiche salarié est
          automatiquement supprimée à l’issue du contrat.
        </Text>

        <Text style={GUStyle.sstitre2}> Contrat de travail </Text>

        <Text style={GUStyle.paragraphe}>
          {" "}
          Pour finaliser l’embauche d’un salarié, vous devez remplir et signer
          un contrat de travail. Selon le type de contrat (CDD, CDI),
          sélectionnez le bouton correspondant au contrat souhaité. Renseignez
          les différentes informations du futur salarié. En remplissant un
          contrat de travail, une fiche salariée est automatiquement créée. - Le
          contrat est à temps plein lorsque le temps de travail correspond à
          35h/semaine. En-dessous de ces 35h, le contrat de travail bascule
          automatiquement en contrat à temps partiel. - Le taux horaire brut
          correspond à la rémunération brute par heure. Son minimum dépend de
          chaque convention - La période d’essai n’est pas obligatoire. Sa durée
          dépend du contrat et du statut du salarié : * CDI : 2 mois pour un
          employé, 3 mois pour un agent de maîtrise et 4 mois pour un cadre,
          renouvelable une fois dans le même délai, * CDD : 1 jour par semaine,
          dans la limite de 2 semaines, pour les contrats d’une durée inférieure
          ou égale à 6 mois, 1 mois pour les contrats de plus de 6 mois Il est
          recommandé d’enregistrer le contrat de travail sur Drive puis de
          l’imprimer pour faire signer manuscritement les 2 parties.
        </Text>

        <Text style={GUStyle.sstitre2}> Lettre types </Text>
        <Text style={GUStyle.sstitre3}> Convocation</Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          L’employeur qui envisage de licencier un salarié doit le convoquer à
          un entretien préalable. La convocation, envoyée par lettre recommandée
          avec accusé de réception ou remise en main propre contre signature,
          doit parvenir à l’intéressé au moins 5 jours ouvrables avant
          l’entretien préalable. {"\n"}
          Pour obtenir une lettre de convocation à partir du menu RH, appuyez
          sur Lettres types puis Convoquer. Une fois les différents champs
          renseignés (nom du salarié, date d’entretien préalable, date du
          document et motif de la convocation), appuyez sur Valider.
        </Text>

        <Text style={GUStyle.sstitre3}> Licenciement</Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Pour licencier un salarié, un employeur doit respecter la procédure
          imposée par le Code du travail. Celle-ci comprend un entretien
          préalable de licenciement suivi, quelques jours plus tard, d'un
          courrier de notification de licenciement adressé au salarié.{"\n"}
          Pour obtenir une lettre de licenciement à partir du menu RH, appuyez
          sur Lettres types puis Licencier. Une vois les différents champs
          renseignés (nom du salarié, date d’entretien préalable, date du
          document et motif du licenciement), appuyez sur Valider.
        </Text>

        <Text style={GUStyle.sstitre3}> Historique</Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez retrouver l’ensemble des lettres types rédigées dans
          l’historique. Pour retrouver une lettre à partir du menu RH, appuyez
          sur Lettres types puis Historique.
        </Text>

        <Text style={GUStyle.sstitre1}> COMPTE </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          A partir du menu Compte, vous pouvez retrouver l’ensemble de vos
          informations personnelles ainsi que bénéficier de l’assistance de
          MARKUS.
        </Text>

        <Text style={GUStyle.sstitre2}> Mon compte </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez modifier vos informations personnelles ainsi que celles de
          la société et de l’établissement. Une fois les informations mises à
          jour, cliquez sur Enregistrer les informations.
        </Text>

        <Text style={GUStyle.sstitre2}> Assistance </Text>
        <Text style={GUStyle.paragraphe}>
          {" "}
          Vous pouvez retrouver les CGU, retrouver ce présent guide
          d’utilisation ou contacter le support technique à travers cette
          rubrique.
        </Text>

        <Text
          style={[GUStyle.paragraphe, { fontWeight: "bold", fontSize: 20 }]}
        >
          {" "}
          Bonne utilisation de MARKUS !
        </Text>

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

const GUStyle = StyleSheet.create({
  //containers
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1%",
    width: "100%",
    marginTop: 17,
  },

  title1: {
    color: "#04295D",
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    textDecorationLine: "underline",
  },

  titre_1: {
    color: "#00B4DB",
    fontSize: 26,
    alignItems: "center",
    marginLeft: "3%",
  },

  sstitre1: {
    color: "#00B4DB",
    fontSize: 20,
    textAlign: "left",
    marginLeft: "6%",
    marginTop: "2%",
  },

  sstitre2: {
    color: "#00B4DB",
    fontSize: 23,
    textAlign: "left",
    marginLeft: "4%",
    marginTop: "2%",
  },

  sstitre3: {
    color: "#04295D",
    fontSize: 18,
    textAlign: "left",
    marginLeft: "5%",
    marginTop: "2%",
    fontStyle: "italic",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  paragraphe: {
    color: "#04295D",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: "3%",
    marginRight: "2%",
    marginTop: "3%",
    lineHeight: 22,
  },
});