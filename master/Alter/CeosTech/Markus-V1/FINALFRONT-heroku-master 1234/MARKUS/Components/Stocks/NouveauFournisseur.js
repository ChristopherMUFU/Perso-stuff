import React from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {setFournisseur, getFournisseur} from '../../API/StocksData';
import CheckboxFormX from 'react-native-checkbox-form';
import "../Connexion/Connexion"; // import des variables globales


const phoneHeight = Dimensions.get("window").height;
const phoneWidth = Dimensions.get("window").width;

class NouveauFournisseur extends React.Component{
  	constructor(props) {
		super(props);
		this.state = {
      name: '',
			adress: '',
			bp: '',
			city: '',
			phone: '',
			contact_name: '',
			mail: '',
      //fournisseur:[],
      mockData: [
        {label:'Lun   ',value: 'Lundi' },
        {label:'Mar   ', value:'Mardi'},
        {label:'Mer  ', value:'Mercredi'},
        {label:'Jeu    ', value:'Jeudi'},
        {label:'Ven ', value:'Vendredi'},
        {label:'Sam    ', value:'Samedi'},
        {label:'Dim', value:'Dimanche'}
      ],
    };


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
    // ancien regex var re = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
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
    console.log(delivery_delay)
  var re = /^[0-9]*$/;
  return re.test(delivery_delay);
};

  /* Verify all the input */
  _verify() {
		if (this.state.name == "") {
		    return Alert.alert("Veuillez renseigner le nom du fournisseur");
		}
		if (this.state.adress == "") {
			return Alert.alert("Veuillez renseigner l'adresse du fournisseur");
		}
		if (this.state.bp == "") {
			return Alert.alert("Veuillez renseigner le code postal");
    }
    if (!this.validateBp(this.state.bp)) {
			return Alert.alert("Le code postal est invalide. Exemple: 76543");
    }
		if (this.state.city == "") {
			return Alert.alert("Veuillez renseigner la ville");
		}
		if (this.state.phone == "") {
			return Alert.alert("Veuillez renseigner le numéro de téléphone fixe");
    }
    if (!this.validatePhone(this.state.phone)) {
			return Alert.alert("Le numéro de téléphone est invalide. Exemple: 0612345689");
		}
		if (this.state.contact_name == "") {
			return Alert.alert("Veuillez renseigner le nom du contact");
		}
		if (this.state.mail == "") {
			return Alert.alert("Veuillez renseigner l'E-mail");
    }
    if (!this.validateCourriel(this.state.mail)){
      return Alert.alert("L'E-mail est invalide. Exemple : contact@contact.com")
    }
    if (!this._isDeliveryDayPicked(this.state.mockData)) {
			return Alert.alert("Veuillez renseigner le jour de livraison");
    }
    else {
      console.log('le state :: ' + this.state);
      
      setFournisseur({
        nom: this.state.name,
    	  adresse: this.state.adress,
        code_postale: this.state.bp,
        ville: this.state.city,
        numero_telephone: this.state.phone,
        nom_contact: this.state.contact_name,
        adresse_mail: this.state.mail,
        jour_livraison: this._listDeliveryDays(), 
        restaurant: global.sessionRestaurant
     })
        
      Alert.alert("Le fournisseur " + this.state.name + " a bien été ajouté.");
      this.props.navigation.goBack();
      
		}
  }

  render() {
    return (
     //{/*<ScrollView>*/}
     <ScrollView style={styles.mainContainer}>

      <View style={styles.content_container}>

        <View style={styles.input_container}>
        <Text style={styles.input_name}>Nom fournisseur</Text>
            <TextInput
              style={styles.text_input}
              placeholder="Nom fournisseur"
              placeholderTextColor="#04295D"
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
                  placeholderTextColor="#04295D"
                  value={this.state.adress}
                  onChangeText={(value) => this.setState({adress : value})}
                />
              </View>
              <View style={styles.input_container}>
              <Text style={styles.input_name}>Code postal</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Code postal"
                  placeholderTextColor="#04295D"
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
                  placeholderTextColor="#04295D"
                  value={this.state.city}
                  onChangeText={(value) => this.setState({city : value})}
                />
                </View>

                <View style={[styles.input_container]}> 
                <Text style={styles.input_name}>Numéro de téléphone</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Numéro de téléphone"
                  placeholderTextColor="#04295D"
                  value={this.state.phone}
                  keyboardType = 'numeric'
                  onChangeText={(value) => this.setState({ phone : value})}
                />
              
              </View>
            </View>

            <View style={[styles.input_container]}> 
            <Text style={styles.input_name}>Nom du contact</Text>
            <TextInput
             style={styles.text_input}
              placeholder="Nom du contact"
              placeholderTextColor="#04295D"
              value={this.state.contact_name}
              onChangeText={(value) => this.setState({ contact_name : value})}
            />
          </View>

          <View style={styles.input_container}>
          <Text style={styles.input_name}>Email</Text>
            <TextInput
              style={styles.text_input}
              placeholder="Email"
              placeholderTextColor="#04295D"
              value={this.state.mail}
              onChangeText={(value) => this.setState({ mail : value})}
            />
          </View>

          {/*<View style={{ flexDirection: "row",marginBottom: "5%"}}>
            <TextInput
              style={{
                marginTop: 10,
                width: "90%",
                flex: 1,
                height: 55,
                borderWidth: 1.0,
                borderRadius: 10,
                backgroundColor: "white",
                color: "black",
                marginBottom: 2,
                paddingLeft:'5%'
              }}
              placeholder="Délai de Livraison"
              keyboardType = 'numeric'
              value={this.state.delivery_delay}
              onChangeText={(value) => this.setState({ delivery_delay : value})}
            />
            </View>*/}

            <View style={styles.input_container}>
                <Text style={styles.input_name}>Jour(s) de livraison</Text>
                <View style={{ marginVertical: 5,alignItems: "center"}} >
              <CheckboxFormX
                style={{ width: 300 - 30}}
                dataSource={this.state.mockData}
                textStyle={{ color:"#04295D"}}
                itemShowKey="label"
                itemCheckedKey="RNchecked"
                iconSize={28}
                formHorizontal={true}
                labelHorizontal={false}
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
  // GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL
  // GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL
  // GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL// GENERAL
  //text_input: {},

});
export default NouveauFournisseur;
