//Navigation/StockNavigation.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import MenuStocks from '../Components/Stocks/MenuStocks';
import EntreeMarchandise from '../Components/Stocks/EntreeMarchandise';
import Inventaire from '../Components/Stocks/Inventaire';

import FichesTechniques from '../Components/Stocks/FichesTechniques';
import FicheTechniqueDetail from '../Components/Stocks/FicheTechniqueDetail';
import CreationFicheTechnique from '../Components/Stocks/CreationFicheTechnique';
import FicheTechniquePdf from '../Components/Stocks/FicheTechniquePdf';
import EditFicheTechnique from '../Components/Stocks/EditFicheTechnique';

import MenuCommande from '../Components/Stocks/MenuCommande';
import Commande from '../Components/Stocks/Commande';
import NouvelleCommande from '../Components/Stocks/NouvelleCommande';
import Fournisseurs from '../Components/Stocks/Fournisseurs';
import NouveauFournisseur from '../Components/Stocks/NouveauFournisseur'
import FournisseurItem from '../Components/Stocks/FournisseurItem'
import EditFournisseur from '../Components/Stocks/EditFournisseur'
import EditInventaire from '../Components/Stocks/EditInventaire'

// import Ingredients from '../Components/Stocks/Ingredients';
import Tracabilite from '../Components/Stocks/Tracabilite';



// NAVIGATION GESTION DES STOCKS ----------------
//// SCREENS

function MenuStocksScreen({navigation}) {
	return (
		<MenuStocks navigation = {navigation} />
	);
}
//// ENTREE MARCHANDISE
function EntreeMarchandiseScreen({navigation}) {
	return (
		<EntreeMarchandise navigation = {navigation} />
	)
}
//// INVENTAIRE
function InventaireScreen({navigation}) {
	return (
		<Inventaire navigation = {navigation} />
	)
}

function EditInventaireScreen({navigation}) {
	return (
		<Inventaire navigation = {navigation} />
	)
}

//// FICHES TECHNIQUES
function FichesTechniquesScreen({navigation}) {
	return (
		<FichesTechniques navigation = {navigation} />
	)
}

function CreationFicheTechniqueScreen({navigation}) {
	return (
		<CreationFicheTechnique navigation = {navigation} />
	)
}

function FicheTechniqueDetailScreen({navigation}) {
	return (
		<FicheTechniqueDetail navigation = {navigation} />
	)
}

function CreationFicheTechniquePdfScreen({navigation, route}) {
	return (
		<FicheTechniquePdf navigation = {navigation} route = {route} />
	)
}

function EditFicheTechniqueScreen({navigation}) {
	return (
		<EditFicheTechnique navigation = {navigation} />
	)
}


//// COMMANDE
function CommandeScreen({navigation, route}) {
	return (
		<MenuCommande navigation = {navigation} route={route} />
	)
}
function CommandeHistoricScreen({navigation, route}) {
	return (
		<Commande navigation = {navigation} route = {route}/>
	)
}
function NouvelleCommandeScreen({navigation, route}) {
	return (
		<NouvelleCommande navigation = {navigation} route= {route}/>
	)
}
function FournisseursScreen({navigation}) {
	return (
		<Fournisseurs navigation = {navigation} />
	)
}
function NouveauFournisseurScreen({navigation}) {
	return (
		<NouveauFournisseur navigation = {navigation} />
	)
}
function FournisseurItemScreen({navigation}) {
	return (
		<FournisseurItem navigation = {navigation}/>
	)
}
function EditFournisseurScreen({navigation}) {
	return (
		<EditFournisseur navigation = {navigation}/>
	)
}
//// TRACABILITE
function TracabiliteScreen({navigation}) {
	return (
		<Tracabilite navigation = {navigation} />
	)
}


//// STACK
const Stack = createStackNavigator();
export default class StockNavigation extends React.Component {
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
             {/* MENU STOCKS */}
            <Stack.Screen
               name = 'stock_menu'
               title = 'STOCK'
               component = {MenuStocksScreen}
               //options={{ headerShown: false }}
               options={{ headerShown: false }}
            />

            {/* RECEPTION MARCHANDISES */}
            <Stack.Screen
               name = 'merchandise'
               component = {EntreeMarchandiseScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Entrée marchandise',
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

            {/* INVENTAIRE */}
            <Stack.Screen
               name = 'inventory'
               component = {InventaireScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Inventaire',
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
               name = 'EditInventaire'
               component = {EditInventaireScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'EditInventaire',
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

            {/* FICHES TECHNIQUES */}
            <Stack.Screen
               name = 'technical'
               component = {FichesTechniquesScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Fiches techniques',
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
               name = 'technicalDetail'
               component = {FicheTechniqueDetailScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Détail fiche technique',
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
               name = 'creationTechnical'
               component = {CreationFicheTechniqueScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Création fiche technique',
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
               name = 'editFicheTechnique'
               component = {EditFicheTechniqueScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Modifier fiche technique',
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
               name = 'CreationFicheTechniquePdf'
               component = {CreationFicheTechniquePdfScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Enregistrement de fiches techniques', 
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

            {/* COMMANDE */}
            <Stack.Screen
               name = 'command'
               component = {CommandeScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Commande',
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
               name = 'command_historic'
               component = {CommandeHistoricScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Liste des commandes',
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
               name = 'new_command'
               component = {NouvelleCommandeScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Nouvelle commande',
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
               name = 'fournisseurs'
               component = {FournisseursScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Fournisseurs',
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
               name = 'new_fournisseur'
               component = {NouveauFournisseurScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Ajouter fournisseur',
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
               name = 'edit_fournisseur'
               component = {EditFournisseurScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Modifier fournisseur', 
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
               name = 'item_fournisseur'
               component = {FournisseurItemScreen}
               options = { ({ navigation }) => (
                  {
                     title: 'Item Fournisseur', 
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

 

            {/* INGREDIENTS */}
            {/* <Stack.Screen
               name = 'ingredients'
               component = {IngredientsScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Liste Ingrédients',
                     headerMode: 'screen',
                     headerBackTitle: ' ',
                     headerStyle: {
                        backgroundColor : '#3C3C3C',
                     }
                  }
                  )
               }
            /> */}

            {/* TRACABILITE */}
            <Stack.Screen
               name = 'tracability'
               component = {TracabiliteScreen}
               options = { ({ navigation }) => (
                  {
                     title : 'Traçabilité',
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
