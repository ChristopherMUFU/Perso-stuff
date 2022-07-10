// Components/Staff/RegistrePersonnel.js
import React from 'react';
import {
    FlatList,
    Image,
    Text,
    Dimensions,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//import * as Theme from '../Styles/Theme';
import LinearGradient from 'react-native-linear-gradient';
//import Swipeout from 'react-native-swipeout';
import FichesalarieItem from './FicheSalarieItem';
import ficheData from '../../../Helpers/ficheSalarie.json';

import FicheSalarie from './FicheSalarieDetail'
import ListeFicheSalarie from './ListeFicheSalarie';


// CONSTANTES UTILES
const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;


class RegistrePersonnel extends React.Component {
    //constructeur
    constructor(props) {
        super(props);
        this.images = {
            new_form: require('../../../Assets/ico/new_form.png')
         };

         this.order = [
            {label: 'A-Z', value : 'a-z'}
         ];

         this.state = {
            ficheSalaries : [],
      }

    }

    _goTo = (action) => {
        switch (action) {
          case "creationFicheSalarie":
            this.props.navigation.navigate("creationFicheSalarie");
            break;

          default:
             this.props.navigation.navigate("stock_menu")
            break;
        }
      };

      _sortPersonnel () {
         ingredients.sort((a,b) => {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
         })


      }


    render() {
      console.log("Fiches Salarie RENDER" + this.state.fichesalaries)
        return(

            <View style = {styles.container}>

           {/*<View style ={{
                        flex:1,
                        width:'60%',
                        alignItems:'center',
                        paddingTop:5
                        }}>

            <DropDownPicker
                            placeholder='Filtrer'
                            items={this.order}
                            style = {{backgroundColor: 'transparent', overflow:'hidden'}}
                            //containerStyle= {styles.dropDownContainerStyle}
                            style = {{backgroundColor: 'transparent',borderColor:"white",borderRadius:10}}
                            containerStyle= {{height:30, width:'80%',}}
                            dropDownStyle = {{borderColor: 'white', backgroundColor: 'black', width: "100%"}}
                            placeHolderStyle = {{color:'white', fontSize: 16}}
                            labelStyle = {{color:'white', fontSize: 16}}
                            arrowColor = {'white'}
                            //onChangeItem = {
                                //item => this._filterRecettes('order', item.value)
                            //}
                        />


                </View>  */}

                <View style = {styles.new_commande_container}>
                                <TouchableOpacity
                                    style = {{flexDirection: 'row',textAlign:'right'}}
                                    onPress = {() => this._goTo('creationFicheSalarie')}
                                    >
                                    <Image source = {this.images.new_form} style={styles.new_form_ico} />
                                    <Text style = {styles.mini_text}>Créer une fiche salarié</Text>
                                </TouchableOpacity>
                        </View>



                        <View style= {styles.content_container}>
                        <ListeFicheSalarie
                           //ingredients = {this.state.ingredients}
                           fichesalarie={this.state.ficheSalarie}
                           navigation = {this.props.navigation}
                       />



                        </View>

            </View>
         );

    }


}


const styles = StyleSheet.create({
    header_container : {
       // Pour eviter un zIndex mal géré par Android (sinon le dropdown se met en arrière plan) / To avoid a mismanaged zIndex by Android (otherwise the dropdown goes in the background)
       ...(Platform.OS !== 'android' && {
          zIndex: 10
          }),
       alignItems: 'stretch' ,
       flex: 2,
    },
    container:{
        backgroundColor: '#3C3C3C',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop:'1%',
        width: "100%",

    },
    dropDownStyle: {
       backgroundColor: '#222',
       fontSize: 10,
    },
    dropDownContainerStyle: {
       height: phoneHeight * 0.06,
       flex: 3,
       margin: 3,
    },
    filtres_container: {
       flexDirection: 'row',
       marginRight: '3%',
       marginLeft: '3%',
       width: phoneWidth,
       justifyContent: 'center'
    },
    filtres_touchable: {
       // borderWidth: 1,
       // borderBottomColor: 'grey',
       alignItems: 'center',
       paddingRight: '5%',
       paddingLeft: '5%'
    },
    filtres_text: {
       color: 'grey',
       fontSize: 18,

    },
    filtres_textPressed: {
       color: 'white',
       fontSize: 18,
    },
    key_container : {
       flexDirection: 'row',
       flex:1,
       marginTop: '15%',
       marginBottom: '2%',
       paddingLeft: '7%',
       paddingRight: '3%',
       width: phoneWidth,
    },
    key_text: {
       color: 'white',
    },
    content_container: {
       flex:12,
       // justifyContent: 'flex-end',
       // borderWidth: 1,
       // borderColor: 'white',
       width: phoneWidth
    },
    new_commande_container: {
      margin: '3%',
      //alignItems: 'center',
      textAlign:'left'
   },
   new_form_ico : {
      resizeMode: 'contain',
      height: 12,
      marginTop: 3,
      marginRight: 5,
   },
   mini_text: {
      color: 'white',
      fontSize: 13,
      fontWeight: 'bold',
      textAlign:'right'
   },
 });
export default RegistrePersonnel;
