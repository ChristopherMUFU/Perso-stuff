import React from 'react'
import { View, Text, TextInput} from 'react-native'

import {inscriptionStyle} from './Style'

export default class Profile extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
    //console.log(this.props.restaurantOwner)
        return(
            <View style={inscriptionStyle.container}>
                <Text style={inscriptionStyle.title}>
                    Profil utilisateur
                </Text>
                <View style={inscriptionStyle.fields_container}>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={{color: 'white',fontWeight: 'bold', fontSize:15}}> Nom </Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.nom}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Prénom</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.prénom}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Email</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.email}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Confirmer votre email</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Mot de passe</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Confirmer mot de passe</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Numéro de téléphone</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.phone_number}</TextInput>
                    </View>
                </View>
            </View>
        )
    }
}
