import React, { Component,} from 'react'
import { View, StyleSheet,TouchableOpacity,Text,ScrollView, Dimensions} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faDownload } from '@fortawesome/free-solid-svg-icons'

export default class Historique extends React.Component {
    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.display}>
                    <Text style={styles.text1}>Convoquer</Text>
                    <Text style={styles.text2}>Licencier</Text>
                </View>
                <View style={styles.hairline} />


                <View style={styles.display2}>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                      <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                    <View>
                        <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={styles.linearGradient}>
                            <View>
                                <Text style={styles.buttonText1}>Herman Luis</Text>
                                <Text style={styles.buttonText2}>Serveur</Text>
                            </View>
                            <View style={styles.textbloc2}>
                                <Text style={styles.buttonText3}>Date du document</Text>
                                <Text style={styles.buttonText4}>13/08/2020</Text>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.conteneurlogotext}>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        style={{ color: 'white' }}
                                        size={15} />
                                    <Text style={styles.texttelecharger}>   Télécharger</Text>
                                </View>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>  
        );
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3C3C3C',
        flex:1,
        height:'100%'    
    },
    texthistorique:{
        textAlign:'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'center',
        marginTop: '15%',
        color: '#FFFFFF',
    },
    display:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        justifyContent:'space-evenly',
        marginTop:"2%"
    },
    text1 :{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        color: '#FFFFFF',
    },
    text2 :{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 17,
        textAlign: 'center',
        marginTop: 12,
        color: '#FFFFFF',
    },
    hairline: {
        backgroundColor: '#FFFFFF', 
        height: 1,
        width: '100%', 
        marginTop : 20,
    },

    display2:{
        display:'flex',
        flexDirection:"column",
        justifyContent:"space-between",
        height:'15%',
        marginTop: '5%',
    },
    linearGradient: {
        flexDirection:'row',
        alignItems:'flex-start',
        paddingLeft:10,
        borderRadius: 5,
        borderColor: "#FFFFFF",
        borderWidth: 3,
        height: '90%',
        width: '90%',
        marginLeft:'5%'
      },
      textbloc2:{
        marginLeft:70
      },
      buttonText1:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight:'bold',
        fontSize: 14,
        marginTop: 12,
        color: '#FFFFFF',
      },
      buttonText2:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 14,
        color: '#FFFFFF',
      },
      buttonText3:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight:'bold',
        fontSize: 14,
        marginTop: 12,
        color: '#FFFFFF',
      },
      buttonText4:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 14,
        color: '#FFFFFF',
      },
      conteneurlogotext:{
        paddingTop:50,
        marginLeft:-20,
        display:'flex',
        flexDirection:'row',
      },
      texttelecharger:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 14,
        color: '#FFFFFF',
      },
})