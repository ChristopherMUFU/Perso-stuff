import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, TextInput, CheckBox, Alert,StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as Theme from '../../Styles/Theme'

export default class ConfirmationContrat extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.checkbox_container}>
                    <CheckBox
                        style={styles.checkbox_box}
                        value={this.checkbox_address}
                        tintColors={{ false: 'white', true: 'white' }}
                        onValueChange={(newvalue) => {
                            this.checkbox_address = newvalue
                        }}
                    />
                    <Text style={styles.checkbox_label}>
                        Envoyer le contrat sur la boîte mail du salarié
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={styles.textinput_boxes}
                        keyboardType='default'
                        placeholder={`Renseigner l'adresse mail du salarié`}
                    />
                </View>
                <TouchableOpacity style={Theme.buttonsV2.touchAble} style={styles.envoyercontainer} >
                    <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={Theme.buttonsV2.linearGradient}>
                        <Text style={Theme.buttonsV2.buttonText}>
                            Envoyer le contrat au salarié
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={Theme.buttonsV2.touchAble} style={styles.enregistrercontainer} >
                    <LinearGradient elevation={5} colors={['#696969', '#595959', '#494949']} style={Theme.buttonsV2.linearGradient}>
                        <Text style={Theme.buttonsV2.buttonText}>
                            Enregistrer
                            </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3C3C3C',
        flex:1,
        height:'100%'    
    },
    checkbox_container:{
        flexDirection: 'row',
        marginTop: '40%',
        marginLeft:'10%',
    },
    checkbox_box:{
        alignSelf: 'flex-start'
    },
    checkbox_label:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        margin: 7,
    },
    textinput_boxes:{
        backgroundColor: 'white',
        height: 50,
        width:'80%',
        marginLeft:'12%',
        marginTop:'4%',
        borderRadius: 7,
        fontSize: 15,
        paddingLeft: 20
    },
    envoyercontainer: {
        width: '80%',
        marginLeft: 50,
        marginTop: 50
    },
    enregistrercontainer: {
        width: '80%',
        marginLeft: 50,
        marginTop: -10
    }
})