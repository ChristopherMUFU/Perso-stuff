import React from 'react';
import { Text, View, Platform, Image} from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import ListIventaire from './ListInventaire'
import { getProduitEnStock, deleteProduitEnStock, getDetailProduitEnStock } from '../../API/StocksData';
// import produitEnStock from '../Helpers/produitEnStock'


// CONSTANTES UTILES
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


export default class Inventaire extends React.Component {
   // CONSTRUCTEUR / CONSTRUCTOR
   constructor(props) {
      super(props);

      this.ico = {
         warning: require('../../Assets/ico/warning2.png')
      };

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
         {label: 'Février' , value : 2},
         {label: 'Mars' , value : 3},
         {label: 'Avril' , value : 4},
         {label: 'Mai' , value : 5},
         {label: 'Juin' , value : 6},
         {label: 'Juillet', value : 7},
         {label: 'Août' , value : 8},
         {label: 'Septembre' , value : 9},
         {label: 'Octobre' , value : 10},
         {label: 'Novembre' , value : 11},
         {label: 'Décembre' , value : 12},
      ];
      this.year = objYear()
      this.filterMonth = new Date().getMonth() + 1,
      this.filterYear = new Date().getFullYear(),
      this.filterOrder = 'date',
      this.filterCategory = 'all',
      this.state = {
            monthSelected : true,
            yearSelected: true,
            ingredients : [],
            isNoInventaire: false,
            isV1: false,
      }
      console.log(this.props)
   }

   verifInventaire(val){
       this.setState({ingredients: val})
       if(val.length == 0){
           this.setState({ isNoInventaire: true })
       }
       else{
            this.setState({ isNoInventaire: false })
        }
   }
   
   _dataRefresh(){
      getProduitEnStock().then(data => {
        this.verifInventaire(data)
        })

    }

   componentDidMount() {
       this._dataRefresh();
       this._unsubscribe = this.props.navigation.addListener('focus', () => 
          {  
            this._dataRefresh();
          });

   }
   
   componentWillUnmount() 
    {
        this._unsubscribe();
    }
    

   removeProduct(product_id){
      deleteProduitEnStock(product_id).then(this._dataRefresh())
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
      getProduitEnStock().then( (data) => {
         data.map((item) => {
            itemMonth = parseInt(item.date_entry.split("/", 2)[1])
            itemYear = parseInt(item.date_entry.split("/", 3)[2])
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
      })

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
               // On additionne le jour et le mois (= 30 jrs) / // Add the day and the month (= 30 days)
               a = parseInt(a.dluo.split("/", 2)[0]) + parseInt(a.dluo.split("/", 2)[1]) * 30
               b = parseInt(b.dluo.split("/", 2)[0]) + parseInt(b.dluo.split("/", 2)[1]) * 30
               return (b - a);
            })
            break;
         case 'a-z':
            ingredients.sort((a,b) => {
               if(a.name < b.name) { return -1; }
               else if(a.name > b.name) { return 1; }
               return 0;
            })
            break;
      default:
         break;
      }
   }
   render() {
      return(
         // Dropdown pour sélectionner le mois
         <View style = {styles.container}>
         

            <View style = {styles.key_container}>
               <View style = {{flex: 2}}>
                  <Text
                     style = {styles.key_text}>
                     Produit
                  </Text>
               </View>

               <View style = {{flex: 1, alignItems: 'center' }}>
                  <Text style = {[styles.key_text]}>Entrée</Text>
               </View>
               <View style = {{flex: 1, alignItems: 'center' }}>
                  <Text style = {[styles.key_text]}>Qté</Text>
               </View>
               <View style = {{flex: 1, alignItems: 'center' }}>
                  <Text style = {[styles.key_text]}>DLUO</Text>
               </View>
            </View>

            {this.state.isNoInventaire ?
                <View style={styles.alertInventaire}>
                    <Image source = {this.ico.warning} style={styles.warning}/>
                    <Text style={styles.textWarning}>
                        Vous n'avez pas encore ajouté de marchandise.
                        Dirigez-vous vers Réception Marchandise.
                    </Text>
                </View>
            :null}

            <View style= {styles.content_container}>
               <ListIventaire
                  ingredients = {this.state.ingredients}
                  inventaire_component = {this}
               />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container:{
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      paddingTop:'1%',
      width: "100%",
   },
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
   alertInventaire:{
       marginTop: '5%',
       alignItems: 'center',
   },
   warning : {
      marginTop: '10%',
      maxWidth: '100%', // à modif
      minHeight: 61,
      width: 68,
      height: 0,
   },
   textWarning: {
       marginTop: '2%',
       textAlign: 'center',
       fontSize: 15,
       color: '#04295D',
   },
   filtres_container: {
      flexDirection: 'row',
      marginRight: '3%',
      marginLeft: '3%',
      width: phoneWidth,
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
   key_container : {
      flexDirection: 'row',
      flex:1,
      marginTop: '5%',
      marginBottom: '2%',
      paddingLeft: '7%',
      paddingRight: '3%',
      width: phoneWidth,
   },
   key_text: {
      color: '#04295D',
   },
   content_container: {
      flex:12,
      // justifyContent: 'flex-end',
      // borderWidth: 1,
      // borderColor: 'white',
      width: phoneWidth
   }
});