import React from 'react';
import { Image, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';


export default class MenuEmployementContract extends React.Component{
    /* Go to a page */
  _goTo = (action) =>{
    switch(action) {
        case "CDD":
            this.props.navigation.navigate("ContratTravailcdd", {contract: "CDD"});
            break;
        
        case "CDI":
            this.props.navigation.navigate("ContratTravail", {contract: "CDI"});
            break;
        // case "Avenant":
        //     this.props.navigation.navigate("Avenant");
        //     break;
    }
  }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.minititle}>Je souhaite embaucher un salarié en :</Text>
                <View style={styles.underline}></View>

                <TouchableOpacity onPress = {() => { this._goTo('CDD')}} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonTextmenu}>
                            Contrat à durée déterminée
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => { this._goTo('CDI')}} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.buttonTextmenu}>
                            Contrat à durée indéterminée
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity
                     onPress={() => {
                        // this._goTo("Avenant");
                        Alert.alert("Cette fonctionnalité sera bientôt disponible.") } }
                     style={[styles.button, {opacity: 0.4}]} 
                     activeOpacity={0.4}
                  >
                     
                        <Text style={styles.buttonTextmenu}>Avenant</Text>
                     
                  </TouchableOpacity>
                
               

                <View style={{position: "absolute", bottom: '0%', right: '0%', zIndex: -1}}><Image source={require('../../../Assets/img/asian-chef.png')}/></View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop:'1%',
        width: "100%",
    },
    minititle:{
        color:'#04295D',
        fontSize: 18,
        fontStyle: "italic",
        paddingTop: 50
    },
    underline:{
        width: "50%",
        borderBottomWidth: 0.5,
        borderColor: "#04295D",
        marginTop: 10,
        marginBottom:30 
    },
    buttonTextmenu:{
        fontSize: 18,
        /* fontFamily: "Gill Sans", */
        textAlign: "center",
        margin: 10,
        marginBottom: 10,
        color: "#ffffff",
        backgroundColor: "transparent",
    },
    button:{
        width: "90%",
        marginVertical: "3%",
        borderColor: "#04295D",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#04295D",
    }
})