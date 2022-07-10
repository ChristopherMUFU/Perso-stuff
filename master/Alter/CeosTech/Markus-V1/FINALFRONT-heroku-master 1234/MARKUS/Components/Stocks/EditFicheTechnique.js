import React, { useEffect } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Image, FlatList, StyleSheet, Dimensions} from 'react-native';
import * as Theme from '../Styles/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import IngredientItem from './IngredientItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import EtapeRecetteItem from './EtapeRecetteItem';
import { updateFicheTechnique } from '../../API/StocksData';
import { connect } from 'react-redux';
import {
    recupDataFicheTechnique,
    recupDataCategorieMenu,
    recupDataProduitEnStock,
    _returnDataFicheTechnique,
    _returnDataCategorieMenu,
    _returnDataProduitEnStock,
} from "./FicheTechniqueItem";
import FicheTechniqueItem from "./FicheTechniqueItem";
import "../Connexion/Connexion";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

//import { componentDidMount } from './FichesTechniques';
// import { LinearGradient } from 'expo-linear-gradient';

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
    ingredientId: state.stocks.IngredId,
    restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})

//let testIng = "";

class EditFicheTechnique extends FicheTechniqueItem{

    constructor(props){
        super(props);
        this.images = {
          photo: require('../../Assets/ico/photo.png'),
          time: require('../../Assets/ico/time.png'),
          plus1: require('../../Assets/ico/plus.png')
          
       };
        this.state={
            ficheTechnique: this._returnDataFicheTechnique(),
            denomination: "",
            processus_preparation: "",
            rechauffage: "",
            temp_preparation: "",
            categorieMenu: "",
            cout_matiere: 0,
            coefficient_multiplicateur: 0,
            prix_ht: 0,
            restaurant: "",
            ingredients: [],
            nomIngredient: "",
            quantite: "",
            unite_mesure:"",
            selectedIngredient: "",
            id_ingredient: 0
        }
        //this._takePhoto = this._takePhoto.bind(this)
    }


    /* Verify all the input */
    _verify(){
       
        if( this.state.name== ""){
            return(Alert.alert('Veuillez renseigner le nom du produit'))
        }
        if( this.state.ingredients== ""){
            return(Alert.alert('Veuillez renseigner au moins un ingrédient'))
        }
        if( this.state.processus== ""){
            return(Alert.alert('Veuillez renseigner au moins une étape'))
        }
        if( this.state.rechauffage== ""){
            return(Alert.alert('Veuillez renseigner un temps de préparation'))
        }
        else{
        
            updateFicheTechnique({
                    denomination: this.state.denomination,
                    processus_preparation: this.state.processus_preparation,
                    rechauffage: this.state.rechauffage,
                    temp_preparation: this.state.temp_preparation,
                    categorieMenu: this.state.categorieMenu,
                    cout_matiere: 0,
                    coefficient_multiplicateur: 0,
                    prix_ht: 0,
                    restaurant: global.sessionRestaurant,
                    ingredients: this._createListIngredients() // ingrédients à revoir 
              }, this.state.ficheTechnique.id)
              
          Alert.alert("La fiche technique a bien été modifiée.");
         this.props.navigation.navigate('technical')
        
        }
    }
    
    _insertDataFicheTechnique(){
        this.setState({
            denomination: this.state.ficheTechnique.denomination,
            processus_preparation: this.state.ficheTechnique.processus_preparation,
            rechauffage: this.state.ficheTechnique.rechauffage,
            temp_preparation: this.state.ficheTechnique.temp_preparation,
            categorieMenu: this.state.ficheTechnique.categorieMenu,
            cout_matiere: 0,
            coefficient_multiplicateur: 0,
            prix_ht: 0,
            //restaurant: this.props.restaurantOwnerDetails[0]["restaurant"]["id"],
            ingredients: JSON.parse(this.state.ficheTechnique.ingredients)
        }) 
    }
    _createListIngredients() {	
      let arrayList=[]	
      let identifier = 0	
      for (let ingredient of this.state.ingredients){	
        identifier ++	
        arrayList.push({key: `${ingredient.key}`, id: identifier})	
      }	
      return JSON.stringify(arrayList)	
    }
        
