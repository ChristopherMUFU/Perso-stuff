import React from 'react';
import {Alert,Text,View,TextInput,TouchableOpacity,ScrollView,Platform,Dimensions,
    StyleSheet,Keyboard} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Theme from "../../Styles/Theme";
import {setPersonnel} from '../../../API/StaffData';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {updatePersonnel} from '../../../API/StaffData';
import {registration_style} from './Style';
import {inscriptionStyle} from './Style';
import './PersonnelItem';
import "./Personnelscreen";
import "../../Connexion/Connexion"; // import des variables globales

    const phoneHeight = Dimensions.get("window").height;
    const phoneWidth = Dimensions.get("window").width;

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
  restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})


class UpdatePersonnel extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
        civilities: [
          {label : 'Mme' , value: 'Mme'},
          {label : 'M' , value: 'M'}
      ],
      personnels: global.personnelItem,
      civility: [],
      name: '' , //
      lastname: '', //
			adress: '', //
			codePostal: '', //
			city: '', //
			mobile:'', //
			salaireBrut: '',
      mail: '',
     // metier: '',
      nationalite: '', //
      dateNaissaince: '', 
      qualification: '',
      poste: '',
      lieu: '',
      date: '',
      social: '',
      isValid: null,

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
  
  _insertData(){
  console.log(this.state.personnels)
    this.setState({
        civility: this.state.personnels.civilite,
          name: this.state.personnels.nom,
          lastname: this.state.personnels.prenom,
          adress: this.state.personnels.addresse,
          city: this.state.personnels.ville,
          codePostal: this.state.personnels.code_postale,
          mail: this.state.personnels.courriel,
          mobile: this.state.personnels.numero_telephone,
          social: this.state.personnels.numero_securite_social,
          dateNaissaince: this.state.personnels.date_de_naissance,
          lieu: this.state.personnels.lieu_de_naissance,
          nationalite: this.state.personnels.nationnalite,
          qualification: this.state.personnels.statut,
          salaireBrut: this.state.personnels.salaire,
          poste: this.state.personnels.poste, // voir métier
          date: this.state.personnels.date_d_entree,
    });
    //global.personnelItem = null;
    console.log(global.personnelItem)
    console.log(this.state.personnels)
  }
  
    componentDidMount()
    {
        this._insertData()
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
        updatePersonnel({
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

        }, this.state.personnels.id);
        Alert.alert("Le personnel " + this.state.name + " " + this.state.lastname + " a bien été modifié.");
        global.personnelItem = null;
        this.props.navigation.navigate("registre")

      }
    }



    render() {
        console.log("TEST")
        console.log(this.state.personnels)
        
        //console.log(recupData)
        //this._returnData()
      const { isValid } = this.state;
        return (
          <ScrollView style={{ flex: 1, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#3C3C3C",
                flex: 1,
                width: "100%",

              }}
            >

              <View style={styles.content_container}>
                <View>
                <Text style={inscriptionStyle.field_names}>Civilité</Text>
                <DropDownPicker
                            placeholder={this.state.civility}
                            items={this.state.civilities}
                            style = {{backgroundColor: 'white'}}
                            containerStyle= {{ marginRight : 5, height:50,width:"99.7%", borderRadius: 6, marginBottom: '5%',}}
                            dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%",}}
                            placeholderStyle={{color: 'black', fontSize: 16}}
                            labelStyle = {{color:'black', fontSize: 16}}
                            arrowColor = {'black'}
                            onChangeItem={ (item) => this.setState({civility: item.value})}
                            />
                            
                <Text style={inscriptionStyle.field_names}>Nom</Text>
                  <TextInput
                    style={{
                      //marginTop: '5%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: '3%',
                      fontSize:16
                    }}
                    placeholder="Nom"
                    value={this.state.name}
                    onChangeText={(value) => this.setState({name : value}) }
                  />
                </View>
                <View>
                <Text style={inscriptionStyle.field_names}>Prénom</Text>
                  <TextInput
                    style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: '3%',
                      fontSize:16
                    }}
                    placeholder="Prénom"
                    value={this.state.lastname}
                    onChangeText={(value) => this.setState({lastname : value}) }
                  />
                </View>

                <Text style={inscriptionStyle.field_names}>Adresse</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: '3%',
                      fontSize:16
                    }}
                    placeholder="Adresse"
                    value={this.state.adress}
                    onChangeText={(value) => this.setState({adress : value})}
                  />
                  {/*< Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                       name='home'
                       color='grey'
                       size={28} 
                /> */}
                </View>
                <Text style={inscriptionStyle.field_names}>Ville</Text>
                  <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: '3%',
                      fontSize:16
                    }}
                    placeholder="Ville"
                    value={this.state.city}
                    onChangeText={(value) => this.setState({city : value})}
                  /></View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: '3%'}}>
                    <View style={{flex: 1}}>
                        <Text style={inscriptionStyle.field_names}>Code postal</Text>
                        <TextInput
                                style={{
                                  //marginTop: '3%',
                                  width: "85%",
                                  height: 55,
                                  borderWidth: 1.0,
                                  borderRadius: 6,
                                  backgroundColor: "white",
                                  justifyContent: "center",
                                  color: "black",
                                  paddingLeft: "10%",
                                  //marginBottom: 2,
                                  fontSize:16,
                                  marginRight: '3%'
                                }}
                                placeholder="Code Postal"
                                keyboardType = 'numeric'
                                value={this.state.codePostal}
                                onChangeText={(value) => this.setState({codePostal : value})}
                          />
                    </View>
                    
                    <View style={{flex: 2}}>
                        <Text style={inscriptionStyle.field_names}>Numéro téléphone</Text>
                          <TextInput
                            style={{
                              //marginTop: '3%',
                              width: "100%",
                              height: 55,
                              borderWidth: 1.0,
                              borderRadius: 6,
                              backgroundColor: "white",
                              justifyContent: "center",
                              color: "black",
                              paddingLeft: "5%",
                              //marginLeft: "-25%",
                              //marginBottom: "5%",
                              fontSize:16
                            }}
                            placeholder="Numéro téléphone"
                            keyboardType = 'numeric'
                            value={this.state.mobile}
                            onChangeText={(value) => this.setState({ mobile : value})}
                          />
                          {/*< Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                               name='phone'
                               color='grey'
                               size={27} 
                        /> */}
                    </View>
                </View>
                
                <Text style={inscriptionStyle.field_names}>Email</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: "3%",
                      fontSize:16
                    }}
                    placeholder="Email"
                    value={this.state.mail}
                    onChangeText={(value) => this.setState({ mail : value})}
                  />
                {/*  < Icon style={{marginLeft:-44, marginTop:23, marginRight:30, paddingRight:-10 }}
                       name='envelope'
                       color='grey'
                       size={24} 
                  /> */}
                </View>

                <View>
                
                <Text style={inscriptionStyle.field_names}>Date de naissance</Text>
                <DatePicker
              onSubmitEditing={Keyboard.dismiss}
              date={this.state.dateNaissaince} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="YYYY-MM-DD"
              minDate="1950-01-01"
              maxDate="2050-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "2%",
                      marginBottom: "3%",
                      fontSize:16
                    }}
                    
              onDateChange={(dateNaissaince) => { this.setState({ dateNaissaince: dateNaissaince }) }}
              value={this.state.dateNaissaince}
              placeholder="Date de naissance "
              onValidation={isValid => this.setState({ isValid })}
            />
                </View>
              
              <Text style={inscriptionStyle.field_names}>Lieu de naissance</Text>
                <View style={{ flexDirection: "row" }}>
                <TextInput
                 style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: "3%",
                      fontSize:16
                    }}

                    onChangeText={(text) => this.setState({ lieu: text })}
                    placeholder="Lieu de naissance"
                    value={this.state.lieu}
                  />

                  {/*< Icon style={{marginLeft:-48, marginTop:'4.5%', marginRight:28, paddingLeft:-20}}
                          name='map-marker'
                          color='grey'
                          size={27} 
                  /> */}
            </View>
          
            <Text style={inscriptionStyle.field_names}>Nationalité</Text>
            <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                //marginTop: '3%',
                width: "100%",
                height: 55,
                borderWidth: 1.0,
                borderRadius: 6,
                backgroundColor: "white",
                justifyContent: "center",
                color: "black",
                paddingLeft: "5%",
                marginBottom: "3%",
                fontSize:16
              }}
              placeholder="Nationalité"
              value={this.state.nationalite}
              onChangeText={(value) => this.setState({ nationalite : value})}
            />          
          </View>
           
           <Text style={inscriptionStyle.field_names}>Poste occupé</Text>
           <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                //marginTop: '3%',
                width: "100%",
                height: 55,
                borderWidth: 1.0,
                borderRadius: 6,
                backgroundColor: "white",
                justifyContent: "center",
                color: "black",
                paddingLeft: "5%",
                marginBottom: "3%",
                fontSize:16
              }}
              placeholder="Poste occupé"
              value={this.state.poste}
              onChangeText={(value) => this.setState({ poste : value})}
            />          
          </View>

        <Text style={inscriptionStyle.field_names}>Statut</Text>
          <DropDownPicker
            placeholder="Statut" /**Qualification* */
                  
            items={[
              
              {label:'Employé non qualifié', value:'Employé non qualifié'}, 
              {label:'Employé qualifié', value:'Employé  qualifié'},
              {label:'Agent de maitrîse ', value:'Agent de maitrîse'},
              {label:'Cadre ', value:'Cadre'},
            ]}
            style = {{backgroundColor: 'white', borderRadius:10}}
            containerStyle= {{height: 55, width:'100%',marginBottom: '3%'}}
            dropDownStyle = {{borderColor: 'black', backgroundColor: 'white', width: "100%"}}
            labelStyle = {{color:'black', fontSize: 16,paddingLeft: "4%",}}
            arrowColor = {'black'}
          
            onChangeItem={(text) => this.setState({ qualification: text.value })}
            value={this.state.qualification}
          />
            
            <Text style={inscriptionStyle.field_names}>Salaire brut</Text>
          <View style={{         
              flexDirection: 'row',
              width: '100%',
              height: 55,
              borderWidth : 1.0,
              borderRadius: 8,
              backgroundColor: 'white',
              justifyContent: 'space-between',
              color: 'black',
              marginBottom: "3%",
              //marginTop:'3%',
          }}>
            <TextInput
              style = {{marginLeft:"2%", fontSize: 16}}
              keyboardType = 'numeric'
              placeholder="Salaire brut"
              onChangeText={(text) => this.setState({ salaireBrut: text })}
              value={this.state.salaireBrut}
            />
            <Text style={{marginTop: '5%', size:40, justifyContent: 'flex-end', paddingRight: "5%"}}>€</Text>
            
        
          </View>
         
           <View>
           <Text style={inscriptionStyle.field_names}>Date d'entrée</Text>
            <DatePicker
              onSubmitEditing={Keyboard.dismiss}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="YYYY-MM-DD"
              minDate="1950-01-01"
              maxDate="2050-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: "3%",
                      fontSize:16
                    }}
              onDateChange={(date) => { this.setState({ date: date }) }}
              value={this.state.date}
              placeholder="Date d'entrée "
              onValidation={isValid => this.setState({ isValid })}
            />
            
            <Text style={inscriptionStyle.field_names}>Numéro de sécurité sociale</Text>
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              style={{
                      //marginTop: '3%',
                      width: "100%",
                      height: 55,
                      borderWidth: 1.0,
                      borderRadius: 6,
                      backgroundColor: "white",
                      justifyContent: "center",
                      color: "black",
                      paddingLeft: "5%",
                      marginBottom: "3%",
                      fontSize:16
                    }}
              onChangeText={(text) => this.setState({ social: text })}
              placeholder=" Numéro de Sécurité Sociale"
              value={this.state.social}
              maxLength={13}
              keyboardType="numeric"
              onValidation={isValid => this.setState({ isValid })}
            />
          </View>






                <View style={{ alignItems: "center", marginTop: 5, }}>
                  <TouchableOpacity
                    onPress={() => { this._verify() }}
                    style={Theme.buttonsV2.touchAble}
                  >
                    <LinearGradient
                      elevation={5}
                      colors={["#696969", "#595959", "#494949"]}
                      style={Theme.buttonsV2.linearGradientb}
                    >
                      <Text style={Theme.buttonsV2.buttonText}>Valider</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </ScrollView>
        );
      }
    }

    const styles = StyleSheet.create({
      // GENERAL
      text_input: {},

      // HEADER
      header_container: {
          // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
          ...(Platform.OS !== "android" && {
             zIndex: 10,
          }),
          // alignItems: 'center' ,
          flex: 2,
          width: phoneWidth,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          alignItems: "center",
      },
      header_title: {
          color: "#e0e0e0",
          fontSize: 16,
          fontStyle: "italic",
          textAlign: "center",
      },
      title_container : {
          marginTop: '8%',
          width: phoneWidth * 0.5
       },

      // CORPS
      content_container: {
        flex: 1,
        width: phoneWidth,
        padding: "5%",
        // justifyContent: 'flex-end',
        // borderWidth: 1,
        // borderColor: 'white',
      },
    });

/* Connecting the store to this component */
export default UpdatePersonnel;
