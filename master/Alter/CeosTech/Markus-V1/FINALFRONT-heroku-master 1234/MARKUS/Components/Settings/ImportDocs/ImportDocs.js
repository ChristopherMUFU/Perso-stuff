// ../Components/Settings/ImportDocs/ImportDocs.js

import React from 'react';
import { Alert, PermissionsAndroid, Dimensions, Text, View, TextInput, ScrollView, TouchableOpacity,Image, StyleSheet} from 'react-native';
import * as Theme from '../../Styles/Theme';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ImportDocs extends React.Component{

  
    constructor(props){
        super(props);
        this.state={
          filePath : '',
          file:'',
          fileName:'',
        }
      }

    async _selectfile(){
              // Pick a single file
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
          });
          this.state.filePath = res.uri,
          this.state.fileName = res.name,
          console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
          );
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {
            throw err;
          }
        
        }
      }

    /*
    makeDirectory = () => {
      const { currentFolder, units } = this.props;

      const directoryName = 'New Folder'
      const currentDirectory = units

      const absolutePath = `/storage/emulated/0/MyApp/${currentDirectory}`

      RNFS.mkdir(absolutePath)
          .then((result) => {
              console.log('result', result)
          })
          .catch((err) => {
              console.warn('err', err)
          })
  }*/

    _saveFile(){
      return(Alert.alert('Document importé !'))
     /* RNFetchBlob
      .config({
          addAndroidDownloads : {
              useDownloadManager : true, // <-- this is the only thing required
              // Optional, override notification setting (default to true)
              notification : true,
              // Optional, but recommended since android DownloadManager will fail when
              // the url does not contains a file extension, by default the mime type will be text/plain
              mime : 'text/plain',
              description : 'File downloaded by download manager.'
          }
      })
      .fetch('GET', this.state.filePath)
      .then((resp) => {
        // the path of downloaded file
        resp.path()
        console.log(res.path())
      })*/
    }

    render(){
        return(
          <ScrollView style={{flex:1, width:windowWidth, backgroundColor:'#3C3C3C'}}>
              <View style={styles.container}>
                <Image source={require('../../../Assets/img/logo-resto.png')} style={styles.logo}/>
                <Text style={styles.userName}>Paul Edouard</Text>
                <Text style={styles.jobTitle}>Manager Restaurant</Text>

                <View style={styles.line}>
                    <View style={styles.lineSize}/>
                </View>

                <TouchableOpacity onPress = {() => { this._saveFile()}} style={[buttonsV4.touchAble, {borderWidth:0}]}>
                    <Text style={{fontWeight:'bold', fontSize:18, color:'white',textAlign:'center',marginVertical:'1%'}}>
                        Importer
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => { this._selectfile()}} style={buttonsV4.touchAble} marginTop='5%' >
                <View style={{flexDirection:"row", justifyContent:'flex-start'}}>             
                    <View style={{flex:5}}>
                      <Text style={buttonsV4.buttonText}>
                          Contrat de travail CDD 
                      </Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                      <Image source={require('../../../Assets/ico/import.png')} style={styles.ico}/>
                    </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => { this._selectfile()}} style={buttonsV4.touchAble} marginTop='5%' >
                <View style={{flexDirection:"row", justifyContent:'flex-start'}}>             
                    <View style={{flex:5}}>
                      <Text style={buttonsV4.buttonText}>
                          Contrat de travail CDI 
                      </Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                      <Image source={require('../../../Assets/ico/import.png')} style={styles.ico}/>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
          </ScrollView>
        )
    }

}
export const styles = StyleSheet.create({
  /*GENERAL */
  container:{
      backgroundColor: '#3C3C3C',
      flex: 1,
      alignItems: 'center',
      width: windowWidth,
      height:windowHeight,
      color:'white'
  },
  title:{
      fontSize:25,
      fontWeight: "bold",
      textTransform:'uppercase',
      color:'white',
      marginTop:'5%'
      },
  text:{
      fontSize: 20,
      color: "white"
  },
  line:{
      flexDirection: 'row', 
      marginTop:'4%'
},
  lineSize:{
      marginHorizontal:'9%',
      flex: 1, 
      height: 1, 
      backgroundColor: 'white'
  },
    logo:{
      height: '21%',
      width: '38%',
      resizeMode: 'contain',
      position:"relative",
  },
  userName:{
      fontSize:15,
      fontWeight: "bold",
      textTransform:'uppercase',
      color:'white',
      marginTop:'5%'
  },
  jobTitle:{
      fontSize:13,
      fontStyle:'italic',
      textTransform:'uppercase',
      color:'white',
      marginTop:'3%'
  },
  ico:{
    height: 35,
    width: 25,
    resizeMode:'contain',
    position:'relative',
}, 
});

export const buttonsV4 = StyleSheet.create({

  touchAble : {
      width: windowWidth*0.7,
      marginVertical:'5%',
      borderWidth:0.5,
      borderColor:'white',
      borderRadius:10
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    padding:5,
    color: '#ffffff',
    backgroundColor: 'transparent',
    
  },
});