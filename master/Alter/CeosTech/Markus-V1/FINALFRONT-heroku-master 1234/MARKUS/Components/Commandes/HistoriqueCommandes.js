import React, { useEffect, useState } from 'react';
import {
    FlatList, StyleSheet, Text, View, Image, Alert, Platform, Dimensions, TouchableOpacity
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import HistoriqueCommandeItem from "./HistoriqueCommandeItem";

const InfoTemporaires = require("./dummy.json");
const InfoTemporaires2 = require("./dummy2.json");

// https://markus-app.herokuapp.com/commande/commandes/

async function getCommandes() {
  const response = await fetch("https://markus-app.herokuapp.com/commande/commandes/", {
     method: 'GET',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + global.sessionToken
   }
  })
  const json = await response.json();
  //console.log(JSON.stringify( json, 2, 2));
  return json;
}

class HistoriqueCommandes extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      data : []
    })
  }

  componentDidMount() {
    getCommandes().then(data => {this.setState({data: data})});
    console.log("infos " + this.state.data);
  }

  render(){
    return (
      <View style={styles.mainContainer}>
                        <Text
                      style={{
                          textAlign: 'center',
                          fontSize: 20,
                          color: '#04295D',
                      }}>
                      Commandes passées :
                  </Text>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            renderItem={({item}) => {
              if (item.est_vue && item.est_livre) {
                return (<HistoriqueCommandeItem item={item}/>)
              } else {
                null
              }
            }}
          />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: 'white', //#04295D 
    marginTop: Platform.OS === 'ios' ? 34 : 0,
    padding: "2%"
  },
  flatList: {
      flex:1,
      //backgroundColor: "red",
      
  }
})

export default HistoriqueCommandes;