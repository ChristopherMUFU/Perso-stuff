// Components/Stocks/Commande.js

import React from 'react';
import { 
   Text,
   View,
   StyleSheet,
   Dimensions,
   Image 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as Theme from '../Styles/Theme';
import ListCommande from './ListCommande';
import { getCommande } from '../../API/StocksData';


// ENSEMBLE DES ANNÉES DEPUIS 2000 / ALL YEARS SINCE 2000
const objYear = () => {
   let i = new Date().getFullYear()
   let tabYear = [];
   while (i >= 2000) {
      tabYear.push({label: i.toString(), value: i})
      i--
   }
   return(tabYear);
}

export default class Commande extends React.Component {
   // CONSTRUCTEUR / CONSTRUCTOR --------------------
   constructor(props) {
      super(props);
      this.images = {
         new_form: require('../../Assets/ico/new_form.png')
      };
      this.month = [
         {label: 'Janvier', value: 1},
         {label: 'Fevrier' , value : 2},
         {label: 'Mars' , value : 3},
         {label: 'Avril' , value : 4},
         {label: 'Mai' , value : 5},
         {label: 'Juin' , value : 6},
         {label: 'Juillet', value : 7},
         {label: 'Août' , value : 8},
         {label: 'Septembre' , value : 9},
         {label: 'Octobre' , value : 10},
         {label: 'Novembre' , value : 11},
         {label: 'Decembre' , value : 12},
      ];
      this.year = objYear(),
      this.state = {
         commandes: []
      }
   }

   componentDidMount() {
      getCommande().then( (data) => {
         this.setState({commandes: data})
      })
      
   }
   // MÉTHODES PRIVÉES / PRIVATE METHODS --------------------
   _goTo(action) {
      switch(action) {
         case'new_command':
            this.props.navigation.navigate('new_command');
      default:
         return;
      }
   }


   // RENDER --------------------
   render() {
      return(
          // Dropdown pour sélectionner le mois / Dropdown to select the month
         <View style = {Theme.styles.container}>
            <View style={styles.header_container}>

             {/* NOUVELLE COMMANDE (NOUVEAU FORMULAIRE) / NEW ORDER (NEW FORM) */}
               <View style = {styles.new_commande_container}>
                  <TouchableOpacity 
                     style = {{flexDirection: 'row'}}
                     onPress = {() => this._goTo('new_command')}
                     >
                     <Image source = {this.images.new_form} style={styles.new_form_ico} />
                     <Text style = {styles.text}>Nouvelle Commande</Text>
                  </TouchableOpacity>
               </View>

               {/* SÉLECTION PAR FILTRE / SELECTION BY FILTER ----------------------------*/}
               <View style = {[styles.filtres_container, styles.date_container]}>
                  <DropDownPicker
                        placeholder='Mois'
                        items={this.month}
                        style = {{backgroundColor: 'transparent'}}
                        containerStyle= {styles.dropDownContainerStyle }
                        dropDownStyle = {styles.dropDownStyle}
                        dropDownMaxHeight = {phoneHeight * 0.5}
                        placeholderStyle={{color: 'white', fontSize: 17}}
                        labelStyle = {{color:'white', fontSize: 14}}
                        arrowColor = {'white'}
                        onChangeItem = {item => {return;}}
                     />
                  <DropDownPicker
                     placeholder='Année'
                     items={this.year}
                     style = {{backgroundColor: 'transparent'}}
                     containerStyle= {styles.dropDownContainerStyle }
                     dropDownStyle = {styles.dropDownStyle}
                     dropDownMaxHeight = {phoneHeight * 0.5}
                     placeholderStyle={{color: 'white', fontSize: 17}}
                     labelStyle = {{color:'white', fontSize: 14}}
                     arrowColor = {'white'}
                     onChangeItem = {item => {return;}}
                  />
               </View>
               <View style = {styles.title_container}>
                  <Text style={styles.header_title}>Historique des Commandes</Text>
               </View>
            </View>


            <View style= {styles.content_container} zIndex = {0}>
               <ListCommande 
                  commandes = {this.state.commandes}
                  navigation = {this.props.navigation}
                  route = {this.props.route}
                  />
            </View>

         </View>
      )
   }
}

// CONSTANTE TAILLE PHONE / PHONE SIZE CONSTANT
const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   text: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold'
   },

   header_container : {
      // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
      ...(Platform.OS !== 'android' && {
         zIndex: 10
         }),
      // alignItems: 'center' ,
      flex: 5,
      width: phoneWidth,
      borderBottomColor: 'grey',
      borderBottomWidth: 1
   },
   new_commande_container: {
      flex: 2,
      margin: '3%',
      alignItems: 'center'
   },
   new_form_ico : {
      resizeMode: 'contain',
      height: 14,
      marginTop: 3,
      marginRight: 5,
   },

   dropDownStyle: {
      backgroundColor: '#222',
      fontSize: 10,
   },
   dropDownContainerStyle: {
      height: phoneHeight * 0.06,
      flex: 3,
      margin: 3,
   },
   filtres_container: {
      // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
      ...(Platform.OS !== 'android' && {
         zIndex: 10
         }),
      flex: 1,
      flexDirection: 'row',
      marginRight: '3%',
      marginLeft: '3%',
      justifyContent: 'center'
   },
   title_container : {
      flex: 2,
      marginTop: '10%',
      alignItems: 'center'
   },
   header_title : {
      color:"#e0e0e0",
      fontSize: 16,
      fontStyle: "italic"
   },
   content_container: {
      flex:12,
      // justifyContent: 'flex-end',
      // borderWidth: 1,
      // borderColor: 'white',
   }
});
