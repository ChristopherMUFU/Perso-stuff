import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { verifyConnexion } from "../../API/Authentification";
import { AsyncStorage, Dimensions} from 'react-native';

import { connect } from 'react-redux';
import { userLogin, saveUserCredentials } from '../../actions/accountsData';



import { getRestaurantOwnerDetail } from '../../API/AccountsData';
const windowWidth = Dimensions.get('window').width;
/* Importing from the store, thanks to Redux, the variables that we need, and sending them to the props of our object */
const mapStateToProps = (state) => ({
  email: state.accountsData.email,
  password: state.accountsData.password,
  connexion: state.accountsData.connexion,
})

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(userLogin()),
    saveUserInformations: (email, password) => dispatch(saveUserCredentials(email, password))
  }
}


//global.sessionToken = null;

class Connexion extends React.Component {

  constructor(props) {
    super(props);
    global.sessionToken = null;
    global.sessionRefresh = null;
    global.email = null;
    global.password = null;
    global.sessionRestaurant = null;
    this.state = {
      sessionUser: null,
      sessionRestaurant: null,
      //sessionToken: null,
      error:{ bool: false, message: "" } 
    };

    this._prepareGet()    
  }

  /* Go to a component */
  _goTo = (action) =>{
    switch(action) {
        case "password":
          this.props.navigation.navigate("ForgotPassword");
          break;

        case "email":
          this.props.navigation.navigate("ForgotLogin")
          break;
        case "registration":
          this.props.navigation.navigate("registration")
          break;

        case "connexion":
            this.props.navigation.navigate("connexion")
            break;

        case "tabNavigation":
            return(this.props.navigation.navigate("tabNavigation"))

    }
  }

  async _storeConnexion(user, restaurant, token){
    try {
        await AsyncStorage.multiSet([
          ["user", user+""],
          ["restaurant", restaurant+""],
          ["token", token+""]
        ])
    } catch (error) {
      console.log(error)
    }
  };

  async _prepareGet(){
    await AsyncStorage.multiGet(['user', 'restaurant', 'token']).then((data) =>{
        this.setState({ sessionUser: data[0][1], sessionRestaurant: data[1][1], sessionToken: [0][2]})
        if(this.state.sessionUser != null && this.state.sessionRestaurant != null, this.state.sessionToken != null){
          return (this._goTo("tabNavigation"))
        }
    })
    .catch(error=>{
      console.log(error);
    })
  }




  _verify(){
    if(this.props.email != ""){
      this.setState({ error: { bool: false, message: ""} })
       if(this.props.password != ""){
        this.setState({ error: { bool: false, message: ""} })
          if(this.props.connexion){
            this._storeConnexion(
              this.state.sessionUser,
              this.state.sessionRestaurant,
              this.state.sessionToken
            )
            this._goTo("tabNavigation")
          }else {
            Alert.alert("Identifiant ou mot de passe incorrect");
          }
       }
       else {
         Alert.alert("Veuillez rentrer votre mot de passe");
      }
     }
     else{ 
       Alert.alert("Veuillez rentrer votre identifiant");
      }

  }

  _validate(){
    let formData={
      username: this.props.email,
      password: this.props.password
    }
    console.log('les identifiants :: ' + JSON.stringify(formData))
    verifyConnexion(formData).then(data => {
      if(data !== null){
        console.log('DATA')
        console.log(data)
        //Sets connexion to true using Redux
        this.props.login()
        global.sessionToken= data['access'];
        global.sessionRefresh = data['refresh'];
        global.email = this.props.email;
        global.password = this.props.password;
        
        console.log('TOKEN DATA')
        console.log(global.sessionToken)
        console.log(global.email)

        //This function will get the informations of the company, user, and restaurant, to stock it thanks to redux in the store.
        getRestaurantOwnerDetail().then(data => {
            global.sessionRestaurant = data[0].restaurant.id
            //console.log(data[0].restaurant.id)
            console.log('ID RESTO')
            console.log(global.sessionRestaurant)
        })
      } else {
        console.log('failure')
      }      
    }).then(() => this._verify())
    console.log("valider cliqué")

  }



