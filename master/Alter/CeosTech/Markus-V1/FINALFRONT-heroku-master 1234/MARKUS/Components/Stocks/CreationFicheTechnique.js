import React, { useEffect } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Image, FlatList, StyleSheet, Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import IngredientItem from './IngredientItem';
import { setFicheTechnique, setIngredient, getProduitEnStock, getFicheTechnique } from '../../API/StocksData';
import { connect } from 'react-redux';


/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
    ingredientId: state.stocks.IngredId,
    restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})

class CreationFicheTechnique extends React.Component{

    constructor(props){
        super(props);
        this.images = {
          photo: require('../../Assets/ico/photo.png'),
          time: require('../../Assets/ico/time.png'),
          plus1: require('../../Assets/ico/plus2.png')
          
       };
        this.state={
          ingred: this.props.ingredientId,
          categories:[
            {value:'Entrée'},
            {value:'Plat'},
            {value:'Dessert'},
            //{value:'Cocktail'},
          ],
          unites:[
            {value:'Kilogrammes'},
            {value:'Grammes'},
            {value:'Litres'},
            {value:'Centilitres'}
          ],
          categorie: "",
          name: "",
          ingredients:[],
          processus: "",
          //etapes: [],
          rechauffage: "",
          quantite: "",
          temps_de_prep: "",
          coef_multiplicateur: "",
          fournisseur: "",
          photo: null,
          ingredientName: "",
          unite_mesure:"",
          selectedIngredient: "",
          id_ingredient: 0
        }
        this._takePhoto = this._takePhoto.bind(this)
    }

    _deleteIngredient = (ingredientSelected) => {
      const ingredientsList = this.state.ingredients
      //Create a new arrays that filters the ingredient with an idea matching the one of the ingredient selected by the user for deletion
      const updatedIngredientsList = ingredientsList.filter(ingredient => ingredient.id !== ingredientSelected)

      console.log('updated' + JSON.stringify(updatedIngredientsList))
      this.setState({ingredients: updatedIngredientsList})
   }
 
    _updateIngredients(nom, quantite, unite_mesure){
      this.setState({ingredients : [...this.state.ingredients, {'id': this.state.id_ingredient, 'nom': nom, 'poids': quantite, 'unite_mesure': unite_mesure}]})
      this.setState({id_ingredient: this.state.id_ingredient + 1})
    }

   // _updateRecette(value){
    //  this.setState({etapes : [...this.state.etapes, value]}, () => console.log("tab étapes  : " + this.state.etapes))
  //}
   
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

    _createListIngredients() {
      let arrayList=[]
      let identifier = 0
      for (let ingredient of this.state.ingredients){
        identifier ++
        arrayList.push({key: `${ingredient.nom} : ${ingredient.poids}${ingredient.unite_mesure}`, id: identifier})
      }
      return JSON.stringify(arrayList)
    }


    /* Verify all the input */
    _verify(){
       
        if( this.state.name== ""){
            return(Alert.alert('Veuillez renseigner le nom du produit'))
        }
        if( this.state.ingredients== ""){
            return(Alert.alert('Veuillez renseigner au moins un ingrédient'))
        }
        if( this.state.processus_preparation== ""){
            return(Alert.alert('Veuillez renseigner le processus de réalisation'))
            
        }
        if( this.state.rechauffage== ""){
            return(Alert.alert('Veuillez renseigner un temps de préparation'))
        }
        else{
        
            setFicheTechnique({
                    denomination: this.state.name,
                    processus_preparation: this.state.processus,
                    rechauffage: this.state.rechauffage,
                    temp_preparation: this.state.temps_de_prep,
                    categorieMenu: this.state.categorie,
                    cout_matiere: 0,
                    coefficient_multiplicateur: 0,
                    prix_ht: 0,
                    restaurant: this.props.restaurantOwnerDetails[0]["restaurant"]["id"],
                    ingredients: this._createListIngredients()
              })
              
          Alert.alert("La fiche technique a bien été créée.");
          this.props.navigation.goBack();
        
        }
    }



