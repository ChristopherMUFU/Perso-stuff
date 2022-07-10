import jsPDF from 'jspdf';
import Logo from "../images/Logo.png";

const smoothScroll = (to) => {
  const href = "#" + to; // '#projects'
  const offsetTop =
    document.querySelector(href)?.offsetTop - 60 ||
    document.querySelector(href)?.scrollTop - 60;

  // console.log({ href, offsetTop });

  window.scroll({
    top: offsetTop || 0,
    behavior: "smooth",
  });
};

function debounce(cb, delay, fn) {
  let timeoutId;
  return function (...args) {
    fn();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function isIntersecting(el_id) {
  const element = document.getElementById(el_id);
  const scrollTop_el = element?.offsetTop || element?.scrollTop || 0;
  // const height_el = element?.clientHeight || 0; // element a la moitié
  // const height_window = window.innerHeight;
  const window_scrollTop = document.documentElement.scrollTop;

  // console.log(scrollTop_el);
  // console.log(height_el);
  // console.log(height_window);
  // console.log(window_scrollTop);

  if (scrollTop_el - 150 < window_scrollTop) {
    // console.log("active", element);
    // console.log(scrollTop_el, window_scrollTop, element);
    return true;
  }

  return false;
}

function calculTotal(baskets = []) {
  const price = baskets.reduce((total, product) => {
    total += product.prixTotal * product.quantite;
    return total;
  }, 0);

  return +price.toFixed(2);
}

/*cette fonction extrait du tableau passé en parametre les objets et fait la somme des prix.
ici supplements contient des objets String qu'on doit parser pour extraire le prix_supplement*/
function calculTotalSupplements(supplements = []) {
  const price = supplements.reduce((total, supplement) => {
    total += JSON.parse(supplement).prix_supplement;
    return total;
  }, 0);
  return +price.toFixed(2);
}
/*cette fonction est identique à calculTotalSupplements,
  mais ici supplements contient des objets déjà parsés*/
function calculTotalSupplements_2(supplements = []) {
  const price = supplements.reduce((total, supplement) => {
    total += supplement.prix_supplement;
    return total;
  }, 0);
  return +price.toFixed(2);
}

function calculPrixProduitAvecQuantite(product) {
  return +(product.quantite * product.prixTotal).toFixed(2);
}

function splitPrix(prix = 0.0, splitOn = ".", joinWith = "€") {
  return parseFloat(prix).toFixed(2).toString().split(splitOn).join(joinWith);
}

function getNombresArticles(baskets = []) {
  return baskets.reduce((total, product) => total + product.quantite, 0);
}

function getPrixAvecHT(prixTTC, TVA) {
  const montantHT = prixTTC * (1 - TVA / 100);
  //const prixTTC = prixHT + montantTva;
  return +montantHT.toFixed(2);
}

const getDate = (date) => {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return newDate.toLocaleDateString("fr-FR", options);
};

const extractFilesNames = (articleToUpdate) => {
  if (articleToUpdate) {
    //extract image's noun and extension
    if (articleToUpdate.photo !== null) {
      const ImageResultRegex = RegExp("[^/]+$").exec(articleToUpdate.photo);
      var imageNameToUpdate = ImageResultRegex[0].substr(
        0,
        ImageResultRegex[0].indexOf("png") + 3
      );
    }
    if (articleToUpdate.document !== null) {
      //extract document's noun and extension
      const documentResultRegex = RegExp("[^/]+$").exec(
        articleToUpdate.document
      );
      var documentNameToUpdate = documentResultRegex[0].substr(
        0,
        documentResultRegex[0].indexOf("pdf") + 3
      );
    }
  }
  return { imageNameToUpdate,documentNameToUpdate };
};

const generatePDF = (type,title,item) => {
    
  var doc = new jsPDF();
  var img = new Image()
  img.src = `${Logo}`;
  doc.addImage(img, 'png', 60, 0, 80, 40)
  doc.setFont("bold");
  doc.text('APMF',10,50)
  doc.setFont("normal");
  doc.text('Association de Patient de la Maladie de Fabry',10,60)
  doc.text('21, rue Monge - 21160 MARSANNAY LA COTE ',10,70);
  doc.text('Téléphone : 06 32 26 25 69',10,80);
  doc.line(10,90, 200, 90);
  doc.text(`Reçu ${type}` ,90,100);
  doc.text(`Date : ${item.date}`,10,110);
  doc.text(`Don reçu de : ${item.nom}`,10,120);
  doc.text(`Montant : ${item.montant}€`,10,130);
  doc.text('Mode : paiement par carte bancaire',10,140);
  doc.text('Description : budget des actions pour faire connaitre la maladie de Fabry',10,150);
  doc.text('Je vous remercie et vous prie de croire en l’expression de nos salutations respectueuses.',10,160);
  doc.line(10,170, 200, 170);
  doc.text('Najya BEDREDDINE',10,180);
  doc.text('Présidente de L’APMF',10,190);
  doc.save(title);
}
export {
  extractFilesNames,
  isIntersecting,
  debounce,
  smoothScroll,
  calculTotal,
  splitPrix,
  getNombresArticles,
  calculPrixProduitAvecQuantite,
  getPrixAvecHT,
  calculTotalSupplements,
  calculTotalSupplements_2,
  getDate,
  generatePDF
};
