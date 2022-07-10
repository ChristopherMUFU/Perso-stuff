import React from 'react';
import {
    FlatList, StyleSheet, Text, View, Image, Alert, Platform, Dimensions, TouchableOpacity
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CommandesEnCoursItem from "./CommandesEnCoursItem.js";
import NouvelleCommandeItem from './NouvelleCommandeItem.js';

const InfoTemporaires = require("./dummy.json");

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

async function updateCommandeVue(formula, id) {
  const response = await fetch("https://markus-app.herokuapp.com/commande/update-commande",
   {
       method: 'PUT',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + global.sessionToken
       },
       body: JSON.stringify({ id, est_vue: formula }),
     })
     console.log(JSON.stringify(response, 2, 2));
     const json = await response.json();
     console.log(json);
     return json;
}

class NouvelleCommande extends React.Component  {
  //console.log(this.props);
  //console.log(InfoTemporaires);

  constructor(props){
    super(props);
    this.state = ({
      data : [],
      update: 0
    })
  }

  componentDidMount() {
    getCommandes().then(data => {this.setState({data: data})});
    console.log("infos " + this.state.data);
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        {false ?
          <View
            style={{
                alignItems: 'center',
                //backgroundColor: "red",
                flex: 1
            }}>
            <Image
              resizeMode="contain"
              source = {require("../../Assets/ico/Vector.png")}
              style={{
                  marginTop: '5%',
                  maxWidth: 100, // Ã  modif
                  minHeight: 61,
                  width: "50%",
                  height: "8%",
                  //backgroundColor: "red"
              }}/>
            <Text
              style={{
                  marginTop: '2%',
                  textAlign: 'center',
                  fontSize: 15,
                  color: '#04295D',
              }}>
              Vous n'avez pas encore reçu de commandes.
            </Text>
          </View>
          : 
          <FlatList
            //ref={"flatList"}
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            renderItem={({item}) => {
              if (!item.est_vue && !item.est_livree) {
                return (
                      <NouvelleCommandeItem update={updateCommandeVue} updateState={() => this.setState({update: this.state.update+1})} item={item} />
                  )
              } else {
                return null;
              }
            }}
          />
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 34 : 0,
    padding: "2%"
  },
  flatList: {
      flex:1,
      
  }
})

export default NouvelleCommande;