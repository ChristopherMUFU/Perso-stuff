import ImgHeart from '../../images/site/Icones/Heart.png';
import ImgPeople from '../../images/site/Icones/People.png';
import ImgPeopleHeart from '../../images/site/Icones/PeopleHeart.png';
import ImgBook from '../../images/site/Icones/Book.png';

export const contentInfoTwos = [
    {
        id: 1,
        title: "Faire un don",
        text: "L’APMF est la première association française exclusivement dédiée aux patients de la maladie de Fabry. Elle regroupe des patients et des personnes impliquées dans la maladie.",
        link: ImgHeart,
        navLink: 'association/dons',
    },
    {
        id: 2,
        title: "Devenir adhérent",
        text: "Nous en avons plusieurs mais la plus importante reste l’information et le soutient aux malades et aux familles. Nous sollicitons également le corps médical et les pouvoirs publics.",
        link: ImgPeople,
        navLink: 'association/dons',
    },
    {
        id: 3,
        title: "Témoignage",
        text: "Pour être acteur et nous apporter votre soutien, vous pouvez devenir adhérent de l’association. Votre soutien en tant qu’adhérent constitue une contribution essentielle à notre action !",
        link: ImgPeopleHeart,
        navLink: 'association/temoignages',
    },
    {
        id: 4,
        title: "Le journal de Fabry",
        text: "Le Petit Journal de Fabry est édité par l’association une fois par an. Il fait le point sur l’évolution de la maladie et sur les actions entreprises par l’association. Il est gratuit.",
        link: ImgBook, 
        navLink: 'actualites/journal',
    }
]