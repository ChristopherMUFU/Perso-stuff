//Navigation/StockNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import CommandesEnCours from '../Components/Commandes/CommandesEnCours';
import MenuCommandes from '../Components/Commandes/MenuCommandes';
import NouvelleCommande from '../Components/Commandes/NouvelleCommande';
import HistoriqueCommandes from '../Components/Commandes/HistoriqueCommandes';

function MenuCommandesScreen({navigation}) {
	return (
		<MenuCommandes navigation = {navigation} />
	);
}

function NouvelleCommandeScreen({navigation}) {
	return (
		<NouvelleCommande navigation = {navigation} />
	);
}

function CommandesEnCoursScreen({navigation}) {
	return (
		<CommandesEnCours navigation = {navigation} />
	);
}

function HistoriqueCommandesScreen({navigation}) {
	return (
		<HistoriqueCommandes navigation = {navigation} />
	);
}


//// STACK
const Stack = createStackNavigator();
export default class GestionCommandesNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: 'white'},
               }
            }
          >
            <Stack.Screen
					name = 'commandes'
					component = {MenuCommandesScreen}
					options = {({navigation}) => ({headerShown: false})}
			/>

            <Stack.Screen
					name = 'NOUVELLE_COMMANDE'
					component = {NouvelleCommandeScreen}
					options = { ({ navigation }) => (
						{
						   title: 'Nouvelles commandes', 
						   headerMode: 'screen',
						   headerBackTitle: ' ',
						   headerStyle: {
							  backgroundColor : '#FFFFFF',
							  shadowColor: "#04295D"
						   },
						   headerTintColor: "#04295D"	
						})
					 }
			/>

            <Stack.Screen
					name = 'COMMANDES_EN_COURS'
					component = {CommandesEnCoursScreen}
					options = { ({ navigation }) => (
						{
						   title: 'Commandes en cours', 
						   headerMode: 'screen',
						   headerBackTitle: ' ',
						   headerStyle: {
							  backgroundColor : '#FFFFFF',
							  shadowColor: "#04295D"
						   },
						   headerTintColor: "#04295D"	
						})
					 }
			/>

            <Stack.Screen
					name = 'HISTORIQUE_COMMANDES'
					component = {HistoriqueCommandesScreen}
					options = { ({ navigation }) => (
						{
						   title: 'Historique des commandes', 
						   headerMode: 'screen',
						   headerBackTitle: ' ',
						   headerStyle: {
							  backgroundColor : '#FFFFFF',
							  shadowColor: "#04295D"
						   },
						   headerTintColor: "#04295D"	
						})
					 }
			/>

         </Stack.Navigator>
      );
   }
}