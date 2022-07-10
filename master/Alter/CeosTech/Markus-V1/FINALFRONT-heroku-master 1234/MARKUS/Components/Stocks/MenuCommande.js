// Components/MenuGestionStocks.js

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from 'expo-linear-gradient';
import * as Theme from "../Styles/Theme";

export default class MenuCommande extends React.Component {
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
		
      <View style={Theme.styles.container}>
        
				{/* HISTORIQUE COMMANDES / ORDER HISTORY -------------------------- */}
			<TouchableOpacity
				onPress={() => {
					this._goTo("command_historic");
				}}
				style={{ width: "80%"}}
			>
				<LinearGradient
					elevation={5}
					colors={["#696969", "#595959", "#494949"]}
					style={styles.linearGradient}
				>
					<Text style={styles.buttonText}>Commandes</Text>
				</LinearGradient>
			</TouchableOpacity>

				{/* FOURNISSEURS / PROVIDERS -------------------------- */}
			<TouchableOpacity
				onPress={() => {
					this._goTo("fournisseurs");
				}}
				style={{ width: "80%"}}
			>
				<LinearGradient
					elevation={5}
					colors={["#696969", "#595959", "#494949"]}
					style={styles.linearGradient}
				>
					<Text style={styles.buttonText}>Fournisseurs</Text>
				</LinearGradient>
			</TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
	touchAble: {
	  width: "70%",
	},
	linearGradient: {
	  paddingLeft: 15,
	  paddingRight: 15,
	  borderRadius: 5,
	  borderColor: "#B0B0B0",
	  borderWidth: 1,
	  marginTop: '10%',
	},
	buttonText: {
	  fontSize: 18,
	  /* fontFamily: "Gill Sans", */
	  textAlign: "center",
	  margin: 10,
	  marginBottom: 10,
	  color: "#ffffff",
	  backgroundColor: "transparent",
	},
 });