import React from "react";
import {
    Alert,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    StyleSheet, } from "react-native";
import * as Theme from "../Styles/Theme";
import DatePicker from "react-native-datepicker";
import DropDownPicker from "react-native-dropdown-picker";
import LinearGradient from "react-native-linear-gradient";
import ImagePicker from "react-native-image-picker";
import {setFournisseur, getFournisseur, updateFournisseur} from '../../API/StocksData';
import CheckboxFormX from 'react-native-checkbox-form';
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import FournisseurItem from "./FournisseurItem";
import { recupData, _returnData } from "./FournisseurItem";
import "../Connexion/Connexion"; // import des variables globales


// import { LinearGradient } from 'expo-linear-gradient';


const phoneHeight = Dimensions.get("window").height;
const phoneWidth = Dimensions.get("window").width;





class EditFournisseur extends FournisseurItem {
  	constructor(props) {
		super(props);
		this.state = {
      fournisseur: this._returnData(), //fonction qui retourne la donnée voulant être modifiée
      name: this.state.fournisseur.nom,
      adress: '',
      bp: '',
      city: '',
      phone: '',
      contact_name: '',
      mail: '',
      delivery_day: this.state.fournisseur.delivery_day,  
      mockData: [
        {label:'Lun',value: 'Lundi' },
        {label:'Mar', value:'Mardi'},
        {label:'Mer', value:'Mercredi'},
        {label:'Jeu', value:'Jeudi'},
        {label:'Ven', value:'Vendredi'},
        {label:'Sam', value:'Samedi'},
        {label:'Dim', value:'Dimanche'}
      ],
    };
        // Faire une fonction qui comprend setfournisseur et le RAJOUTER
        // aux différentes valeurs
   }

      //Function that will set a boolean to a variable to indicate if some days were picked or not => So that is no days were picked, an alert will be displayed when the form is validated
    _isDeliveryDayPicked = (item) => {
      const isDeliveryDayPicked = item.some(element => (element.RNchecked))     
      console.log(isDeliveryDayPicked)
      return isDeliveryDayPicked
    }


  // Function that returns a list of delivery days : 
  _listDeliveryDays(){
    console.log(this.state.mockData)
    var listDeliveryDays = []
    var listOfDays = this.state.mockData
    listOfDays.forEach(element => {
      if (element.RNchecked){
          listDeliveryDays.push(element.value)
      }
    })
    console.log(listDeliveryDays)
    return JSON.stringify(listDeliveryDays)
  }

