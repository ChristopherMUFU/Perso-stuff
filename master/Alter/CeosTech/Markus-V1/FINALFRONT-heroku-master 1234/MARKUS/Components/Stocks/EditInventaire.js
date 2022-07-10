import React from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Platform} from 'react-native';
import * as Theme from '../Styles/Theme';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import {setProduitEnStock, getDetailProduitEnStock} from '../../API/StocksData';
import { getFournisseur } from '../../API/StocksData';
// import { LinearGradient } from 'expo-linear-gradient';

class EditInventaire extends React.Component{

    constructor(props){
        super(props);
        this.state={
          categories:[
            {value:'Viandes, Poissons & Oeufs'},
            {value:'Produits laitiers'},
            {value:'Fruits & Lègumes'},
            {value:'Céréales & Féculents'},
            {value:'Corps gras'},
            {value:'Boissons'},
            {value:'Desserts'},
            {value:'Consommables'}
          ],
          unites:[
            {value:'Kilogrammes'},
            {value:'Grammes'},
            {value:'Litres'},
            {value:'Centilitres'},
            {value:'Unités'}
          ],
            fournisseurs: [],
            fournisseur: "", //modifié
            TVA: "", //modifié
            categorie: "",
            nom: "",
            date_entree:"",
            DLUO: "",
            quantite: "",
            poids: "",
            nombre_colis: "",
            montant_HT : "", //ajouté
            montant_total: 0,
            photo: null,
            numero_ref_produit:"",
            isEuro: false, //ajouté
        }
        this._takePhoto = this._takePhoto.bind(this)
    }

    _testDLUO(){
      if (this.state.date_entree >= this.state.DLUO){
        return (Alert.alert("La DLUO n'est pas valide"))
      }
      else{
        return (
          console.log("DLUO valide"),
          console.log(this.state.DLUO)
        )
      }
    }

     // On récupère la liste de fournisseur et   / We retrieve the supplier list and
    // on la mappe pour la mettre dans la dropdown / we map it to put it in the dropdown    
    // If the list is not empty, then we set a variable to false
    _verifFournisseur(data){
      const fournisseursList = data.map((item) => {
        return { label: item.nom, value: item.id }})
      this.setState({
        fournisseurs: [{ label: 'Autre', value: 0 }, ...fournisseursList] 
      }) 
    }

