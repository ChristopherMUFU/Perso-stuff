// Components/Stock/ListIventaire.js
import React from 'react';
import {
    FlatList,
    Text,
    Dimensions,
    View
} from 'react-native';

import * as Theme from '../Styles/Theme';
import InventaireItem from './InventaireItem';
import { faPassport } from '@fortawesome/free-solid-svg-icons';

class ListIventaire extends React.Component {
   /// CONSTRUCTEUR / CONSTRUCTOR ------------------------------------------
   constructor(props) {
      super(props);
      this.dimension = Dimensions.get('window');
   }

    // MÉTHODES / METHODS ----------------------------


   // RENDER -------------------------------
   render () {
      console.log("ListInventaire RENDER")
      console.log(this.props.ingredients)
      return(
         <FlatList
            data={this.props.ingredients}
            keyExtractor = {(item) => item.id.toString()}
            renderItem={({ item }) => (
               <InventaireItem
                  ingredient = {item}
                  inventaire = {this.props.inventaire_component}
               />
            )}
         />
      );
   }
}

export default ListIventaire;
