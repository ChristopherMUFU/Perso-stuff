// Components/Staff/Staff.js
import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import * as Theme from "../Styles/Theme";
import LinearGradient from "react-native-linear-gradient";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faIdCard,
  faCubes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default class MenuStaff extends React.Component {
  _goTo = (action) => {
    switch (action) {
      case "registre":
        this.props.navigation.navigate("registre");
        break;

      case "MenuDPAE":
        this.props.navigation.navigate("MenuDPAE");
        break;

      case "contrats":
        this.props.navigation.navigate("contrats");
        break;

      case "lettres_types":
        this.props.navigation.navigate("lettres_types");
        break;

      case "Planningbis":
        this.props.navigation.navigate("Planningbis");
        break;

      case "planning":
        this.props.navigation.navigate("planning");
        break;

      case "feuilles_de_presence":
        this.props.navigation.navigate("feuilles_de_presence");
        break;
      case "emargement":
        this.props.navigation.navigate("emargement");
        break;
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            width: "80%",
            zIndex: 99,
            marginTop: "-3%",
            marginLeft: "5%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ flex: 1, marginTop: "10%", color: "#fff" }}
              size={18}
            />
          </View>
        </TouchableOpacity> */}

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            RH<Text style={{ color: "#6ed6ff", fontSize: 36}}>.</Text>
          </Text>
        </View>

        <ScrollView 
          style={styles.buttonContainer} 
          showsVerticalScrollIndicator={false}
          >

          <TouchableOpacity
            onPress={() => {
              this._goTo("registre");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Registre du personnel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._goTo("contrats");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Contrats de travail
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._goTo("lettres_types");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Lettres types</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._goTo("emargement");
              //Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 1}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Émargement</Text>
          </TouchableOpacity>

          {/*<TouchableOpacity
                onPress={() => {
                    this._goTo("Planningbis");
                  //Alert.alert("Cette fonctionnalité sera bientôt disponible.") 
                } }
                style={[Theme.buttonsV2.touchAble, { width: "80%", marginBottom: '2%' }]} 
              >
                <LinearGradient
                  elevation={5}
                  colors={["#696969", "#595959", "#494949"]}
                  style={Theme.buttonsV2.linearGradientmenu}
                >
                  <Text style={Theme.buttonsV2.buttonTextmenu}>Planningbis</Text>
                </LinearGradient>
              </TouchableOpacity>
              */}

          <TouchableOpacity
            onPress={() => {
              this._goTo("planning");
            }}
            style={[styles.button, {opacity: 1}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Planning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // this._goTo("MenuDPAE");
              Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 0.6}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              Déclaration préalable à l'embauche
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              /* this._goTo("feuille_de_presence"); */
              Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 0.6}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              Feuilles de présence
            </Text>
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
    //flex:1,
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