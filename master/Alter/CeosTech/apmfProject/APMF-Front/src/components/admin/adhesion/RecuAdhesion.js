import React from "react";
import {generatePDF} from "../../../utilities"

// import {
//   Page,
//   Image,
//   Text,
//   Line,
//   Svg,
//   Document,
//   StyleSheet,
//   usePDF,
// } from "@react-pdf/renderer";
 import { Button } from "@material-ui/core";

import Logo from "../../../images/Logo.png";

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     // paddingTop: 20,
//     paddingBottom: 50,
//     paddingHorizontal: 50,
//     fontFamily: "Times-Roman",
//   },
//   titleNomCompletAssociation: {
//     fontSize: 20,
//   },
//   titleAPMF: {
//     fontSize: 20,
//     // fontWeight: "bold italic",
//   },
//   titleRecu: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: "7rem 0",
//   },
//   subtitlePresident: {
//     fontSize: 17,
//   },
//   text: {
//     margin: 5,
//     fontSize: 14,
//     textAlign: "justify",
//     // border: "1px solid gray",
//   },
//   image: {
//     marginLeft: 120,
//     width: 250,
//     height: 100,
//   },
// });

export const RecuAdhesion = ({ nom, prenom, date_don, montant }) => {
  // const [instance, updateInstance] = usePDF({
  //   document: (
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         <Image style={styles.image} src={Logo} />
  //         <Text style={styles.titleAPMF}>APMF</Text>
  //         <Text style={styles.titleNomCompletAssociation}>
  //           Association de Patient de la Maladie de Fabry
  //         </Text>
  //         <Text style={styles.text}>
  //           21, rue Monge - 21160 MARSANNAY LA COTE Téléphone : 06 32 26 25 69
  //         </Text>
  //         <Text style={styles.text}>Téléphone : 06 32 26 25 69</Text>
  //         <Svg style={{ height: 20 }}>
  //           <Line
  //             x1="0"
  //             y1="10"
  //             x2="500"
  //             y2="10"
  //             strokeWidth={4}
  //             stroke="rgb(0 ,0,0)"
  //           />
  //         </Svg>
  //         <Text style={styles.titleRecu}>Reçu d'adhesion</Text>
  //         <Text style={styles.text}> Date : {date_don}</Text>
  //         <Text style={styles.text}>
  //           Adhesion reçu de : {nom} {prenom}
  //         </Text>
  //         <Text style={styles.text}> Montant : {montant}€</Text>
  //         <Text style={styles.text}> Mode : paiement par carte bancaire</Text>
  //         <Text style={styles.text}>
  //           Description : budget des actions pour faire connaitre la maladie de
  //           Fabry
  //         </Text>
  //         <Text style={[styles.text, { marginTop: 30 }]}>
  //           Je vous remercie et vous prie de croire en l’expression de nos
  //           salutations respectueuses.
  //         </Text>
  //         <Svg style={{ height: 20, marginTop: 5 }}>
  //           <Line
  //             x1="0"
  //             y1="10"
  //             x2="500"
  //             y2="10"
  //             strokeWidth={1}
  //             stroke="rgb(0 ,0,0)"
  //           />
  //         </Svg>
  //         <Text style={[styles.subtitlePresident, { marginTop: 10 }]}>
  //           Najya BEDREDDINE
  //         </Text>
  //         <Text style={styles.subtitlePresident}>Présidente de L’APMF</Text>
  //       </Page>
  //     </Document>
  //   ),
  // });

  // if (instance.loading) return <div>Chargement ...</div>;

  // if (instance.error)
  //   return <div>Quelque chose s'est mal passé {instance.error}</div>;

  return (
    <div
      style={{
        width: "100%",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button color="primary" variant="contained"
       onClick={()=>{generatePDF("de l'adhésion",`reçu_adhesion_${nom}_${prenom}_${montant}€.pdf`,{
        nom: prenom+ " "+nom,
        date: date_don,
        montant
      })}}
      >
          Télécharger reçu
      </Button>
      {/* <a
        href={instance.url}
        download={`reçu_adhesion_${nom}_${prenom}_${montant}€.pdf`}
      >
        
      </a> */}
    </div>
  );
};
