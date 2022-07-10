import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {inscriptionStyle} from './Style';
import MyAccount from './MyAccount';

export default class Company extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        
      };
    }
    
    
    
    render(){
        return(
        
            <View style={inscriptionStyle.container}>
                <Text style={inscriptionStyle.title}>
                    Société
                </Text>
                <View style={inscriptionStyle.fields_container}>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Dénomination sociale</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.company.name}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Adresse du siège social</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.company.address}</TextInput>
                    </View>
                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Code postal</Text>
                            <TextInput style={inscriptionStyle.zip_textinput}>{this.props.restaurantOwner.company.postal_code}</TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Ville</Text>
                            <TextInput style={inscriptionStyle.city_textinput}>{this.props.restaurantOwner.company.city}</TextInput>
                        </View>
                    </View>
                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Capital</Text>
                            <TextInput style={inscriptionStyle.zip_textinput}>{this.props.restaurantOwner.company.capital}</TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>SIREN</Text>
                            <TextInput style={inscriptionStyle.city_textinput}>{this.props.restaurantOwner.company.SIRET_number}</TextInput>
                        </View>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Nom de la caisse de retraite</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.company.retirement_fund_name}</TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Adresse de la caisse de retraite</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}>{this.props.restaurantOwner.company.retirement_fund_address}</TextInput>
                    </View>
                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Code postal</Text>
                            <TextInput style={inscriptionStyle.zip_textinput}>{this.props.restaurantOwner.company.retirement_fund_city}</TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Ville</Text>
                            <TextInput style={inscriptionStyle.city_textinput}>{this.props.restaurantOwner.company.retirement_fund_postal_code}</TextInput>
                        </View>
                    </View>
                </View>
            </View>
            
        )
    }
}
