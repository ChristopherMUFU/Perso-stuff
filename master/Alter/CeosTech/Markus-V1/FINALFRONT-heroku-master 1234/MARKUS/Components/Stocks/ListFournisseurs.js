// Components/Stock/ListFournisseurs.js
// Components/Stock/ListFournisseurs.js
import React from 'react';
import {
    FlatList,
    View,
    Navigator,
} from 'react-native';

import FournisseurItem from './FournisseurItem';

class ListFournisseurs extends React.Component {
   /// CONSTRUCTEUR / CONSTRCUTOR ------------------------------------------
   constructor(props) {
      super(props);
   }

   // MÉTHODES / METHODS ----------------------------



   // RENDER -------------------------------
   render () {
      return(
         <FlatList
            data={this.props.fournisseurs}
            keyExtractor = {(item) => item.id.toString()}
            ListHeaderComponent = {<View></View>}
            ListHeaderComponentStyle = {{marginTop: '5%'}}
            renderItem={({ item }) => (
               <FournisseurItem
                  navigation = {this.props.navigation}
                  fournisseur = {item}
                  fournisseurItem = {this.props.fournisseur_component}
               />
            )}
         />
      );
   }
}


export default ListFournisseurs;
