import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput, Button, TouchableNativeFeedback, Keyboard, KeyboardAvoidingView, UIManager, Animated
} from 'react-native';

import Modal from 'react-native-modalbox';
import AntDesign from 'react-native-vector-icons/AntDesign';

var screen = Dimensions.get('window');
export default class DeatailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            LastName: '',
            Work: '',
            TelephoneNumber: '',
            Adresse: '',
            Courriel: '',
            Secu: '',
            DateNaissance: '',
            Lieu: '',
            Nationalité: '',
            Salaire: '',
            Date: '',

        };
    }
    showDetailModal = (editingFood, flatlistItem) => {
        console.log(`editingFood = ${JSON.stringify(editingFood)}`);
        this.setState({
            Key: editingFood.key,
            Name: editingFood.nom + " " + editingFood.prenom,
            Work: editingFood.poste,
            TelephoneNumber: editingFood.numero_telephone,
            Adresse: editingFood.addresse,
            Courriel: editingFood.courriel,
            Secu: editingFood.numero_securite_social,
            DateNaissance: editingFood.date_de_naissance,
            Lieu: editingFood.lieu_de_naissance,
            Salaire: editingFood.salaire,
            Nationalité: editingFood.nationnalite,
            Qualification: editingFood.qualification, // à voir
            Date: editingFood.date_d_entree,
            flatlistItem: flatlistItem
        });
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }
    render() {
        const { isValid } = this.state;
        const { shift } = this.state;
        return (
            <Modal
                ref={"myModal"}
                style={{
                    margin: 0,
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    height: screen.height,
                    borderWidth: 1,
                    borderColor: "#3BB9E0",
                    borderRadius: 5,
                    backgroundColor: '#303030',
                    alignItems: 'center'
                }}
                position={"center"}
                backdrop={true}
                swipeToClose={true}
                backdropColor={'black'}
                backButtonClose={true}
                coverScreen={true}
                backdropPressToClose={false}
                isOpen={this.state.modalVisible}
                onClosed={() => {
                    this.setState({ modalVisible: false });
                }}
                onClosed={() => {

                }}
            >
                <AntDesign name="down" size={30} color="white" style={{
                    fontStyle: 'normal',
                    bottom : 60,
                    color: 'white',
                    fontWeight: 'bold'
                }}/>
                <Text style={{
                    fontStyle: 'normal',
                    fontSize: 20,
                    color: 'white',
                    fontWeight: 'bold'
                }}> DETAILS DU PERSONNEL</Text>

                <View style={{
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 20,
                    height: screen.height - 250,
                    marginTop: 60,
                    backgroundColor: 'black',
                    borderWidth: 0.3,
                    borderColor: "#3BB9E0",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}>
                    <View style={{marginTop: 20}}>
                        <Text
                            style={{
                                
                                alignSelf: 'center',
                                fontStyle: 'normal',
                                borderBottomColor: 'gray',
                                fontSize: 24,
                                lineHeight: 28,
                                display: 'flex',
                                color: 'white'
                            }}> {this.state.Name + " " + this.state.LastName}
                        </Text>
                    
                        <Text
                            style={{
                                fontStyle: 'normal',
                                borderBottomColor: 'gray',
                                fontSize: 18,
                                lineHeight: 21,
                                display: 'flex',
                                color: '#91E5F6',
                                alignSelf: 'center',
                                
                            }}> {this.state.Work}
                        </Text>
                    </View>
                <View style={{ flexDirection: 'row', marginTop: '15%', lineHeight: 20, }}>
                    <View>
                        <Text style={{
                            marginBottom: 15,
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 10,
                        }}>Tèl : </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            marginBottom: 15,
                        }}> Adresse: </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            marginBottom: 15,
                        }}> Courriel: </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            marginBottom: 15,
                        }}> N° Sécurité Sociale: </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            marginBottom: 15,
                        }}> Date de Naissance : </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                            marginBottom: 15,
                        }}> Lieu de Naissance : </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            display: 'flex',
                            marginBottom: 15,
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                        }}> Nationalité : </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            marginBottom: 15,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                        }}> Salaire: </Text>
                        <Text style={{
                            fontStyle: 'normal',
                            borderBottomColor: 'gray',
                            fontSize: 14,
                            marginBottom: 15,
                            display: 'flex',
                            alignItems: 'flex-start',
                            color: '#91E5F6',
                            marginLeft: 8,
                        }}> Date d’entrée : </Text>
                    </View>
                        <View style={{}}>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.TelephoneNumber}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.Adresse}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.Courriel}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.Secu}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.DateNaissance}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.Lieu}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                   
                                }}> {this.state.Nationalité}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                   
                                }}> {this.state.Salaire}
                            </Text>
                            <Text
                                style={{
                                    fontStyle: 'normal',
                                    fontSize: 14,
                                    color: 'white',
                                    marginBottom: 15,
                                    
                                }}> {this.state.Date}
                            </Text>
                        </View>
                    </View>

                </View>
            </Modal>
        );
    }
}