import React from 'react';
import {
   Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
} from 'react-native';

import { getFournisseur, deleteFournisseur } from '../../API/StocksData';
import ListFournisseurs from './ListFournisseurs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _returnChange } from './NouveauFournisseur';



export default class Fournisseurs extends React.Component {
   // CONSTRUCTEUR / CONSTRUCTOR --------------------
   constructor(props) {
      super(props);
      this.ico = {
         new_form2: require('../../Assets/ico/new_form3.png'),
         warning: require('../../Assets/ico/Vector.png')
      };
      this.state = {
         fournisseurs: [], // this._returnDataFournisseur
         isNoFournisseurs: false,

         navigation: this.props.navigation, // à tester
      };
   }

   verifFournisseur(val){
       this.setState({fournisseurs: val})
       if(val.length == 0){
           this.setState({ isNoFournisseurs: true })
       }
       else{
            this.setState({ isNoFournisseurs: false })
        }
   }
   
   _dataRefresh(){
        getFournisseur().then( (data) => this.verifFournisseur(data))
    }
    
   componentDidMount() {
      this._dataRefresh();
          this._unsubscribe = this.props.navigation.addListener('focus', () => 
          {  
            this._dataRefresh();
          });
      }
 
    componentWillUnmount() 
    {
        this._unsubscribe();
    }

   
   _goTo(destination) {
		this.props.navigation.navigate(destination)
  };
  




   removeFournisseur(fournisseur_id){

      deleteFournisseur(fournisseur_id).then(this._dataRefresh());
        /* let new_list = this.state.fournisseurs.filter(fournisseur=> fournisseur.id !== fournisseur_id)
         this.setState({
            fournisseurs: new_list
         })
      })
      .catch(error=>{
         console.log("error when deleting product with id :: ", fournisseur_id)
      })
      */
      /*this.props.fournisseurItem.data_refresh();*/
   }



   // RENDER --------------------
   render() {
      return(
        
         <View style = {styles.container}>

            {/* NOUVEAU FOURNISSEUR / NEW PROVIDER*/}
               
            <TouchableOpacity style={styles.button} onPress = {() => this._goTo('new_fournisseur')}>
               <Image resizeMode="cover" source = {this.ico.new_form2} style={styles.buttonIcon} />
               <Text  style={styles.buttonText}>Ajouter fournisseur</Text>
            </TouchableOpacity>
               
            <View style={styles.line} ></View>

            {this.state.isNoFournisseurs ?
                <View
                style={{
                    alignItems: 'center',
                    //backgroundColor: "red",
                    flex: 1
                }}>
                <Image
                    resizeMode="contain"
                    source = {this.ico.warning}
                    style={{
                        marginTop: '5%',
                        maxWidth: 100, // à modif
                        minHeight: 61,
                        minWidth: 61,
                        width: "50%",
                        height: "8%",
                        //backgroundColor: "red"
                    }}/>
                <Text
                    style={{
                        marginTop: '2%',
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#04295D',
                    }}>
                    Vous n'avez pas encore ajouté de fournisseurs.
                </Text>
            </View>
            :
            <View style= {styles.content_container} zIndex = {0}>
               <ListFournisseurs
                  navigation = {this.props.navigation}
                  fournisseurs = {this.state.fournisseurs}
                  fournisseur_component = {this}
                  />
            </View>
            }
            

            

         </View>
      )
   }
}


// CONSTANTE TAILLE PHONE / PHONE SIZE CONSTANT
const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   container:{
      backgroundColor: 'white',
      flex: 1,
      paddingTop:'1%',
      width: "100%",
   },
   line:{
      borderColor: "#04295D",
      borderWidth: 0.25,
      width: "95%",
      alignSelf: "center"
  },
   content_container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   button: {
      width: "50%",
      maxWidth: 200,
      //backgroundColor: "yellow",
      flexDirection: "row",
      flexWrap:"wrap",
      justifyContent: "space-evenly",
      alignSelf: "flex-end",
      marginHorizontal: "1%",
      marginTop: "4%",
      marginBottom: "3%"
  },
  buttonText: {
      color: '#04295D',
      fontWeight: '700',
      fontSize: 16,
  },
});