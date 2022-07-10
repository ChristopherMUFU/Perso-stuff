import React, { Component } from 'react';
import * as Theme from "../Styles/Theme"
import { Alert, PermissionsAndroid, Platform, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { createFicheTechnique } from './lettres_model/FicheTechnique';
import PDFView from 'react-native-view-pdf';
import LinearGradient from 'react-native-linear-gradient';


export default class FicheTechniquePdf extends Component {

  constructor(props) {
    super(props);
    const param = this.props.route.params 
    this.lettreInfos={
      filePath: '',
      lettre : createFicheTechnique(param.denomination, param.processus_preparation, param.rechauffage, param.temp_preparation, param.categorieMenu, param.restaurant, param.ingredients)
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
    let options = {         
        html: this.lettreInfos.lettre,
   
        fileName: 'fiche_technique',

        //File directory in which the PDF File Will Store.
        directory:'Markus/Fiches_Technique',
        base64: true
    };
    
    let file = await RNHTMLtoPDF.convert(options);
    
    this.lettreInfos.filePath = file.filePath;
    this.setState({isPDFLoaded: true})
    
  }

  _share() {
    const shareOptions = {
      title: 'Fiche technique',
      message: 'Fiche technique',
      url: 'file://'+ this.lettreInfos.filePath,
      filename: 'fiche_technique' , // only for base64 file in Android
    };
    Share.open(shareOptions);
  }

  _PDFview(){
    const resources = {
      file: this.lettreInfos.filePath ,
      base64: 'JVBERi0xLjMKJcfs...',
    }
    return(
      <View style={[Theme.styles.container, {flex: 2 , marginTop:"25%"}]}>
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

          <TouchableOpacity onPress = {() => {this._goTo('stock_menu')}} style={Theme.buttonsV2.touchAble} >
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