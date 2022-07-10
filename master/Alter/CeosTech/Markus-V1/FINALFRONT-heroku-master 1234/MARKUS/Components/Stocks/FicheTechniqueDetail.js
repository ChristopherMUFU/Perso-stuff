import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Theme from '../Styles/Theme';
import FicheTechniqueItem from "./FicheTechniqueItem";
import EditFicheTechnique from "./EditFicheTechnique";

import {
    recupDataFicheTechnique,
    recupDataCategorieMenu,
    recupDataProduitEnStock,
    _returnDataFicheTechnique,
    _returnDataCategorieMenu,
    _returnDataProduitEnStock,
} from "./FicheTechniqueItem";
import { getCategorieMenuDetail, deleteFicheTechnique, getFicheTechnique } from '../../API/StocksData';
import "../Connexion/Connexion";

// import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class FicheTechniqueDetail extends FicheTechniqueItem{

    constructor(props){
        super(props);   
        this.state = {
            ficheTechnique: this._returnDataFicheTechnique(),
            //categorieMenu: this._returnDataCategorieMenu(), //
            valcategorieMenu:"",
            denomination: "",
            processus: "",
            rechauffage: "",
            ingredients: "", // liste des intitules des ing
            tempsPreparation: "",

        }
    }

   /* Function that was used when the ingredients belonged to another table.
    _rechercherIngreditents(tab)
    {
        let res = ""
        for (var ip in tab)
        console.log('sont-ce les ingrédients ?? ::' + tab)
        {
            for (let item of this.state.produitEnStock)
            {

                console.log( " TEST => " + item)
                console.log(item.id)
                if(item.id === tab[i])
                {
                    let str = item.nom + " : " + item.quantite + " " + item.unite_choise + ", "
                    res = res + str
                }
            }
        }
        this.setState({ ingredients: res })
        console.log(res)
    } 

    componentDidMount()
    {
        this._rechercherIngreditents(this.state.ingredients)
    } */

    _goTo(nav){
        this.props.navigation.navigate(nav);
    }

    _goToPDF() {
        this.props.navigation.navigate("CreationFicheTechniquePdf", {
            denomination: this.state.ficheTechnique.denomination,
            processus_preparation: this.state.ficheTechnique.processus_preparation,
            rechauffage: this.state.ficheTechnique.rechauffage,
            temp_preparation: this.state.ficheTechnique.temp_preparation,
            categorieMenu: this.state.ficheTechnique.categorieMenu,
            cout_matiere: 0,
            coefficient_multiplicateur: 0,
            prix_ht: 0,
            restaurant: global.sessionRestaurant,
            ingredients: this.state.ficheTechnique.ingredients
      })
    }
    
    delete(){
        console.log('ID à delete :: ' + this.state.ficheTechnique.id);
        deleteFicheTechnique(this.state.ficheTechnique.id);
        this.props.navigation.navigate('technical');
    }


    render()
        {
        console.log("Détail Fiche Technique")
        console.log('la fifiche :: ' + JSON.stringify(this.state.ficheTechnique))


        return(

            <ScrollView style={{flex:1, width: '100%' }}>
            <View style={{
                backgroundColor: '#3C3C3C',
                flex: 1,
                alignItems: 'center',
                justifyContent: "center",
                paddingTop:'1%',
                width: "100%",
              }}>
                <LinearGradient
                      style = {
                          {
                              flex: 1,
                              borderWidth : 1.0,
                              borderRadius: 5,
                              borderColor: '#B0B0B0',
                              marginBottom: '10%',
                              marginTop: "10%",
                              width: "90%"
                             // marginLeft:"2%"
                          }
                      }
                      elevation={5}
                      colors={['#696969' , '#595959' , '#494949']}>


                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      left: 10,
                                      marginTop: 10


                                  }
                              }>
                              Dénomination
                      </Text>
                      <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginTop: 5}}></View>
                      <Text style = {
                                  {
                                      color: '#3BB9E0',
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      textAlign: 'center',

                                      marginTop: '10%',
                                      textTransform:'uppercase',

                                  }
                              }

                        >
                              {this.state.ficheTechnique.denomination}
                      </Text>


                      <Text style = {
                        {
                            color: 'white',
                            fontSize: 20,
                            left: 10,
                            marginTop: '12%',

                        }
                        }>
                            Catégorie Menu
                        </Text>
                        <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                            <Text style = {
                                        {
                                            color: 'white',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            left: 10,
                                            marginVertical: '5%',
                                            marginBottom: 20,
                                        }
                                    }

                            >
                                {this.state.ficheTechnique.categorieMenu}
                                {/* {this.state.categorieMenu[this.state.ficheTechnique.categorieMenu - 1].intitule} */}
                            </Text>

                        
                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      left: 10,
                                      marginTop: '5%'

                                  }
                              }>
                              Liste des Ingrédients
                      </Text>
                      <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                        <FlatList
                            data={JSON.parse(this.state.ficheTechnique.ingredients)}
                            renderItem={({item}) => 
                                <Text style = {{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    left: 10,
                                    marginVertical: '5%',
                                    marginBottom: 20,
                                }}>
                                    {item.key}
                                </Text>}
                            keyExtractor={item => item.id}                            
                        />

                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      left: 10,
                                      marginTop: '5%'

                                  }
                              }>
                              Processus de Préparation
                      </Text>
                      <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 18,
                                      fontWeight: 'bold',
                                      left: 10,
                                      marginVertical: '5%',
                                      marginBottom: 20,
                                  }
                              }>
                              {this.state.ficheTechnique.processus_preparation}
                      </Text>

                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      left: 10,
                                      marginTop: '5%'

                                  }
                              }>
                              Temps de Préparation
                      </Text>
                      <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      left: 10,
                                      marginVertical: '5%',
                                      marginBottom: 20,
                                  }
                              }>
                              {this.state.ficheTechnique.temp_preparation}
                      </Text>


                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      left: 10,
                                      marginTop: '5%'

                                  }
                              }>
                              Réchauffage
                      </Text>
                      <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                      <Text style = {
                                  {
                                      color: 'white',
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      left: 10,
                                      marginVertical: '5%',
                                      marginBottom: 50,
                                  }
                              }>
                              {this.state.ficheTechnique.rechauffage}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: "10%"}}>
                        
                    <TouchableOpacity
                                onPress = {() =>
                                    Alert.alert(
                                    "Attention !",
                                    "Êtes-vous sûr de vouloir modifier cette fiche technique ?",
                                    [
                                        {
                                        text: "Annuler",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                        },
                                        { text: "Oui", onPress: () => { this._goTo('editFicheTechnique') } }
                                    ],

                                    { cancelable: false }
                                    )
                                }
                                style={Theme.buttonsV2.touchable, {alignItems: 'center'}}>

                                <LinearGradient elevation={0} colors={["#696969", "#595959", "#494949"]} style = {Theme.buttonsV2.linearGradient}>
                                    <Text style={Theme.buttonsV2.buttonText}>
                                        Modifier
                                    </Text>
                                </LinearGradient>

                        </TouchableOpacity>
                        
                        <TouchableOpacity

                                    onPress = {() =>
                                        Alert.alert(
                                        "Attention !",
                                        "Êtes-vous sûr de vouloir supprimer cette fiche technique ?",
                                        [
                                            {
                                            text: "Annuler",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                            },
                                            { text: "Oui", onPress: () => {
                                                this.delete();
                                            } }
                                        ],

                                        { cancelable: false }
                                        )
                                    }
                                    style={Theme.buttonsV2.touchable, {alignItems: 'center'}}

                                    >
                                    <LinearGradient elevation={0} colors={['#dd0000' , '#c00000' , '#a50000']} style = {Theme.buttonsV2.linearGradient}>
                                        <Text style={Theme.buttonsV2.buttonText}>
                                        Supprimer
                                        </Text>
                                    </LinearGradient>

                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {() => {
                            this._goToPDF()
                        }}  style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradientb}>
                            <Text style = {Theme.buttonsV2.buttonText}>Générer un PDF</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                  </LinearGradient>
              </View>
            </ScrollView>
                /*<View style={{
                    backgroundColor: '#3C3C3C',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                    paddingTop:'1%',
                    width: "100%",
                  }}>


/*
            <LinearGradient
                style = {
                    {
                        flex: 1,
                        borderWidth : 1.0,
                        borderRadius: 5,
                        borderColor: '#B0B0B0',
                        marginBottom: '10%',
                        marginTop: "10%",
                        width: "90%"
                       // marginLeft:"2%"
                    }
                }
                elevation={5}
                colors={['#696969' , '#595959' , '#494949']}>

                /*

                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                left: 10,
                                marginTop: 10


                            }
                        }>
                        Dénomination
                </Text>
                <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                <Text style = {
                            {
                                color: '#3BB9E0',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginVertical: 50,
                               textTransform:'uppercase'

                            }
                        }>
                        {this.state.fichetechnique.denomination}
                </Text>

                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                //marginBottom:'50',
                                left: 10,
                                marginTop: 40

                            }
                        }>
                        Catégorie de menu
                </Text>
                //<View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                left: 10,
                                marginVertical: 15,
                                marginLeft: 20
                            }
                        }>
                        {this.state.fichetechnique.category}
                </Text>
                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                left: 10,
                                marginTop: 10,
                                marginTop: 40

                            }
                        }>
                        Processus de réalisation
                </Text>


// LIST INGREDIENTS + CATEGORIE PRODUIT A FAIRE //
/*
                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                left: 10,
                                marginTop: 40

                            }
                        }>
                        Réchauffage
                </Text>
                <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>

                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                left: 10,
                                marginVertical: 40,
                                marginTop: '2%'
                            }
                        }>
                        {this.state.recette.rechauffage}
                </Text>

                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                left: 10,
                                marginTop: '8%'
                                
                            }
                        }>
                        Temps de préparation
                </Text>
                <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>
                    
                <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                left: 10,
                                marginVertical: 40,
                                marginTop: '2%'
                            }
                        }>
                        {this.state.fichetechnique.rechauffage}
                </Text>

                /* <Text style = {
                            {
                                color: 'white',
                                fontSize: 20,
                                left: 10

                            }
                        }>
                        Présentation
                </Text>
                <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Image style={
                        {
                            flex: 1,
                            borderWidth : 1.0,
                            borderRadius: 10,
                            borderColor: '#B0B0B0',
                            height: windowHeight*0.15,
                            width: windowWidth*0.20,
                            margin: 10
                        }
                    }
                    source={this.image1}/>
                    <Image style={
                        {
                            flex:  1,
                            borderWidth : 1.0,
                            borderRadius: 10,
                            borderColor: '#B0B0B0',
                            height: windowHeight*0.15,
                            width: windowWidth*0.20,
                            margin: 10
                        }
                    }
                source={this.image2}/>
                </View>
                <View style={{ left: 10,borderBottomColor: 'white', borderBottomWidth: 1, width:"95%", marginVertical: 5, marginBottom:25}}></View>

                <TouchableOpacity

                            onPress = {() =>
                                Alert.alert(
                                "Attention !",
                                "Êtes-vous sûr de vouloir supprimer cette fiche technique ?",
                                [
                                    {
                                    text: "Annuler",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                    },
                                    { text: "Oui", onPress: () => {
                                        //this.delete();
                                    } }
                                ],

                                { cancelable: false }
                                )
                            }
                            style={Theme.buttonsV2.touchable, {alignItems: 'center'}}

                            >
                           <LinearGradient elevation={0} colors={['#dd0000' , '#c00000' , '#a50000']} style = {Theme.buttonsV2.linearGradient}>
                              <Text style={Theme.buttonsV2.buttonText}>
                                 Supprimer
                              </Text>
                           </LinearGradient>

                        </TouchableOpacity>





                         <TouchableOpacity
                            onPress = {() =>
                                Alert.alert(
                                "Attention !",
                                "Êtes-vous sûr de vouloir modifier cette fiche technique ?",
                                [
                                    {
                                    text: "Annuler",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                    },
                                    { text: "Oui", onPress: () => {

                                    } }
                                ],

                                { cancelable: false }
                                )
                            }
                            style={Theme.buttonsV2.touchable, {alignItems: 'center'}}>

                               <LinearGradient elevation={0} colors={["#696969", "#595959", "#494949"]} style = {Theme.buttonsV2.linearGradient}>
                                  <Text style={Theme.buttonsV2.buttonText}>
                                     Modifier
                                  </Text>
                               </LinearGradient>

                    </TouchableOpacity>

         /* </LinearGradient>
          */



         // </View>*/
          /*<Image style={
                        {
                            position: 'absolute',
                            left: (windowWidth/2) - (windowWidth*0.40)/2,
                            right: (windowWidth/2) - (windowWidth*0.40)/2,
                            top: 10,
                            bottom: 0,
                            alignItems: 'center',
                            borderWidth : 1.0,
                            borderRadius: 10,
                            borderColor: '#B0B0B0',
                            height: windowHeight*0.2,
                            width: windowWidth*0.40,

                        }


                    }
                source={this.image1}/> */
      // </ScrollView>

        )
    }

}

export default FicheTechniqueDetail;
