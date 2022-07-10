import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Planningbis from '../Components/Staff/Planningbis'
import DetailPersonne from '../Components/Staff/Planning/DetailPersonne'
import CreatePlanningbis from '../Components/Staff/Planning/CreatePlanningbis'


// NAVIGATION PLANNING ----------------
//// SCREENS
function PlanningbisScreen({navigation}) {
	return (
		<Planningbis navigation = {navigation} />
	);
}

function DetailPersonneScreen({navigation , route}) {
	return (
		<DetailPersonne navigation = {navigation} route={route} />
	);
}


function CreatePlanningbisScreen({navigation , route}) {
	return (
		<CreatePlanningbis navigation = {navigation} route = {route} />
	);
}





//// STACK
const Stack = createStackNavigator();
export default class ContratsNavigation extends React.Component {
   render () {
      return(
         <Stack.Navigator
            initialRouteName = 'Planningbis'
            screenOptions = {
               {
                  headerTintColor: 'white',
                  headerLeftContainerStyle: {paddingLeft: 10, color: 'white'},
               }
            }
          >

            <Stack.Screen
               name = 'Planningbis'
               title = 'Contrats de travail'
               component = {PlanningbisScreen}
               
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
               name = 'createPlanningbis'
               component = {CreatePlanningbisScreen}
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