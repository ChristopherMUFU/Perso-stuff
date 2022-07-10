// Components/MenuGestionStocks.js

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { LinearGradient } from 'expo-linear-gradient';
import * as Theme from "../Styles/Theme";
import { color } from "react-native-reanimated";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faIdCard,
  faCubes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default class MenuGestionStocks extends React.Component {
  /* GO TO A PAGE
			Appelée par le menu / Called by the menu
	*/
  _goTo = (destination) => {
    this.props.navigation.navigate(destination);
  };

  // RENDER
  render() {
    return (
      // MENU GESTION DES STOCKS / INVENTORY MANAGEMENT MENU

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
            STOCK<Text style={{ color: "#6ed6ff", fontSize: 36}}>.</Text>
          </Text>
        </View>
        
        <ScrollView
          style={styles.buttonContainer} 
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO RESTO*/}
          {/* <Image
          source={require("../../assets/img/logo-resto.png")}
          style={[Theme.styles.logo, { position: "relative", top: "5%" }]}
          />
          <Text style={Theme.styles.minititle}>The Ranch</Text>
          <View style={Theme.styles.underline}></View> */}

          {/* MARCHANDISE / MERCHANDISE -------------------------- */}
          
          <TouchableOpacity
            onPress={() => {
              this._goTo("fournisseurs");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Fournisseurs</Text>
          </TouchableOpacity>

          {/* MARCHANDISE / MERCHANDISE -------------------------- */}
          <TouchableOpacity
            onPress={() => {
              this._goTo("merchandise");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Réception marchandise
            </Text>
          </TouchableOpacity>

          {/* INVENTAIRE / INVENTORY -------------------------- */}
          <TouchableOpacity
            onPress={() => {
              this._goTo("inventory");
            }}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Inventaire</Text>
          </TouchableOpacity>

          {/* FICHES TECHNIQUES / DATASHEETS-------------------------- */}
          <TouchableOpacity
            onPress={() => {
              //this._goTo("technical");
              Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 0.7}]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Fiches techniques</Text>
          </TouchableOpacity>

          {/* COMMANDE / ORDER -------------------------- */}

          <TouchableOpacity
            onPress={() => {
              //this._goTo("command");
              Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 0.7}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Commande</Text>
          </TouchableOpacity>

          {/* INGREDIENTS -------------------------- */}
          {/* <TouchableOpacity
              onPress={() => {
                this._goTo("ingredients");
              }}
              style={{ width: "80%", marginBottom:'2%' }}
            >
              
              <LinearGradient
                elevation={5}
                colors={["#696969", "#595959", "#494949"]}
                style={styles.linearGradient}
              >
                <Text style={styles.buttonText}>Liste Ingrédients</Text>
              </LinearGradient>
            </TouchableOpacity> */}

          {/* TRACABILITE -------------------------- */}
          <TouchableOpacity
            onPress={() => {
              // this._goTo("tracability");
              Alert.alert("Cette fonctionnalité sera bientôt disponible.");
            }}
            style={[styles.button, {opacity: 0.7}]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Traçabilité</Text>
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