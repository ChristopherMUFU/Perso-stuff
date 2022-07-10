// Components/MenuCommandes.js

import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";

export default class MenuCommandes extends React.Component {
  /* GO TO A PAGE
			Appelée par le menu / Called by the menu
	*/
    _goTo = (action) => {
        switch (action) {
            case "NOUVELLE_COMMANDE":
                this.props.navigation.navigate("NOUVELLE_COMMANDE");
                break;

            case "COMMANDES_EN_COURS":
                this.props.navigation.navigate("COMMANDES_EN_COURS");
                break;
            
            case "HISTORIQUE_COMMANDES":
                this.props.navigation.navigate("HISTORIQUE_COMMANDES");
                break;
        }


    }

  // RENDER
  render() {
    return (
      // MENU COMMANDES

      <View style={styles.mainContainer}>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            GESTION DES COMMANDES<Text style={{ color: "#6ed6ff", fontSize: 36}}>.</Text>
          </Text>
        </View>
        
        <ScrollView
          style={styles.buttonContainer} 
          showsVerticalScrollIndicator={false}
        >


          {/* Nouvelle commande -------------------------- */}
          
          <TouchableOpacity
            onPress={() => {
              this._goTo("NOUVELLE_COMMANDE");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Nouvelle commande</Text>
          </TouchableOpacity>

          {/* Commandes en cours -------------------------- */}
          <TouchableOpacity
            onPress={() => {
              this._goTo("COMMANDES_EN_COURS");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Commandes en cours
            </Text>
          </TouchableOpacity>

          {/* Historique des commandes -------------------------- */}
          <TouchableOpacity
            onPress={() => {
              this._goTo("HISTORIQUE_COMMANDES");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Historique des commandes</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  titleContainer: {
    //backgroundColor: "yellow",
    paddingTop: "20%",
    paddingBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#04295D"
  },
  titleText:{
      //backgroundColor: "red",
      textAlign: "center",
      fontSize: 36,
      fontWeight: "700",
      color: "#04295D"
  },
  buttonContainer: {
      
      //paddingTop:"5%",
      marginTop:"5%", 
      width:'100%',
      //backgroundColor: "red",
  },
  button: {
    width: "90%", 
    marginVertical: '3%', 
    borderColor: "#3BB9E0", 
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: '#04295D',
    alignSelf: "center"
  },
  buttonText: {
    flex:1,
    fontSize: 22,
    /* fontFamily: "Gill Sans", */
    fontWeight:'bold',
    color: "white",
    //backgroundColor: "yellow",
    textAlign: "center",
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "center",
    padding: "3%"
  },
});