    _deleteIngredient = (ingredientSelected) => {
      const ingredientsList = this.state.ingredients
      //Create a new arrays that filters the ingredient with an idea matching the one of the ingredient selected by the user for deletion
      const updatedIngredientsList = ingredientsList.filter(ingredient => ingredient.id !== ingredientSelected)

      console.log('updated' + JSON.stringify(updatedIngredientsList))
      this.setState({ingredients: updatedIngredientsList})
   }
 
    _updateIngredients(key){
        this.setState({ingredients : [...this.state.ingredients, {'key': key, 'id': this.state.id_ingredient}]})
        this.setState({id_ingredient: this.state.id_ingredient + 1})
    }
    
    _convertIngredient(){	
      let ing = "";	
      ing = this.state.nomIngredient+" : "+this.state.quantite+this.state.unite_mesure	
      this._updateIngredients(ing)	
    }

    _updateRecette(value){
      this.setState({etapes : [...this.state.etapes, value]}, () => console.log("tab étapes  : " + this.state.etapes))
    }
   
    _takePhoto() {
      ImagePicker.showImagePicker({}, (response) => {
        if (response.didCancel) {
          console.log('L\'utilisateur a annulé')
        }
        else if (response.error) {
          console.log('Erreur : ', response.error)
        }
        else {
          console.log('Photo : ', response.uri )
          let requireSource = { uri: response.uri }
          this.setState({
            photo: requireSource
          })
        }
      })
  }
    

    _initNewIngredient(ing, id){
        this.state.newListIngredients.push({key: ing, id: id});
        console.log(this.state.newListIngredients);
        console.log(this.state.newListIngredients[0]);
        return ing;
    }

    _changeIngredient(ing, id){
      this.setState({
        newIngredient: ing
      })
      this.state.newListIngredients[id] = ing;
    }

    componentDidMount()
    {
        this._insertDataFicheTechnique()
        
    }

    render(){
      //console.log(this.state.ingredients)
        return(
          <ScrollView 
            style={{width: '100%',}}
          >
          <View style={{minHeight: Dimensions.get('window').height}}>
          <View style={{
                  backgroundColor: '#3C3C3C',
                  alignItems: 'center',
                  paddingTop:'1%',
                  width: "100%",
                  height:'100%'
                }}>

           { /* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  padding: 5,
                  marginBottom: 5
                }}
                onPress={this._takePhoto}>
                  <Image source = {this.images.photo} style={styles.new_form_ico} />
                  <Text style={{flex: 2, color: 'white'}}>
                    Ajouter photo du plat
                  </Text>
              </TouchableOpacity> */}

              <TextInput //Nom de la fiche technique
                style={{
                  marginTop: 20,
                  width: '88%',
                  height: 55,
                  borderWidth : 1.0,
                  borderRadius: 8,
                  borderColor:"white",
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  color: 'white',
                  paddingLeft: 10,
                  marginBottom: 20
                }}
                placeholder='Dénomination'
                placeholderTextColor='white'

                value={this.state.denomination}
                onChangeText={(value) => this.setState({denomination : value})}
              />
              
              {/* Ingredients list.*/}
                  <TextInput
                    style={{
                      marginTop: 20,
                      width: '88%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 8,
                      borderColor:"white",
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: 'white',
                      paddingLeft: 10,
                      marginBottom: 20
                  }}
                  placeholder = "Nom de l'ingrédient"
                  placeholderTextColor='white' 
                  value={this.state.nomIngredient}
                  onChangeText={(value) => this.setState({nomIngredient : value})}
                />

              

              <View style = {{flexDirection : 'row', width: '87%', marginTop: 5, marginBottom: 10, height: 60}} >
                <TextInput
                  style={{
                    width: '56%',
                    borderWidth : 1.0,
                    borderRadius: 6,
                    height:55,
                    borderColor:'white',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    color: 'white',
                    paddingLeft: 10,
                    marginRight: 10,
                    marginBottom:20
                  }}
                  keyboardType= 'numeric'
                  placeholder='Quantité'
                  placeholderTextColor='white'
                  value={this.state.quantite}
                  onChangeText={(value) => this.setState({quantite : value})}
                />

                <View style = {{
                            flex: 1,
                            width:'60%',
                            height:55,
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                })
                            }}>

