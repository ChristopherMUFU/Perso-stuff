// Components/Stock/ListFicheTechnique.js
import React from 'react';
import {
    FlatList,
    Text,
    Dimensions,
    View
} from 'react-native';

//import * as Theme from '../Styles/Theme';
import FicheSalarieItem from './FicheSalarieItem';
import ficheData from '../../../Helpers/ficheSalarie.json';
//import FicheTechniqueItem from './FicheTechniqueItem';
//import recettesData from '../../Helpers/recettes.json';
import { faPassport } from '@fortawesome/free-solid-svg-icons';

class ListeFicheSalarie extends React.Component {
   /// CONSTRUCTEUR ------------------------------------------
   constructor(props) {
      super(props);
      this.dimension = Dimensions.get('window');
      this.state = {
        ficheSalaries : ficheData
  }
   }

   //displayDetailForFicheTechnique={this._displayDetailForFicheTechnique}

   // METHODES ----------------------------
   
   
   _displayDetailForFicheSalarie = (id) => {
      console.log("Display Recette " + id)
      // On a récupéré les informations de la navigation, on peut afficher le détail du film / We recovered the navigation information, we can display the details of the film
      this.props.navigation.navigate('detailfichesalarie', {id: id})
    }
   
   // RENDER -------------------------------
   render () {
      console.log("ListFicheSalarie RENDER")
      return(
        <FlatList
        data={this.state.ficheSalaries}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={({ item }) => (
        <FicheSalarieItem ficheSalarie = {item} displayDetailForFicheSalarie={this._displayDetailForFicheSalarie}  />
        )}
        />
      );
   }
}

export default ListeFicheSalarie;