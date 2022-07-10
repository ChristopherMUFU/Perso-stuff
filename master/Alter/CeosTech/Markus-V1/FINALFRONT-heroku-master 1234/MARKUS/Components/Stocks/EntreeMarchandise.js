import React from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Keyboard, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import {setProduitEnStock, getProduitEnStock, getFournisseur } from '../../API/StocksData';
import { connect } from 'react-redux';
// import { LinearGradient } from 'expo-linear-gradient';

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
  restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})


class EntreeMarchandise extends React.Component{

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
            {value:'Kilogramme'},
            {value:'Gramme'},
            {value:'Litre'},
            {value:'Centilitre'},
            {value:'Unité'},
            {value:'Unité'}
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
            montant_total: "",
            unit_price:"",
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

    // On récupère la liste de fournisseur et   / We retrieve the supplier list and
    // on la mappe pour la mettre dans la dropdown / we map it to put it in the dropdown    
    // If the list is not empty, then we set a variable to false
  _verifFournisseur(data){
    const fournisseursList = data.map((item) => {
      return { label: item.nom, value: item.id }})
    this.setState({
      fournisseurs: [{ label: 'Ajouter nouveau fournisseur', value: 0 }, ...fournisseursList]      
    })   
  }

  _dataRefresh(){
        getFournisseur().then( (data) => this._verifFournisseur(data))
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
    // Calcule le montant total à partir du montant hors taxe et de la quantité du produit, ainsi que le montant par unité 
    _montantTotal(){
      console.log(this);
        let montantTotal = (Number(this.state.montant_HT) + (Number(this.state.montant_HT) * Number(this.state.TVA) )) * Number(this.state.quantite)
        let montantParUnite= Number(this.state.montant_HT) / Number(this.state.quantite)
        console.log('total amount 1 ::: ' + montantTotal);
        this.setState({montant_total: montantTotal}); 
        this.setState({unit_price: montantParUnite});// total.toString() à vérifier
        console.log('total amount ::: ' + this.state.montant_total)
        console.log('unitPrice ::: ' + this.state.unit_price)
        //return (Alert.alert(total.toString())) //pour test le résultat
    }
    //Algo ajouté
    //Fonction permettant d'accéder à la nav Ajouter_Fournisseur
    _goTo = (destination) => {
 		this.props.navigation.navigate(destination)
   };
    //Algo ajouté
    //Vérifie si la valeur entrée est dans la section fournisseur est 'autre' et dans se cas crée une navigation vers Ajouter_Fournisseur
    _testFournisseur(value){
        this.setState({fournisseur: value});
        if(value === ""){
            console.log('Pas bon');
        }
        else if(value === 0){
            console.log('OK');
            this._goTo('new_fournisseur');
        }
        else{
            console.log('fournisseur choisi');
            console.log(value);
        }
    }

    validateQuantite = (quantite) => {
      console.log(quantite);
      var re = /^[0-9]+$/;
      return re.test(quantite);
    };

    validateMontant = (montant_HT) => {
      var re = /^(\d+)(\.\d+)?$/;
      return re.test(montant_HT);
    };

    /* Verify all the input */
    _verify(){
      /* Calculate that the DLUO is after the reception of the product */
      this._testDLUO()

        if(this.state.categorie === ""){
            return(Alert.alert('Veuillez renseigner la catégorie'));
        }
        if( this.state.nom== ""){
            return(Alert.alert('Veuillez renseigner le nom du produit'));
        }
        if( this.state.date_entree== ""){
            return(Alert.alert('Veuillez renseigner la date d\'entrée'));
        }
        if( this.state.DLUO== ""){
            return(Alert.alert('Veuillez renseigner la date limite de consommation'));
        }
        if( this.state.quantite== ""){
            return(Alert.alert('Veuillez renseigner la quantité'));
        }
        if (!this.validateQuantite(this.state.quantite)) {
          return Alert.alert("La quantité est invalide. Exemple: 23");
        }
        if( this.state.poids== ""){
            return(Alert.alert("Veuillez renseigner le poids du produit"))
        }
        // if( this.state.nombre_colis== ""){
        //     return(Alert.alert('Veuillez indiquer le nombre de colis'))
        // }
        if( this.state.montant_HT== ""){
            return(Alert.alert('Veuillez renseigner le montant total en euro'))
        }
        if (!this.validateMontant(this.state.montant_HT)) {
          return Alert.alert("Le montant HT est invalide. Exemple: 24");
        }
        if( this.state.TVA== ""){
          return(Alert.alert('Veuillez renseigner la TVA'))
        }
        if( this.state.fournisseur== ""){
          return(Alert.alert('Veuillez renseigner le fournisseur'))
        }
        if( this.state.numero_ref_produit== ""){
          return(Alert.alert('Veuillez renseigner la référence du produit'))
        }
       
        /* In case of no problem */
        return true        
    }

    /* send request and checks if the response is not a error */
    _sendRequest = async (formdata) =>{
      const hasFailed = await setProduitEnStock(formdata)
      console.log('le résultat :: ' + JSON.stringify(hasFailed)) //'data'
      //If the response is not an error
      /*if(!hasFailed){*/
        Alert.alert("Le produit " + this.state.nom + " a bien été ajouté.");
        this.props.navigation.navigate("inventory");
      //}
      /*
      else {        
        Alert.alert("Un erreur s'est produite, veuillez recommencer.");
      }
      */
  }        

    /* Send to API */
    _sendToApi(){      
      let formdata={
        nom: this.state.nom, //+
        quantite: Number(this.state.quantite), //+
        unite_choise: this.state.poids,
        tva: this.state.TVA, //+
        dluo: this.state.DLUO,
        date_entree: this.state.date_entree,
        prix_produit_ttc: this.state.montant_total,
        prix_produit_ht: Number(this.state.montant_HT), // à Vérifier
        ref_produit: this.state.numero_ref_produit,
        unit_price: this.state.unit_price, // TEST
        categorie_produit: 1, // à corriger
        fournisseur: [this.state.fournisseur], // à corriger
        restaurant: this.props.restaurantOwnerDetails[0]["restaurant"]["id"]
      }
      
   console.log('my datas sent :: ' + JSON.stringify(formdata))

      // If the input are validated, then we send the request
      if(this._verify()) {
        this._sendRequest(formdata)
      }    
    }


    render(){
        return(
          <ScrollView style={styles.mainContainer}>
            <View style={styles.content_container}>

            <View style={[styles.input_container]}>
              <Text style={styles.input_name}>Veuillez sélectionner une catégorie</Text>
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

                zIndex = {5000}
                style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
                containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
                dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
                labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                arrowColor = {'black'}

                onChangeItem={item => this.setState({
                categorie: item.value})}
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Nom marchandise</Text>

              <TextInput //Nom de la marchandise
              style={styles.text_input}
              placeholder='Nom marchandise'
              value={this.state.nom}
              onChangeText={(value) => this.setState({nom : value})}
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Date d'entrée</Text>
              <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
                <DatePicker // Date d'entrée
                  style={{width: "100%"}}
                  customStyles={{dateText: {color: "black", flex: 1}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}              
                  date={this.state.date_entree} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date d'entrée"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {this.setState({date_entree: date})}}
                  value={this.state.date}
                  onValidation={isValid => this.setState({ isValid })}
                />
              </View>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Veuillez sélectionner une DLUO</Text>
              <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>  
                <DatePicker //DLUO
                style={{width: "100%"}}
                onSubmitEditing={Keyboard.dismiss}
                customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                date={this.state.DLUO} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Veuillez sélectionner une DLUO"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({DLUO: date})}}
                />
              </View>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Quantité totale</Text>
              <TextInput
              style={styles.text_input}
              keyboardType= 'numeric'
              placeholder='Quantité totale'
              value={this.state.quantite}
              onChangeText={(value) => this.setState({quantite : value})}
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Unité de mesure</Text>
              <DropDownPicker
              placeholder='Unité de mesure'
              items={[
              {label:'Kilogramme(s)', value:'Kg'},
              {label:'Gramme(s)', value:'g'},
              {label:'Litre(s)', value:'L'},
              {label:'Centilitre(s)', value:'Cl'},
              {label:'Unité(s)', value:'Unité'},

              ]}      

              zIndex = {5000}
              style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
              containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
              dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              arrowColor = {'black'}

              onChangeItem={item => this.setState({
              poids: item.value})}/>
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
            <View style={styles.input_container}>
              <Text style={styles.input_name}>Montant total en euro HT</Text>
              <TextInput
              style={styles.text_input}
              keyboardType = 'numeric'
              placeholder='Montant total en euro HT'
              onChangeText={(value) => this._convertEuro(value)}
              />
              {/* {this.state.isEuro ?<Text style={{marginTop: 18, marginLeft:'30%', size:20}}>€</Text>:null} */}

            </View>

            <View style={[styles.input_container, {flex: 0.7}]}>
              <Text style={styles.input_name}>TVA</Text>
              <DropDownPicker
              placeholder='TVA'
              items={[
              {label:'5,5%', value: 0.055},
              {label:'10%', value: 0.1},
              {label:'20%', value: 0.2}
              ]}

              zIndex = {5000}
              style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
              containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
              dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              arrowColor = {'black'}
              
              onChangeItem={item => {
              this.setState({TVA: item.value})
              /* Calculate the total of the different amount given by the user */
              this._montantTotal()
              }}/>
            </View>

            <View style={[styles.input_container, {flex: 0.7}]}>
              <Text style={styles.input_name}>Fournisseur</Text>
              {/* Suppliers list. Depending on whether or not it's empty, we can either choose a supplier or click to be redirected to the page that creates one */}
              <DropDownPicker
              placeholder='Fournisseur'
              items={this.state.fournisseurs}

              zIndex = {5000}
              style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
              containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
              dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
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
            <View style={styles.input_container}>
              <Text style={styles.input_name}>Référence du produit</Text>
              <TextInput //Référence du produit
                style={styles.text_input}
                placeholder='Référence du produit'
                value={this.state.numero_ref_produit}
                onChangeText={(value) => this.setState({numero_ref_produit : value})}
              />
            </View>

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

            <TouchableOpacity 
              onPress = {() =>{
              this._sendToApi()/* _validate()*/
              }}
              style={styles.button}
            >                        
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  mainContainer:{ 
    flex: 1, 
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  content_container: {
    flex: 1,
    //width: phoneWidth,
    padding: "3%",
  },

  input_container:{
    flex: 1,
    marginHorizontal: "1%",
  },

  input_name:{
    fontWeight: "700",
    fontSize: 14,
    color:"#04295D",
    marginVertical: 4
  },

  text_input :{
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#04295D",
    color: "black",
    paddingHorizontal: 15,
    fontSize:14,
    fontStyle: "italic",
    fontWeight: "200",
    height: 50,
    justifyContent: "center"
  },
  imageButton: {
    width: "100%",
    borderColor: "#04295D", 
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: "center"
  },
  imageButtonText: {
    flex:1,
    fontSize: 14,
    fontWeight:'bold',
    color: "#04295D",
    textAlign: "center",
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "center",
    padding: "3%",
    marginVertical: "1.5%"
  },
  button: {
    width: "100%", 
    marginVertical: '3%', 
    borderColor: "#3BB9E0", 
    borderWidth: .5,
    borderRadius: 6,
    backgroundColor: '#3BB9E0',
    alignSelf: "center"
  },
  buttonText: {
    flex:1,
    fontSize: 20,
    fontWeight:'bold',
    color: "white",
    textAlign: "center",
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "center",
    padding: "3%"
  },

});

/* Connecting the store to this component */
export default connect(mapStateToProps)(EntreeMarchandise);