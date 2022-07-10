// Components/Settings/Help/CGU.js

import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Theme from '../../Styles/Theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class CGU extends React.Component {
   render() {
      return(
         <View style = {Theme.styles.container}>
            <Text style={Theme.styles.title}>CGU.</Text>
         </View>
      )
   }
}

