// Components/Stock/ListCommande.js
import React from 'react';
import {
    FlatList,
    Dimensions,
    View
} from 'react-native';

import * as Theme from '../Styles/Theme';
import CommandeItem from './CommandeItem';


class ListCommande extends React.Component {
  /// CONSTRUCTEUR / CONSTRUCTOR ------------------------------------------
   constructor(props) {
      super(props);
      this.dimension = Dimensions.get('window');
   }

    // MÉTHODES / METHODS ----------------------------

   
  // RENDER -------------------------------
   render () {
      console.log("ListCommande RENDER")
      console.log(this.props.commandes)
      return(
         <FlatList
            ListHeaderComponent = {<View></View>}
            ListHeaderComponentStyle = {{marginTop: '2%'}}
            data={this.props.commandes}
            keyExtractor = {(item) => item.id.toString()}
            renderItem={({ item }) => (
               <CommandeItem commande = {item} navigation={this.props.navigation} route = {this.props.route}/>
            )}
         />
      );
   }
}

export default ListCommande;