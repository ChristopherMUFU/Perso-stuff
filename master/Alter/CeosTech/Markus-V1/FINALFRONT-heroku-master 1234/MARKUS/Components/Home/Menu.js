import React from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import * as Styles from '../Styles/Styles';
import * as Theme from '../Styles/Theme';
import { faUser, faLock, faIdCardAlt, faCogs } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIdCard,faCubes,faCog, faCartPlus } from '@fortawesome/free-solid-svg-icons';


export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            TouchableOpacityColors: ["white", "white", "white"]
        }
    }


    _goTo = (action) => {
        switch (action) {
            case "Gestion des stocks":
                this.props.navigation.navigate("STOCK");
                break;

            case "RH":
                this.props.navigation.navigate("RH");
                break;
            
            case "COMMANDES":
                this.props.navigation.navigate("COMMANDES");
                break;

            case "Setting":
                this.props.navigation.navigate("COMPTE");
                break;
        }


    }



    render(){
        return(
            <View style={styles.mainContainer}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Accueil<Text style={{ color: "#6ed6ff", fontSize: 36}}>.</Text>
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this._goTo("RH");
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesomeIcon icon={ faIdCard } style={[styles.buttonIcon]} size={28} />
                            <Text style={[styles.buttonText]}>Ressources humaines</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this._goTo("COMMANDES");
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesomeIcon icon={ faCartPlus } style={[styles.buttonIcon]} size={28} />
                            <Text style={[styles.buttonText]}>Gestion des commandes</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this._goTo("Gestion des stocks");
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesomeIcon icon={ faCubes } style={[styles.buttonIcon]} size={28} />
                            <Text style={[styles.buttonText]}>Stocks</Text>
                        </View>
                    </TouchableOpacity>

        

                    <TouchableOpacity
                        onPress={() => {
                            this._goTo("Setting");
                        }}
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesomeIcon icon={faCog} style={[styles.buttonIcon]} size={28} />
                            <Text style={[styles.buttonText]}>Mon compte</Text>
                        </View>
                    </TouchableOpacity>
                            
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: "white"
    },
    titleContainer: {
        //backgroundColor: "yellow",
        paddingTop: "20%",
        paddingBottom: "5%",
        borderBottomWidth: 1,
        borderBottomColor: "#04295D"
    },
    titleText:{
        //backgroundColor: "red",
        textAlign: "center",
        fontSize: 36,
        fontWeight: "700",
        color: "#04295D"
    },
    buttonContainer: {
        alignItems:'center', 
        marginTop:"10%", 
        width:'100%'
    },
    button: {
        width: "90%", 
        marginVertical: '3%', 
        borderColor: "#3BB9E0", 
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: '#04295D'
      },
    buttonContent:{
        flexDirection:'row', 
        alignItems:'center',
        justifyContent: "center",
        padding: "2%"
    },
    buttonText: {
        flex:1,
        fontSize: 22,
        /* fontFamily: "Gill Sans", */
        fontWeight:'bold',
        color: "white",
        //backgroundColor: "yellow",
        textAlign: "center"
      },
    buttonIcon:{
        color: 'white',
        //backgroundColor: "red",
        margin: "1%"
      }

})