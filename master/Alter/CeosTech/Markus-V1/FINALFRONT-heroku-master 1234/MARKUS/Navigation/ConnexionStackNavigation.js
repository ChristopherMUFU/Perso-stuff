// /Navigation/ConnexionStackNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import Connexion from '../Components/Connexion/Connexion';
import ForgotPassword from '../Components/Connexion/Security/ForgotPassword';
import ForgotMotdepasse from '../Components/Connexion/Security/ForgotMotdepasse';
import ForgotLogin from '../Components/Connexion/Security/ForgotLogin';
import Registration from '../Components/Connexion/Inscription/Registration';
import RegistrationStep1 from '../Components/Connexion/Inscription/Registration_steps/Step1';
import RegistrationStep2 from '../Components/Connexion/Inscription/Registration_steps/Step2';
import RegistrationStep3 from '../Components/Connexion/Inscription/Registration_steps/Step3';
import RegistrationStep4 from '../Components/Connexion/Inscription/Registration_steps/Step4';
import TabNavigation from '../Navigation/TabNavigation';
import CGVprivee from '../Components/Connexion/Inscription/CGVprivee';
import editPersonnel from '../Components/Staff/Personnel/editPersonnel';
import ConnexionSalarie from '../Components/Connexion/ConnexionSalarie';



// NAVIGATION CONNEXION ----------------
//// SCREENS
function ConnexionScreen({navigation}) {
	return (
		<Connexion navigation = {navigation} />
	);
}
function RegistrationScreen({navigation}){
	return(
		<Registration navigation = {navigation}/>
	)
}

function RegistrationStep1Screen({navigation, route}){
	return(
		<RegistrationStep1 navigation = {navigation} route = {route}/>
	)
}

function RegistrationStep2Screen({navigation, route}){
	return(
		<RegistrationStep2 navigation = {navigation} route = {route}/>
	)
}

function RegistrationStep3Screen({navigation, route}){
	return(
		<RegistrationStep3 navigation = {navigation} route = {route}/>
	)
}

function RegistrationStep4Screen({navigation, route}){
	return(
		<RegistrationStep4 navigation = {navigation} route = {route} />
	)
}

function CGVpriveeScreen({navigation}) {
	return (
	   <CGVprivee navigation = {navigation} />
	);
  }

function ForgotPasswordScreen({navigation}) {
	return (
		<ForgotPassword navigation = {navigation} />
	)
}

function ForgotMotdepasseScreen({navigation}) {
	return (
		<ForgotMotdepasse navigation = {navigation} />
	);
}
function ForgotLoginScreen({navigation}) {
	return (
		<ForgotLogin navigation = {navigation} />
	)
}
function TabNavigationScreen({navigation}) {
	return (
		<TabNavigation navigation = {navigation} />
	);
}
function ConnexionSalarieScreen({navigation}) {
	return (
		<ConnexionSalarie navigation = {navigation} />
	);
}



// STACK ---------------------------------
const Stack = createStackNavigator();
export default class ConnexionStackNavigation extends React.Component {
    render() {
        return(
			<Stack.Navigator
				screenOptions = {
					{
						headerTintColor: 'white',
						headerLeftContainerStyle: {paddingLeft: 10, color: 'white'}
					}
				}
				initialRouteName = 'connexion'
			>

				<Stack.Screen
					name = 'connexion'
					title = "Connexion"
					component = {ConnexionScreen}
					options = {
						({navigation}) => (
							{
								headerShown: false,
								headerStyle: {
									backgroundColor : '#FFFFFF',
									shadowColor: "#04295D"
								 },
								 headerTintColor: "#04295D"	
							}
						)
					}
				/>
				<Stack.Screen
					name = 'registration'
					component = {RegistrationScreen}
					options = {()=>({
						title: null,
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>

				<Stack.Screen
					name = 'cgvpublic'
					component = {CGVpriveeScreen}
					options = {()=>({
						title: null,
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>


				<Stack.Screen
					name = 'registrationStep1'
					component = {RegistrationStep1Screen}
					options = {()=>({
						title: 'Inscription 1/4',
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>

				<Stack.Screen
					name = 'registrationStep2'
					component = {RegistrationStep2Screen}
					options = {()=>({
						title: 'Inscription 2/4',
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>

				<Stack.Screen
					name = 'registrationStep3'
					component = {RegistrationStep3Screen}
					options = {()=>({
						title: 'Inscription 3/4',
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>

				<Stack.Screen
					name = 'registrationStep4'
					component = {RegistrationStep4Screen}
					options = {()=>({
						title: 'Inscription 4/4',
						headerShown: true,
						headerStyle: {
							backgroundColor : '#FFFFFF',
							shadowColor: "#04295D"
						 },
						 headerTintColor: "#04295D"	
					})}
				/>

				<Stack.Screen
					name = 'ForgotPassword'
					component = {ForgotPasswordScreen}
					options = {
						({navigation}) => (
							{
								title: null,
								headerStyle: {
									backgroundColor : '#3C3C3C',
								},
								headerTransparent: true

							}
						)
					}
				/>
				<Stack.Screen
					name = 'ForgotMotdepasse'
					component = {ForgotMotdepasseScreen}
					options = {
						({navigation}) => (
							{
								title: null,
								headerStyle: {
									backgroundColor : '#3C3C3C',
								},
								headerTransparent: true

							}
						)
					}
				/>
				<Stack.Screen
					name = 'ForgotLogin'
					component = {ForgotLoginScreen}
					options = { 
						({navigation}) => (
							{
								title: null,
								headerStyle: {
									backgroundColor : '#3C3C3C',
								},
								headerTransparent: true
							}
						)
					}
				/>
				<Stack.Screen
					name = 'connexionsalarie'
					component = {ConnexionSalarieScreen}
					options = {({navigation}) => ({
						headerShown: false,
						animationEnabled: false
					})}
				/>

				<Stack.Screen
					name = 'tabNavigation'
					component = {TabNavigationScreen}
					options = {({navigation}) => ({headerShown: false})}
				/>

			</Stack.Navigator>
		);
    }
}
