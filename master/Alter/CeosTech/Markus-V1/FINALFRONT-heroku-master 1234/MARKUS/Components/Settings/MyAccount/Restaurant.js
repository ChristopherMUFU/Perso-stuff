import React from 'react'
import { View, Text, TextInput} from 'react-native'

import {inscriptionStyle} from './Style'



export default class Restaurant extends React.Component{
    
    
    render(){
        return(
            <View style={inscriptionStyle.container}>
                <Text style={inscriptionStyle.title}>
                    √Čtablissement
                </Text>
                <View style={inscriptionStyle.fields_container}>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Nom de l'√©tablissement</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.restaurant.name}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Adresse (rue, avenue, boulevard, voie...)</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.restaurant.address}</TextInput>
                    </View>
                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Code postal</Text>
                            <TextInput style={inscriptionStyle.zip_textinput}>{this.props.restaurantOwner.restaurant.postal_code}</TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Ville</Text>
                            <TextInput style={inscriptionStyle.city_textinput}>{this.props.restaurantOwner.restaurant.city}</TextInput>
                        </View>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Mail de l'√©tablissement</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Confirmer le email de l'√©tablissement</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Poste dans l'entreprise</Text>
                            <TextInput style={inscriptionStyle.position_textinput}>{this.props.restaurantOwner.company_position}</TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Num√©ro de t√©l√©phone</Text>
                            <TextInput style={inscriptionStyle.phonenumber_textinput}>{this.props.restaurantOwner.phone_number}</TextInput>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
