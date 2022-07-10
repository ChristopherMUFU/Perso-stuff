// /Navigation/Navigation.js

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigation from './TabNavigation'
import ConnexionStackNavigation from './ConnexionStackNavigation'
import StaffNavigation from './StaffNavigation'
import linking from '../linking';
import TabNavigator from './TabNavigation';
import Personnelscreen from '../Components/Staff/Personnel/Personnelscreen';

// NAVIGATION 
export default class Navigation extends React.Component {
	render() {
		return (
			<NavigationContainer linking={linking}>
				
				<ConnexionStackNavigation />
				{/* <TabNavigation /> */}
			</NavigationContainer>
		);
	}
}