  /*Va afficher le formulaire d'authentification / Will display the authentication form */
  displaylogin(){
    console.log('la connexion' + this.props.connexion)
    const logo = require('../../Assets/img/MARKUS-logo.png');
    return (
      
      // <KeyboardAvoidingView style={{flex:1, alignItems:'center',backgroundColor: '#04295D'}} behavior='height'>
        <View style={styles.mainContainer}>
          <View style={styles.content_container}>
          { this.state.error.bool ? <Text style={{backgroundColor: "red", color: "white", fontSize: 20, textAlign: "center"}}>{this.state.error.message}</Text> : null}
          {/* <LoadingConnexion/> */}

          {/* <FadeIn> */}
              <View style={{ alignItems: "center", justifyContent: "center", flex: 0.8}}>
                <Image 
                resizeMode={"contain"}
                  source={logo} 
                  style={[styles.logo]}
                />
              </View>

              <View style={styles.signIn}>
                <View style={styles.signInContent}>
                  <View style={styles.inpout}> 
                    <View style={styles.inputContent}>
                      <FontAwesomeIcon icon={ faUser } style={styles.icon} color={"white"} size={24} />
                      <TextInput 
                        placeholder='Identifiant'
                        placeholderTextColor="lightgrey"
                        value={this.props.email}
                        style={styles.text_input} 
                        autoCorrect={false} 
                        onChangeText={(value)=>{this.props.saveUserInformations(value, this.props.password)}} 
                      />
                    </View>
                  </View>

                  <View style={styles.inpout}>
                    <View style={styles.inputContent}>
                      <FontAwesomeIcon icon={ faLock } style={styles.icon} color={"white"} size={24}/>
                      <TextInput 
                        secureTextEntry={true} 
                        placeholder='Mot de passe' 
                        placeholderTextColor="lightgrey"
                        value={this.props.password}
                        style={styles.text_input} 
                        autoCorrect={false} 
                        onChangeText={(value)=>{this.props.saveUserInformations(this.props.email, value)}}
                      />  
                    </View>
                  </View>

                

                  <TouchableOpacity 
                    onPress = {() => {
                    this._validate()
                    //this._goTo("tabNavigation")
                    }}  
                    style={styles.button}
                    activeOpacity={0.8}
                  >  
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>SE CONNECTER</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress = {() => {
                    this._goTo("connexion")
                    }}  
                    style={styles.button}
                    activeOpacity={0.8}
                  >  
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>SE CONNECTER EN TANT QUE RESTAURANT</Text>
                    </View>
                  </TouchableOpacity>

                </View>         
            </View>
          </View>
        </View>
      // </KeyboardAvoidingView>

  );
  }

  render() {
    return(
      <View style={{flex:1,width:'100%'}}>
          {this.state.sessionToken == null ? this.displaylogin() : null}
      </View>
      );
    }
}


const styles = StyleSheet.create({
  
  mainContainer:{ 
    flex: 1, 
    width: "100%",
    backgroundColor: "#0d3f6c",
  },
  content_container: {
    flex: 1,
    //width: phoneWidth,
    padding: "3%",
    justifyContent: "space-around"
  },
  logo:{
    width: 200,
    height: 200,
    //backgroundColor: "yellow"
  },
  signIn: {
    flex: 1,
    //backgroundColor: "yellow",
  },
  signInContent: {
    flex: 1
  },
  inpout: {
    width: "100%", 
    marginVertical: '1%', 
    borderColor: "#34495e", 
    borderWidth: .5,
    borderRadius: 2,
    backgroundColor: '#082743'
  },
  inputContent:{
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "space-between",
    padding: "1%"
},
  text_input:{
    //backgroundColor: "yellow",
    textAlignVertical: "center",
    width: "87%",
    fontSize: 15,
    color: "white"
  },
  icon: {
    //backgroundColor: "red",
    margin: "2%",
    width: "10%"
  },
  button: {
    width: "100%", 
    marginVertical: '3%', 
    borderColor: "lightgrey", 
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: '#163c61'
  },
  buttonContent:{
    flexDirection:'row', 
    alignItems:'center',
    justifyContent: "center",
    padding: "2%"
  },
  buttonText: {
      flex:1,
      fontSize: 16,
      /* fontFamily: "Gill Sans", */
      color: "lightgrey",
      //backgroundColor: "yellow",
      textAlign: "center",
      padding: "1%"
    },
  text_button_2: {
      fontSize: 12,
      /* fontFamily: "Gill Sans", */
      color: "white",
      //backgroundColor: "yellow",
      textAlign: "center",
      padding: "1%"
  }
});


/* Connecting the store to this component */
export default connect(mapStateToProps, mapDispatchToProps)(Connexion);