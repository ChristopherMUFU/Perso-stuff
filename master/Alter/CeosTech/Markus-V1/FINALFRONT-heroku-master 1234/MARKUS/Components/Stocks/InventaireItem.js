import React from 'react';
import { Platform, Text, View, TextInput, TouchableOpacity, Animated, Dimensions, Alert, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { faArrowUp, faAngleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { _goto } from './EntreeMarchandise';
import { getProduitEnStock, deleteProduitEnStock, updateProduitEnStock} from '../../API/StocksData';
import { connect } from 'react-redux';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
    restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})



class InventaireItem extends React.Component {

    constructor(props){
        super(props)
        this.quantite_utilisee= null        
        this.state = {
            quantity : Number(this.props.ingredient.quantite.toFixed(2)),
            quantite : 0,
            poids : null,
            isVisible: false,
            uniteOriginale: this.props.ingredient.unite_choise,
            //navigation : nav,
        }          
        this.unites=this._initiateUnitDropdown()      
    }

    _inputQuantite(value){
        this.quantite_utilisee = value
        console.log(this.quantite_utilisee)
    }

    _goTo(destination){
        this.props.navigation.navigate(destination);
     }

     // We only need to display way to measures quantity that are compatible :
        // => If we have Liters, then we need centiliters and liters
        // => If we have kilograms, then we need grams and kilograms
        // => Else with grams, centiliters, and unites, we don't need anything else
     _initiateUnitDropdown (){
         const unites = [
            {label:'Grammes', value:'g'},
            {label:'Centilitres', value:'Cl'},
            {label:'Unités', value:'Unités'},
         ]
         if (this.state.uniteOriginale == 'Kg'){
            return[
                {label:'Kilogrammes', value:'Kg'},
                {label:'Grammes', value:'g'},
              ]
         }
         else if (this.state.uniteOriginale == 'L') {
            return [
                {label:'Litres', value:'L'},
                {label:'Centilitres', value:'Cl'},
              ]         
         }
         else {
            return unites.filter((unite) => (this.state.uniteOriginale == unite.value))
         }
     }

     // Convert if needed the used quantity into the original measure system chosen
     _calculerQuantiteUtilisee (){
         if (this.state.uniteOriginale == 'Kg' && this.state.poids =='g'){
            console.log(this.quantite_utilisee + " * 0.001 = "+this.quantite_utilisee* 0.001)
             return this.quantite_utilisee * 0.001
         }

         else if(this.state.uniteOriginale == 'L' && this.state.poids =='Cl'){
            console.log(this.quantite_utilisee + " * 0.01 = "+this.quantite_utilisee* 0.01)
            return this.quantite_utilisee * 0.01
         }

         else {

            return this.quantite_utilisee
        }
         
     }