    render(){
        return(
          <ScrollView 
            style={{width: '100%',}}
          >
          <View style={{minHeight: Dimensions.get('window').height}}>
          <View style={{
                  backgroundColor: '#fff',
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
                  borderColor:"#02495D",
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  color: '#04295D',
                  paddingLeft: 10,
                  marginBottom: 20
                }}
                placeholder='Dénomination'
                placeholderTextColor='#04295D'

                value={this.state.name}
                onChangeText={(value) => this.setState({name : value})}
              />


                  {/* Ingredients list.*/}
                  <TextInput //Nom de la fiche technique
                    style={{
                      marginTop: 8,
                      width: '88%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 8,
                      borderColor:"#02495D",
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: '#04295D',
                      paddingLeft: 10,
                      marginBottom: 20
                  }}
                  placeholder = "Nom de l'ingrédient"
                  placeholderTextColor='#04295D' 
                  value={this.state.ingredientName}
                  onChangeText={(value) => this.setState({ingredientName : value})}
                />

              

              <View style = {{flexDirection : 'row', width: '87%', marginTop: 5, marginBottom: 10, height: 60}} >
                <TextInput
                  style={{
                    width: '56%',
                    borderWidth : 1.0,
                    borderRadius: 6,
                    height:55,
                    borderColor:'#02495D',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    color: '#04295D',
                    paddingLeft: 10,
                    marginRight: 10,
                    marginBottom:20
                  }}
                  keyboardType= 'numeric'
                  placeholder='Quantité'
                  placeholderTextColor='#04295D'
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
                    placeholderTextColor='#04295D'
                    items={[
                      {label:'Kg', value:'Kg'},
                      {label:'g', value:'g'},
                      {label:'L', value:'L'},
                      {label:'Cl', value:'cl'},
                      {label:'Unité(s)', value:'Unités'}
                    ]}
                    style = {{backgroundColor: 'transparent', borderColor:'#02495D',}}
                    containerStyle= {{ height:55, width:'101%', marginRight: 5, marginLeft:13}}
                    dropDownStyle = {{borderColor: '#04295D', backgroundColor: '#fff', width: "100%"}}
                    labelStyle = {{color:'#04295D', fontSize: 16, borderColor:'#02495D',}}
                    arrowColor = {'#04295D'}
                    onChangeItem={(item) => {
                      this.setState({
                      unite_mesure: item.value})
                    }}
                  />
                </View>
                    </View>

                <TouchableOpacity onPress = {() => {               
                    this._updateIngredients(this.state.ingredientName, this.state.quantite, this.state.unite_mesure) 
                    this.setState({ingredientName: '', quantite: ''})
                }}

                  style={[{ flexDirection: 'row',textAlign:'center', marginTop:'1%', width:'90%'}]} >
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
                  keyExtractor = {(item) => item.nom.toString()}
                  renderItem={({ item }) => (
                    <>
                      <Text style={{color: "#04295D", marginLeft: '9%', marginTop: "3%",}}>Ingrédient {this.state.ingredients.indexOf(item)+1} </Text>
                      <IngredientItem 
                        ingredientItem = {item}
                        deleteIngredient = {this._deleteIngredient}
                       />
                    </>
                  )}
              />

              <TextInput  //Processus de réalisation / Process of achieving  // !! A Veriff !!
                    style={{
                      width: '85%',
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'#02495D',
                      backgroundColor: 'transparent',
                      justifyContent: 'flex-start',
                      color: '#04295D',
                      paddingLeft: '3%',
                      //top: "0%",
                      //position : "absolute",
                      //paddingTop: '-45%',
                      marginTop: "5%",
                      marginBottom: 20
                      //marginBottom: 20
                    }}
    
                    multiline = {true}
                    numberOfLines = {8}
                    placeholder='Processus de réalisation'
                    placeholderTextColor='#04295D'
                    value={this.state.processus}
                    onChangeText={(value) => this.setState({processus : value})}
              />


              <TextInput //Réchauffage / Heating
                    style={{
                      width: '88%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'#02495D',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: '#04295D',
                      paddingLeft: 10,
                      marginBottom: 20,
                      marginTop:'3%'
                    }}
                    placeholder='Réchauffage'
                    placeholderTextColor='#04295D'
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
                  placeholder='Catégorie'

                  items={[ // à modif avec le res du get categorieMenu
                    {label:'Entrée', value:"Entrée"}, // id du label dans le back
                    {label:'Plat', value:"Plat"},
                    {label:'Dessert', value:"Dessert"},
                    //{label:'Cocktail', value:'Cocktail'},
                    //{label:'Snacking', value:'Snacking'},
                  ]}
                  style = {{backgroundColor: 'transparent', borderRadius:10, borderColor:'#02495D'}}
                  containerStyle= {{height:55, width:'100%',}}
                  dropDownStyle = {{borderColor: '#04295D', backgroundColor: '#fff', width: "100%"}}
                  placeHolderStyle = {{color:'white', fontSize: 16}}
                  arrowColor = {'white'}
                  labelStyle = {{color:'#04295D'}}
                  onChangeItem={item => this.setState({
                    categorie: item.value})}
                />
                <TextInput //Réchauffage / Heating
                    style={{
                      width: '100%',
                      height: 55,
                      borderWidth : 1.0,
                      borderRadius: 5,
                      borderColor:'#02495D',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      color: '#04295D',
                      paddingLeft: 10,
                      marginBottom: 40,
                      marginTop:'6%'
                    }}
                    placeholder='Temps de prépration'
                    placeholderTextColor='#04295D'
                    value={this.state.temps_de_prep}
                    onChangeText={(value) => this.setState({temps_de_prep : value})}
              />
                  </View>
             

              <TouchableOpacity onPress = {() => { this._verify()
              }} style={styles.buttonValider} >
                        <Text style={styles.buttonText}>
                            Créer
                        </Text>
              </TouchableOpacity>
          </View> 
          </View>         
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    marginBottom: 10,
    color: "white",
    fontWeight:'bold',
  },
  buttonValider:{
    width: "90%",
    marginVertical: "3%",
    borderColor: "#3BB9E0",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#3BB9E0",
  },
 new_form_ico : {
    resizeMode: 'contain',
    height: 12,
    width: 30,
    marginTop: 3,
    marginRight: 5,
    flex:1
 },
 mini_text: {
    color: '#04295D',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: '3%'
 },
});


/* Connecting the store to this component */
export default connect(mapStateToProps)(CreationFicheTechnique);