    // Validation du champs / Field Validation
    validateCourriel = (mail) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(mail);
    };

    validateBp = (bp) => {
      var re = /^[0-9]{5,5}$/;
      return re.test(bp);
    };

    validatePhone = (phone) => {
      // var re = /^(\d\d\s){4}(\d\d)$/;
      var re = /^(0)[1-9]( *[0-9]{2}){4}$/;
      return re.test(phone);
    };

    validateDeliveryDelay = (delivery_delay) => {
      var re = /^[0-9]*$/;
      return re.test(delivery_delay);
    };
    //
    _displayFournisseur()
    {
      console.log('jour de livraison :: ' + JSON.stringify(this.state.fournisseur.jour_livraison))
        this.setState({
            name: this.state.fournisseur.nom,
            adress: this.state.fournisseur.adresse,
            bp: this.state.fournisseur.code_postale,
            city: this.state.fournisseur.ville,
            phone: this.state.fournisseur.numero_telephone,
            contact_name: this.state.fournisseur.nom_contact,
            mail: this.state.fournisseur.adresse_mail,
            delivery_day: this.state.fournisseur.delivery_day,
            //delivery_day: this.state.fournisseur.jour_livraison,
        })
        //console.log(this.state.fournisseur.nom)

    }

    componentDidMount()
    {
        this._displayFournisseur()
        this._daysWithSelectedDay()
        //this._recupFournisseur()
    }

    _daysWithSelectedDay(){
      const daysSelectedByUser = this.state.fournisseur.jour_livraison
      let newMockData =  this.state.mockData.map((day) => {
        return  daysSelectedByUser.includes(day['value']) ? {...day, RNchecked: true} : {...day, RNchecked: false};
      })
      this.setState({mockData: newMockData})
    }


  /* Verify all the input */
  _verify() {
		if (this.state.name == "") {
			return Alert.alert("Veuillez indiquer le nom du fournisseur");
		}
		if (this.state.adress == "") {
			return Alert.alert("Veuillez indiquer l'adresse");
		}
		if (this.state.bp == "") {
			return Alert.alert("Veuillez indiquer un code postal");
    }
    if (!this.validateBp(this.state.bp)) {
			return Alert.alert("Code postal invalide");
    }
		if (this.state.city == "") {
			return Alert.alert("Veuillez indiquer une ville");
		}
		if (this.state.phone == "") {
			return Alert.alert("Veuillez indiquer une numéro de téléphone fixe");
    }
    if (!this.validatePhone(this.state.phone)) {
			return Alert.alert("Numéro de téléphone invalide. Exemple : 0244556677");
		}
		if (this.state.contact_name == "") {
			return Alert.alert("Veuillez indiquer le nom du contact");
		}
		if (this.state.mail == "") {
			return Alert.alert("Veuillez indiquer un mail");
    }
    if (!this.validateCourriel(this.state.mail)){
      return Alert.alert("Adresse mail invalide. Exemple : contact@contact.com")
    }
    if (!this._isDeliveryDayPicked(this.state.mockData)) {
			return Alert.alert("Veuillez renseigner le jour de livraison");
    }
    else {
      console.log(this.state);
      updateFournisseur({
        nom: this.state.name,
        adresse: this.state.adress,
        code_postale: this.state.bp,
        ville: this.state.city,
        numero_telephone: this.state.phone,
        nom_contact: this.state.contact_name,
        adresse_mail: this.state.mail,
        jour_livraison: this._listDeliveryDays(), // à modif dans le backt
        //restaurant: this.state.restaurant
    }, this.state.fournisseur.id)
    
      Alert.alert("Le fournisseur " + this.state.name + " a bien été modifié.");
      this.props.navigation.goBack();
		}
  }

  render() {
    return (

      <ScrollView style={styles.mainContainer}>
        <View style={styles.content_container}>

          <View style={styles.input_container}>
            <Text style={styles.input_name}>Nom fournisseur</Text>
            <TextInput
              style={styles.text_input}
              placeholder="Nom fournisseur"
              value={this.state.name}
              onChangeText={(value) => this.setState({name : value}) }
            />
          </View>
          
          <View style={{flexDirection: "row"}}>
              <View style={styles.input_container}>
              <Text style={styles.input_name}>Adresse</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Adresse"
                    value={this.state.adress}
                    onChangeText={(value) => this.setState({adress : value})}
                  />
            </View>
            
            <View style={[styles.input_container]}>
            <Text style={styles.input_name}>Code postal</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Code postal"
                keyboardType = 'numeric'
                value={this.state.bp}
                onChangeText={(value) => this.setState({bp : value})}
              />
              
            </View>
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={styles.input_container}>
             <Text style={styles.input_name}>Ville</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Ville"
                value={this.state.city}
                onChangeText={(value) => this.setState({city : value})}
              />
              </View>
              <View style={styles.input_container}>
             <Text style={styles.input_name}>Numéro de téléphone</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Fixe"
                value={this.state.phone}
                keyboardType = 'numeric'
                onChangeText={(value) => this.setState({ phone : value})}
              />
              </View>
            </View>

          
            <View style={styles.input_container}>
            <Text style={styles.input_name}>Nom du contact </Text>
              <TextInput
                style={styles.text_input}
                placeholder="Nom du contact"
                value={this.state.contact_name}
                onChangeText={(value) => this.setState({ contact_name : value})}
              />
            </View>

            <View style={styles.input_container}>
            <Text style={styles.input_name}>Email</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Adresse email"
                value={this.state.mail}
                onChangeText={(value) => this.setState({ mail : value})}
              />
            </View>

            {/*<View style={{ flexDirection: "row",marginBottom: "5%", alignItems: "center"}}>
              <TextInput
                style={{
                  marginTop: 10,
                  paddingLeft: 21,
                  width: "90%",
                  flex: 1,
                  height: 55,
                  borderWidth: 1.0,
                  borderRadius: 10,
                  backgroundColor: "white",
                  color: "black",
                  marginBottom: 2,
                  fontSize:16,
                  alignItems: "center"
                }}
                placeholder="Délai de Livraison"
                keyboardType = 'numeric'
                value={this.state.delivery_delay} //mettre la val en str
                onChangeText={(value) => this.setState({ delivery_delay : value})}
              />
              </View>*/}

                <View style={styles.input_container}>
                <Text style={styles.input_name}>Jour(s) de livraison</Text>
                    <View style={{ width: '95%',marginVertical: 15, alignItems: "center"}} >
                      <CheckboxFormX
                        style={{ width: 300 - 80}}

                        dataSource={this.state.mockData}
                        textStyle={{ color:"white"}}
                        itemShowKey="label"
                        itemCheckedKey="RNchecked"
                        iconSize={28}
                        formHorizontal={true}
                        labelHorizontal={false}
                        checked={1}
                        //onChecked={(item)=>this._onSelect({item})}
                      
                    />
                  </View>
                </View>


                <TouchableOpacity
              onPress={() => { this._verify() }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    );
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
export default EditFournisseur;
