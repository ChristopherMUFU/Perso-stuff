import React, { Component } from 'react';
import * as Theme from '../../Styles/Theme';
import { Alert, PermissionsAndroid, Platform, Text, TouchableOpacity, View, StyleSheet,ScrollView } from 'react-native';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { createAvenant } from './avenant_model/Avenant';
import PDFView from 'react-native-view-pdf';
import LinearGradient from 'react-native-linear-gradient';





export default class CreationAvenant extends Component {

  
  constructor(props) {
    
    super(props);
    const param = this.props.route.params
    this.state={
      filePath : '',
      codeHTML: createAvenant(
        param.type , param.typeMode , 
        param.convention , param.employe , 
        param.signDate , param.signDateVigeur,
        param.numArticle,param.titreArticle,
        param.redaction,param.signature
        )
    }
  }


  componentDidMount(){
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
      html: this.state.codeHTML,

      fileName: 'contrat_de_travail',

      //File directory in which the PDF File Will Store.
      directory:'Ektor/Contrat de travail',
      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options);
    this.setState({filePath:file.filePath});

   
  }

  _share() {
    const shareOptions = {
      title: 'Contrat de travail',
      message: 'Contrat de travail',
      url: 'file://'+this.state.filePath,
      filename: 'contrat_de_travail' , // only for base64 file in Android
    };
    Share.open(shareOptions);
  }

  _PDFview(){
    const resources = {
      file: this.state.filePath ,
      base64: 'JVBERi0xLjMKJcfs...',
    }
    return(
      <View style={[Theme.styles.container,{flex: 2 , marginTop:"30%"}]}>
        <PDFView
              fadeInDuration={250.0}
              style={{width:315, height: 470 }}
              resource={resources['file']}
              resourceType={'file'}
              onLoad={() => console.log(`PDF rendered from ${this.state.filePath}`)}
              onError={(error) => console.log('Cannot render PDF', error)}
              
        />
      </View>
    )
  }
  
  render() {
    return (
      <View style={Theme.styles.container}>
        {this._PDFview()}
        <View style={Theme.styles.container}>

          <TouchableOpacity onPress = {() => {this._share(this.state.filePath, 'application/pdf') }} style={Theme.buttonsV2.touchAble} >
            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
                <Text style={Theme.buttonsV2.buttonText}>
                    Partager
                </Text>
            </LinearGradient>
          </TouchableOpacity>

         {/* <TouchableOpacity onPress = {() => { }} style={Theme.buttonsV2.touchAble} >
            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradient}>
                <Text style={Theme.buttonsV2.buttonText}>
                    Envoyer par la Poste 
                </Text>
            </LinearGradient>
    </TouchableOpacity>*/}

        </View>
      </View>
    );
  }
}
