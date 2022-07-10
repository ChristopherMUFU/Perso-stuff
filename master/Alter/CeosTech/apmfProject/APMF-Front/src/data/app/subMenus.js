/* Photos */
import maladie from '../../images/site/Photos/maladie.jpg';
import actualites from '../../images/site/Photos/actualites.jpg';
import journal from '../../images/site/Photos/journal-resize.jpg';
import partenaires from '../../images/site/Photos/partenaires.jpg';
import nous from '../../images/site/Photos/nous-resize.png';
import batiment from '../../images/site/Photos/batiments-resize.png';
import conseiller from '../../images/site/Photos/conseiller-resize.png';
import informations from '../../images/site/Photos/informations.jpg';
import traitements from '../../images/site/Photos/traitements-resize.png';
import scientifique from '../../images/site/Photos/microscope-resize.png';
import don from '../../images/site/Photos/don.jpg';
import temoignages from '../../images/site/Photos/temoignages-resize.png';

/* Components Association*/
import Nous from '../../components/app/Association/Nous';
import Comite from '../../components/app/Association/Comite';
import Adherer from '../../components/app/Association/Adherer';
import Don from '../../components/app/Association/Don';
import Temoignages from '../../components/app/Association/Temoignages';

/*Components Partenaires */
import PartenairesAPMF from '../../components/app/Partenaires/PartenairesAPMF';
import Centres from '../../components/app/Partenaires/Centres';


import ActualitesList from '../../components/app/Actualites/ActualitesList';
import JournalFabry from '../../components/app/Actualites/JournalFabry';

export const menuInfos = [
  {
    id: 1,
    name: "La maladie de Fabry",
    link: "fabry",
    menu: [
      {
        id: 1,
        name: "La maladie",
        link: "maladie",
        header: true,
        description:
          "La maladie de Fabry est une maladie héréditaire causée par une anomalie génétique, qui concerne toute une famille et se transmet de génération en génération. Les hommes et les femmes peuvent être atteints et transmettre la maladie ; cette anomalie génétique est à l’origine d’une maladie chronique et évolutive dans le temps, touchant progressivement différents organes et dont les manifestations les plus graves peuvent toucher le cerveau, le cœur et les reins.",
        img: maladie,
        subSubMenu: true,
        subSubMenu_id: 1,
      },
      {
        id: 2,
        name: "Traitements",
        link: "traitements",
        header: true,
        description:
          "Les médicaments spécifiques de la maladie de Fabry : les traitements enzymatiques substitutifs. Données mises à jour en juin 2008 à partir des derniers rapports européens publics d’évaluation (EPAR)",
        img: traitements,
        subSubMenu: true,
        subSubMenu_id: 2,
      },
      {
        id: 3,
        name: "Vivre avec la maladie",
        link: "vivre-avec",
        header: true,
        description:
          "La maladie de Fabry est une maladie héréditaire causée par une anomalie génétique, qui concerne toute une famille et se transmet de génération en génération. Les hommes et les femmes peuvent être atteints et transmettre la maladie ; cette anomalie génétique est à l’origine d’une maladie chronique et évolutive dans le temps, touchant progressivement différents organes et dont les manifestations les plus graves peuvent toucher le cerveau, le cœur et les reins.",
        img: conseiller,
        subSubMenu: true,
        subSubMenu_id: 3,
      },
      {
        id: 4,
        name: "Informations utiles",
        link: "informations",
        header: true,
        img: informations,
        subSubMenu: false,
      },
    ],
  },
  {
    id: 2,
    name: "L'association",
    link: "association",
    menu: [
      {
        id: 1,
        name: "Qui sommes-nous ?",
        subtitle: "Une première en France",
        link: "qui-sommes-nous",
        header: true,
        description:
          "L’Association des Patients de la Maladie de Fabry (APMF) est une association loi 1901 qui a été créée en août 2005. C’est la première association française exclusivement dédiée aux patients de la maladie de Fabry. Elle regroupe des patients et des personnes impliquées dans la maladie de Fabry (familles, conjoints, médecins…).Ses objectifs sont de fournir un lieu d’échanges, d’écoute, de soutien et d’informations pour les patients et leur entourage, ainsi que de permettre l’amélioration des connaissances sur la maladie de Fabry.",
        img: nous,
        subSubMenu: false,
        component: <Nous />,
      },
      {
        id: 2,
        name: "Le comité scientifique",
        link: "comite-scientifique",
        header: true,
        description:
          "Afin d’apporter aux questions d’ordre médical, les réponses les plus précises et les plus actualisées qui soient, l’Association est soutenue dans ses projets par un Comité Scientifique constitué de médecins et de professionnels de santé spécialistes de la maladie de Fabry.Ce Comité Scientifique a principalement pour rôle d’assister l’Association dans le domaine scientifique, d’orienter et de coordonner les travaux de recherches qui correspondent aux buts de l’Association.Ses membres répondent aux questions médicales que se posent les patients et apportent leur caution dans les différents documents qui sont diffusés par l’Association ou dans les réponses émises lors des forums de discussion sur le site de l’association.Le Comité Scientifique décide enfin conjointement avec l’Association des questions d’actualité à mettre à l’ordre du jour de la journée annuelle de l’association.Les membres du Comité Scientifique adhèrent au moment de leur adhésion à une charte de conduite éthique.",
        img: scientifique,
        subSubMenu: false,
        component: <Comite />,
      },
      {
        id: 3,
        name: "Nous soutenir",
        nameToDisplay: "Nous soutenir",
        link: "dons",
        header: true,
        img: don,
        subSubMenu: true,
        subSubMenu_id: 4,
      },
      {
        id: 4,
        name: "Témoignages",
        link: "temoignages",
        header: true,
        img: temoignages,
        subSubMenu: false,
        component: <Temoignages />,
      },
    ],
  },
  {
    id: 3,
    name: "Actualités",
    link: "actualites",
    menu: [
      {
        id: 1,
        name: "Notre actualité",
        link: "actualite",
        header: true,
        img: actualites,
        subSubMenu: false,
        component: <ActualitesList />
      },
      {
        id: 3,
        name: "Le petit journal de Fabry",
        link: "journal",
        header: true,
        description:
          "Découvrez toute l’actualité de L’APMF résumée dans le petit journal de Fabry. Suivez les actions mises en place pendant l’année, les différents ateliers que l’APMF a pu organiser. Mais aussi le programme des prochaines rencontres, le tout accompagné d’image de l’association et de témoignage d’adhérent. Bonne lecture à tous.",
        img: journal,
        subSubMenu: false,
        component: <JournalFabry />
      },
    ],
  },
  {
    id: 4,
    name: "Partenaires et hôpitaux",
    link: "partenaires-hopitaux",
    menu: [
      {
        id: 1,
        name: "Les centres de référence",
        link: "centres",
        header: true,
        img: batiment,
        subSubMenu: false,
        component: <Centres />
      },
      {
        id: 3,
        name: "Partenaires",
        nameToDisplay: "Les Partenaires de l'APMF",
        link: "partenaires",
        header: true,
        img: partenaires,
        subSubMenu: false,        
        component: <PartenairesAPMF />
      },
    ],
  },
];

