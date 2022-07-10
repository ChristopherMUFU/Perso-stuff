// Components/Stock/Tracabilite.js


import React from 'react';
import { Text, View, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Dimensions} from 'react-native';

import * as Theme from '../Styles/Theme';
import ingredientsData from '../../Helpers/inventaire.json';
import ListIventaire from './ListInventaire'
import ListTracabilite from './ListTracabilite';


// CONSTANTES UTILES / USEFUL CONSTANTS
const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;
const objYear = () => {
         let i = new Date().getFullYear()
         let tabYear = [];
         while (i >= 2000) {
            tabYear.push({label: i.toString(), value: i})
            i--
         }
         return(tabYear);
}
   

export default class Tracabilite extends React.Component {
    // CONSTRUCTEUR / CONSTRUCTOR
   constructor(props) {
      super(props);
      
      this.order = [
         {label : 'Date d\'entrée', value :'date'},
         {label: 'DLUO', value : 'dluo'},
         {label: 'A-Z', value : 'a-z'}
      ]
      this.category = [
         {label: 'Tout', value: 'all'},
         {label: 'Viandes, Poissons & Oeufs', value: 'proteines'},
         {label: 'Produits laitiers', value: 'milk'},
         {label: 'Fruits & Légumes', value: 'veggie'},
         {label: 'Céréales & Fécules',value: 'cereals'},
         {label: 'Corps gras', value: 'fat'},
         {label: 'Boissons', value: 'drinks'},
         {label: 'Produits secs', value: 'dry'},
         {label: 'Desserts', value: 'desserts'},
         {label: 'Consommables',value: 'consumable'}
      ]
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
      this.year = objYear()
      this.filterMonth = new Date().getMonth() + 1,
      this.filterYear = new Date().getFullYear(),
      this.filterOrder = 'date',
      this.filterCategory = 'all',
      this.state = {
            monthSelected : false,
            yearSelected: false,
            ingredients : []
      }
   }

   componentDidMount() {
      this._displayIngredientsWithFilters()

   }


      // MÉTHODES PRIVÉES / PRIVATE METHODS
   _filterIngredients(filter, value) {
      this.setState({ingredients: []}, () => console.log("Ingredients purgés => " + this.state.ingredients))
      switch (filter) {
         case 'month':
            this.filterMonth = value;
            break;
         case 'year':
            this.filterYear = value;
            break;
         case 'order':
            this.filterOrder = value;
            break;
         case 'category':
            this.filterCategory = value;
            break;
         default:
            break;

      }
      this._displayIngredientsWithFilters()
   }

   _displayIngredientsWithFilters() {
      let filteredIngredients = [];
      let itemMonth; 
      let itemYear;
      let itemCategory;
      console.log ("Filtres : " + this.filterMonth + " |" + this.filterYear + " | " + this.filterCategory)
      ingredientsData.map((item) => {
         itemMonth = parseInt(item.date.split("/", 2)[1])
         itemYear = parseInt(item.date.split("/", 3)[2])
         itemCategory = item.category;

         if (this.filterMonth === itemMonth && this.filterYear == itemYear) {
            if (this.filterCategory == 'all') {
               filteredIngredients.push(item)
            }
            else if (this.filterCategory == itemCategory) {
               filteredIngredients.push(item)
            }
            else {
               console.log("Item écarté")
            }
         }
      });
      this._sortIngredient(filteredIngredients)
      this.setState({ingredients: filteredIngredients}, () => {console.log("Ingredients filtrés dans le State")});
   }

   _sortIngredient (ingredients) {
      switch (this.filterOrder) {
         case 'date':
            ingredients.sort((a,b) => {
               a = parseInt(a.date.split("/", 2)[0])
               b = parseInt(b.date.split("/", 2)[0])
               return (b - a);
            })
            break;
         case 'dluo':
            ingredients.sort((a,b) => {
               // On additionne le jour et le mois (= 30 jrs)
               a = parseInt(a.dluo.split("/", 2)[0]) + parseInt(a.dluo.split("/", 2)[1]) * 30
               b = parseInt(b.dluo.split("/", 2)[0]) + parseInt(b.dluo.split("/", 2)[1]) * 30
               return (b - a);
            })
            break;
         case 'a-z':
            ingredients.sort((a,b) => {
               if(a.name < b.name) { return -1; }
               if(a.name > b.name) { return 1; }
               return 0;
            })
            break;
      default:
         break;
      }
   }

   render() {
      // console.log("Mois selectionnée: " + this.state.filterMonth)
      // console.log("Année selectionnée: " + this.state.filterYear)
      // console.log("Ordre selectionnée: " + this.state.filterOrder)
      // console.log("Catégorie selectionnée: " + this.state.filterCategory)
      return(
          // Dropdown pour sélectionner le mois / Dropdown to select the month
         <View style = {Theme.styles.container}>
            <View style={styles.header_container}>
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
                        onChangeItem = {item => this._filterIngredients('month', item.value)}
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
                     onChangeItem = {item => this._filterIngredients('year', item.value)}
                  />
               </View>
               <View style ={styles.filtres_container}>
                  
                  <DropDownPicker
                     placeholder='Filtrer'
                     items={this.order}
                     style = {{backgroundColor: 'transparent', overflow:'hidden', marginTop:'5%'}}
                     containerStyle= {styles.dropDownContainerStyle}
                     dropDownStyle = {styles.dropDownStyle}
                     dropDownMaxHeight = {200}
                     placeholderStyle={{color: 'white', fontSize: 17}}
                     labelStyle = {{color:'white', fontSize: 14}}
                     arrowColor = {'white'}
                     disabled = {
                        this.state.monthSelected && this.state.yearSelected ? false : true
                     }
                     onChangeItem = {item => this._filterIngredients('order', item.value)}
                  />
                  <DropDownPicker
                     placeholder='Trier'
                     items={this.category}
                     style = {{backgroundColor: 'transparent', overflow:'hidden',marginTop:'5%'}}
                     containerStyle= {styles.dropDownContainerStyle}
                     dropDownStyle = {styles.dropDownStyle}
                     dropDownMaxHeight = {phoneHeight * 0.5}
                     placeholderStyle={{color: 'white', fontSize: 17}}
                     labelStyle = {{color:'white', fontSize: 12}}
                     arrowColor = {'white'}
                     disabled = {
                        this.state.monthSelected && this.state.yearSelected ? false : true 
                     }
                     onChangeItem = {item => this._filterIngredients('category', item.value)}
                  />
               </View>
               
            </View>
            <View style= {styles.content_container}>
               <ListTracabilite 
                  ingredients = {this.state.ingredients}
                  />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   header_container : {
      // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
      ...(Platform.OS !== 'android' && {
         zIndex: 10
         }),
      alignItems: 'stretch' ,
      flex: 2,
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
      flexDirection: 'row',
      marginRight: '3%',
      marginLeft: '3%',
      width: phoneWidth*0.8,
      justifyContent: 'center'
   },
   filtres_touchable: {
      // borderWidth: 1,
      // borderBottomColor: 'grey',
      alignItems: 'center',
      paddingRight: '5%',
      paddingLeft: '5%'
   },
   filtres_text: {
      color: 'grey',
      fontSize: 18,
      
   },
   filtres_textPressed: {
      color: 'white',
      fontSize: 18,
   },
   content_container: {
      flex:8,
      // justifyContent: 'flex-end',
      // borderWidth: 1,
      // borderColor: 'white',
      width: phoneWidth
   }
});
