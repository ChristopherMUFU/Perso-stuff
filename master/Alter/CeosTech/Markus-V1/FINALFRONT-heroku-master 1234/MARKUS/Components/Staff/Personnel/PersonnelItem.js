import React, { Component } from 'react';
import {
    FlatList, StyleSheet, Text, View, Image, Alert, Platform, Dimensions, TouchableOpacity, Animated
} from 'react-native';
import flatListData from './data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './Modal/AddModal';
import EditModal from './Modal/EditModal';
import { showEditModal } from './Modal/EditModal';
import DetailModal from './Modal/DetailModal';
import { Dropdown } from 'react-native-material-dropdown';
import { item } from './data/itemFilter';
import GoToButton from './GoToButton';
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { verifStaff, componentDidMount } from './Personnelscreen';
import {loadStaff, getPersonnel, deletePersonnel} from '../../../API/StaffData';
import {Swipeable} from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faFax, faEnvelopeOpen, faMapPin, faAddressBook, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp, faEuroSign, faGlobeEurope} from '@fortawesome/free-solid-svg-icons';
import call from 'react-native-phone-call';
import email from 'react-native-email';
//import * as Theme from "../../Styles/Theme";
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { connect } from 'react-redux';
const mapStateToProps = (state) => ({
    restaurantOwnerDetails: state.accountsData.restaurantOwnerDetails
})


const phoneWidth = Dimensions.get('window').width;
let validEditModal = false;



let recupData = [];
//??
export default class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
        global.personnelItem = null;
        this.state = {
            activeRowKey: null,
            navigation: this.props.navigation,
            myText: 'I\'m ready to get swiped!',
            gestureName: 'none',
            backgroundColor: '#fff',
            isPressed: false,

        };
    }
    // Parcours du tableau indexé / Path of the indexed table
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }
    // à voir
    _delete(){
        Alert.alert(
            'Attention',
            'Voulez-vous vraiment supprimer ce personnel?',
            [
                { text: 'Non', onPress: () => this.props.parentFlatList._dataRefresh(), style: 'cancel' },
                {
                    text: 'Oui', onPress: () => {
                        this.props.parentFlatList._removePersonnel(this.props.staff.id);

                        //componentDidMount();
                        //verifStaff(this.props.item);  => à voir comment le rajouter
                    }
                },
            ],
            { cancelable: true }
                        );
    }
    
    call = () => {
       //handler to make a call
       const args = {
           number: this.props.staff.numero_telephone ,
           prompt: false,
       };
       call(args).catch(console.error);
    };
    
     handleEmail = () => {
       const to = [this.props.staff.courriel] // string or array of email addresses
       email(to, {
           // Optional additional arguments
           cc: [''], // string or array of email addresses
           bcc: '', // string or array of email addresses
           subject: '',
           body: ''
       }).catch(console.error)
    };
    
    _recupDetail(data)
    {
        global.personnelItem = data;
    }
    
    _goTo(nav){
        console.log(recupData);
        this.props.navigation.navigate(nav);
    }

    _showHideDetail(){
        if(this.state.isPressed === false){
            this.setState({
                isPressed: true
            })
        }
        else{
           this.setState({
                isPressed: false
            }) 
        }
    }
    
    // Librairie Swipeaout / Se referer aux fonctions de cette dernière / Swipeaout library / Refer to the functions of the latter
    render = () => {
        
        //console.log(this.state.item)
        //console.log(item.id)
        //console.log(this.props.item)
        return (
            <TouchableOpacity 
                onPress = {() => {this._showHideDetail()}}
                style={styles.mainContainer}
                activeOpacity={0.9}
            >
                <Animated.View style={styles.infoContainer}>
                    <View style={styles.firstInfos} >
                        <Text style={styles.nameText} numberOfLines={this.state.isPressed?3:1} >{this.props.staff.nom+" "+this.props.staff.prenom}</Text> 
                        <Text style={styles.workText}>{this.props.staff.poste}</Text>
                        {!this.state.isPressed ? <Text style={styles.workNumber} >{this.props.staff.numero_telephone}</Text> : null }
                    </View>
                    <Image source={require("../../../Assets/img/entrecote.jpg")}
                            resizeMode="cover"
                            style={styles.image}
                        />
                {this.state.isPressed ?
                    <View style={styles.secondInfos}>
                        <Text style={styles.titleDetails}>Civilité : <Text style={styles.textDetails}>{this.props.staff.civilite}</Text></Text>

                        <Text style={styles.titleDetails}>Tél : <Text onPress={() => this.call()} style={[styles.callNumber, {textDecorationLine: "underline", color: "white"}]}>{this.props.staff.numero_telephone}</Text></Text>

                        <Text style={styles.titleDetails}>Adresse : <Text style={styles.textDetails}>{this.props.staff.addresse+", " +this.props.staff.ville+", "+this.props.staff.code_postale}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Mail : <Text onPress = {() =>  this.handleEmail() } style={[styles.textDetails, {textDecorationLine: "underline", color: "white"}]}>{this.props.staff.courriel}</Text></Text>
                        
                        <Text style={styles.titleDetails}>N° sécurité sociale : <Text style={styles.textDetails}>{this.props.staff.numero_securite_social}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Date de naissance : <Text style={styles.textDetails}>{this.props.staff.date_de_naissance}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Lieu de naissance : <Text style={styles.textDetails}>{this.props.staff.lieu_de_naissance}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Nationalité : <Text style={styles.textDetails}>{this.props.staff.nationnalite}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Statut : <Text style={styles.textDetails}>{this.props.staff.statut}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Date d'entrée : <Text style={styles.textDetails}>{this.props.staff.date_d_entree}</Text></Text>
                        
                        <Text style={styles.titleDetails}>Salaire brut : <Text style={styles.textDetails}>{this.props.staff.salaire}€</Text></Text>
                    </View>
                    : null
                }
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        padding: "3%",
        width: "100%",
        alignSelf: 'center',
        backgroundColor: '#04295D',
        borderRadius: 10,
        overflow: "hidden"
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },
    firstInfos: { 
        width: "74%", 
    },
    image: {
        padding: 0, 
        height: "100%", 
        width: "25%",
        maxHeight: 100,
        maxWidth: 100,
        position: "absolute",
        right: '0%',
        borderRadius: 10
    },
    nameText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginVertical: "1%",
        justifyContent: "center"
    },
    workText: {
        color: "white",
        fontStyle: "italic",
        textAlignVertical: "center",
        fontWeight: "900",
        marginBottom: "2%",
        fontSize: 15
    },
    workNumber: {
        color: "lightblue",
        textAlignVertical: "center",
        fontSize: 15
    },
    titleDetails : {
        color: "lightblue",
        fontWeight: "bold",
    },
    textDetails : {
        color: "white",
    },
    buttonText: {
    },
   
});

