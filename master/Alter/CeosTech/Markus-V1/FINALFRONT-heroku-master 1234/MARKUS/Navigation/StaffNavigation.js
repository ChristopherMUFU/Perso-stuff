//Navigation/StaffNavigation.js

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MenuStaff from '../Components/Staff/MenuStaff'
import MenuLettresTypes from '../Components/Staff/lettres_types/MenuLettresTypes'
import MenuLicenciement from '../Components/Staff/lettres_types/MenuLicenciement'
import MenuConvocation from '../Components/Staff/lettres_types/MenuConvocation'
import MenuHistorique from '../Components/Staff/lettres_types/Historique'
import PlanningNavigation from './PlanningNavigation'
import PlanningbisNavigation from './PlanningbisNavigation'
import Planningbis from '../Components/Staff/Planningbis'
import ContratsNavigation from './ContratsNavigation'
import MenuLettresTypesNavigation from './MenuLettresTypesNavigation'
import MenuDPAE from '../Components/Staff/DPAE/MenuDPAE'
import Emargement from '../Components/Staff/Emargement'
import Personnel from '../Components/Staff/Personnel/Personnelscreen'
import MenuEmployementContract from '../Components/Staff/Contrats_de_travail/MenuEmployementContract'
import EmployementContract from '../Components/Staff/Contrats_de_travail/EmployementContract'
import CreationContract from '../Components/Staff/Contrats_de_travail/CreationContract'
import CreationLettres from '../Components/Staff/lettres_types/CreationLettres'
import ConfirmationContrat from '../Components/Staff/Contrats_de_travail/ConfirmationContrat'
import EditPersonnel from '../Components/Staff/Personnel/editPersonnel'
import UpdatePersonnel from '../Components/Staff/Personnel/updatePersonnel'
import Home from '../Components/Home/Menu'


// NAVIGATION GESTION DU ----------------
//// SCREENS
function MenuStaffScreen({navigation}) {
	return (
		<MenuStaff navigation = {navigation} />
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
function MenuHistoriqueScreen({navigation , route}) {
	return (
		<MenuHistorique navigation = {navigation} route = {route}/>
	)
}
function PlanningScreen({navigation}) {
	return (
		<PlanningNavigation navigation = {navigation} />
	)
}

function PlanningbisScreen({navigation}) {
	return (
		<PlanningbisNavigation navigation = {navigation} />
	)
}

function PersonnelScreen({navigation}){
   return <Personnel navigation = {navigation} />
}
 function EditPersonnelScreen({navigation}){
   return <EditPersonnel navigation = {navigation} />
}

function UpdatePersonnelScreen({navigation}){
   return <UpdatePersonnel navigation = {navigation} />
}

function EmargementScreen({navigation}) {
	return (
		<Emargement navigation = {navigation} />
	)
}

function ContratsNavigationScreen({navigation}) {
	return (
		<MenuEmployementContract navigation = {navigation} />
	)
}

function MenuLettresTypesScreen({navigation}) {
	return (
		<MenuLettresTypes navigation = {navigation} />
	)
}

function MenuDPAEScreen({navigation}) {
	return (
		<MenuDPAE navigation = {navigation} />
	);
}
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

function ConfirmationContratScreen({navigation , route}) {
	return (
		<ConfirmationContrat navigation = {navigation} route = {route}/>
	)
}




//// STACK
const Stack = createStackNavigator();
export default class StaffNavigation extends React.Component {
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
               name = 'staff_menu'
               title = 'RH'
               component = {MenuStaffScreen}
               options={{ 
                  headerTintColor: "#04295D" ,
                  title: ' ',
                  headerShown: false
               }}
            />

            <Stack.Screen
               name = 'MenuDPAE'
               component = {MenuDPAEScreen}
               options = { ({ navigation }) => (
                  {
                     title: "Déclaration préalable à l'embauche", 
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
               name = 'contrats_menu'
               component = {MenuContratsScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
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
               name = 'ContratTravail'
               component = {EmployementContractScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CDI', 
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
               name = 'ContratTravailcdd'
               component = {EmployementContractScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'CDD', 
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
               name = 'CreateEmployementContract'
               component = {CreationContractScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
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
               name = 'ConfirmationContrat'
               component = {ConfirmationContratScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
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
               name = 'lettres_types'
               component = {MenuLettresTypesScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Lettres types', 
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
               name = 'MenuLicenciement'
               component = {MenuLicenciementScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Licencier', 
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
               name = 'MenuConvocation'
               component = {MenuConvocationScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Convoquer', 
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
               name = 'CreationLettres'
               component = {CreationLettresScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Enregistrement de lettres types', 
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
               name = 'EditPersonnel'
               component = {EditPersonnelScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Créer fiche salarié', 
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
               name = 'UpdatePersonnel'
               component = {UpdatePersonnelScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Modifier un personnel', 
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
               name = 'MenuHistorique'
               component = {MenuHistoriqueScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Historique', 
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
               name = 'emargement'
               component = {EmargementScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Emargement', 
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
               name = 'planning'
               component = {PlanningScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Planning', 
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
               name = 'Planningbis'
               component = {PlanningbisScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Planningbis', 
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
               name = 'registre'
               component = {PersonnelScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Registre du personnel', 
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
               name = 'contrats'
               component = {ContratsNavigationScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Contrats de travail', 
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
  

	
