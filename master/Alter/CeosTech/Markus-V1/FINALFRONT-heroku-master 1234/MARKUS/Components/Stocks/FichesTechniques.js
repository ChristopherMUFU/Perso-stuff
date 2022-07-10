// Components/Stock/FichesTechniques.js
import React from 'react';
import {
    Image,
    Text,
    Dimensions,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import recettesData from '../../Helpers/recettes.json';
import ListFicheTechnique from './ListFicheTechnique';
import { getFicheTechnique, getProduitEnStock, getCategorieMenu, deleteFicheTechnique } from '../../API/StocksData';



// CONSTANTES UTILES / USEFUL CONSTANTS
const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

class FichesTechniques extends React.Component {
   // CONSTRUCTEUR / CONSTRUCTOR
   constructor(props) {
      super(props);
      this.images = {
         new_form: require('../../Assets/ico/new_form3.png')
      };
      this.ico = {
         new_form2: require('../../Assets/ico/new_form2.png'),
         warning: require('../../Assets/ico/Vector.png')
      };
      this.category = [
         {label: 'Entrée', value: 1},
         {label: 'Plat' , value : 2},
         {label: 'Dessert' , value : 3},
         {label: 'Cocktails' , value : 4},
      ];
      this.order = [
         {label: 'A-Z', value : 'a-z'}
      ],
      this.filterOrder = 'date',
      this.filterCategory = 'all',

      this.state = {
            recettes : [],
            categoriemenu : [],
            produitenstock : [], // à voir pour la suite
            fichetechnique : [],
            isNoFicheTechnique : false,
      }
   }

   _sortRecettes (recettes) {
      switch (this.filterOrder) {
         case 'a-z':
            recettes.sort((a,b) => {
               if(a.name < b.name) { return -1; }
               if(a.name > b.name) { return 1; }
               return 0;
            })
            break;
      default:
         break;
      }
   }

   _goTo = (action) => {
      switch (action) {
        case "creationTechnical":
          this.props.navigation.navigate("creationTechnical");
          break;

        default:
           this.props.navigation.navigate("stock_menu")
          break;
      }
    };

    _insertCategorieMenu(list)
    {
        this.setState({categoriemenu : list})
    }

    _insertProduitEnStock(list)
    {
        this.setState({produitenstock : list})
    }

    verifFicheTechnique(val)
    {
        this.setState({fichetechnique: val})
        console.log(val.length)
        console.log("les fiches techniques" + JSON.stringify(val))
        if(val.length == 0){
            this.setState({ isNoFicheTechnique : true })
        }
        else{
            this.setState({ isNoFicheTechnique: false })
        }
    }
    
    _dataRefresh(){
       getFicheTechnique().then( (data) => this.verifFicheTechnique(data))
       this._displayFichesTechniquesWithFilters()
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


   // METHODES PRIVES /PRIVATE METHODS
   _filterRecettes(filter, value) {
      this.setState({recettes: []}, () => console.log("Recettes purgées => " + this.state.recettes))
      switch (filter) {
         case 'order':
            this.filterOrder = value;
            break;
         case 'category':
            this.filterCategory = value;
            break;
         default:
            break;

      }
      this._displayFichesTechniquesWithFilters()
   }

   _displayFichesTechniquesWithFilters() {
      let filteredRecettes = [];
      let itemCategory;
      console.log ("Filtres : " + this.filterCategory)
      recettesData.map((item) => {
         itemCategory = item.category;
         if (this.filterCategory == 'all') {
            filteredRecettes.push(item)
         }
         else if (this.filterCategory == itemCategory) {
            filteredRecettes.push(item)
         }
         else {
            console.log("Erreur: filterCategory vide ?")
         }
      });
      this._sortRecettes(filteredRecettes)
      this.setState({recettes: filteredRecettes}, () => {console.log("Recettes filtrées dans le State")});
   }




   render() {
    return(
      <View style={styles.mainContainer}>


            {/* SELECTION PAR FILTRE ----------------------------*/}


          <TouchableOpacity style={styles.button} 
            onPress = {() => this._goTo('creationTechnical')}
            >
            <Image source = {this.images.new_form}  style={styles.buttonIcon} />
            <Text style = {styles.buttonText}>Créer fiche technique</Text>
         </TouchableOpacity>
         <View style={styles.line} ></View>
         {this.state.isNoFicheTechnique ?
                <View
                style={{
                    alignItems: 'center',
                    //backgroundColor: "red",
                    flex: 1
                }}>
                <Image
                    resizeMode="contain"
                    source = {this.ico.warning}
                    style={{
                        marginTop: '5%',
                        maxWidth: 100, // à modif
                        minHeight: 61,
                        width: "50%",
                        height: "8%",
                        //backgroundColor: "red"
                    }}/>
                <Text
                    style={{
                        marginTop: '2%',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#04295D',
                    }}>
                    Vous n'avez pas encore ajouté de personnel.
                </Text>
            </View>
            :null}
         <View style= {styles.content_container}>
            <ListFicheTechnique
               fichetechnique = {this.state.fichetechnique}
               navigation = {this.props.navigation}
               fichetechnique_component = {this}
               />
         </View>
      </View>
      );
   }
}



const styles = StyleSheet.create({
   mainContainer: {
      flex: 1, 
      backgroundColor: 'white', //#04295D 
      marginTop: Platform.OS === 'ios' ? 34 : 0
  },
  button: {
      width: "50%",
      maxWidth: 200,
      //backgroundColor: "yellow",
      flexDirection: "row",
      flexWrap:"wrap",
      justifyContent: "space-evenly",
      alignSelf: "flex-end",
      marginHorizontal: "1%",
      marginTop: "4%",
      marginBottom: "3%"
  },
  line:{
      borderColor: "#04295D",
      borderWidth: 0.25,
      width: "95%",
      alignSelf: "center"
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
       marginTop: '15%',
       marginBottom: '2%',
       paddingLeft: '7%',
       paddingRight: '3%',
       width: phoneWidth,
    },
    key_text: {
       color: 'white',
    },
    content_container: {
       flex:12,
       width: phoneWidth
    },
    new_commande_container: {
      margin: '3%',
      textAlign:'left'
   },
   alertFicheTechinque:{
       marginTop: '5%',
       alignItems: 'center',
   },
   new_form_ico : {
      resizeMode: 'contain',
      height: 12,
      marginTop: 3,
      marginRight: 5,
   },
   mini_text: {
      color: '#02495D',
      fontSize: 13,
      fontWeight: 'bold',
      textAlign:'right'
   },
   warning : {
      marginTop: '10%',
      maxWidth: '100%',
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
 });


export default FichesTechniques;