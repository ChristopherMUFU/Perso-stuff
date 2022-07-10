import React from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import * as Theme from '../Styles/Theme';
import ficheData  from '../../../Helpers/ficheSalarie.json';

// import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class FicheSalarieDetail extends React.Component{
    constructor(props){
        super(props);
        this.images = {
            new_form: require('../../../Assets/img/Vector.png')
         };
        this.state = {
            ficheSalarie: ficheData[this.props.navigation.route.params.id]
            
        };
    }

    render() 
        {
        console.log("Détail Fiche salarie")
        console.log("Fiche Salarie " + this.state.ficheSalarie)
        return(
            
                <View style={{
                    backgroundColor: '#3C3C3C',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                    paddingTop:'1%',
                    marginRight:40,
                    width: "100%",
                  }}>
                      <ScrollView style={{flex:1, width: '95%',}}>
                    <LinearGradient
                    style = {
                        {
                            flex: 1,
                            borderWidth : 1.0,
                            borderRadius: 5,
                            borderColor: '#B0B0B0',
                            marginBottom: '10%',
                            marginTop: "10%",
                            marginRight: "100%",
                            width: "100%"
                        // marginLeft:"2%"
                        }
                    } 
                    elevation={5} 


                    colors={['#696969' , '#595959' , '#494949']}>


                        
                        
                <Text
                        style={{
                            marginTop: 20,
                            alignSelf: 'center',
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 24,
                            lineHeight: 28,
                            display: 'flex',
                            color: 'white'
                        }}> {this.state.ficheSalarie.nom +" "+ this.state.ficheSalarie.prenom}
                    </Text>
                    <Text
                        style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 18,
                            lineHeight: 21,
                            display: 'flex',
                            color: '#91E5F6',
                            alignSelf: 'center',
                            marginTop: 10,
                        }}> {this.state.ficheSalarie.poste}
                    </Text>



                    <View style={{ flexDirection: 'column', marginTop: 10, lineHeight: 20, }}>
                        
                        <View //numéro de téléphone
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 10,
                        }}>Tèl : </Text>

                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    //bottom: 375,
                                    marginLeft: 30,
                                }}> {this.state.ficheSalarie.numero_telephone}
                            </Text>

                        </View>


                        <View //adresse
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            //marginTop: 25,
                        }}> Adresse: </Text>
                            <Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                                //bottom: 349,
                                //marginLeft: 75,
                            }}> {this.state.ficheSalarie.addresse}
                        </Text>
                        </View>


                        <View //courriel
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                           // marginTop: 25,
                        }}> Courriel: </Text>
                            <Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                                //bottom: 325,
                                //marginLeft: 75,
                            }}> {this.state.ficheSalarie.courriel}
                        </Text>

                        </View>



                        <View //securité sociale
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            //marginTop: 25,
                        }}> N° Sécurité Sociale: </Text>
                            <Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                               // bottom: 299,
                                //marginLeft: 150,
                            }}> {this.state.ficheSalarie.numero_securite_social}
                        </Text>

                        </View>


                        <View //naissance
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 10,
                        }}>Date de naissance: </Text>

                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    //bottom: 375,
                                    marginLeft: 30,
                                }}> {this.state.ficheSalarie.date_de_naissance}
                            </Text>

                        </View>



                        <View //lieu de naissance
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            //marginTop: 25,
                        }}> Lieu de naissance : </Text>

                            <Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                                //bottom: 275,
                                //marginLeft: 150,
                            }}> {this.state.ficheSalarie.ville}
                        </Text>
                        </View>



                        <View //nationalité / nationality
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            //marginTop: 25,
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                        }}> Nationalité : </Text>

<                           Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                                //bottom: 224,
                                //marginLeft: 100,
                            }}> {this.state.ficheSalarie.nationnalite}
                        </Text>

                        </View>

                        <View //salaire /Salary
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 10,
                        }}>Salaire : </Text>

                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    //bottom: 375,
                                    marginLeft: 30,
                                }}> {this.state.ficheSalarie.salaire} €
                            </Text>

                        </View>


                        <View //Statut /Status
                        style ={{ 
                            flexDirection:'row',
                        }}>
                            <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            //marginTop: 25,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                        }}> Statut: </Text>

                     <Text
                            style={{
                                fontStyle: 'normal',
                                fontSize: 14,
                                color: 'white',
                                //bottom: 199,
                                //marginLeft: 110,
                            }}> {this.state.ficheSalarie.status}
                        </Text>

                        </View>





                      
                        
                    </View> 



                    <View style = {styles.new_commande_container}> 
                                <TouchableOpacity 
                                    style = {{flexDirection: 'row',textAlign:'right'}}
                                   // onPress = {
                                        //() =>
                                    // this._goTo('')
                                   // }
                                    >
                                    <Image source = {this.images.new_form} style={styles.new_form_ico} />
                                    <Text style = {styles.mini_text}>Contrat de travail(.pdf)</Text>
                                </TouchableOpacity>
                        </View>


                    </LinearGradient>



                
            </ScrollView>
            </View> 

        )
    }

}

const styles = StyleSheet.create({
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
export default FicheSalarieDetail