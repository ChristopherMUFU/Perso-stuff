import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuLettresTypes from '../Components/Staff/lettres_types/MenuLettresTypes'
import MenuLicenciement from '../Components/Staff/lettres_types/MenuLicenciement'
import MenuConvocation from '../Components/Staff/lettres_types/MenuConvocation'
import CreationLettres from '../Components/Staff/lettres_types/CreationLettres'


function MenuLettresTypesScreen({navigation}) {
	return (
		<MenuLettresTypes navigation = {navigation} />
	);
}

function MenuLicenciementScreen({navigation , route}) {
	return (
		<MenuLicenciement navigation = {navigation} route = {route}/>
	)
}

function MenuConvocationScreen({navigation , route}) {
	return (
		<MenuConvocation navigation = {navigation} route = {route}/>
	)
}

function CreationLettresScreen({navigation , route}) {
	return (
		<CreationLettres navigation = {navigation} route = {route}/>
	)
}


const Stack = createStackNavigator();
export default class ContratsNavigation extends React.Component {
    render () {
      return(
        <Stack.Navigator
            initialRouteName = 'lettres_types_menu'
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: 'white'},
               }
            }
        >

            <Stack.Screen
               name = 'lettres_types_menu'
               title = 'Lettres Types'
               component = {MenuLettresTypesScreen}
               
            />
            <Stack.Screen
               name = 'MenuLicenciement'
               title = 'Licencier'
               component = {MenuLicenciementScreen}
               
            />

            <Stack.Screen
               name = 'MenuConvocation'
               title = 'Convoquer'
               component = {MenuConvocationScreen}
               
            /> 

            <Stack.Screen
               name = 'CreationLettres'
               title = 'Créer une lettre'
               component = {CreationLettresScreen}
               
            />
        </Stack.Navigator>
    )}
}