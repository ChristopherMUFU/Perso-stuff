import React, { Component } from 'react'
import { Text, View, Alert, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { setForgotResetPassword } from "../../../API/Authentification";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = { 
    testCode: "8da6",
    code: "", 
    password:"",  
    comfir_password:"",  
    
    error:{ bool: false, message: "" } };
    
    
  }


  _verify() {
		if (this.state.code == "") {
			return Alert.alert("Veuillez indiquer le code");
		}
		if (this.state.password == "") {
			return Alert.alert("Veuillez indiquer le mot de passe");
		}
		if (this.state.comfir_password == "") {
			return Alert.alert("Veuillez confirmé votre mot de passe");
    }
    if (this.state.password != this.state.comfir_password){
      return Alert.alert("Attention, ces mots de passe ne correspondent pas.");
		}
        else {
          let formData={
          password: this.state.password,
          token: this.state.code
          }
          setForgotResetPassword(formData).then(data => {
                if(data != null){
                    console.log('VER')
                    console.log(data)
                    this.props.navigation.navigate("connexion");
                }
                else{
                    console.log('ERROR')
                }
           })
           Alert.alert("Votre nouveau mot de passe a bien été enregistré")
        }
      
      //console.log(this.state);
		//}
  }
  

_goTo = (destination) => {
    this.props.navigation.navigate(destination);
};


  render() {

    
 console.log(this.props.navigation)

    return (
          <View style={styles.mainContainer}>

            <View style={styles.pageContainer}>


            <View style={styles.fullLogo}>
              <View style={[styles.borderTop,{left:'0%'}]}></View>
              <View style={[styles.borderTop,{right:'0%'}]}></View>
              <Image 
                  source={require('../../../Assets/img/MARKUS-logo2.png')} 
                  style={styles.logo}
                  resizeMode="center"
                />
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.text}> Entrez le code de modification</Text>
              
              <View style={styles.textIconSection}>
                  <TextInput placeholder="Code de modification" style={[styles.formulaire, {width: "50%"}]} autoCorrect={false} onChangeText={(value) => this.setState({code : value})} />
              </View>
              <Text style={styles.text}> Entrez votre nouveau mot de passe</Text>

              <View style={styles.textIconSection}>
                  <TextInput placeholder="Nouveau mot de passe" style={styles.formulaire} autoCorrect={false} secureTextEntry={true} onChangeText={(value) => this.setState({password : value})} />
              </View>
              
              <Text style={styles.text}> Confirmez votre nouveau mot de passe</Text>

              <View style={styles.textIconSection}>
                <TextInput placeholder="Confirmation nouveau mot de passe" style={styles.formulaire} autoCorrect={false} secureTextEntry={true} onChangeText={(value) => this.setState({comfir_password: value})} />
              </View>

              <TouchableOpacity onPress = {() => {this._verify()}} style={[styles.button ,{width:'70%', height: "10%", minHeight: 40 , marginTop:"5%"}]}>
                      <Text style = {{color:'white', }}>Valider</Text>
              </TouchableOpacity>
            </View>
            
            </View>
          </View>
  )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: '#04295D',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  pageContainer:{
    //backgroundColor: "red",
    //flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fullLogo:{
    width: "90%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "red",
  },
  logo:{
    width: 180,
    height: 180,
    opacity: 1,
  },
  borderTop:{
    borderTopWidth: 5,
    borderColor: '#3BB9E0',
    width: '25%',
    top: '50%',
    position: 'absolute'
  },
  inputContainer:{
    alignItems: 'center',
    justifyContent: "center",
    width: "100%",
    height: "70%",
    overflow: "hidden"
  },
  text:{
    color: 'white',
    marginBottom: '2%',
  },
  textIconSection:{
    flexDirection: 'row',
    height: 45,
    maxHeight: "18%",
    margin: "2%"
  },
  formulaire:{
    width: '80%',
    borderWidth : 1.0,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#3BB9E0',
    justifyContent: 'center',
    alignItems: "center",
    fontStyle: "italic",
    textAlign: "center"
  },
  button:{
    backgroundColor: '#3BB9E0',
    borderColor: "#3BB9E0",
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: "100%"
  },

}) 