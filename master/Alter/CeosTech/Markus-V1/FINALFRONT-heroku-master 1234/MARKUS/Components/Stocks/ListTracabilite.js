// Components/Stock/ListTracabilite.js

import React from 'react';
import {
    FlatList,
    Dimensions
} from 'react-native';

import TracabiliteItem from './TracabiliteItem';

class ListTracabilite extends React.Component {
    /// CONSTRUCTEUR / CONSTRUCTOR ------------------------------------------
   constructor(props) {
      super(props);
      this.dimension = Dimensions.get('window');
   }

   // MÉTHODES / METHODS ----------------------------

   
   // RENDER -------------------------------
   render () {
      console.log("ListTracabilite RENDER")
      return(
         <FlatList
            data={this.props.ingredients}
            keyExtractor = {(item) => item.id.toString()}
            renderItem={({ item }) => (
               <TracabiliteItem ingredient = {item} />
            )}
         />
      );
   }
}

export default ListTracabilite;