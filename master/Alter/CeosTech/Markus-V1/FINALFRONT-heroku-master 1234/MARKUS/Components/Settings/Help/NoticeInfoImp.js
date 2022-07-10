// Components/Settings/Help/NoticeInfoImp.js

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Theme from '../../Styles/Theme';

export default class NoticeInfoImp extends React.Component {
   render() {
      return(
         <View style = {Theme.styles.container}>
            <Text style={Theme.styles.title}>Notice d'informations importante</Text>
         </View>
      )
   }
}