export const subSubMenu = [
  {
    id: 1,
    menu: [
      {
        id: 1,
        name: "L'essentiel",
        content_id: 1,
      },
      {
        id: 2,
        name: "Les symptômes",
        content_id: 2,
      },
      {
        id: 3,
        name: "Diagnostic, bilan et suivi",
        content_id: 3,
      },
      {
        id: 4,
        name: "L'origine génétique",
        content_id: 4,
      },
      {
        id: 5,
        name: "La maladie et ses conséquences",
        content_id: 5,
      },
      {
        id: 6,
        name: "Qui est concerné",
        content_id: 6,
      },
      {
        id: 7,
        name: "Les risques graves d'évolution",
        content_id: 7,
      },
      {
        id: 8,
        name: "Les signes d'espoir",
        content_id: 8,
      },
      {
        id: 9,
        name: "Savoir si on est atteint",
        content_id: 9,
      },
    ],
  },
  {
    id: 2,
    menu: [
      {
        id: 1,
        name: "Galafold",
        content_id: 10,
      },
      {
        id: 2,
        name: "Fabrazyme",
        content_id: 11,
      },
      {
        id: 3,
        name: "Age & Evolution",
        content_id: 12,
      },
    ],
  },
  {
    id: 3,
    menu: [
      {
        id: 1,
        name: "Les principales situations",
        content_id: 13,
      },
      {
        id: 2,
        name: "La vie quotidienne",
        content_id: 14,
      },
      {
        id: 3,
        name: "Avec les proches",
        content_id: 15,
      },
      {
        id: 4,
        name: "Le rôle du médecin",
        content_id: 16
      },
      {
        id: 5,
        name: "Les difficultés pour l'entourage",
        content_id: 17,
      },
      {
        id: 6,
        name: "L'accompagnement dans le traitement",
        content_id: 18,
      },
    ],
  },
  {
    id: 4,
    menu: [
      {
        id: 1,
        name: "Faire un don",
        component: <Don />,
      },
      {
        id: 2,
        name: "Adhérer",
        component: <Adherer />,
      },
    ],
  },
];

export const headerArticles = {
    id: 1,
    name: "Les actualités de l'APMF",
    header: true,
    img: actualites,
}