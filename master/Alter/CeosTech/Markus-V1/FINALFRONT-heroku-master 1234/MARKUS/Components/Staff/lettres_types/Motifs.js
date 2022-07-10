

import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import * as Theme from "../styles/Theme"


export default class Motifs extends React.Component{
	/* GO TO A PAGE
			Appelée par le menu / Called by the menu
	*/
  	_goTo = (action) =>{
	switch(action) {
		case "inaptitude":
			this.props.navigation.navigate("Inaptitude");
			break;
		
		case "economique":
			this.props.navigation.navigate("Economique");
            break;
            
        case "personnel":
            this.props.navigation.navigate("Personnel");
            break;
		}
  	}

	// RENDER
	render(){
		return(
			// MENU LETTRES TYPES / STANDARD LETTERS MENU
			<View style={Theme.styles.container}>
				<Text style={Theme.styles.title}>Lettres Types<Text style={{color:'#6ed6ff'}}>.</Text></Text>
				
				<Text style={Theme.styles.minititle}>Motifs de Licenciement</Text>
				<View style={Theme.styles.underline}></View>

				<TouchableOpacity onPress = {() => { this._goTo('inaptitude')}} style={{width:'80%', marginBottom: 10}}>
					<View style = {Theme.buttons.choices}>
						<Text style = {Theme.buttons.titlechoice}>Inaptitude</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress = {() => { this._goTo('economique')}} style={{width:'80%', marginBottom: 10}}>
					<View style = {Theme.buttons.choices}>
						<Text style = {Theme.buttons.titlechoice}>Economique Individuel</Text>
					</View>
				</TouchableOpacity>

                <TouchableOpacity onPress = {() => { this._goTo('personnel')}} style={{width:'80%', marginBottom: 10}}>
					<View style = {Theme.buttons.choices}>
						<Text style = {Theme.buttons.titlechoice}>Personnel Disciplinaire</Text>
					</View>
				</TouchableOpacity>

			</View>
		);
	}
}