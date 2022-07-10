//Navigation/StaffNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuEmployementContract from '../Components/Staff/Contrats_de_travail/MenuEmployementContract'
import EmployementContract from '../Components/Staff/Contrats_de_travail/EmployementContract'
import Avenant from '../Components/Staff/Avenant/MenuAvenant'
import CreationContract from '../Components/Staff/Contrats_de_travail/CreationContract'
import CreationAvenant from '../Components/Staff/Avenant/CreationAvenant'


// NAVIGATION GESTION DES STOCKS ----------------
//// SCREENS
function MenuContratsScreen({navigation}) {
	return (
		<MenuEmployementContract navigation = {navigation} />
	);
}

function EmployementContractScreen({navigation , route}) {
	return (
		<EmployementContract navigation = {navigation} route = {route}/>
	)
}

function CreationContractScreen({navigation , route}) {
	return (
		<CreationContract navigation = {navigation} route = {route}/>
	)
}

function AvenantScreen({navigation , route}) {
	return (
		<Avenant navigation = {navigation} route = {route}/>
	)
}

function CreationAvenantScreen({navigation , route}) {
	return (
		<CreationAvenant navigation = {navigation} route = {route}/>
	)
}






//// STACK
const Stack = createStackNavigator();
export default class ContratsNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator
            initialRouteName = 'contrats_menu'
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: 'white'},
               }
            }
          >

            <Stack.Screen
               name = 'contrats_menu'
               title = 'Contrats de travail'
               component = {MenuContratsScreen}
               
            />

            <Stack.Screen
               name = 'ContratTravail'
               component = {EmployementContractScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
                     headerMode: 'screen',
                     headerBackTitle: ' ',
                     headerStyle: {
                        backgroundColor : '#3C3C3C',
                     }					
                  }
                  )
               }
            />

            <Stack.Screen
               name = 'Avenant'
               component = {AvenantScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
                     headerMode: 'screen',
                     headerBackTitle: ' ',
                     headerStyle: {
                        backgroundColor : '#3C3C3C',
                     }					
                  }
                  )
               }
            />

            <Stack.Screen
               name = 'CreateEmployementContract'
               component = {CreationContractScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CreationContract', 
                     headerMode: 'screen',
                     headerBackTitle: '',
                     headerStyle: {
                        backgroundColor : '#3C3C3C',
                     }					
                  }
                  )
               }
            />

            <Stack.Screen
               name = 'CreationAvenant'
               component = {CreationAvenantScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CreationAvenant', 
                     headerMode: 'screen',
                     headerBackTitle: ' ',
                     headerStyle: {
                        backgroundColor : '#3C3C3C',
                     }					
                  }
                  )
               }
            />
       
        
         </Stack.Navigator>
      );
   } 
}