    componentDidMount(){
        console.log(this.props.inventaire)
        console.log(this.props.ingredient)
        getDetailProduitEnStock(this.props.ingredient.id)
        getFournisseur().then( (data) => this._verifFournisseur(data))
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

    _poidsTotal(){
      return (this.state.poids * this.state.quantite)
    }

    _convertEuro(val){
        if(val != ""){
            this.setState({montant_HT : val});
            this.setState({isEuro: true});
        }
    }
    //Algo ajouté
    // Calcule le montant total à partir du montant hors taxe et de la quantité du produit
    _montantTotal(){
        let total = Number(this.state.montant_HT) * Number(this.state.quantite) * this.state.TVA
        console.log(total)
        this.setState({montant_total: total}) // total.toString() à vérifier
        console.log(this.state.montant_total)
        return (Alert.alert(total.toString())) //pour test le résultat
    }
    //Algo ajouté
    //Fonction permettant d'accéder à la nav Ajouter_Fournisseur
    _goTo = (destination) => {
 		this.props.navigation.navigate(destination)
   };
    //Algo ajouté
    //Vérifie si la valeur entrée est dans la section fournisseur est 'autre' et dans se cas crée une navigation vers Ajouter_Fournisseur
    _testFournisseur(value){
      console.log('le fournisseur choisi :: ' + value)
        this.setState({fournisseur: value});
        if(value === ""){
            console.log('Pas bon');
        }
        else if(value === 0){
            console.log('OK');
            this._goTo('new_fournisseur');
        }
        else{
            console.log('Problème');
            console.log(value);
        }
    }

    validateQuantite = (quantite) => {
      var re = /^[0-9]+$/;
      return re.test(quantite);
    };

    validateMontant = (montant_HT) => {
      var re = /^(\d+)(\.\d+)?$/;
      return re.test(montant_HT);
    };

    /* Verify all the input */
    _verify(){
        if(this.state.categorie == ""){
            return(Alert.alert('Veuillez indiquer la catégorie'))
        }
        if( this.state.nom== ""){
            return(Alert.alert('Veuillez indiquer le nom du produit'))
        }
        if( this.state.date_entree== ""){
            return(Alert.alert('Veuillez indiquer une date d\'entrée'))
        }
        if( this.state.DLUO== ""){
            return(Alert.alert('Veuillez indiquer une date limite de consommation'))
        }
        if( this.state.quantite== ""){
            return(Alert.alert('Veuillez indiquer une quantité'))
        }
        if (!this.validateQuantite(this.state.quantite)) {
          return Alert.alert("Quantité : format invalide. Ne doit contenir que des chiffres");
        }
        if( this.state.poids== ""){
            return(Alert.alert("Veuillez indiquer le poids du produit"))
        }
        // if( this.state.nombre_colis== ""){
        //     return(Alert.alert('Veuillez indiquer le nombre de colis'))
        // }
        if( this.state.montant_HT== ""){
            return(Alert.alert('Veuillez indiquer le montant total en euros'))
        }
        if (!this.validateMontant(this.state.montant_HT)) {
          return Alert.alert("Montant HT: format invalide. Ne doit contenir que des chiffres");
        }
        if( this.state.TVA== ""){
          return(Alert.alert('Veuillez indiquer la TVA'))
        }
        if( this.state.fournisseur== ""){
          return(Alert.alert('Veuillez indiquer le fournisseur'))
        }
        if( this.state.numero_ref_produit== ""){
          return(Alert.alert('Veuillez indiquer la référence produit'))
        }
        /* In case of no problem */
        return true        
    }
    /* Attestion de droit */


    render(){
        return(
          <ScrollView style={{flex:1, width: '100%',backgroundColor: '#3C3C3C'}}>
            <View style={{
                    backgroundColor: '#3C3C3C',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                    paddingTop:'1%',
                    width: "100%",
                    marginTop: 25
                  }}>
              <View style = {{
                          flex: 1,
                          width:'90%',
                          alignItems: 'center',
                          ...(Platform.OS !== 'android' && {
                              zIndex: 10
                              }),
                          paddingTop: 5
                          }}>
                <DropDownPicker
                  placeholder='Veuillez sélectionner une catégorie'
                  items={[
                    {label:'Viandes, Poissons & Oeufs', value:'Viandes, Poissons & Oeufs'},
                    {label:'Produits laitiers', value:'Produits laitiers'},
                    {label:'Fruits & Lègumes', value:'Fruits & Lègumes'},
                    {label:'Céréales & Féculents', value:'Céréales & Féculents'},
                    {label:'Corps gras', value:'Corps gras'},
                    {label:'Boissons', value:'Boissons'},
                    {label:'Dessert', value:'Dessert'},
                    {label:'Consommables', value:'Consommables'}
                  ]}
                  style = {{backgroundColor: 'white'}}
                  containerStyle= {{height:50, width:'100%',}}
                  dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%"}}
                  placeHolderStyle = {{color:'black', fontSize: 16}}
                  arrowColor = {'black'}
                  onChangeItem={item => this.setState({
                    categorie: item.value})}
                />
              </View>


              <TextInput //Nom de la marchandise
                style={{
                  marginTop: 10,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  color: 'black',
                  paddingLeft: 35,
                  marginBottom: 2
                }}
                placeholder='Nom Marchandise'
                value={this.state.nom}
                onChangeText={(value) => this.setState({nom : value})}
              />
              <DatePicker // Date d'entrée
                style={{width: '92%', marginTop: 20, marginBottom: 15, marginLeft:'2%'}}
                date={this.state.date_entree} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Date d'entrée"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                  width:0,
                  height:0,
                  },
                  dateInput: {
                      height: 60,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderColor: 'black'
                  }
                }}
                onDateChange={(date) => {this.setState({date_entree: date})}}
              />
              <DatePicker //DLUO
                style={{width: '92%', marginTop: 20, marginBottom: 15, marginLeft:'2%'}}
                date={this.state.DLUO} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Veuillez sélectionner une DLUO"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    width:0,
                    height:0,
                  },
                  dateInput: {
                      height: 60,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderColor: 'black',
                  }
                }}
                onDateChange={(date) => {this.setState({DLUO: date})}}
              />

              <View style = {{flexDirection : 'row', width: '90%', marginTop: 10, marginBottom: 5, height: 60}} >
                <TextInput
                  style={{
                    width: '50%',
                    borderWidth : 1.0,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    color: 'black',
                    paddingLeft: 35,
                  }}
                  keyboardType= 'numeric'
                  placeholder='Quantité'
                  value={this.state.quantite}
                  onChangeText={(value) => this.setState({quantite : value})}
                />
                <View style = {{
                            flex: 1,
                            width:'50%',
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                })
                            }}>
                  <DropDownPicker
                    placeholder='Unités de mesure'
                    items={[
                      {label:'Kilogrammes', value:'Kg'},
                      {label:'Grammes', value:'g'},
                      {label:'Litres', value:'L'},
                      {label:'Centilitres', value:'Cl'},
                      {label:'Unités', value:'Unités'}
                    ]}
                    style = {{backgroundColor: 'white'}}
                    containerStyle= {{padding: '1%', height:60, width:'100%'}}
                    dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%"}}
                    labelStyle = {{color:'black', fontSize: 16}}
                    arrowColor = {'black'}
                    onChangeItem={item => this.setState({
                      poids: item.value})}/>
                </View>

              </View>
              {/* <TextInput
                style={{
                  marginTop: 10,
                  height: 40,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  color: 'black',
                  paddingLeft: 35,
                  marginBottom: 2,
                  zIndex: 5
                }}
                keyboardType= 'numeric'
                placeholder='Nombre de colis'
                value={this.state.nombre_colis}
                onChangeText={(value) => this.setState({nombre_colis : value})}
              /> */}
              <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    width: '90%',
                    height: 65,
                    borderWidth : 1.0,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    color: 'black',
                    marginBottom: 2
                }}>
                  <TextInput
                    keyboardType = 'numeric'
                    placeholder='Montant en euros HT'
                    value={this.state.montant_HT}
                    onChangeText={(value) => this._convertEuro(value)}
                  />
                   {this.state.isEuro ?<Text style={{marginTop: 21}}>€</Text>:null}
              </View>
              <View style = {{
                            flex: 1,
                            width:'90%',
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                })
                            }}>
                  <DropDownPicker
                    placeholder='TVA'
                    items={[
                      {label:'5,5%', value: 1.055},
                      {label:'10%', value: 1.1},
                      {label:'20%', value: 1.2}
                    ]}
                    style = {{backgroundColor: 'white'}}
                    containerStyle= {{padding: '1%', height:60, width:'100%',marginTop: 10, marginBottom: 5,}}
                    dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%"}}
                    labelStyle = {{color:'black', fontSize: 16}}
                    arrowColor = {'black'}
                    onChangeItem={item => this.setState({TVA: item.value})}/>
                </View>

             <View style = {{
                            flex: 1,
                            width:'90%',
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                })
                            }}>
                   {/* Suppliers list. Depending on whether or not it's empty, we can either choose a supplier or click to be redirected to the page that creates one */}
                  <DropDownPicker
                    placeholder='Fournisseur'
                    items={this.state.fournisseurs}
                    style = {{backgroundColor: 'white',  paddingLeft: 29,}}
                    containerStyle= {{padding: '1%', height:55, width:'100%',marginTop: '2%', marginBottom: 5 }}
                    dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%", marginLeft: '2%'}}
                    labelStyle = {{color:'black', fontSize: 16}}
                    arrowColor = {'black'}
                    onChangeItem = {(item) => {this._testFournisseur(item.value)}}
                  />              
                </View>
                {/*
              <TextInput
                style={{
                  marginTop: 10,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  color: 'black',
                  paddingLeft: 35,
                  marginBottom: 2
                }}
                placeholder='Nom du fournisseur'
                value={this.state.fournisseur}
                onChangeText={(value) => this.setState({fournisseur : value})}
              />
              */}
              <TextInput //Référence du produit
                style={{
                  marginTop: 10,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  color: 'black',
                  paddingLeft: 35,
                  marginBottom: 5
                }}
                placeholder='Réference du produit'
                value={this.state.numero_ref_produit}
                onChangeText={(value) => this.setState({numero_ref_produit : value})}
              />
              {/* <TouchableOpacity
                style={{
                  marginTop: 10,
                  width: '90%',
                  height: 65,
                  borderWidth : 1.0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  color: 'black',
                  paddingLeft: 35,
                  marginBottom: 2
                }}
                onPress={this._takePhoto}>
                  <Text>
                    Ajouter photo du produit pour traçabilité
                  </Text>
              </TouchableOpacity> */}

              <TouchableOpacity onPress = {() => { this._verify(), this._montantTotal(), this._testDLUO(), setProduitEnStock({
                        //name : this.state.nom,
                        //date_entry : this.state.date_entree,
                        //quantity : this.state.quantite,
                        //unit : this.state.poids,
                        //date_expiration : this.state.DLUO,
                        //category : this.state.categorie,
                        //price_product_ht : this.state.montant_total,
                        //ref_product : this.state.numero_ref_produit,
                        //photo: "photo",
                        // fournisseur : this.state.fournisseur

                        //id: 10,
                        name: this.state.nom,
                        quantity: Number(this.state.quantite),
                        unit: this.state.poids,
                        date_expiration: this.state.DLUO,
                        date_entry: this.state.date_entree,
                        price_product_ht: this.state.montant_total, // à Vérifier
                        ref_product: this.state.numero_ref_produit,

                    });
                    Alert.alert("Le produit " + this.state.nom + " a bien été modifié.");
                    this.props.navigation.navigate("inventory")
                    }}
                    style={Theme.buttonsV2.touchAble} >
                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradient}>
                        <Text style={Theme.buttonsV2.buttonText}>
                            Valider
                        </Text>
                    </LinearGradient>
              </TouchableOpacity>
          </View>
        </ScrollView>
        )
    }
}

export default EditInventaire
