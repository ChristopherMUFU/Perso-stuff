//Navigation/StaffNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Planning from '../Components/Staff/Planning'
import DetailPersonne from '../Components/Staff/Planning/DetailPersonne'
import CreatePlanning from '../Components/Staff/Planning/CreatePlanning'


// NAVIGATION PLANNING ----------------
//// SCREENS
function PlanningScreen({navigation}) {
	return (
		<Planning navigation = {navigation} />
	);
}

function DetailPersonneScreen({navigation , route}) {
	return (
		<DetailPersonne navigation = {navigation} route={route} />
	);
}


function CreatePlanningScreen({navigation , route}) {
	return (
		<CreatePlanning navigation = {navigation} route = {route} />
	);
}





//// STACK
const Stack = createStackNavigator();
export default class ContratsNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator
            initialRouteName = 'Planning'
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: 'white'},
               }
            }
          >

            <Stack.Screen
               name = 'Planning'
               title = 'Contrats de travail'
               component = {PlanningScreen}
               
            />

            <Stack.Screen
               name = 'DetailPersonne'
               component = {DetailPersonneScreen}
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
               name = 'createPlanning'
               component = {CreatePlanningScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Créer planning', 
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