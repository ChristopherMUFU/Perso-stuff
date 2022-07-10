import React, { Component } from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'
import * as Styles from '../../Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faMailBulk, faCode } from '@fortawesome/free-solid-svg-icons'

export default class ForgotLogin extends Component {
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

    _validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    _verify(){
        if(this._validate(this.email)){
            console.log('mail ' + this.email + ' is validate')
            this.setState({error_mail: false})
        }
        else{
            this.setState({error_mail: true})
        }
    }
    
    _errorshow(){
        if(this.state.error_mail){
            return(<View style={{backgroundColor:'red', padding: 30}}><Text style={{color:'white'}}>Adresse mail non valide</Text></View>)
        }
    }

  render() {
    return (
        <ImageBackground source={require ('../../../Assets/img/fond.png')} style={Styles.styles.image}>
            {this._errorshow()}
            <View style={Styles.styles.contain}>
            <View style={Styles.forgot.border}></View>
            <View style={[Styles.forgot.borderTop,{left:'10%'}]}></View>
            <View style={[Styles.forgot.borderTop,{right:'10%'}]}></View>
                <Image source={require('../../../Assets/img/logo.png')} style={Styles.forgot.logo}/>
                <View style={Styles.styles.container}>
                    <Text style={Styles.forgot.text}>Pour retrouvez votre login oublié, veuillez entrer votre adresse mail :</Text>
                    <View style={Styles.forgot.textIconSection}>
                        <TextInput placeholder="Email" style={Styles.forgot.formulaire} autoCorrect={false} onChangeText={(mail) => this._tapEmail(mail)} />
                        <FontAwesomeIcon icon={ faMailBulk } style={Styles.forgot.icon} />
                    </View>
                    <View style={Styles.forgot.textIconSection}>
                      <TextInput placeholder="PIN" keyboardType='numeric' maxLength={4} style={Styles.forgot.formulaire} autoCorrect={false} onChangeText={(pin) => this._tapPin(pin)} />
                      <FontAwesomeIcon icon={ faCode } style={Styles.forgot.icon} />
                    </View>

                    <TouchableOpacity onPress = {() => { this._verify()}} style={{width:'70%', marginBottom: 10}}>
                        <View style = {Styles.styles.button}>
                            <Text style = {{color:'white'}}>Récupérer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
  }
}