//Navigation/HelpNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditFournisseur from '../Components/Stocks/EditFournisseur'
import NouveauFournisseur from '../Components/Stocks/NouveauFournisseur'



// NAVIGATION PAGE SETTINGS ----------------
//// SCREENS

function EditFournisseurScreen({navigation}) {
	return (
		<EditFournisseur navigation = {navigation} />
	)
}

//// STACK
const Stack = createStackNavigator();
export default class SettingsNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator initialRouteName = {FournisseurItemScreen}
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: '#3C3C3C'},
               }
            }
          >

            <Stack.Screen
               name = 'edit_fournisseur'
               component = {EditFournisseurScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'EditFournisseur', 
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
  