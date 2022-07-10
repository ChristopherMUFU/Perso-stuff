//Navigation/SettingsNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccount from '../Components/Settings/MyAccount/MyAccount';
import Display from '../Components/Settings/Display/Display';
import ImportDocs from '../Components/Settings/ImportDocs/ImportDocs';
import HelpNavigation from './HelpNavigation';
import MenuSettings from '../Components/Settings/MenuSettings';
import Help from '../Components/Settings/Help/Help';
import CGV from '../Components/Settings/Help/CGV';
import Guidedutilisation from '../Components/Settings/Help/Guidedutilisation';
import Confidentialite from '../Components/Settings/Help/Confidentialite';



// NAVIGATION PAGE SETTINGS ----------------
//// SCREENS

function MenuSettingsScreen({navigation}){
    return (
        <MenuSettings navigation = {navigation} />
    );
}
function MyAccountScreen({navigation}) {
	return (
		<MyAccount navigation = {navigation} />
	);
}
function DisplayScreen({navigation}) {
	return (
		<Display navigation = {navigation} />
	)
}
function ImportDocsScreen({navigation}) {
	return (
		<ImportDocs navigation = {navigation} />
	)
}
function HelpNavigationScreen({navigation}) {
	return (
		<Help navigation = {navigation} />
	)
}
function CGVScreen({navigation}) {
  return (
     <CGV navigation = {navigation} />
  );
}

function GUScreen({navigation}) {
   return (
      <Guidedutilisation navigation = {navigation} />
   );
}
function ConfidentialiteScreen({navigation}) {
  return (
     <Confidentialite navigation = {navigation} />
  );
}



//// STACK
const Stack = createStackNavigator();
export default class SettingsNavigation extends React.Component {
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
               name = 'account_settings'
               component = {MenuSettingsScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name = 'my_account'
               component = {MyAccountScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Mon compte',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
               name = 'display'
               component = {DisplayScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Affichage',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
               name = 'ImportDocs'
               component = {ImportDocsScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Charger Un Document',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
               name = 'help'
               component = {HelpNavigationScreen}
               options = { ({ navigation }) => (
                  {
                     title : '',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
               name = 'assistance'
               component = {HelpNavigationScreen}
               options = { ({ navigation }) => (
                  {
                     headerShown: false
                  }
                  )
               }
            />
            <Stack.Screen
               name = "cgv"
               component = {CGVScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CGU - Mentions légales',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
               name = "Guidedutilisation"
               component = {GUScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Guide d\'utilisation',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
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
                       name = "confidentialite"
                       component = {ConfidentialiteScreen}
                       options = { ({ navigation }) => (
                          {
                             title: 'Politique de confidentialité',
                             headerMode: 'screen',
                             headerBackTitle: ' ',
                             headerStyle: {
                              backgroundColor : '#FFFFFF',
                              shadowColor: "#04295D"
                           },
                           headerTintColor: "#04295D"	
                          }
                          )
                       }
                    />
         </Stack.Navigator>

      );
   }
}