                  <DropDownPicker
                    placeholder='Unité de mesure'
                    items={[
                      {label:'Kg', value:'Kg'},
                      {label:'g', value:'g'},
                      {label:'L', value:'L'},
                      {label:'Cl', value:'cl'},
                      {label:'Unité(s)', value:'Unités'}
                    ]}
                    style = {{backgroundColor: 'transparent'}}
                    containerStyle= {{ height:55, width:'101%', marginRight: 5, marginLeft:13}}
                    dropDownStyle = {{borderColor: 'white', backgroundColor: 'black', width: "100%"}}
                    labelStyle = {{color:'white', fontSize: 16}}
                    arrowColor = {'white'}
                    onChangeItem={(item) => {
                      this.setState({
                      unite_mesure: item.value})
                    }}
                  />
                </View>
              </View>

                <TouchableOpacity onPress = {() => {               
                    this._convertIngredient(),
                    this.setState({nomIngredient: '', quantite: ''})
                }}

                  style={[Theme.buttonsV2.touchAble, { flexDirection: 'row',textAlign:'center'}]} >
                   {/*</TouchableOpacity> <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradient}>*/}
                   <View style={{flexDirection:'row',flex:1}}>
                   <Image source = {this.images.plus1}  />
                        <Text style = {[styles.mini_text,{flex:2}]}>
                            Ajouter l'ingrédient à la liste
                        </Text>
                        </View>
                    {/*</LinearGradient> */}
                    
              </TouchableOpacity>
              

              <FlatList //affichage des ingrédients / ingredient display
                  data={this.state.ingredients}
                  keyExtractor = {(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <>
                    <Text style={{color: "white", marginTop: "3%", marginLeft: '9%',}}>Ingrédient {this.state.ingredients.indexOf(item)+1} </Text>
                      {/*this._initNewIngredient(item.key, item.id)*/}
                      <View style={{
                        flex: 1,
                        flexDirection: 'row', 	                      
                        justifyContent: 'space-between',	                          
                        borderWidth: 2, 	                            
                        borderColor: 'white', 	                           
                        borderRadius: 10, 	                            
                        padding: 4,	  
                        marginLeft: '9%',
                        marginBottom: "2%",                        
                        height:40,	                            
                        width: '70%'}}>	                            
                        <Text 	                            
                            style={{	                            
                              fontSize: 20,	                            
                              fontWeight: 'bold',	                            
                              color: 'white',	                      
                              paddingHorizontal: '5%'	                        
                          }}	                         
                        >{item.key}</Text>	                        
                        <TouchableOpacity style = {{	                        
                                //flex: 1,	                     
                                borderLeftWidth: 1,
                                paddingLeft: 10,
                                borderColor: 'white',	
                                justifyContent: 'center'	
                            }}	
                            onPress = {() => {this._deleteIngredient(item.id)} }	
                        >	
                            <FontAwesomeIcon icon={faTrashAlt} style={{color: 'white', marginRight:'5%'}} size={20} />	
                        </TouchableOpacity>	
                      </View>
                    </>
                  )}
              />


            
            <TextInput  //Processus de réalisation / Process of achieving  // !! A Veriff !!
                    style={{
                      width: '85%',
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'white',
                      backgroundColor: 'transparent',
                      justifyContent: 'flex-start',
                      color: 'white',
                      paddingLeft: '3%',
                      //top: "0%",
                      //position : "absolute",
                      //paddingTop: '-45%',
                      marginTop: "5%",
                      marginBottom: 20
                      //marginBottom: 20
                    }}
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder='Processus de réalisation'
                    placeholderTextColor='white'
                    value={this.state.processus_preparation}
                    onChangeText={(value) => this.setState({processus_preparation : value})}
              />


              <TextInput //Réchauffage / Heating
                    style={{
                      width: '88%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'white',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: 'white',
                      paddingLeft: 10,
                      marginBottom: 20,
                      marginTop:'3%'
                    }}
                    placeholder='Réchauffage'
                    placeholderTextColor='white'
                    value={this.state.rechauffage}
                    onChangeText={(value) => this.setState({rechauffage : value})}
              />
            {/*   <Icon style={{marginLeft:-44, marginTop:30, marginRight:30, paddingRight:-10 }}
                       name='thermometer-full'
                       color='grey'
                       size={32} 
                />  */}
                

