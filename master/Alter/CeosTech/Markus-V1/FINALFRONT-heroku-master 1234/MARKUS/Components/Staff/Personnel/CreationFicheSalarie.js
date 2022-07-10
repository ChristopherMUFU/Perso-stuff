import React from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Image, FlatList, StyleSheet} from 'react-native';
import * as Theme from '../../Styles/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

import {inscriptionStyle} from './Style'


class CreationFicheSalarie extends React.Component{
    constructor(props){
        super(props);
    }

    
    

    render(){
        //console.log("Ingrédients : " + this.state.ingredients)
          return(
            <ScrollView style={{flex:1, width: '100%'}}>
            <View style={{
                    backgroundColor: '#3C3C3C',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                    paddingTop:'1%',
                    width: "100%"
                  }}>


            <View style={inscriptionStyle.container}>
                <Text style={inscriptionStyle.title}>
                    Créer une fiche salarié
                </Text>

                <View style={inscriptionStyle.fields_container}>
                <View style={{ 
                        //inscriptionStyle.fieldInput_container
                        flex: 1,
                          width:'95%',
                          //alignItems: 'center',
                          ...(Platform.OS !== 'android' && {
                              zIndex: 10
                              }),
                          paddingTop: 5,
                          paddingBottom:10
                    
                    }}
                        >
                    <Text style={inscriptionStyle.field_names}>Civilité</Text>
                    <DropDownPicker
                  placeholder='Civilité'
                  
                  items={[
                    {label:'Mme', value:'Madame'}, 
                    {label:'M.', value:'Monsieur'},
                  ]}
                  style = {{backgroundColor: 'white', borderRadius:10}}
                  containerStyle= {{height:50, width:'100%',}}
                  dropDownStyle = {{borderColor: 'black', backgroundColor: 'black', width: "100%"}}
                  placeHolderStyle = {{color:'white', fontSize: 16}}
                  arrowColor = {'black'}
                  labelStyle = {{color:'white'}}
                  //onChangeItem={item => this.setState({
                    //categorie: item.value})}
                />
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Nom</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Prénom</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Date de naissance</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Lieu de naissance</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Nationalité</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>

                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Numéro de téléphone</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>

                
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Mail</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>
                    
                    
                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Adresse </Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>

                    <View style={inscriptionStyle.rowDirection_container}>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>code postal</Text>
                            <TextInput style={inscriptionStyle.zip_textinput}></TextInput>
                        </View>
                        <View style={inscriptionStyle.fieldInput_container}>
                            <Text style={inscriptionStyle.field_names}>Ville</Text>
                            <TextInput style={inscriptionStyle.city_textinput}></TextInput>
                        </View>
                    </View>


                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Numéro Sécurité sociale </Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>

                    

                    <View style={{ 
                        //inscriptionStyle.fieldInput_container
                        flex: 1,
                          width:'95%',
                          //alignItems: 'center',
                          ...(Platform.OS !== 'android' && {
                              zIndex: 10
                              }),
                          paddingTop: 5,
                          paddingBottom:10
                    
                    }}
                        >
                    <Text style={inscriptionStyle.field_names}>Statut</Text>
                    <DropDownPicker
                  placeholder='Statut'
                  
                  items={[
                    {label:'Ouvrier non qualifié', value:'Ouvrier non qualifié'}, 
                    {label:'Ouvrier qualifié', value:'Ouvrier  qualifié'},
                    {label:'Employé non qualifié', value:'Employé non qualifié'}, 
                    {label:'Employé qualifié', value:'Employé  qualifié'},
                    {label:'Agent de maitrîse ', value:'Agent de maitrîse'},
                    {label:'Cadre ', value:'Cadre'},
                  ]}
                  style = {{backgroundColor: 'white', borderRadius:10}}
                  containerStyle= {{height:50, width:'100%',}}
                  dropDownStyle = {{borderColor: 'black', backgroundColor: 'black', width: "100%"}}
                  placeHolderStyle = {{color:'white', fontSize: 16}}
                  arrowColor = {'black'}
                  labelStyle = {{color:'white'}}
                  //onChangeItem={item => this.setState({
                    //categorie: item.value})}
                />
                    </View>

                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Poste(Métier) </Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>


                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>salaire (en euros)</Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>

                    <View style={inscriptionStyle.fieldInput_container}>
                        <Text style={inscriptionStyle.field_names}>Date d'entrée </Text>
                        <TextInput style={inscriptionStyle.textinput_boxes}></TextInput>
                    </View>



                </View>




                <View style={{alignItems: 'center', marginTop:30}}>
                        <TouchableOpacity>
                            
                            <LinearGradient
                                elevation={5}
                                colors={["#696969", "#595959", "#494949"]}
                                style={Theme.buttonsV2.linearGradient}
                            >
                                <Text style={Theme.buttonsV2.buttonText}>Créer</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

            </View>
            </View>
        </ScrollView>
                      
        
                
            
            

          )
        }
}



   
export default CreationFicheSalarie
