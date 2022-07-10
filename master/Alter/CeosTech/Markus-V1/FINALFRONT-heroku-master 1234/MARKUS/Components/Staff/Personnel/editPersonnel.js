import React from 'react';
import {Alert,Text,View,TextInput,TouchableOpacity,ScrollView,Platform,Dimensions,
    StyleSheet,Keyboard, Image} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Theme from "../../Styles/Theme";
import {setPersonnel} from '../../../API/StaffData';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import "../../Connexion/Connexion"; // import des variables globales

    const phoneHeight = Dimensions.get("window").height;
    const phoneWidth = Dimensions.get("window").width;

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
  restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})

const options = {
  title:'Selectionnez une image',
  storageOptions:{
    skipBackup:true,
    path:'images',
  },
};

let source = undefined;
let uri = undefined;

const openPicker = () => {
  
  ImagePicker.showImagePicker(options,(response) => {
    if (response.didCancel){
      console.log('User cancelled image picker');
      source = false;
    } else if (response.error){
      console.log('ImagePicker Error: ', response.error);
      source = false;
    } else {
      source = response;
      console.log( source );
      uri = source.data;
      //setFilePath(source);
      source = true;
    }
  })

}


//

class EditPersonnel extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
        civilities: [
          {label : 'Mme' , value: 'Mme'},
          {label : 'Mr' , value: 'M'}
      ],

      civility: [],
      name: '' ,
      lastname: '',
			adress: '',
			codePostal: '',
			city: '',
			mobile:'',
			salaireBrut: '',
      mail: '',
     // metier: '',
      nationalite: '',
      dateNaissaince: '',
      qualification: '',
      lieu: '',
      date: '',
      poste: '',
      social: '',
      isValid: null,

      image: false
    }

  }

  // Validation du champs / Field Validation
  validateCourriel = (mail) => {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(mail);
  };

  validatecodePostal = (codePostal) => {
    var re = /^[0-9]{5,5}$/;
    return re.test(codePostal);
  };

  validatemobile = (mobile) => {
    // var re = /^(\d\d\s){4}(\d\d)$/;
    var re = /^(0)[1-9]( *[0-9]{2}){4}$/;
    return re.test(mobile);
  };

  _convertEuro(val){
      if(val != ""){
          this.setState({salaireBrut : val});
          //this.setState({isEuro: true});
      }
  }

  /* Verify all the input */
  _verify() {
    if (this.state.civility == "") {
        return Alert.alert("Veuillez renseigner la civilité de l'employé");
    }
    if (this.state.name == "") {
        return Alert.alert("Veuillez renseigner le nom de l'employé");
    }
    if (this.state.lastname == "") {
        return Alert.alert("Veuillez renseigner le prénom de l'employé");
    }
    if (this.state.adress == "") {
        return Alert.alert("Veuillez renseigner l'adresse de l'employé");
    }
    if (this.state.city == "") {
      return Alert.alert("Veuillez renseigner la ville de l'employé");
    }
    if (this.state.codePostal == "") {
        return Alert.alert("Veuillez renseigner le code postal de l'employé");
    }
    if (!this.validatecodePostal(this.state.codePostal)) {
        return Alert.alert("Le code postal de l'employé est invalide. Exemple: 75000");
    }
    

    /* if (!this.validatePhone(this.state.phone)) {
            return Alert.alert("Numéro de téléphone invalide exemple : 0244556677");
    } */
    if (this.state.mobile == "") {
        return Alert.alert("Veuillez renseigner un numéro de téléphone");
    }
    if (!this.validatemobile(this.state.mobile)) {
            return Alert.alert("Le numéro de téléphone est invalide. Exemple : 0244556677");
        }
    if (this.state.mail == "") {
        return Alert.alert("Veuillez renseigner le mail de l'employé");
    }
    if (!this.validateCourriel(this.state.mail)){
      return Alert.alert("L'E-mail de l'employé est invalide. Exemple : contact@contact.com");
    }
    if (this.state.dateNaissaince == "") {
      return Alert.alert("Veuillez renseigner la date de naissance de l'employé");
    }
    /*if (this.state.metier == "") {
      return Alert.alert("Veuillez renseigner le métier de l'employé");
    }*/
    if (this.state.lieu == "") {
      return Alert.alert("Veuillez renseigner le lieu de naissance de l'employé");
    }
    if (this.state.nationalite == "") {
      return Alert.alert("Veuillez renseigner la nationalité de l'employé");
    }
    
    if (this.state.qualification == "") {
      return Alert.alert("Veuillez renseigner la qualification de l'employé");
    }
    if (this.state.date == "") {
      return Alert.alert("Veuillez renseigner la date d'entrée de l'employé");
    }
    if (this.state.salaireBrut == "") {
      return Alert.alert("Veuillez renseigner le salaire de l'employé");
    }
    if (this.state.social == "") {
      return Alert.alert("Veuillez renseigner le numéro de sécurité sociale de l'employé");
    }
  
    
    else {
      setPersonnel({
        // NE PAS TOUCHER A CA !!!!
        // ne pas modifier les variables
        // commenter User dans le back

        id: 300, // Voir un algo
        civilite: this.state.civility,
        nom: this.state.name,
        prenom: this.state.lastname,
        addresse: this.state.adress,
        ville: this.state.city,
        code_postale: this.state.codePostal,
        courriel: this.state.mail,
        numero_telephone: this.state.mobile,
        numero_securite_social: this.state.social,
        date_de_naissance: this.state.dateNaissaince,
        lieu_de_naissance: this.state.lieu,
        nationnalite: this.state.nationalite,
        statut: this.state.qualification,
        salaire: this.state.salaireBrut,
        poste: this.state.poste, 
        date_d_entree: this.state.date,
        restaurant: global.sessionRestaurant

      });
      Alert.alert("Le personnel " + this.state.name + " " + this.state.lastname + " a bien été ajouté.");
      this.props.navigation.navigate("registre")

    }
  }

  render() {
    const { isValid } = this.state;
    return (
      <ScrollView style={styles.mainContainer}>

          <View style={styles.content_container}>

            <View style={{flexDirection: "row"}}>
              <View style={[styles.input_container, {flex: 0.7}]}>
                <Text style={styles.input_name}>Civilité</Text>
                <DropDownPicker
                  placeholder="Mr"
                  items={this.state.civilities}

                  zIndex = {5000}
                  style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
                  containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
                  dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                  placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
                  labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                  arrowColor = {'black'}

                  onChangeItem={ (item) => this.setState({civility: item.value})}
                  />
              </View>
              <View style={[styles.input_container, {}]}>
                <Text style={styles.input_name}>Nom</Text>
                <TextInput
                  style={[styles.text_input, {}]}
                  placeholder="Dupont"
                  value={this.state.name}
                  onChangeText={(value) => this.setState({name : value}) }
                />
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>Prénom</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Eric"
                  value={this.state.lastname}
                  onChangeText={(value) => this.setState({lastname : value}) }
                />
              </View>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Adresse</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Indiquer l'adresse du lieu de résidence"
                value={this.state.adress}
                onChangeText={(value) => this.setState({adress : value})}
              />
              {/* < Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                    name='home'
                    color='grey'
                    size={28} 
              /> */}
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={[styles.input_container, {flex: 1}]} >
                <Text style={styles.input_name}>Code postal</Text>
                <TextInput
                  style={styles.text_input}
                  maxLength={5}
                  placeholder="Code postal"
                  keyboardType = 'numeric'
                  value={this.state.codePostal}
                  onChangeText={(value) => this.setState({codePostal : value})}
                />
              </View>

              <View style={[styles.input_container, {flex: 1.3}]}>
                <Text style={styles.input_name}>Ville</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Ville"
                  value={this.state.city}
                  onChangeText={(value) => this.setState({city : value})}
                />
              </View>
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={[styles.input_container, {flex: 1}]}>
                <Text style={styles.input_name}>Date de naissance</Text>
                <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
                  <DatePicker
                    onSubmitEditing={Keyboard.dismiss}
                    date={this.state.dateNaissaince} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    //style={[styles.text_input]}
                    customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                    showIcon={false}
                    onDateChange={(dateNaissaince) => { this.setState({ dateNaissaince: dateNaissaince }) }}
                    value={this.state.dateNaissaince}
                    placeholder="Date de naissance"
                    onValidation={isValid => this.setState({ isValid })}
                  />
                </View>
              </View>

              <View style={[styles.input_container, {flex: 1.3}]}>
                <Text style={styles.input_name}>Lieu de naissance</Text>
                <TextInput
                  style={styles.text_input}
                  onChangeText={(text) => this.setState({ lieu: text })}
                  placeholder="Paris"
                  value={this.state.lieu}
                />

                {/*< Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                        name='map-marker'
                        color='grey'
                        size={27} 
                /> */}
              </View>
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Nationalité</Text>
              <TextInput
                style={styles.text_input}
                placeholder="Française"
                value={this.state.nationalite}
                onChangeText={(value) => this.setState({ nationalite : value})}
              />          
            </View>
            
            <View style={styles.input_container}>
              <Text style={styles.input_name}>Numéro téléphone</Text>
              <TextInput
                style={styles.text_input}
                placeholder="00 00 00 00 00"
                keyboardType = 'numeric'
                value={this.state.mobile}
                onChangeText={(value) => this.setState({ mobile : value})}
              />
                {/*< Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                      name='phone'
                      color='grey'
                      size={27} 
              />*/}
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Mail</Text>
              <TextInput
                style={styles.text_input}
                placeholder="duponteric@markus.fr"
                value={this.state.mail}
                onChangeText={(value) => this.setState({ mail : value})}
              />
              {/*  < Icon style={{marginLeft:-44, marginTop:23, marginRight:30, paddingRight:-10 }}
                    name='envelope'
                    color='grey'
                    size={24} 
                /> */}
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>Poste occupé</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Cuisinier"
                  value={this.state.poste}
                  onChangeText={(value) => this.setState({ poste : value})}
                />          
              </View>

              <View style={[styles.input_container]}>
                <Text style={styles.input_name}>Statut</Text>
                <DropDownPicker
                  placeholder="Cadre" /**Qualification* */
                  
                  
                  items={[
                    {label:'Employé non qualifié', value:'Employé non qualifié'}, 
                    {label:'Employé qualifié', value:'Employé qualifié'},
                    {label:'Agent de maitrîse ', value:'Agent de maitrîse'},
                    {label:'Cadre ', value:'Cadre'},
                  ]}

                  zIndex = {5000}
                  style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
                  containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
                  dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                  placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
                  labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
                  arrowColor = {'black'}

                  onChangeItem={(text) => this.setState({ qualification: text.value })}
                  value={this.state.qualification}
                />
              </View>
            </View>

            <View style={{flexDirection: "row"}}>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>Salaire brut</Text>
                <TextInput
                  style = {styles.text_input}
                  keyboardType = 'numeric'
                  placeholder="1200"
                  onChangeText={(text) => this.setState({ salaireBrut: text })}
                  value={this.state.salaireBrut}
                />
              </View>
        
              <View style={[styles.input_container, {zIndex: -1}]}>
                <Text style={styles.input_name}>Date d'entrée</Text>
                <View style={[styles.text_input, {flex: 1, zIndex: -1}]}>
                  <DatePicker
                    onSubmitEditing={Keyboard.dismiss}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{dateText: {color: "black",}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0}}}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                    value={this.state.date}
                    placeholder="Date d'entrée"
                    onValidation={isValid => this.setState({ isValid })}
                  />
                </View>
              </View>
            </View>
    
            <View style={styles.input_container}>
              <Text style={styles.input_name}>Numéro de sécurité sociale</Text>
              <TextInput
                onSubmitEditing={Keyboard.dismiss}
                style={styles.text_input}
                onChangeText={(text) => this.setState({ social: text })}
                placeholder="Numéro de sécurité sociale"
                value={this.state.social}
                maxLength={13}
                keyboardType="numeric"
                onValidation={isValid => this.setState({ isValid })}
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_name}>Photo du salarié</Text>
              <TouchableOpacity
              onPress={openPicker} 
              style={styles.imageButton}>
                <Text style={styles.imageButtonText}>Importer une photo</Text>
              </TouchableOpacity>
              
              <View style={{marginTop: "1%" ,height: 100, width: 100, alignSelf: "center", borderColor: "#04295D", borderWidth: 0.5}}>
              {
                source === true ? 
                  null: 
                <Image source={{uri: uri}} style={{height: 100, width: 100}} />
              } 
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
    justifyContent: "center",
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
export default connect(mapStateToProps)(EditPersonnel);