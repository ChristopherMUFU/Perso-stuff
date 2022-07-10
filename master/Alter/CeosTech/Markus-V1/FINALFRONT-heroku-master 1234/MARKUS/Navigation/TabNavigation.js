// /Navigation/TabNavigation.js
import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faThLarge, faCog, faCubes, faIdCard, faCartPlus } from '@fortawesome/free-solid-svg-icons';

// IMPORT COMPONENTS
// import Main from '../Components/Main/Main';
// import Sales from '../Components/Sales/Sales';
import StaffNavigation from '../Navigation/StaffNavigation';
import StockNavigation from '../Navigation/StockNavigation';
// import KPI from '../Components/KPI/KPI';
import SettingsNavigation from './SettingsNavigation';
import Home from '../Components/Home/Menu'
import MenuCommandes from '../Components/Commandes/MenuCommandes';
import GestionCommandesNavigation from '../Navigation/GestionCommandesNavigation';

//// TABS ----------------------------
function HomeTab({navigation}) {
	return (
		<Home navigation = {navigation} />
	)
}
// function MainTab({navigation}) {
// 	return (
// 		<Main navigation = {navigation} />
// 	);
// }
// function SalesTab({navigation}) {
// 	return (
// 		<Sales navigation = {navigation} />
// 	)
// }
function StaffTab({navigation}) {
	return (
		<StaffNavigation navigation = {navigation} />
	)
}
function StocksTab({navigation}) {
	return (
		<StockNavigation navigation = {navigation} />
	);
}
// function KpiTab({navigation}) {
// 	return (
// 		<KPI navigation = {navigation} />
// 	);
// }
function SettingsTab({navigation}){
	return (
		<SettingsNavigation navigation = {navigation} />
	)
}

function GestionCommandesTab({navigation}){
	return (
		<GestionCommandesNavigation navigation = {navigation} />
	)
}


const Tab = createBottomTabNavigator();
export default class TabNavigator extends React.Component {
	render() {
		return (
			<Tab.Navigator
				initialRouteName = 'ACCUEIL'
				screenOptions = {
				({ route } ) => ({
					tabBarIcon : ({focused}) => {
						let color;
						switch (route.name) {
							case 'ACCUEIL':
								color = focused ? '#3BB9E0' : "white";
								return (<FontAwesomeIcon 
									icon = {faHome} 
									style ={{color: color}}
									size = {25} />) 

							// case 'main': 
							// 	iconName = require("../Assets/ico/main.png");
							// 	break;
							
							// case 'sales': 
							// 	iconName = require("../Assets/ico/sales.png")
							// 	break;
							
							case 'RH' : 
								color = focused ? '#3BB9E0' : "white";
								return (<FontAwesomeIcon 
										icon = {faIdCard} 
										style ={{color: color}}
										size = {25} />)
										break;
								// iconName = require("../Assets/ico/staff.png")
								// break;
							
							case 'STOCK' : 
								color = focused ? '#3BB9E0' : "white";
								return (<FontAwesomeIcon 
									icon = {faCubes} 
									style ={{color: color}}
									size = {25} />)
									break;
							
								// case 'kpi' : 
								// 	iconName = require("../Assets/ico/kpi.png")
								// 	break;

							case 'COMPTE' : 
								color = focused ? '#3BB9E0' : "white";
								return (<FontAwesomeIcon 
									icon = {faCog} 
									style ={{color: color}}
									size = {25} />) 
								// iconName = require("../Assets/ico/account.png")
								// break;
							case 'COMMANDES' : 
								color = focused ? '#3BB9E0' : "white";
								return (<FontAwesomeIcon 
									icon = {faCartPlus} 
									style ={{color: color}}
									size = {25} />) 
							
						default :
							console.log("Icone de navigation non trouvée !")
							break;
						}
						
						return (<Image source ={iconName}/>)
					}
				})
					
				}
				tabBarOptions = {
				{
					keyboardHidesTabBar: true,
					activeTintColor:'#3BB9E0',
					inactiveTintColor: '#FFFFFF',
					tabStyle : {
						backgroundColor: '#04295D'
					} 
				}
				}
				activeColor="#3e2465"
				inactiveColor="#8366ae"
				>

			{/* TAB SCREENS ------------------- */}
				<Tab.Screen 
					name = 'ACCUEIL'
					component = {HomeTab}
					options = {
						{
							showLabel : false,
							showIcon : false
						}
					}
					/>
				{/* <Tab.Screen 
					name = 'main'
					component = {MainTab}
					/>
				<Tab.Screen 
					name = "sales"
					component = {SalesTab}
					/> */}
				<Tab.Screen 
					name ='RH'
					component = {StaffTab}
					/>
					<Tab.Screen 
					name = 'COMMANDES'
					component = {GestionCommandesTab}
				/>
				<Tab.Screen 
					name = 'STOCK'
					component = {StocksTab}
					/>
				{/* <Tab.Screen 
					name = 'kpi'
					component = {KpiTab}
				/> */}
				<Tab.Screen 
					name = 'COMPTE'
					component = {SettingsTab}
				/>
				
			</Tab.Navigator>
		)


	}
}