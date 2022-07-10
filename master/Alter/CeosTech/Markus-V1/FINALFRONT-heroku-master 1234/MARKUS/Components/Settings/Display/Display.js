// ../Components/Settings/Display/Display.js


import React from 'react';
import { Alert, Dimensions, Text, View, Platform, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Theme from '../../Styles/Theme';
import LinearGradient from 'react-native-linear-gradient'
import DropDownPicker from 'react-native-dropdown-picker'
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Affichage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activtheme: "",
            activfondecran: "",
            activlangue: "",
        }
    }

    /* Verify all the input */
    _verify(){
        if(this.state.activtheme == ""){
            return(Alert.alert('Veuillez choisir un thème'))
        }
        if( this.activfondecran == ""){
            return(Alert.alert("Veuillez choisir un fond d'écran"))
        }
        if( this.state.activlangue == ""){
            return(Alert.alert('Veuillez renseigner une langue'))
        }
        else{
            return(Alert.alert('Modifications enregistrées'))
        }
    }

    render(){
        return(
            <ScrollView style={{width: windowWidth, height: windowHeight ,backgroundColor:'#3C3C3C'}}>
            <View style={[styles.container, {height: windowHeight *1.1}]}>
              <Image source={require('../../../Assets/img/logo-resto.png')} style={styles.logo}/>
              <Text style={styles.userName}>Paul Edouard</Text>
              <Text style={styles.jobTitle}>Manager Restaurant</Text>

              <View style={styles.line}>
                  <View style={styles.lineSize}/>
              </View>
              
              <Text style={{fontWeight:'bold', fontSize:18, color:'white',textAlign:'center',marginVertical:'1%'}}>
                        Modifier
              </Text>
                <View 
                style = {{
                    flex: 1,
                    width:windowWidth*0.9,
                    alignItems: 'center',
                    ...(Platform.OS !== 'android' && {
                        zIndex: 10
                        }),
                    paddingTop: 5,
                    }}>
                    <DropDownPicker
                    placeholder="Thème"
                    items={[
                        {label:'White', value:'White'}, 
                        {label:'Black', value:'Black'},
                    ]}
                    style = {{backgroundColor: 'transparent'}}
                    containerStyle= {{height:50, width:windowWidth*0.8,marginTop:20}}
                    dropDownStyle = {{backgroundColor: 'grey'}}
                    placeHolderStyle = {{color:'black', fontSize: 16}}
                    arrowColor = {'white'}
                    labelStyle = {{color:'white', fontSize: 16}}
                    onChangeItem={item => this.setState({
                        activtheme: item.value})}
                    />
                <DropDownPicker
                    placeholder="Fond d'écran"
                    items={[
                        {label:'Default', value:'Default'}, 
                        {label:'NewV', value:'NewV'},
                    ]}
                    style = {{backgroundColor: 'transparent'}}
                    containerStyle= {{height:50, width:windowWidth*0.8,marginTop:20}}
                    dropDownStyle = {{backgroundColor: 'grey'}}
                    placeHolderStyle = {{color:'black', fontSize: 16}}
                    arrowColor = {'white'}
                    labelStyle = {{color:'white', fontSize: 16}}
                    onChangeItem={item => this.setState({
                        activfondecran: item.value})}
                    />
                <DropDownPicker
                    placeholder='Langue'
                    items={[
                        {label:'Français', value:'Français'}, 
                        {label:'Anglais', value:'Anglais'},
                        {label:'Espagnol', value:'Espagnol'}
                    ]}
                    style = {{backgroundColor: 'transparent'}}
                    containerStyle= {{height:50, width:windowWidth*0.8,marginTop:20}}
                    dropDownStyle = {{backgroundColor: 'grey'}}
                    
                    placeholderStyle={{color: 'white', fontSize: 16}}
                    labelStyle = {{color:'white', fontSize: 16}}
                    arrowColor = {'white'}
                    onChangeItem={item => this.setState({
                        activlangue: item.value})}
                />
                <TouchableOpacity onPress = {() => { this._verify() }} style={Theme.buttonsV3.touchAble}>
                  <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV3.linearGradient}>
                      <Text style={Theme.buttonsV3.buttonText}>
                          Enregistrer
                      </Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                </View>
                
            </View>
        </ScrollView>
        )
    }

}

export const styles = StyleSheet.create({
    /*GENERAL */
    container:{
        backgroundColor: '#3C3C3C',
        flex: 1,
        alignItems: 'center',
        paddingTop:'7%',
        width: windowWidth,
        height:windowHeight,
        color:'white'
    },
    title:{
        fontSize:25,
        fontWeight: "bold",
        textTransform:'uppercase',
        color:'white',
        },
    text:{
        fontSize: 20,
        color: "white"
    },
    line:{
        flexDirection: 'row', 
        marginTop:'2%',
        marginBottom:'1%'    
  },
    lineSize:{
        marginHorizontal:'8%',
        flex: 1, 
        height: 1, 
        backgroundColor: 'white'
    },
    logo:{
        height: '21%',
        width: '38%',
        resizeMode: 'contain',
        position:"relative",
    },
    userName:{
        fontSize:15,
        fontWeight: "bold",
        textTransform:'uppercase',
        color:'white',
    },
    jobTitle:{
        fontSize:13,
        fontStyle:'italic',
        textTransform:'uppercase',
        color:'white',
        marginTop:'3%'
    } 
  });