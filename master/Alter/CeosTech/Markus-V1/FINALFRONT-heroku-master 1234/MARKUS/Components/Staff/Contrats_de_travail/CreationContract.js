import React, { Component } from 'react';
import { Alert, PermissionsAndroid, Platform, Text, TouchableOpacity, View, StyleSheet,ScrollView } from 'react-native';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {setPersonnel} from '../../../API/StaffData';
import { createCDI } from '../contract_model/CDI';
import { createCDD } from '../contract_model/CDD';
import PDFView from 'react-native-view-pdf';
import { connect } from 'react-redux';

/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
  restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})



class CreationContract extends Component {

  
  constructor(props) {
    
    super(props);
    const param = this.props.route.params
    this.lettreInfos = {
      filePath : '',
      type: param.typeContract,
      codeHTML: param.typeContract == "CDI" ? 
        createCDI(
          param.civility, 
          param.firstName,
          param.name, 
          param.birthDate, 
          param.nationallity, 
          param.placeBirth, 
          param.socialNumber, 
          param.adress, 
          param.postalCode, 
          param.qualification, 
          param.statut, 
          param.startDate, 
          param.hourlyRate, 
          param.task, 
          param.task_temp,
          param.coefEch, 
          param.weeklyWork, 
          param.signatureDate,
          param.periode_essai,
          param.rung,
          param.level,
          param.denominationSociale,
          param.adresseSiegeSocial,
          param.codePostalSiegeSocial,
          param.villeSiegeSocial,
          param.nomCaisseRetraite,
          param.adresseCaisseRetraite,
          param.codePostalRetraite,
          param.villeRetraite,
          param.prenomPatron,
          param.nomPatron,
          param.villeEntreprise,
          param.adresseEntreprise,
          param.codePostalEntreprise,
          ) 
          : createCDD(
          param.civility,
          param.firstName, 
          param.name, 
          param.birthDate, 
          param.socialNumber, 
          param.adress, 
          param.postalCode,
          param.qualification, 
          param.statut, 
          param.startDate, 
          param.hourlyRate, 
          param.weeklyWork, 
          param.signatureDate,
          param.contratReason,
          param.task,
          param.task_temp,
          param.convention,
          param.duration,
          param.periode_essai,
          param.rung,
          param.level,
          param.denominationSociale,
          param.adresseSiegeSocial,
          param.codePostalSiegeSocial,
          param.villeSiegeSocial,
          param.nomCaisseRetraite,
          param.adresseCaisseRetraite,
          param.codePostalRetraite,
          param.villeRetraite,
          param.prenomPatron,
          param.nomPatron,
          param.villeEntreprise,
          param.adresseEntreprise,
          param.codePostalEntreprise,
          )
      }
    this.state = {
      isPDFLoaded: false,
    }  
  }

  _goTo(destination){
    this.props.navigation.navigate(destination)
  }


  componentDidMount(){
    this.requestRunTimePermission()
  }

  _changeDateFormat(date){    
      var newdate = date.split("/").reverse().join("-");
      return newdate
  }
 
  //Will create a new staff member
  _setNewStaffMember(){
    const param = this.props.route.params
    setPersonnel({
      // NE PAS TOUCHER A CA !!!!
      // ne pas modifier les variables
      // commenter User dans le back

      id: 300, // Voir un algo
      civilite: param.civility,
      nom: param.name,
      prenom: param.firstName,
      addresse: param.adress,
      ville: param.city,
      code_postale: param.code_postal,
      courriel: param.employeeMail,
      numero_telephone: param.employeePhone,
      numero_securite_social: param.socialNumber,
      date_de_naissance: this._changeDateFormat(param.birthDate),
      lieu_de_naissance: param.placeBirth,
      nationnalite: param.nationality,
      statut:param.qualification ,
      salaire: param.hourlyRate,
      poste: param.statut, // voir métier
      date_d_entree: this._changeDateFormat(param.startDate),
      // user: null, // !!!! commenter le champs user dans le back !!!!! (pour test)
      restaurant: this.props.restaurantOwnerDetails[0]["restaurant"]["id"]
    });
    Alert.alert(`Le personnel ${param.firstName} ${param.name} a bien été ajouté.`);    
  }

  //Permission field
  requestRunTimePermission=()=> {
    var that = this;
    async function externalStoragePermission() {
    try {
      //Ask for the permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission d'accès stockage",
          message:"Application a besoin d'accèder à votre stockage",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         that.createPDF_File();
       } else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      Alert.alert('Write permission err', err);
      console.warn(err);
    }
   }

    if (Platform.OS === 'android') {
      externalStoragePermission();
    } else {
      this.createPDF_File();
    }
  }
 
  async createPDF_File() {
    let options = {
      html: this.lettreInfos.codeHTML,

      fileName: 'contrat_de_travail',

      //File directory in which the PDF File Will Store.
      directory:'Markus/Contrat de travail',
      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options);
    this.lettreInfos.filePath = file.filePath;
    this.setState({isPDFLoaded: true})   
  }

  _share() {
    const shareOptions = {
      title: 'Contrat de travail',
      message: 'Contrat de travail',
      url: 'file://'+this.lettreInfos.filePath,
      filename: 'contrat_de_travail' , // only for base64 file in Android
    };
    Share.open(shareOptions);
    return true
  }

  _PDFview(){
    console.log('pdf :: ' + this.lettreInfos.lettre)
    const resources = {
      file: this.lettreInfos.filePath ,
      base64: 'JVBERi0xLjMKJcfs...',
    }
    return(
      <View style={[styles.container,{flex: 2 , marginTop:"15%"}]}>
        <PDFView
              fadeInDuration={250.0}
              style={{width:300, height: 450 }}
              resource={resources['file']}
              resourceType={'file'}
              onLoad={() => console.log(`PDF rendered from ${this.lettreInfos.filePath}`)}
              onError={(error) => console.log('Cannot render PDF', error)}
              
        />
      </View>
    )
  }
  
  render() {
    return (      
      <View style={styles.container}>
         <ScrollView>
        {this.state.isPDFLoaded && (this._PDFview())}
        <View style={styles.container}>
          
          <TouchableOpacity onPress = {() => {this._share(this.lettreInfos.filePath, 'application/pdf') }} style={styles.buttonValider}>
                <Text style={styles.buttonText}>
                    Enregistrer/Partager le contrat
                </Text>
          </TouchableOpacity>
          

          <TouchableOpacity onPress = {() => {this._setNewStaffMember() }} style={styles.buttonValider} >
              <Text style={styles.buttonText}>
                  Enregistrer le nouveau personnel dans le registre
              </Text>
        </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this._goTo('contrats_menu')}} style={styles.buttonValider} >
              <Text style={styles.buttonText}>
                    Retour au menu
                </Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </View>
    );
  }
}


/* Connecting the store to this component */
export default connect(mapStateToProps)(CreationContract);

const styles = StyleSheet.create({

buttonValider:{
  width: "90%",
  marginVertical: "3%",
  borderColor: "#3BB9E0",
  borderWidth: 1,
  borderRadius: 5,
  backgroundColor: "#3BB9E0",
},
buttonText:{
  fontSize: 18,
  textAlign: "center",
  margin: 10,
  marginBottom: 10,
  color: "#04295D",
  fontWeight:'bold',
  backgroundColor: "transparent",
},
container: {
  backgroundColor: "white",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "1%",
  width: "100%",
},
})
