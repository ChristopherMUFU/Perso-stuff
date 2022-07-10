// Components/Stock/ListFicheTechnique.js
import React from 'react';
import {
    FlatList,
    Text,
    Dimensions,
    View
} from 'react-native';

import * as Theme from '../Styles/Theme';
import FicheTechniqueItem from './FicheTechniqueItem';
//import recettesData from '../../Helpers/recettes.json';
import { faPassport } from '@fortawesome/free-solid-svg-icons';

class ListFicheTechnique extends React.Component {
  /// CONSTRUCTEUR / CONSTRUCTOR ------------------------------------------
   constructor(props) {
      super(props);
      this.dimension = Dimensions.get('window');
      this.state = {
        fichetechnique : this.props.fichetechnique,

        // construction à revoir
    }
   }

   //displayDetailForFicheTechnique={this._displayDetailForFicheTechnique}

      // MÉTHODES / METHODS ----------------------------


   _displayDetailForFicheTechnique = (id) => {
      console.log("Display Recette " + id)
     // On a récupéré les informations de la navigation, on peut afficher le détail du film / We recovered the navigation information, we can display the details of the film
     this.props.navigation.navigate('technicalDetail', {id: id})
    }

   // RENDER -------------------------------
   render () {

      return(
        <FlatList
        data={this.props.fichetechnique}
        keyExtractor = {(item) => item.id.toString()}
        renderItem={({ item }) => (
            <FicheTechniqueItem
                //categoriemenu = {this.props.categoriemenu}
                navigation = {this.props.navigation}
                fichetechnique = {item}
                fichetechniqueItem = {this.props.fichetechnique_component}
            />
            )}
        />
      );
   }
}

export default ListFicheTechnique;
