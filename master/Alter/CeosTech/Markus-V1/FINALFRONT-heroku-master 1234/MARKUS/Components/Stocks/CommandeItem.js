import React from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { LinearGradient } from 'expo-linear-gradient';
import * as Theme from "../Styles/Theme";

import { setProduitEnStock } from '../../API/StocksData'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


class CommandeItem extends React.Component {
  // CONSTRUCTEUR / CONSTRUCTOR
  constructor(props) {
    super(props);
   //  this.state = {};
   this.ico = {
      shop : require('../../Assets/ico/shop.png')
   }
  }

   // MÉTHODES / METHODS
  _displayItem() {
      const { commande } = this.props;
      return (
         <LinearGradient
            style={styles.box_gradient}
            elevation={5}
            colors={["#696969", "#595959", "#494949"]}
         >
            <TouchableOpacity onPress={() => {return;}} >
               <View style={styles.box_container}>

                  <View style={styles.box_left_container}>
                     <Text style={styles.list_textTitle}>{commande.fournisseur}</Text>
                     <Text style={styles.list_textTitle}>{commande.nbArticles} articles</Text>
                     <Text style={styles.text_details}>Détails de la commande</Text>
                  </View>

                  <View style={styles.box_right_container}>
                     <Text style={styles.list_textTitle}>{commande.date}</Text>
                     <Text style={[styles.list_textTitle, {fontSize: 22}]}>{commande.prixTotal} €</Text>
                     <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('new_command', {'idCommande': commande.id})}
                        style = {{flex:4, marginTop: '20%'}}
                     >
                        <LinearGradient
                           elevation={5}
                           colors={["#606060", "#505050", "#303030"]}
                           style={styles.button_gradient}
                        >
                           <Image style = {styles.shop_ico}source = {this.ico.shop} />
                           <Text style={styles.button_action_text}>Commander</Text>
                        </LinearGradient>
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => setProduitEnStock(commande.id)}
                        style = {{flex:4, marginTop: '20%'}}
                     >
                        <LinearGradient
                           elevation={5}
                           colors={["#606060", "#505050", "#303030"]}
                           style={styles.button_gradient}
                        >
                           <Image style = {styles.shop_ico}source = {this.ico.shop} />
                           <Text style={styles.button_action_text}>Mettre en stock</Text>
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>

               </View>                 
            </TouchableOpacity>
         </LinearGradient>
      );
   }

  render() {
     return(
        <>
         {this._displayItem()}
        </>
     )
  }
}

// STYLES
const styles = StyleSheet.create({
   box_gradient : {
      width: windowWidth * 0.95,
      height: windowHeight * 0.3,
      borderWidth: 1.0,
      borderRadius: 5,
      borderColor: "#B0B0B0",
      marginBottom: "2%"
   },
   box_container : {
      flexDirection: "row",
      height: '100%',
      padding: '2%'
   },
   box_left_container : {
      flex: 2,
   },
   box_right_container : {
      flex: 1,
      alignItems: 'flex-end'
   },
   list_textTitle: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      flex: 3,

   },
   text_details : {
      flex: 2,
      marginTop: '10%',
      color: 'white',
      fontSize: 12,
      fontStyle: 'italic',
      opacity: 0.5
   },
   button_gradient: {
      padding: '5%',
      borderRadius: 5,
      borderColor: "#B0B0B0",
      borderWidth: 1,
      marginBottom: '5%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    button_action_text: {
      fontSize: 12,
      marginLeft: 5,
      textAlign: "center",
      color: "#ffffff",
    },
    shop_ico : {
      resizeMode: 'contain',
      width: 14,
      height: 14
    }
});

export default CommandeItem;
