import React, { Component } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import DatePicker from "react-native-datepicker";

import DropDownPicker from "react-native-dropdown-picker";
import { getRestaurantOwnerDetail } from "../../../API/AccountsData";
import { getPersonnel } from "../../../API/StaffData";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MenuLicenciement extends React.Component {
  constructor(props) {
    super(props);
    this.tabNom = [];
    this.listeNom = [];
    this.state = {
      modele: [
        { label: "Économique individuel", value: "Economique" },
        { label: "Personnel disciplinaire", value: "Personnel" },
        { label: "Inaptitude", value: "Inaptitude" },
      ],
      gravityFault: [
        { label: "Faute simple", value: "simple" },
        { label: "Faute grave", value: "grave" },
        { label: "Faute lourde", value: "lourde" },
      ],
      type: "",
      civility: "",
      name: "",
      firstName: "",
      adress: "",
      postalC: "",
      dateEntretien: "",
      dateFinContrat: "",
      dateStartNoticePrior: "",
      dateEndNoticePrior: "",
      dateInaptitude: "",
      motif: "",
      signature: "",
      typeOfFault: "",

      isNoPersonnel: true,
      personnel: [],

      denominationSociale: "",
      adresseSiegeSocial: "",
      codePostalSiegeSocial: "",
      villeSiegeSocial: "",
      userFirstName: "",
      userLastName: "",
      userPosition: "",

      lieuConvocation: "",
      /*  dateConvocation: '', */

      isSignatureLoaded: false,
      signatureDate: "",
    };
  }

  _infosCompany(tab) {
    this.setState({
      denominationSociale: tab.company.name,
      adresseSiegeSocial: tab.company.address,
      codePostalSiegeSocial: tab.company.postal_code,
      villeSiegeSocial: tab.company.city,
      userFirstName: tab.prénom,
      userLastName: tab.nom,
      userPosition: tab.company_position,
    });
  }

  // On récupère la liste de personnel et   / We retrieve the employee list and
  // on la mappe pour la mettre dans la dropdown / we map it to put it in the dropdown
  // If the list is not empty, then we set a variable to false
  _verifyPersonnel(data) {
    console.log(JSON.stringify(data));
    this.setState({
      personnel: data.map((item) => {
        return { label: `${item.prenom} ${item.nom}`, value: item.id, ...item };
      }),
    });
    if (!data.length == 0) {
      this.setState({ isNoPersonnel: false });
    }
  }

  componentDidMount() {
    getRestaurantOwnerDetail().then((data) => this._infosCompany(data[0]));
    getPersonnel().then((data) => this._verifyPersonnel(data));
  }

  _findPerson(id) {
    let indice = this.state.personnel.findIndex((item) => item.id === id);
    this.setState({
      civility: this.state.personnel[indice].civilite,
      name: this.state.personnel[indice].nom,
      firstName: this.state.personnel[indice].prenom,
      adress: this.state.personnel[indice].addresse,
      postalC: this.state.personnel[indice].code_postale,
    });
  }

  _dateChoiceLetter() {
    if (this.state.type == "Economique") {
      return (
        <View style={[styles.input_container, {marginVertical: "1%"}]}>
          <View style={styles.line} ></View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              showIcon="false"
              style={{width: "100%"}}
              date={this.state.dateEntretien}
              mode="date"
              placeholder="Date d'entretien"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateEntretien: date });
              }}
            />
          </View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              style={{width: "100%"}}
              date={this.state.dateStartNoticePrior}
              mode="date"
              placeholder="Date de début de préavis"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateStartNoticePrior: date });
              }}
            />
          </View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              style={{width: "100%"}}
              date={this.state.dateEndNoticePrior}
              mode="date"
              placeholder="Date de fin de préavis"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateEndNoticePrior: date });
              }}
            />
          </View>
          <View style={styles.line} ></View>
        </View>
      );
    } /*********************  Condition pour afficher les input qui correspond a chaque modele  ***************************/ else if (
      this.state.type == "Inaptitude"
    ) {
      return (
        <View style={[styles.input_container, {marginVertical: "1%"}]}>
          <View style={styles.line} ></View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              style={{width: "100%"}}
              date={this.state.dateEntretien}
              mode="date"
              placeholder="Date d'entretien"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateEntretien: date });
              }}
            />
          </View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              style={{width: "100%"}}
              date={this.state.dateInaptitude}
              mode="date"
              placeholder="Date de constat d'inaptitude"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateInaptitude: date });
              }}
            />
          </View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
            <DatePicker
              style={{width: "100%"}}
              date={this.state.dateFinContrat}
              mode="date"
              placeholder="Date de fin de contrat"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateFinContrat: date });
              }}
            />
          </View>
          <View style={styles.line} ></View>
        </View>
      );
    } else if (this.state.type == "Personnel") {
      return (
        <View style={[styles.input_container, {marginVertical: "1%"}]}>
          <View style={styles.line} ></View>
          <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>  
              <DatePicker
              style={{width: "100%"}}
              date={this.state.dateEntretien}
              mode="date"
              placeholder="Date d'entretien"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
              onDateChange={(date) => {
                this.setState({ dateEntretien: date });
              }}
            />
          </View>

          <View style={[styles.input_container, {marginVertical: "1%", marginHorizontal: "0%"}]}>

            <DropDownPicker
              placeholder="Gravité de la faute"
              items={this.state.gravityFault}

              zIndex = {5000}
              style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
              containerStyle= {{ marginRight : 5, height:50,width:"100%"}}
              dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              arrowColor = {'black'}

              onChangeItem={(item) => {
                this.setState({ typeOfFault: item.value });
              }}
            />
          </View>
          <View style={styles.line} ></View>
        </View>
      );
    }
  }

  _displayMotif() {
    if (this.state.type == "Economique" || this.state.type == "Personnel") {
      return (
        <View style={[styles.input_container, {marginVertical: "1%"}]}>
          <TextInput
            style={styles.text_input}
            placeholder="Motif du licenciement"
            value={this.state.motif}
            onChangeText={(value) => this.setState({ motif: value })}
          />
        </View>
      );
    }
  }

  _fillTabName() {
    this.state.personnel.forEach((item) => {
      this.listeNom = this.listeNom.concat({
        label: item.name,
        value: item.id,
      });
    });
  }

  /* Validation du champs */
  validateBp = (postalCode) => {
    var re = /^[0-9]{5,5}$/;
    return re.test(postalCode);
  };

  /* Verify all the input */
  _verify() {
    if (this.state.type == "") {
      return Alert.alert("Veuillez renseigner un modèle de lettre");
    }
    if (this.state.name == "") {
      return Alert.alert("Veuillez choisir un employé");
    }
    if (this.state.denominationSociale == "") {
      return Alert.alert("Veuillez renseigner la dénomination du siège social");
    }
    if (this.state.adresseSiegeSocial == "") {
      return Alert.alert("Veuillez renseigner l'adresse du siège social");
    }
    if (this.state.codePostalSiegeSocial == "") {
      return Alert.alert("Veuillez renseigner le code postal du siège social");
    }
    if (!this.validateBp(this.state.codePostalSiegeSocial)) {
      return Alert.alert(
        "Le code postal du siège social est invalide. Exemple: 75000"
      );
    }
    if (this.state.villeSiegeSocial == "") {
      return Alert.alert("Veuillez renseigner la ville du siège social");
    }
    if (this.state.lieuConvocation == "") {
      return Alert.alert("Veuillez renseigner le lieu de la convocation");
    }
    if (this.state.dateEntretien == "") {
      return Alert.alert("Veuillez renseigner la date d'entretien");
    }
    if (
      this.state.type == "Economique" &&
      this.state.dateStartNoticePrior == ""
    ) {
      return Alert.alert("Veuillez renseigner la date de fin de préavis");
    }
    if (
      this.state.type == "Economique" &&
      this.state.dateEndNoticePrior == ""
    ) {
      return Alert.alert("Veuillez renseigner la date de début de préavis");
    }
    if (this.state.type == "Economique" && this.state.motif == "") {
      return Alert.alert("Veuillez renseigner le motif du licenciement");
    }
    if (this.state.type == "Personnel" && this.state.typeOfFault == "") {
      return Alert.alert("Veuillez renseigner la nature de la faute");
    }
    if (this.state.type == "Personnel" && this.state.motif == "") {
      return Alert.alert("Veuillez renseigner le motif du licenciement");
    }
    if (this.state.type == "Inaptitude" && this.state.dateInaptitude == "") {
      return Alert.alert("Veuillez renseigner la date de constat d'inaptitude");
    }
    if (this.state.type == "Inaptitude" && this.state.dateFinContrat == "") {
      return Alert.alert("Veuillez renseigner la date de fin de contrat");
    } else {
      this._goTo();
    }
  }

  _goTo() {
    this.props.navigation.navigate("CreationLettres", {
      typeLettre: this.state.type,
      civility: this.state.civility,
      name: this.state.name,
      firstName: this.state.firstName,
      adress: this.state.adress,
      postalC: this.state.postalC,
      dateEntretien: this.state.dateEntretien,
      dateFinContrat: this.state.dateFinContrat,
      dateStartNoticePrior: this.state.dateStartNoticePrior,
      dateEndNoticePrior: this.state.dateEndNoticePrior,
      dateInaptitude: this.state.dateInaptitude,
      denominationSociale: this.state.denominationSociale,
      adresseSiegeSocial: this.state.adresseSiegeSocial,
      codePostalSiegeSocial: this.state.codePostalSiegeSocial,
      villeSiegeSocial: this.state.villeSiegeSocial,
      lieuConvocation: this.state.lieuConvocation,
      motif: this.state.motif,
      typeOfFault: this.state.typeOfFault,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      userPosition: this.state.userPosition,
      signature: this.state.signatureDate, // à voir
    });
  }

  resetSign() {
    this.refs["sign"].resetImage();
    this.setState({ isSignatureLoaded: false, signature: "" });
  }

  _validateSignature = async () => {
    await this.refs["sign"].saveImage();
    this.setState({ isSignatureLoaded: true });
  };

  render() {
    this._fillTabName();
    console.log();
    return (
      // MENU LICENCIEMENT / TERMINATION MENU
        <ScrollView style={styles.mainContainer}>
          <View style={styles.content_container}>

          <View style={[styles.input_container, {marginVertical: "1%"}]}>
            <DropDownPicker
              placeholder="Modèle"
              items={this.state.modele}

              zIndex = {5000}
              style = {{backgroundColor: '#04295D', borderColor: "white", borderRadius: 20, alignSelf: "center"}}
              containerStyle= {{height:50, width:"75%", alignSelf: "center"}}
              dropDownStyle = {{borderColor: 'white', backgroundColor: '#04295D', width: "100%", color: 'white', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'white', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'white', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}

              arrowColor={"white"}
              onChangeItem={(item) => this.setState({ type: item.value })}
            />
          </View>

          <View style={[styles.input_container, {marginVertical: "1%"}]}>
            <DropDownPicker
              placeholder="Nom du salarié"
              items={
                this.state.isNoPersonnel
                  ? [
                      {
                        label:
                          "Pas de personnel enregistré, cliquez pour en ajouter un",
                        value: 1,
                      },
                    ]
                  : this.state.personnel
              }

              zIndex = {5000}
              style = {{backgroundColor: 'white', borderColor: "#04295D", borderRadius: 20}}
              containerStyle= {{ height:50,width:"100%", marginVertical: "1%"}}
              dropDownStyle = {{borderColor: '#04295D', backgroundColor: 'white', width: "100%", color: '#201E1F', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              placeholderStyle={{color: 'grey', fontSize: 14, fontStyle: "italic"}}
              labelStyle = {{color:'black', fontSize: 16, fontStyle: "italic", fontWeight: "100"}}
              arrowColor = {'black'}

              onChangeItem={(item) => {
                this.state.isNoPersonnel
                  ? this.props.navigation.navigate("EditPersonnel")
                  : this._findPerson(item.value);
              }}
            />

            {/* Dénomination sociale */}
            <TextInput
              style={[styles.text_input]}
              placeholder={"Dénomination sociale"}
              //style={[Theme.styles.textinput, {marginBottom: 5, width:"92%"}]}
              value={this.state.denominationSociale}
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ denominationSociale: value });
              }}
            />
            {/* adresse du siège social */}
            <TextInput
              style={styles.text_input}
              placeholder={"Adresse du siège social"}
              //style={[Theme.styles.textinput, {marginBottom: 5, width:"92%"}]}
              value={this.state.adresseSiegeSocial}
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ adresseSiegeSocial: value });
              }}
            />
            {/* Code postal du siège social */}
            <TextInput
              style={styles.text_input}
              placeholder={"Code postal du siège social"}
              //style={[Theme.styles.textinput, {marginBottom: 5, width:"92%"}]}
              value={this.state.codePostalSiegeSocial}
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ codePostalSiegeSocial: value });
              }}
            />
            {/* Ville du siège social */}
            <TextInput
              style={styles.text_input}
              placeholder={"Ville du siège social"}
              //style={[Theme.styles.textinput, {marginBottom: 5, width:"92%"}]}
              value={this.state.villeSiegeSocial}
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ villeSiegeSocial: value });
              }}
            />
            {/* Lieu de la convocation */}
            <TextInput
              style={styles.text_input}
              placeholder={"Lieu de la convocation"}
              //style={[Theme.styles.textinput, {marginBottom: 5, width:"92%"}]}
              value={this.state.lieuConvocation}
              autoCorrect={false}
              onChangeText={(value) => {
                this.setState({ lieuConvocation: value });
              }}
            />
          </View>
          {this._dateChoiceLetter()}

          {this._displayMotif()}

          <View style={[styles.input_container, {flex: 1}]}>
            <Text style={styles.input_name}>Signature</Text>
            <View style={[styles.text_input, {flex: 1, alignItems: "center"}]}>
              <DatePicker
                style={{width: "100%"}}
                date={this.state.signatureDate}
                mode="date"
                placeholder={"Date de signature"}
                format="DD/MM/YYYY"
                customStyles={{dateText: {color: "black"}, placeholderText: {color: "black"}, dateIcon:{display: "none"}, datePicker:{borderWidth: 0, backgroundColor: '#04295D'}, dateInput:{borderWidth: 0,}}}
                onDateChange={(date) => {
                  this.setState({
                    signatureDate: date,
                    isSignatureLoaded: true,
                  });
                }} // modifié
              />
            </View>
          </View>

            

            {this.state.isSignatureLoaded ? (
              <TouchableOpacity
                onPress={() => {
                  this._verify();
                }}
                style={[styles.button, {opacity:1}]}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            ) : null}
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
    paddingHorizontal: "3%",
    justifyContent: "center"
  },
  input_name:{
    fontWeight: "700",
    fontSize: 20,
    color:"#04295D",
    marginVertical: 4,
    textAlign: "center"
  },
  input_container:{
    flex: 1,
    marginHorizontal: "1%",
  },
  text_input :{
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#04295D",
    color: "black",
    paddingHorizontal: 15,
    marginVertical: "1%",
    fontSize:14,
    fontStyle: "italic",
    fontWeight: "200",
    height: 50,
    justifyContent: "center"
  },
  /*GENERAL */
  
  line:{
    borderColor: "#04295D",
    borderWidth: 0.25,
    width: "95%",
    alignSelf: "center",
    marginVertical: "1%"
},

  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: "white",
    textAlign: "center",
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "center",
    padding: "3%"
  },

  button: {
    // le style de fond du bouton + la forme
    width: "100%", 
    marginVertical: '3%', 
    borderColor: "#3BB9E0", 
    borderWidth: .5,
    borderRadius: 6,
    backgroundColor: '#3BB9E0',
    alignSelf: "center"
  },

  

  
});