import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMailBulk, faCode } from '@fortawesome/free-solid-svg-icons'
import { setForgotResetEmail } from "../../../API/Authentification";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.email = ""
    this.pin = ""
    this.state = {error_mail: false }
    
  }

_tapEmail(mail){
    this.email = mail
}

_tapPin(code){
    this.pin = code
}
_goTo = (destination) => {
    this.props.navigation.navigate(destination);
};

_validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

_verify()
{
    if(this._validate(this.email))
    {
        let formData={email:this.email}
        
        setForgotResetEmail(formData).then( data => {
              if(data != null){
                  console.log('CODE')
                  console.log(data)
                  console.log('mail ' + this.email + ' is validate')
                  this.setState({error_mail: false})
                  this.props.navigation.navigate('ForgotMotdepasse')
              }
              else{
                console.log('PAS MARCHÉ')
              }
        })

        Alert.alert("Un code de modification vous a été transmis par mail.")
       
    }
    else{
        this.setState({error_mail: true});  
    }
}

_errorshow(){
    if(this.state.error_mail){
        return(<View style={{backgroundColor:'red', padding: 30}}><Text style={{color:'white'}}>Adresse mail non valide</Text></View>)
    }
}
  render() {
    return (
        <View style={styles.mainContainer}>
            {this._errorshow()}
            <View style={styles.container}>
                <View style={styles.fullLogo}>
                    {/* <View style={[styles.borderTop,{left:'0%'}]}></View>
                    <View style={[styles.borderTop,{right:'0%'}]}></View> */}
                    <Image 
                    source={require('../../../Assets/img/MARKUS-logo.png')} 
                    style={styles.logo}
                    resizeMode="cover"
                    />
                </View>
                <View style={{flex: 1, width: "100%" , justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: 'white',marginBottom: '5%'}}>Veuillez entrer votre adresse mail :</Text>
                    <View style={styles.textIconSection}>
                        <FontAwesomeIcon icon={ faMailBulk } color="#3BB9E0" style={styles.icon} />
                        <TextInput placeholder="Email" style={styles.formulaire} autoCorrect={false} onChangeText={(mail) => this._tapEmail(mail)} />
                    </View>
                    <TouchableOpacity onPress = {() => {{this._verify()}}} style={{width:'70%', marginBottom: 10}}>
                        <View style = {styles.button}>
                            <Text style = {{color:'#04295D', fontSize:15}}>Récupérer le code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#04295D'
    },
    container:{
        //flex:1,
        //backgroundColor: 'red',
        width: "80%",
        height: "80%",
        alignItems: "center",
        borderColor: "#3BB9E0",
        borderWidth: 5
    },
    borderTop:{
        borderTopWidth: 5,
        borderColor: '#3BB9E0',
        width: '25%',
        marginTop: '30%',
        position: 'absolute'
    },
    fullLogo:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    logo:{
        width: 150,
        height: 150,
        opacity: 1,
    },
    textIconSection:{
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '80%',
        borderWidth : 1.0,
        borderRadius: 10,
        borderColor: '#3BB9E0',
        alignItems: "center",
        paddingHorizontal: "2%"
    },
    formulaire:{
        height: "100%",
        flex:1,
        justifyContent: 'center',
        color: '#3BB9E0',
    },
    
    button:{
        marginTop: 30,
        backgroundColor: '#3BB9E0',
        borderColor: "#3BB9E0",
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 7,
        width: 200
    }

})