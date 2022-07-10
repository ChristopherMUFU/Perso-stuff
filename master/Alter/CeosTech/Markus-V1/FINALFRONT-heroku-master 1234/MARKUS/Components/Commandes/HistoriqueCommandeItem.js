import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import _map from 'lodash/map'

export default function HistoriqueCommandeItem(props) {
    const [pressed, setPressed] = useState(false);
    var prix = 0;
    let array;
    return (
        <TouchableOpacity 
            style={styles.mainContainer}
            onPress={() => setPressed(!pressed)}
        >
            <View style={styles.infoContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerDate}>
                        <Text style={styles.date} numberOfLines={1} >{new Date(props.item.date_commande).toLocaleDateString()}</Text>
                        <Text style={styles.heure} numberOfLines={1} >{new Date(props.item.date_commande).toLocaleTimeString()}</Text>
                    </View>
                    <View style={styles.headerMethod}>
                        <Text style={styles.method}>LIVRAISON</Text>
                    </View>
                </View>
                
                {pressed ? 
                    <View style={styles.commandeInfos}>
                        {
                            array = JSON.parse(props.item.panier.infos_produits),
                            _map(array, (key) => {
                                return(
                                    <View style={styles.commande}>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={styles.commandeName}>{key.produit.quantite + "x " + key.produit.nom}</Text>
                                            <Text style={styles.commandePrix}>{key.produit.prix} €</Text>
                                        </View>
                                    </View>
                                )
                            }
                            )
                        }
                        <View style={{borderColor: "#04295D", borderWidth: 0.25, width: "100%", marginVertical: "2%", alignSelf: "center"}}></View>
                        <View style={styles.prix}>
                            <Text style={styles.TTC}> Total TTC {" "}{props.item.prix_totale}€</Text>
                            <Text style={styles.HT}>Sous total {(props.item.prix_totale*90/100)} €</Text>
                        </View>
                        <View style={{borderColor: "#04295D", borderWidth: 0.25, width: "100%", marginVertical: "2%", alignSelf: "center"}}></View>
                        <View style={styles.commentaire}>
                            <Text style={[styles.TTC, {textAlign: 'center'}]}>Commentaire du client</Text>
                            <Text style={styles.HT}>{props.item.commentaire}</Text>
                        </View>
                        <View style={{borderColor: "#04295D", borderWidth: 0.25, width: "100%", marginVertical: "2%", alignSelf: "center"}}></View>
                    </View>
                :
                    null
                }
                

                <View style={styles.firstInfos}>
                    <View style={[styles.clientInfos, {width: pressed? "70%": "40%"}]}>
                        <Text numberOfLines={pressed? 2 : 1} style={[styles.firstName]}>{props.item.client.prenom + " " + props.item.client.nom }</Text>
                        {
                            !pressed?
                                null 
                            :
                                <View>
                                    <Text style={styles.adresse}>{props.item.client.adresse}</Text>
                                    <Text style={styles.adresse}>{props.item.client.code_postale + ' ' + props.item.client.ville}</Text>
                                    <Text style={styles.num}>{props.item.client.telephone}</Text>
                                </View>
                        }

                    </View>
                    <Text style={[styles.firstRef, {textAlign: pressed? "right": "center"}]}>Ref : {props.item.reference}</Text>
                    {
                        pressed?
                            null 
                        :
                            <Text style={styles.firstPrice}>{props.item.prix_totale} €</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

//color = "#04295D" #3BB9E0

const styles = StyleSheet.create({
    mainContainer:{
        padding: "1%",
        marginVertical: "1%",
        width: "100%",
        alignSelf: 'center',
        borderColor: '#04295D',
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden"
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        padding: "1%"
        //backgroundColor: '#04295D',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerDate: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden"
    },
    date: {
        color: "#04295D",
        fontSize: 12,
        width: "70%",
    },
    heure: {
        color: "#04295D",
        fontWeight: "bold",
        fontSize: 12,
        width: "30%"
    },
    headerMethod:{
        width: "40%",
        alignItems: "flex-end"
    },
    method: {
        fontSize: 12,
        color: "#FF4000",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    firstInfos: {
        flexDirection: "row",
        //justifyContent: "space-between"
    },
    clientInfos: {
        flexDirection: "column",
        width: "40%",
    },
    firstName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#04295D",
        textTransform: "capitalize"
    },
    adresse:{
        fontSize: 13,
        fontWeight: "900",
        color: "#04295D",
        textTransform: "capitalize",
    },
    num:{
        fontSize: 14,
        fontWeight: "bold",
        color: "#04295D",
    },
    firstRef: {
        width: "30%",
        textAlign: "center",
        textAlignVertical: "bottom",
        fontSize: 12,
        color: "#04295D",
    },
    firstPrice: {
        width: "30%",
        textAlign: "right",
        fontSize: 15,
        fontWeight: "bold",
        color: "#04295D",
    },
    commandeInfos:{
        //backgroundColor: 'yellow',
        flexDirection: "column"
    },
    commande: {
        flexDirection: "column",
        marginVertical: "1%"
    },
    commandeName: {
        width: "70%",
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "#04295D",
    },
    commandePrix: {
        width: "30%",
        textAlign: "right",
        fontSize: 15,
        fontWeight: "bold",
        color: "#04295D",
    },
    complement:{
        fontSize: 12,
        fontWeight: "900",
        color: "#04295D",
        textTransform: "capitalize",
    },
    complementPrix:{
        fontSize: 12,
        fontWeight: "900",
        color: "#04295D",
    },
    prix: {
        //backgroundColor: "yellow",
        alignItems: "flex-end",
        flexDirection: "column-reverse"
    },
    HT:{
        fontSize: 12,
        fontWeight: "900",
        color: "#04295D",
    },
    TTC: {
        textAlign: "right",
        fontSize: 15,
        fontWeight: "bold",
        color: "#04295D",
    },
    button: {
        alignSelf: "flex-end",
        backgroundColor: "#FF4000",
        width: "30%",
        padding: "1.5%",
        marginTop: "1%",
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
})