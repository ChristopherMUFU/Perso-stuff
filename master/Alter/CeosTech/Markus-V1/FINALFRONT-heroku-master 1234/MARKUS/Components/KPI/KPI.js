// Components/KPI/KPI.js
import React from 'react';
import { Text, View } from 'react-native';
import * as Theme from '../Styles/Styles';

export default class KPI extends React.Component {
   render() {
      return(
         <View style = {Theme.styles.container}>
            <Text style={Theme.styles.title}>KPI.</Text>
         </View>
      )
   }
}
