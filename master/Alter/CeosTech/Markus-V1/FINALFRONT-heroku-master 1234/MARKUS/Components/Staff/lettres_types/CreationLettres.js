import React, { Component } from 'react';
import * as Theme from "../../Styles/Theme"
import { Alert, PermissionsAndroid, Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { createInaptitude } from './lettres_model/Inaptitude';
import { createEconomique } from './lettres_model/Economique';
import { createPersonnel } from './lettres_model/Personnel';
import { createConvocationEntretien } from './convocation_entretien/ConvocationEntretien';
import { createConvocationSanction } from './convocation_entretien/ConvocationSanction';
import PDFView from 'react-native-view-pdf';
import LinearGradient from 'react-native-linear-gradient';


export default class CreationLettres extends Component {

  constructor(props) {
    super(props);
    const param = this.props.route.params 
    this.lettreInfos={
      filePath : '',
      lettre : '',
      type: param.typeLettre,
      codeHTMLInaptitude: param.typeLettre == "Inaptitude" ? createInaptitude(param.name, param.firstName, param.adress, param.postalC, param.dateEntretien, param.dateFinContrat, param.dateInaptitude, param.denominationSociale, param.adresseSiegeSocial, param.codePostalSiegeSocial, param.villeSiegeSocial, param.userFirstName, param.userLastName, param.userPosition, param.signature) : null,
      codeHTMLEconomique: param.typeLettre == "Economique" ? createEconomique(param.name, param.firstName, param.adress, param.postalC, param.dateEntretien, param.motif, param.dateStartNoticePrior, param.dateEndNoticePrior, param.denominationSociale, param.adresseSiegeSocial, param.codePostalSiegeSocial, param.villeSiegeSocial, param.userFirstName, param.userLastName, param.userPosition, param.signature) : null,
      codeHTMLPersonnel: param.typeLettre == "Personnel" ? createPersonnel(param.name, param.firstName, param.adress, param.postalC, param.dateEntretien, param.motif, param.typeOfFault, param.denominationSociale, param.adresseSiegeSocial, param.codePostalSiegeSocial, param.villeSiegeSocial, param.userFirstName, param.userLastName, param.userPosition, param.signature) : null,
      codeHTMLConvocationEntretien: param.typeLettre == "Entretien licenciement" ? createConvocationEntretien(param.name, param.firstName, param.adress, param.postalC, param.dateEntretien, param.timeEntretien, param.adresseEntretien, param.adresseInspectionTravail, param.adresseMairie, param.denominationSociale, param.adresseSiegeSocial, param.codePostalSiegeSocial, param.villeSiegeSocial, param.lieuConvocation, param.dateConvocation, param.userFirstName, param.userLastName, param.userPosition, param.signature) : null,
      codeHTMLConvocationSanction: param.typeLettre == "Sanction disciplinaire" ? createConvocationSanction(param.name, param.firstName, param.adress, param.postalC, param.dateFaute, param.motif, param.dateEntretien, param.denominationSociale, param.adresseSiegeSocial, param.codePostalSiegeSocial, param.villeSiegeSocial, param.lieuConvocation, param.dateConvocation, param.userFirstName, param.userLastName, param.userPosition, param.signature) : null,
    } 
    this.state = {
      isPDFLoaded: false,
    }  
  }
 
  _goTo(destination){
    this.props.navigation.navigate(destination)
  }


  componentDidMount() {
    this.requestRunTimePermission()
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
    
    if (this.lettreInfos.type == 'Inaptitude') {
        this.lettreInfos.lettre = this.lettreInfos.codeHTMLInaptitude
    }
    else if (this.lettreInfos.type == 'Economique') {
        this.lettreInfos.lettre = this.lettreInfos.codeHTMLEconomique
    }
    else if (this.lettreInfos.type == 'Personnel') {
        this.lettreInfos.lettre = this.lettreInfos.codeHTMLPersonnel
    }
    else if (this.lettreInfos.type == 'Entretien licenciement') {
      this.lettreInfos.lettre= this.lettreInfos.codeHTMLConvocationEntretien
    }
    else if (this.lettreInfos.type == 'Sanction disciplinaire') {
        this.lettreInfos.lettre= this.lettreInfos.codeHTMLConvocationSanction
    }
    
    let options = {         
        html: this.lettreInfos.lettre,
   
      fileName: 'lettre_' + this.lettreInfos.type,

      //File directory in which the PDF File Will Store.
      directory:'Markus/Lettres_Type',
      base64: true
    };
    
    let file = await RNHTMLtoPDF.convert(options);
    
    this.lettreInfos.filePath = file.filePath;
    this.setState({isPDFLoaded: true})
    
  }

  _share() {
    const shareOptions = {
      title: 'Lettres type',
      message: 'Lettre type',
      url: 'file://'+ this.lettreInfos.filePath,
      filename: 'lettres_type' , // only for base64 file in Android
    };
    Share.open(shareOptions);
  }

  _PDFview(){
    const resources = {
      file: this.lettreInfos.filePath ,
      base64: 'JVBERi0xLjMKJcfs...',
    }
    return(
      <View style={[Theme.styles.container,{flex: 2 , marginTop:"25%"}]}>
        <PDFView
              fadeInDuration={250.0}
              style={{width:300, height: 450 }}
              resource={resources['file']}
              resourceType={'file'}
              onLoad={() => {console.log(`PDF rendered from ${this.lettreInfos.filePath}`)
            
              console.log('le pdf :: ' + this.lettreInfos.lettre)}}
              onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    )
  }
  
  render() {
    
    return (
      
      <View style={Theme.styles.container}>
        {this.state.isPDFLoaded && (this._PDFview())}
        <View style={Theme.styles.container}>

          <TouchableOpacity onPress = {() => {this._share(this.lettreInfos.filePath, 'application/pdf') }} style={Theme.buttonsV2.touchAble} >
            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
                <Text style={Theme.buttonsV2.buttonText}>
                    Enregistrer/Partager
                </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this._goTo('lettres_types')}} style={Theme.buttonsV2.touchAble} >
          <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
              <Text style={Theme.buttonsV2.buttonText}>
                    Retour au menu
                </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  button: {
    width: '100%',
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: '#00E676',
    borderRadius:9,
  },

  text: {
    color: '#000',
    textAlign:'center',
    fontSize: 21
  }

});