             { /* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  borderColor:'white',
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  padding: 5,
                  marginBottom: 2
                }}
                onPress={this._takePhoto}>
                  <Image source = {this.images.photo} style={styles.new_form_ico} />
                  <Text style={{flex: 2, color: 'white'}}>
                    Ajouter photos de présentation
                  </Text>
              </TouchableOpacity> */}


               <View style = {{
                          flex: 1,
                          width:'88%',
                          alignItems: 'center',
                          ...(Platform.OS !== 'android' && {
                              zIndex: 10
                              }),
                          paddingTop: 5,
                          marginTop:'-1%',
                          paddingBottom:10
                          }}>
                <DropDownPicker
                  placeholder= {this.state.categorieMenu}

                  items={[ // à modif avec le res du get categorieMenu
                    {label:'Entrée', value:"Entrée"}, // id du label dans le back
                    {label:'Plat', value:"Plat"},
                    {label:'Dessert', value:"Dessert"},
                    //{label:'Cocktail', value:'Cocktail'},
                    //{label:'Snacking', value:'Snacking'},
                  ]}
                  style = {{backgroundColor: 'transparent', borderRadius:10}}
                  containerStyle= {{height:55, width:'100%',}}
                  dropDownStyle = {{borderColor: 'black', backgroundColor: 'grey', width: "100%"}}
                  placeHolderStyle = {{color:'white', fontSize: 16}}
                  arrowColor = {'white'}
                  labelStyle = {{color:'white'}}
                  onChangeItem={item => this.setState({
                    categorieMenu: item.value})}
                />
                <TextInput //Réchauffage / Heating
                    style={{
                      width: '100%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'white',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: 'white',
                      paddingLeft: 10,
                      marginBottom: 40,
                      marginTop:'3%'
                    }}
                    placeholder='Temps de prépration'
                    placeholderTextColor='white'
                    value={this.state.temp_preparation}
                    onChangeText={(value) => this.setState({temp_preparation : value})}
              />
                  </View>

             { /* <TextInput //Coefficient multiplicateur
                    style={{
                      marginTop: 10,
                      width: '80%',
                      height: 50,
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor: 'white',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: 'white',
                      paddingLeft: 35,
                      marginTop:20,
                      marginBottom: 20
                    }}
                    keyboardType= 'numeric'
                    placeholder='Coefficient multiplicateur'
                    placeholderTextColor='white'
                    value={this.state.coef_multiplicateur}
                    onChangeText={(value) => this.setState({coef_multiplicateur : value})}
              />
              {/*<View style = {{
                          flexDirection: 'row',
                          flex: 1,
                          width:'80%',
                          alignItems: 'center',
                          ...(Platform.OS !== 'android' && {
                              zIndex: 10
                              }),
                          paddingTop: 5,
                          paddingBottom:10,
                          }}>
                <DropDownPicker
                  placeholder='Coefficient multiplicateur'
                  items={[
                    {label:'2', value:'2'},
                    {label:'3', value:'3'},
                    {label:'4', value:'4'},
                    {label:'5', value:'5'},
                  ]}
                  style = {{backgroundColor: 'transparent' ,borderRadius:10}}
                  containerStyle= {{height:50, width:'100%',}}
                  dropDownStyle = {{borderColor: 'white', backgroundColor: 'black', width: "100%"}}
                  placeHolderStyle = {{color:'white', fontSize: 16}}
                  arrowColor = {'white'}
                  labelStyle = {{color:'white'}}
                  onChangeItem={item => this.setState({
                    coef_multiplicateur: item.value})}
                />
              </View>*/}


             

              <TouchableOpacity onPress = {() => { this._verify()
              }} style={Theme.buttonsV2.touchAble} >
                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
                        <Text style={Theme.buttonsV2.buttonText}>
                            Modifier
                        </Text>
                    </LinearGradient>
              </TouchableOpacity>
          </View> 
          </View>         
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({


 new_form_ico : {
    resizeMode: 'contain',
    height: 12,
    width: 30,
    marginTop: 3,
    marginRight: 5,
    flex:1
 },
 mini_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: '3%'
 },
});


/* Connecting the store to this component */
//export default connect(mapStateToProps)(CreationFicheTechnique);
export default EditFicheTechnique
