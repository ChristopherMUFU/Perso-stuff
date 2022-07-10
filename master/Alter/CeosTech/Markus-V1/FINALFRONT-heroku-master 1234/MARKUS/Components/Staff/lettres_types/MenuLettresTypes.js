import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

export default class MenuLettresTypes extends React.Component {
  /* GO TO A PAGE
			AppelÃĐe par le menu / Called by the menu
	*/
  _goTo = (action) => {
    switch (action) {
      case "licencier":
        this.props.navigation.navigate("MenuLicenciement");
        break;

      case "convoquer":
        this.props.navigation.navigate("MenuConvocation");
        break;

      case "historique":
        this.props.navigation.navigate("MenuHistorique");
        break;
    }
  };

  // RENDER
  render() {
    return (
      // MENU LETTRES TYPES  / STANDARD LETTERS MENU
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this._goTo("licencier");
          }}
          style={styles.button}
		  activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Licencier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this._goTo("convoquer");
          }}
          style={styles.button}
		  activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Convoquer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            //onPress = {() => { this._goTo('historique')}}
            Alert.alert("Cette fonctionnalitÃĐ sera bientôt disponible.");
          }}
          style={[styles.button, {opacity: 0.7}]}
		  activeOpacity={0.7}
        >
          <Text style={[styles.buttonText]}>Historique</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /*GENERAL */
  container: {
    backgroundColor: "white",
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
    //paddingTop: "0%",
    width: "100%",
  },

  buttonText: {
    //flex:1,
    fontSize: 22,
    /* fontFamily: "Gill Sans", */
    fontWeight:'bold',
    color: "white",
    //backgroundColor: "yellow",
    textAlign: "center",
	textAlignVertical: "center",
    flexDirection:'row', 
    padding: "3%"
  },

  button: {
    // le style de fond du bouton + la forme
    width: "90%", 
	//height: "10%",
    marginVertical: '3%', 
    borderColor: "#3BB9E0", 
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: '#04295D',
    alignSelf: "center"
  },
});