    _newQuantite(){
        this.quantite_utilisee = this._calculerQuantiteUtilisee()
        if(this.quantite_utilisee > 0) { 
            if(this.quantite_utilisee < this.state.quantity) {
            let newQty = (this.state.quantity) - (this.quantite_utilisee)
            newQty = (newQty < 0) ? 0 : newQty;
            this.setState({quantity: Number(newQty.toFixed(2))});
            console.log("valeur")
            console.log(Number(newQty.toFixed(1)))
            console.log(this.state.quantity)
            updateProduitEnStock({
                nom: this.props.ingredient.nom,
                quantite: newQty,
                unite_choise: this.props.ingredient.unite_choise,
                dluo: this.props.ingredient.dluo,
                date_entree: this.props.ingredient.date_entree,
                prix_produit_ht: this.props.ingredient.prix_produit_ht, // à Vérifier
                ref_produit: this.props.ingredient.ref_produit,
                unit_price: this.props.ingredient.unit_price,
                fournisseur: this.props.ingredient.fournisseur,                    
                restaurant: this.props.restaurantOwnerDetails[0]["restaurant"]["id"]
            }, this.props.ingredient.id)
            
            this.setState({quantite: 0});
            this.quantite_utilisee = null;
            Alert.alert("Votre quantité a bien été modifiée.");
            this.setState({isVisible: false});
          
            
            }   

            else if (this.quantite_utilisee > this.state.quantity) {

                Alert.alert(
                    "Attention !",
                    "La quantité de marchandise rentrée est supérieure à celle en stock. "
                )

            }

            else if (this.quantite_utilisee = this.state.quantity) {

                Alert.alert(
                    "Attention !",
                    "Êtes-vous sûr de vouloir retirer cette marchandise ? ",
                    [
                        {
                        text: "Annuler",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Oui", onPress: () => {
                            this.delete();
                        } }
                    ],
                    
                    { cancelable: false }
                )

            }

            else { 
                
                Alert.alert(
                    "Attention !",
                    "Êtes-vous sûr de vouloir retirer cette quantité ? (Cela aura pour conséquence la suppression de votre produit)",
                    [
                        {
                        text: "Annuler",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                        },
                        { text: "Oui", onPress: () => {
                            this.delete();
                        } }
                    ],

                    { cancelable: false }
                    )
            
            }        
        }

    
       /* if{
            this.delete();
        }*/
    }

    delete(){
        this.props.inventaire.removeProduct(this.props.ingredient.id)
    }

    _displayItem(){
        //const { navigation, } = this.props.navigation;
        const { ingredient, navigation } = this.props;
        // const produitEnStock =this.props.produitEnStock

        if(this.state.isVisible){

            return (
                <View 
                    style = {{width: windowWidth, alignItems: 'center', height: windowHeight*0.5, borderWidth : 1.0, borderRadius: 10, borderColor: 'ffffff'}}
                   
                >
                    <View style = {{flexDirection: 'row',
                                    width: windowWidth,
                                    height: windowHeight*0.1,
                                    alignItems: 'center',
                                
                                    flex: 1,
                                      // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
                                    ...(Platform.OS !== 'android' && {
                                    zIndex: 10
                                    })
                                    }}>
{/* fleche à coté du nom de l'ingredient 
<TouchableOpacity onPress = {() => { this.setState({isVisible : false}), console.log(this.props) }} >
 <FontAwesomeIcon icon={faArrowLeft} style={{color: 'white'}} size={20} />
                                </TouchableOpacity>*/}
                        <TouchableOpacity 
                                    style={{
                                            flex: 2,
                                            paddingLeft: 15,
                                            color: '#04295D',
                                            textAlignVertical: 'center',
                                            fontSize: 20,
                                            marginRight: '10%'

                                        }} 
                                        onPress = {() => { this.setState({isVisible : false}), console.log('this.props') }}
                        >
                                    <Text
                                        style = {
                                            {
                                                color: '#04295D',
                                                fontSize: 18,
                                                fontWeight: 'bold',

                                            }
                                        }>
                                        {ingredient.nom}
                                    </Text>
                        </TouchableOpacity>



                        <Text
                            style={{

                                color: '#04295D',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontSize: 12,
                                marginLeft:'4%'
                            }}>
                            {ingredient.date_entree}
                        </Text>

                        <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            color: '#04295D',
                            textAlignVertical: 'center',
                            fontSize: 12,
                            marginLeft:'3%'
                        }}>
                            {this.state.quantity + " " + ingredient.unite_choise}
                        </Text>

                        <Text
                        style={{

                            textAlign: 'center',
                            color: '#04295D',
                            textAlignVertical: 'center',
                            fontSize: 12,
                            marginRight:'5%'
                        }}>
                            {ingredient.dluo}
                        </Text>
                    </View>

                <View style={{width: windowWidth*0.95, alignItems: 'center'}}>
                            <TextInput
                                style={{
                                    width: windowWidth*0.4,
                                    borderWidth : 1.0,
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    color: 'black',
                                    borderColor:'#04295D',
                                    paddingLeft: 10,
                                    marginTop:'3%',
                                    height: windowHeight*0.075
                                }}
                                keyboardType= 'numeric'
                                placeholder='Quantité utilisée'
                                placeholderTextColor='#04295D'
                                value={this.state.quantite}
                                onChangeText={(value) => this._inputQuantite(value)}
                            />
                            </View>
                            <View style = {{
                                    flex: 1,
                                    width:windowWidth*0.5,
                                    alignItems: 'center',
                                    ...(Platform.OS !== 'android' && {
                                        zIndex: 10
                                        }),
                                    paddingTop: 10
                                    
                                    }}>
                            <DropDownPicker
                                placeholder='Unité de mesure'
                                items={this.unites}
                                style = {{backgroundColor: 'white', color:'#04295D', borderColor:'#04295D'}}
                                containerStyle= {{height:windowHeight*0.075, width:windowWidth*0.4}}
                                dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: windowWidth*0.4}}
                                placeHolderStyle = {{color:'#04295D', fontSize: 16}}
                                labelStyle={{color:'#04295D'}}
                                arrowColor = {'#04295D'}
                                onChangeItem={item => this.setState({poids: item.value})}
                            />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', width:'95%'}}>
                            <TouchableOpacity onPress = {() => this._newQuantite()} style={styles.button} >
                        
                                        <Text style={styles.buttonText}>
                                            Mettre à jour
                                        </Text>
                                    
                            </TouchableOpacity>
                            <TouchableOpacity style={{margingLeft:'-1%'}} onPress = {() => { this.setState({isVisible : false}), console.log(this.props) }} >
                        <FontAwesomeIcon icon={faAngleUp} style={{color: '#04295D', marginTop:39}} size={30} /> 
                        </TouchableOpacity>

                           
                            <TouchableOpacity style={styles.button}

                            onPress = {() =>
                                Alert.alert(
                                "Attention !",
                                "Êtes-vous sûr de vouloir supprimer cet article ?",
                                [
                                    {
                                    text: "Annuler",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                    },
                                    { text: "Oui", onPress: () => {
                                        this.delete();
                                    } }
                                ],

                                { cancelable: false }

                                )
                                
                            }
                           

                            >
                                
                                
                                    <Text style={styles.buttonText}>
                                    Supprimer
                                    </Text>
                                
                            </TouchableOpacity>
                            
                        </View>
                    
                    </View>

                   
                )
            }
            else{
                return(
                <View
                    style = {
                        {
                            width: windowWidth ,
                            alignItems: 'center',
                            height: windowHeight*0.1,
                            borderWidth : 1.0,
                            borderRadius: 10,
                            borderColor: '#B0B0B0',
                            marginBottom: '2%'
                        }
                    }>
                       
                            <TouchableOpacity onPress = {() => this.setState({isVisible : true})}
                                style={{  
                                    flexDirection: 'row',
                                    flex:1,
                                    marginTop: '5%',
                                    marginBottom: '2%',
                                    paddingLeft: '7%',
                                    paddingRight: '3%',
                                    width: windowWidth,
                            }} >

                                 <View style = {{
                                    flex: 2
                                 }}>

                                        <Text style = {
                                            {
                                            color: '#04295D',
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }
                                        }>
                                            {ingredient.nom}
                                        </Text>
                                    </View>

                                     <View style = {{flex: 1, alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                color: '#04295D',
                                                textAlign: 'center',
                                                textAlignVertical: 'center',
                                                fontSize: 12
                                        }}>
                                            {ingredient.date_entree}
                                        </Text>
                                    </View>

                                     <View style = {{flex: 1, alignItems: 'center' }}>
                                        <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#04295D',
                                            textAlignVertical: 'center',
                                            fontSize: 12
                                        }}>
                                            {this.state.quantity + " " + ingredient.unite_choise}
                                        </Text>
                                    </View>

                                    <View style = {{flex: 1, alignItems: 'center' }}>
                                        <Text
                                        style={{
                                            textAlign: 'center',
                                            color: '#04295D',
                                            textAlignVertical: 'center',
                                            fontSize: 12
                                        }}>
                                            {ingredient.dluo}
                                        </Text>
                                    </View>
                                
                                
                            </TouchableOpacity>
                            
                </View>
            )}

    }

    render(){

        return(
            <>
            {this._displayItem()}
            </>
        )

    }
}
const styles = StyleSheet.create({
    
       buttonText: {
         fontSize: 16,
         textAlign: "center",
         margin: 10,
         marginBottom: 10,
         color: "#04295D",
         backgroundColor: "transparent",
         fontWeight:'bold'
       },
       button:{
        borderRadius: 5,
        borderColor: "#3BB9E0",
        borderWidth: 1,
        backgroundColor: "#3BB9E0",
        marginBottom: '10%',
       }
 });





 /* Connecting the store to this component */
 export default connect(mapStateToProps)(InventaireItem);