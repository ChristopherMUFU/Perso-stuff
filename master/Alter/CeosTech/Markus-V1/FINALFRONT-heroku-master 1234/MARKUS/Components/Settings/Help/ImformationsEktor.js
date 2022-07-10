// Components/Settings/Help/InformationsEktor.js

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Theme from '../../Styles/Theme';

export default class InformationsEktor extends React.Component {
   render() {
      return(
         <View style = {Theme.styles.container}>
            <Text style={Theme.styles.title}>Informations EKTOR</Text>
         </View>
      )
   }
}