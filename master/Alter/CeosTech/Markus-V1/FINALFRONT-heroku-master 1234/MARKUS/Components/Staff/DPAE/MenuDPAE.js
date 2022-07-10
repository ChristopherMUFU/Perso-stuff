import React from 'react';
import { Alert, PermissionsAndroid, Dimensions, Text, View, TextInput, Platform, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import * as Theme from '../../Styles/Theme';
import DatePicker from 'react-native-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import SignatureCapture from 'react-native-signature-capture';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import data_countries from '../DPAE/DPAE_model/data_countries'


export default class MenuDPAE extends React.Component{

    constructor(props){
        super(props);
        this.state={
            type: "",           
            name: "",
            useName: "",
            firstName: "" , 
            sexe: [{label : 'M' , value: 'M'}, {label : 'F' , value: 'F'}],                    
            socialNumber: "",
            errorSocialNumber: {bool: false, message: ""},
            birthDate: "",
            postalC: "",
            placeBirth: "",
            countryBirth: "",
            startDate: "",
            startHour: "",
            typeContrat: [{label: 'CDI', value: 'CDI'}, {label: 'CDD', value: 'CDD'}],
            endDate: "",
            lieuDPAE: "",
            dateDPAE: "",
            signature: "",
        }
    }

    _goTo(){
        this.props.navigation.navigate("CréationDPAE",{
            type : this.state.type ,             
            name : this.state.name , 
            useName: this.state.useName,
            sexe: this.state.sexe,
            socialNumber : this.state.socialNumber,
            birthDate : this.state.birthDate , 
            postalC : this.state.postalC,
            placeBirth : this.state.placeBirth,
            countryBirth: this.state.countryBirth,
            startDate: this.state.startDate,
            startHour: this.state.startHour,
            typeContrat: this.state.typeContrat,
            endDate: this.state.endDate,
            lieuDPAE: this.state.lieuDPAE,
            dateDPAE: this.state.dateDPAE,
            signature : this.state.signature
        });
      }

      _hasErrors(action, value){
        switch(action) {
            case "socialnumber":
                if(value != ""){
                    return( value.length < 13 ? this.setState({ errorSocialNumber: { bool: true, message: "Attention le numéro de sécurité sociale doit faire 13 chiffres" } })  : this.setState({ errorSocialNumber: { bool: false, message: "" } }) )
                }
        }
      }

    _checkHour() {
        let startHour = /^(?:[01][0-9]|2[0-3])[-:h][0-5][0-9]$/
        if (startHour.test(this.state.startHour)) {
            return 
        }
        else {
            Alert("Indiquer ..h..")
        }
    }

    _displayEndContract() {
        if (this.state.type == 'CDD') {
            return (
                <View style={Theme.styles.container}> 
                    <DatePicker
                    
                        style={{width: '88%',  marginLeft:'2%', marginTop: 15}}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="Date de fin du contrat"
                        format="DD/MM/YYYY"                                               
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                            width:0,
                            height:0,

                            },
                            dateInput: {
                                height: 60,
                                backgroundColor: 'white',                                
                                alignItems : 'flex-start' ,
                                borderRadius: 5,
                                
                            } , 
                            placeholderText : {
                                marginLeft : 20
                            }

                        }}
                        onDateChange={(date) => {this.setState({endDate: date})}}
                    />
                </View>
            )
        }
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    render(){
        return(
            <View style={Theme.styles.container}>
                <ScrollView style={{flex:1, width: '100%', backgroundColor: "#3C3C3C"}}>
                    
                    <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center'}}>
                        <Text style={{color: "white", fontSize: 20}}>Futur salarié</Text>
                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                width: '90%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Nom du salarié"
                            value={this.state.name}
                            onChangeText={(value) => this.setState({name : value})}
                        />
                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                width: '90%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Nom d'usage"
                            value={this.state.useName}
                            onChangeText={(value) => this.setState({useName : value})}
                        />
                    </View>

                    <View style={{flexDirection: 'row', flex: 1 ,...(Platform.OS !== 'android' && {
                            zIndex: 10
                            })
                        }} >
                        <TextInput 
                            style={{
                                marginTop: 20,
                                marginLeft: "5%",
                                width: '62%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Prénom"
                            value={this.state.firstName}
                            onChangeText={(value) => this.setState({firstName : value})}
                        />                              
                
                        <DropDownPicker
                            placeholder="Sexe"
                            items={this.state.sexe}
                            style = {{backgroundColor: 'white'}}
                            containerStyle= {
                                {   
                                    marginTop : 23,
                                    paddingLeft: "3%",                               
                                    height:60,
                                    width:100,
                                    alignItems: 'flex-end',
                                    
                                }
                            }
                            dropDownStyle = {{backgroundColor: 'white'}}
                            placeholderStyle={{color: 'black', fontSize: 16}}
                            labelStyle = {{color:'black', fontSize: 16}}
                            arrowColor = {'black'}
                            onChangeItem={ (item) => this.setState({sexe: item.value})}
                        />
                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput placeholder="N° de sécurité sociale" value={this.state.socialNumber} maxLength={13} keyboardType="numeric" style={[Theme.styles.textinput, {borderColor: this.state.errorSocialNumber.bool ? "red" : "black"}]} autoCorrect={false} onChangeText={(value)=>{this.setState({socialNumber: value}); this._hasErrors("socialNumber", value)}} />
                        {this.state.errorSocialNumber.bool ? <Text style={{backgroundColor: "red", color: "white"}}>{this.state.errorSocialNumber.message}</Text> : null }
                        
                    </View>

                    <View style={Theme.styles.container}> 
                        <DatePicker
                        
                            style={{width: '92%', marginTop: 20, marginBottom: 15, marginLeft:'2%', paddingTop: 20}}
                            date={this.state.birthDate}
                            mode="date"
                            placeholder="Date de naissance"
                            format="DD/MM/YYYY"                                               
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                width:0,
                                height:0,

                                },
                                dateInput: {
                                    height: 60,
                                    backgroundColor: 'white',
                                    padding : 5 ,
                                    alignItems : 'flex-start' ,
                                    borderRadius: 5,
                                    
                                } , 
                                placeholderText : {
                                    marginLeft : 30
                                }

                            }}
                            onDateChange={(date) => {this.setState({birthDate: date})}}
                        />
                    </View>

                    <View style = {{
                            flexDirection: 'row', 
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                marginLeft: "5%",
                                width: '65%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Lieu de naissance (Commune)"
                            value={this.state.placeBirth}
                            onChangeText={(value) => this.setState({placeBirth : value})}
                        />

                        <TextInput 
                            style={{
                                marginTop: 20,
                                margin: "3%",
                                width: '22%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                color: 'black',
                                paddingLeft: 28,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Dpt"
                            value={this.state.postalC}
                            onChangeText={(value) => this.setState({postalC : value})}
                        />

                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                                <DropDownPicker
                                    placeholder="Pays de naissance"
                                    items={data_countries}
                                    style = {{backgroundColor: 'white'}}
                                    containerStyle= {
                                        {   
                                            marginTop : 23,
                                            marginBottom: 30,                           
                                            height:60,
                                            width: "89%",
                                            alignItems: 'center',
                                            
                                        }
                                    }
                                    dropDownStyle = {{backgroundColor: 'white'}}
                                    placeholderStyle={{color: 'black', fontSize: 16}}
                                    labelStyle = {{color:'black', fontSize: 16}}
                                    arrowColor = {'black'}
                                    onChangeItem={ (item) => this.setState({countryBirth: item.value})}
                                />
                    </View> 

                    <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center'}}>
                        <Text style={{color: "white", fontSize: 20}}>L'embauche et l'emploi</Text>
                    </View>

                    <View style={Theme.styles.container}> 
                        <DatePicker
                        
                            style={{width: '92%', marginTop: 20, marginBottom: 15, marginLeft:'2%', paddingTop: 20}}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="Date prévisible d'embauche"
                            format="DD/MM/YYYY"                                               
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                width:0,
                                height:0,

                                },
                                dateInput: {
                                    height: 60,
                                    backgroundColor: 'white',
                                    padding : 5 ,
                                    alignItems : 'flex-start' ,
                                    borderRadius: 5,
                                    
                                } , 
                                placeholderText : {
                                    marginLeft : 30
                                }

                            }}
                            onDateChange={(date) => {this.setState({startDate: date})}}
                        />
                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                width: '90%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="Heure prévisible d'embauche"
                            value={this.state.startHour}
                            onChangeText={(value) => this.setState({startHour : value})}
                        />
                    </View>

                    <View style={{flexDirection: 'row', flex: 1 ,...(Platform.OS !== 'android' && {
                            zIndex: 10
                            })
                        }} >
                            <DropDownPicker
                                placeholder="Contrat"
                                items={this.state.typeContrat}
                                style = {{backgroundColor: 'white'}}
                                containerStyle= {
                                    {   
                                        marginTop : 20,
                                        
                                        paddingLeft: "5%",                               
                                        height:60,
                                        width:140,
                                        alignItems: 'flex-end',
                                        
                                    }
                                }
                                dropDownStyle = {{backgroundColor: 'white'}}
                                placeholderStyle={{color: 'black', fontSize: 16}}
                                labelStyle = {{color:'black', fontSize: 16}}
                                arrowColor = {'black'}
                                onChangeItem={ (item) => this.setState({type: item.value})}
                            />
                        {this._displayEndContract()}
                        
                    </View>

                    <View style = {{
                            flex: 1,                          
                            alignItems: 'center',
                            ...(Platform.OS !== 'android' && {
                                zIndex: 10
                                }),
                            paddingTop: 5
                            }}>
                        <TextInput 
                            style={{
                                marginTop: 20,
                                width: '90%',
                                height: 65,
                                borderWidth : 1.0,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                color: 'black',
                                paddingLeft: 35,
                                marginBottom: 2,
                                zIndex: 5
                            }}
                            placeholder="A :"
                            value={this.state.lieuDPAE}
                            onChangeText={(value) => this.setState({lieuDPAE : value})}
                        />
                    </View>

                    <View style={Theme.styles.container}> 
                        <DatePicker
                        
                            style={{width: '92%', marginTop: 20, marginBottom: 15, marginLeft:'2%', paddingTop: 20}}
                            date={this.state.dateDPAE}
                            mode="date"
                            placeholder="Le :"
                            format="DD/MM/YYYY"                                               
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                width:0,
                                height:0,

                                },
                                dateInput: {
                                    height: 60,
                                    backgroundColor: 'white',
                                    padding : 5 ,
                                    alignItems : 'flex-start' ,
                                    borderRadius: 5,
                                    
                                } , 
                                placeholderText : {
                                    marginLeft : 30
                                }

                            }}
                            onDateChange={(date) => {this.setState({dateDPAE: date})}}
                        />
                    </View>

                    <View style={{flexDirection: "row", marginTop: 15 , justifyContent:'center'}}>
                        <Text style={{color: "white", fontSize: 20}}>Signature</Text>
                    </View>

                    <View style={{ width: "88%", height: 150, marginBottom: 10 , borderRadius: 10,marginTop:15 , marginLeft:'6%'}}>
                        
                        <SignatureCapture
                            style={[{flex:1}, Theme.styles.signature]}
                            ref="sign"
                            onSaveEvent={ (result) => {console.log(result.pathName); this.setState( {signature: "data:image/png;base64,"+result.encoded} ) } }
                            onDragEvent={ () => { } }
                            saveImageFileInExtStorage={true}
                            showNativeButtons={false}
                            showTitleLabel={true}
                        />
                        
                    </View>
                    <View style={Theme.styles.container}>
                        <TouchableOpacity onPress = {() => { this.resetSign() }} style={Theme.buttonsV2.touchAble} >
                            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradient}>
                                <Text style={Theme.buttonsV2.buttonText}>
                                    Reset
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => { this._goTo()}} style={Theme.buttonsV2.touchAble}>
                            <LinearGradient elevation={5} colors={['#696969' , '#595959' , '#494949']} style = {Theme.buttonsV2.linearGradient}>
                                <Text style = {Theme.buttonsV2.buttonText}>Valider</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                            
                </ScrollView>
            </View>
        )
    }
}