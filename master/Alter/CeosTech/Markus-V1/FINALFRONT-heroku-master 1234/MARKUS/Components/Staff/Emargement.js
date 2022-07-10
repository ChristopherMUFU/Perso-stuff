import React from 'react';
import { Platform, Text, View,StyleSheet, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import * as Theme from '../Styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import { faHistory} from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Emargement extends React.Component {

    constructor(props){
        super(props)
        this.images = {
            logophoto: require('../../Assets/ico/photo.png'),
            time: require('../../Assets/ico/time.png')
         };
        this.state={
            date:'',
            heure:'',
            photo: null,
            location: null
        }
        this._takePhoto = this._takePhoto.bind(this)
    }


    // MÉTHODES / METHODS ----------------------------
    _takePhoto() {
        ImagePicker.showImagePicker({}, (response) => {
          if (response.didCancel) {
            console.log('L\'utilisateur a annulé')
          }
          else if (response.error) {
            console.log('Erreur : ', response.error)
          }
          else {
            console.log('Photo : ', response.uri )
            let requireSource = { uri: response.uri }
            this.setState({
              photo: requireSource
            })
          }
        })
    }

    componentDidMount() {
        var monthNames = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai','Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        var dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        var day = dayNames[new Date().getDay()-1]; //Current Date
        var date = new Date().getDate(); //Current Date
        var month = monthNames[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        
        this.setState({
            //Setting the value of the date time
            date: day + ' ' + date + ' ' + month + ' ' + year,
            heure: hours + 'h' + min
        });
      }



	/*findCoordinates(){
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};*/

      _displayValidation(){
          return(
            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} 
            style={{  marginVertical: 5, 
                        borderWidth: 2, 
                        borderColor: 'white', 
                        borderRadius: 10, 
                        paddingVertical: "2%",
                        width: windowWidth*0.9,
                        height: windowHeight*0.5,
                        alignItems:'center'}}>

                <Text style={{flex: 1, fontSize: 20, color:'white'}}>{this.state.date}</Text>
                <Text style={{flex: 1, fontSize: 30, color:'#3BB9E0'}}>{this.state.heure}</Text>
                <Text style={{flex: 1, fontSize: 20, color:'white'}}>Vos horaires du jour: 9h-18h</Text>

                <View style={{flexDirection: 'row', position: 'left'}}>
                    <FontAwesomeIcon icon={faHistory} style={{color: 'white', marginHorizontal: 5}} size={20} /> 
                    <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Arrivée à: {this.state.heure}</Text>
                </View>

                <View style={{flexDirection: 'row', position: 'left'}}>
                    <FontAwesomeIcon icon={faLocationArrow} style={{color: 'white', marginHorizontal: 5}} size={20} /> 
                    <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>{this.state.location}</Text>
                </View>

                <TouchableOpacity 
                        style = {{borderWidth:2, borderColor: 'white', borderRadius:7, alignItems:'center', backgroundColor: 'white'}}
                        onPress = {() => console.log("Arrivée")}
                        >
                        
                        <Text style={{textAlign:'center', fontSize: 20, color:'#0490BE'}}>Valider</Text>
                    </TouchableOpacity>
        </LinearGradient>
          )
      }
    
     

    

    render(){
        console.log("Emargement RENDER")
        return(
            
            <View style={{
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center',
                justifyContent: "center",
                paddingTop:'1%',
                width: "100%", 
                justifyContent:'center'
              }}> 

            <LinearGradient elevation={5} colors={['white' , 'white' , 'white']} 
                    style={{  marginVertical: 5, 
                                borderWidth: 2, 
                                borderColor: '#04295D', 
                                borderRadius: 10, 
                                paddingTop: "2%",
                                width: windowWidth*0.9,
                                height: windowHeight*0.5,
                                alignItems:'center',
                                justifyContent: 'space-around'}}>

                        <Text style={{flex: 1, fontSize: 20, color:'#04295D'}}>{this.state.date}</Text>
                        <Text style={{flex: 1, fontSize: 30, color:'#3BB9E0', marginVertical: 2}}>{this.state.heure}</Text>
                        <Text style={{flex: 1, fontSize: 20, color:'#04295D'}}>Vos horaires du jour: 9h-18h</Text>

                        <View style={{flexDirection: 'row',
                                flex: 3, 
                                marginVertical: 5, 
                                padding: "2%",
                                width: windowWidth*0.9,
                                justifyContent:'space-evenly',
                                alignItems:'center'}}>
                            <TouchableOpacity 
                                style = {{borderWidth:2, borderColor: 'black', borderRadius:7, justifyContent:'center', height: "50%", width:"35%", backgroundColor: 'white'}}
                                onPress = {() => console.log("Arrivée")}
                                >
                                
                                <Text style={{textAlign:'center', fontSize: 20, color:'#0490BE'}}>Arrivée</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = {{backgroundColor:'#0490BE',borderWidth:2, borderColor: 'white', borderRadius:7, justifyContent:'center', height: "50%", width:"35%"}}
                                onPress = {() => console.log("Départ")}
                                >
                                
                                <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Départ</Text>
                            </TouchableOpacity>
                        
                        </View>
                </LinearGradient>     
            
                <View style={{flexDirection: 'row',
                                flex: 1, 
                                marginVertical: 5, 
                                padding: "2%",
                                width: windowWidth*0.9,
                                justifyContent:'space-between',
                                alignItems:'center'}}>
                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']}
                    style = {{ padding: 5, borderRadius:7, borderWidth:2, borderColor: 'white', justifyContent:'center', height: "70%", width:"40%"}}>
                        <TouchableOpacity 
                            style={{alignItems: 'center'}}
                            onPress = {this._takePhoto}
                            >
                            <FontAwesomeIcon icon={faCameraRetro} style={{color: 'white', marginBottom:"2%"}} size={20} /> 
                            
                            <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Photo</Text>
                        
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} 
                            style = {{
                                padding: 5, 
                                borderRadius:7, 
                                borderWidth:2, 
                                borderColor: 'white', 
                                justifyContent:'center', 
                                height: "70%", 
                                width:"40%"}}>
                        <TouchableOpacity 
                            style={{alignItems: 'center'}}
                            onPress={this.findCoordinates}
                            >
                            <FontAwesomeIcon icon={faLocationArrow} style={{color: 'white', marginBottom:"2%"}} size={20} /> 
                            <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Localisation</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                  
            </View>  

        )
        
    }
}

const styles = StyleSheet.create({
    header_container : {
       // Pour éviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) /To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
       ...(Platform.OS !== 'android' && {
          zIndex: 10
          }),
       alignItems: 'stretch' ,
       flex: 2,
    },
   
   new_form_ico : {
      resizeMode: 'contain',
      height: 12,
      marginTop: 3,
      marginRight: 5,
      alignContent: 'center'
   },
   mini_text: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold'
   },
 });
 


export default Emargement