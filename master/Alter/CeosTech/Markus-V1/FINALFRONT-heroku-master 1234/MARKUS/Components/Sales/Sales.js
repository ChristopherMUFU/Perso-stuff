// Components/Sales/Sales.js
import React from 'react';
import { Text, View } from 'react-native';
import * as Theme from '../Styles/Styles';

export default class Sales extends React.Component {
   render() {
      return(
         <View style = {Theme.styles.container}>
            <Text style={Theme.styles.title}>Ventes.</Text>
         </View>
      )
   }
}
