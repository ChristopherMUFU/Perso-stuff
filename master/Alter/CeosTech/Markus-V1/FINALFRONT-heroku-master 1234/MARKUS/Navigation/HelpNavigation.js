//Navigation/HelpNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CGU from '../Components/Settings/Help/CGU';
import CGV from '../Components/Settings/Help/CGV';
import NoticeInfoImp from '../Components/Settings/Help/NoticeInfoImp';
import SupportTechnique from '../Components/Settings/Help/SupportTechnique';
import InformationsEktor from '../Components/Settings/Help/ImformationsEktor';
import Help from '../Components/Settings/Help/Help';
import Guidedutilisation from '../Components/Settings/Help/Guidedutilisation';



// NAVIGATION PAGE SETTINGS ----------------
//// SCREENS

function HelpScreen({navigation}){
    return (
        <Help navigation = {navigation} />
    );
}
function CGVScreen({navigation}) {
	return (
		<CGV navigation = {navigation} />
	);
}
function CGUScreen({navigation}) {
	return (
		<CGU navigation = {navigation} />
	);
}
function NoticeInfoImpScreen({navigation}) {
	return (
		<NoticeInfoImp navigation = {navigation} />
	)
}
function SupportTechniqueScreen({navigation}) {
	return (
		<SupportTechnique navigation = {navigation} />
	)
}
function InformationsEktorScreen({navigation}) {
	return (
		<InformationsEktor navigation = {navigation} />
	)
}

function GUScreen({navigation}) {
	return (
		<Guidedutilisation navigation = {navigation} />
	)
}


//// STACK
const Stack = createStackNavigator();
export default class SettingsNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator initialRouteName = {HelpScreen}
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: '#3C3C3C'},
               }
            }
          >

            <Stack.Screen
               name = 'assistance'
               component = {HelpScreen}
               options = { ({ navigation }) => (
                  {
                     headerShown: false,
                  }
                  )
               }
            />
            <Stack.Screen
               name = "cgu"
               component = {CGUScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CGU', 
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
               name = "Guidedutilisation"
               component = {GUScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Guidedutilisation', 
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
               name = "cgv"
               component = {CGVScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CGV', 
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
               name = "noticeinfoimp"
               component = {NoticeInfoImpScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Informations Importantes',
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
               name = "technicalsupport"
               component = {SupportTechniqueScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Support Technique',
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
               name = "informationsektor"
               component = {InformationsEktorScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Informations EKTOR',
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
  