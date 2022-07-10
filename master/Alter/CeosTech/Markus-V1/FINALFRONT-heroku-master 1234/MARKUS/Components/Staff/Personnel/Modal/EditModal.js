
import React, { Component } from 'react';
import {
  AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
  Platform, TouchableHighlight, Dimensions, ScrollView,
  TextInput, Button, TouchableNativeFeedback, Keyboard, KeyboardAvoidingView, UIManager, Animated
} from 'react-native';

import Modal from 'react-native-modalbox';
import flatListData from '../data/flatListData';
import DatePicker from 'react-native-datepicker';
import PhoneInput from "react-native-phone-input";
import { Dropdown } from 'react-native-material-dropdown';
import { data } from '../data/items'
import { item } from '../data/itemQualification'
import {updatePersonnel} from '../../../../API/StaffData';
import Personnelscreen from '../Personnelscreen';
import {validEditModal, _returnValidEditModal} from '../Personnelscreen';
//import {refreshFlatList} from '../'

var screen = Dimensions.get('window');
const { State: TextInputState } = TextInput;
export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      civilite: '',
      FullName: '',
      Name: '',
      key: 0,
      LastName: '',
      Work: '',
      Status:'',
      TelephoneNumber: '',
      Adresse: '',
      ville: '',
      code_postale: '',
      Courriel: '',
      Secu: '',
      DateNaissance: '',
      Lieu: '',
      Nationalité: '',
      salaire: '',
      Date: '',
      shift: new Animated.Value(0),
      isOpen: false,
      modalVisible: false,
      validated: false,
      isValid: null,
      valid: "",
      type: "",
      value: "",
    };
  }
  showEditModal = (editingFood) => {
    console.log(`editingFood = ${JSON.stringify(editingFood)}`);
    this.setState({
        // à modifier de toute urgence #PROBLEME dans le back
      FullName: editingFood.nom +" " + editingFood.prenom ,
      Name: editingFood.nom,
      LastName: editingFood.prenom,
      key: editingFood.id,
      civilite: editingFood.civilite,
      Work: editingFood.poste,
      Status: editingFood.poste,
      TelephoneNumber: editingFood.numero_telephone,
      ville: editingFood.ville,
      Adresse: editingFood.addresse,
      code_postale: editingFood.code_postale,
      Courriel: editingFood.courriel,
      Secu: editingFood.numero_securite_social,
      DateNaissance: editingFood.date_de_naissance,
      Lieu: editingFood.lieu_de_naissance,
      Nationalité: editingFood.nationnalite,
      salaire: editingFood.salaire,
      Date: editingFood.date_d_entree,


    });
    this.refs.myModal.open();
  }
  _testEditModal() {
    if(this.props.parentFlatList._returnValidEditModal() === true){
        this.setState({modalVisible: true})
    }
  }
  
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }


  _verify() {
    if (this.state.Name == "") {
        return Alert.alert("Veuillez indiquer le nom du personnel");
    }

    if (this.state.Adresse == "") {
        return Alert.alert("Veuillez indiquer l'adresse");
    }

    if (this.state.Courriel == "") {
        return Alert.alert("Veuillez indiquer un mail");
    }
    if (this.state.Work == "") {
      return Alert.alert("Veuillez indiquer le metier du personnel");
    }
    if (this.state.Nationalité == "") {
      return Alert.alert("Veuillez indiquer la nationalite du personnel");
    }
    if (this.state.DateNaissance == "") {
      return Alert.alert("Veuillez indiquer la date de naissaince du personnel");
    }
    if (this.state.Lieu == "") {
      return Alert.alert("Veuillez indiquer le lieu de naissance du personnel");
    }

  else {
    updatePersonnel({

                  //id: 300, // Voir un algo
                  //civilite: this.state.civility,
                  //nom: this.state.name,
                  //prenom: this.state.lastname,
                  //addresse: this.state.adress,
                  //ville: this.state.city,
                  //code_postale: this.state.codePostal,
                  //courriel: this.state.mail,
                  //numero_telephone: this.state.mobile,
                  //numero_securite_social: this.state.social,
                  //date_de_naissance: this.state.dateNaissaince,
                  //lieu_de_naissance: this.state.lieu,
                  //nationnalite: this.state.nationalite,
                  //statut: this.state.qualification,
                  //salaire: this.state.salaireBrut,
                  //poste: this.state.qualification, // voir métier
                  //date_d_entree: this.state.date,
                  // user: null, // !!!! commenter le champs user dans le back !!!!! (pour test)
                  //restaurant: 1 // faire un menu déroulant des restaurant dispo

                      civilite: this.state.civilite,
                      nom: this.state.Name,
                      prenom: this.state.LastName,
                      addresse: this.state.Adresse,
                      ville: this.state.ville,
                      code_postale: this.state.code_postale,
                      courriel: this.state.Courriel,
                      numero_telephone: this.state.TelephoneNumber,
                      numero_securite_social: this.state.Secu,
                      date_de_naissance: this.state.DateNaissance,
                      lieu_de_naissance: this.state.Lieu,
                      nationnalite: this.state.Nationalité,
                      statut: this.state.Status,
                      salaire: this.state.salaire,
                      poste: this.state.Work, // voir métier
                      date_d_entree: this.state.Date,
                      restaurant: this.props.restaurantId

              }, this.state.key);
              

  }
}

  render() {
    const { isValid } = this.state;
    const { shift } = this.state;
    this._testEditModal();
    return (
      <Modal

        ref={"myModal"}
        style={{
          margin: 0,
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 0,
          shadowRadius: 10,
          width: screen.width - 80,
          height: screen.height - 30,
          borderWidth: 1,
          borderColor: "#3BB9E0",
          borderRadius: 5,
          backgroundColor: "#3C3C3C",

        }}
        position={"center"}
        backdrop={true}
        swipeToClose={false}
        backdropColor={'black'}
        backButtonClose={true}
        coverScreen={true}
        backdropPressToClose={false}
        isOpen={this.state.modalVisible}
        onClosed={() => {
          this.setState({ modalVisible: false });
        }}


      >
      <ScrollView>
        <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
          <View style={[styles.btn, styles.btnModal]}>
            <Button title="X" color="black" onPress={() => this.refs.myModal.close()} />
          </View>
          <Text style={{
            margin: 0,
            fontSize: 18,
            marginTop: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            lineHeight: 21,
          }}>Modifier un Personnel</Text>
          
          
          
          
          <Text style={ styles.text }>Nom</Text>
          
          <TextInput
            style={ styles.input }

            onChangeText={(text) => this.setState({ Name: text })}
            placeholder="Entrer le nom "
            value={this.state.Name}
            onValidation={isValid => this.setState({ isValid })}
            pattern={[
              '^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$',
              '^.{8,}$' // min 8 chars

            ]}
          />
          
          
          
          
          <Text style={ styles.text }>Prénom</Text>
          
          <TextInput
            style={ styles.input }

            onChangeText={(text) => this.setState({ LastName: text })}
            placeholder="Entrer le nom "
            value={this.state.LastName}
            onValidation={isValid => this.setState({ isValid })}
            pattern={[
              '^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$',
              '^.{8,}$' // min 8 chars

            ]}
          />
          
          
          
          <Text style={ styles.text }>Statut</Text>
          
            <Dropdown
            placeholder="Statut"
            labelFontSize={4}
            baseColor={'white'}
            inputContainerStyle={{
              borderBottomColor: 'transparent',
              color: 'white',
            }}
            containerStyle={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            style={{ color: 'white' }}

            dropdownOffset={{ top: 0 }}
            data={item}
            onChangeText={(text) => this.setState({ Work: text })}
            value={this.state.Work}
          />
      {/* Here */}
      <Text style={ styles.text }>Salaire</Text>
      
      <TextInput
            onSubmitEditing={Keyboard.dismiss}
            style={ styles.input }
            onChangeText={(text) => this.setState({ salaire: text })}
            placeholder="Entrer le salaire"
            keyboardType = 'numeric'
            value={this.state.salaire}
            onValidation={isValid => this.setState({ isValid })}
          />



          <Text style={ styles.text }>Numéro de téléphone</Text>
          <PhoneInput
            onSubmitEditing={Keyboard.dismiss}
            ref={ref => {
              this.phone = ref;
            }}
            allowZeroAfterCountryCode={true}
            autoFormat={true}
            initialCountry='null'
            value={this.state.newTelephoneNumber}
            onPressFlag={this.onPressFlag}
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              color: 'white'
            }}
            textStyle={{
              color: 'white'
            }}
            textProps={{
              placeholder: "Entrer le numéro de téléphone"
            }}
            onChangePhoneNumber={(Number) => this.setState({ TelephoneNumber: Number })}
            value={this.state.TelephoneNumber}
            onValidation={isValid => this.setState({ isValid })}
          />
          
          <Text style={ styles.text }>Adresse</Text>
          <TextInput
            onSubmitEditing={Keyboard.dismiss}
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              color: 'white'
            }}
            onChangeText={(text) => this.setState({ Adresse: text })}
            placeholder="Entrer l'adresse"
            value={this.state.Adresse}
            onValidation={isValid => this.setState({ isValid })}
          />
          
          <Text style={ styles.text }>Courriel</Text>
          <TextInput
            onSubmitEditing={Keyboard.dismiss}
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              color: 'white'
            }}
            onChangeText={(text) => this.setState({ Courriel: text })}
            placeholder="Entrer le Courriel"
            value={this.state.Courriel}
            onValidation={isValid => this.setState({ isValid })}
          />
          
          <Text style={ styles.text }>Date de naissance</Text>
          <DatePicker
            onSubmitEditing={Keyboard.dismiss}
            date={this.state.DateNaissance} //initial date from state
            mode="date" //The enum of date, datetime and time
            format="DD-MM-YYYY"
            minDate="01-01-1950"
            maxDate="01-01-2050"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
              color: 'white',
              textAlign: 'center',
              borderBottomWidth: 1,
              height: 40,
              width: '85%',
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 30,
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                borderWidth: 0,
                marginLeft: 30,
                Textcolor: 'white',
                color: 'white',
                backgroundColor: "transparent"

              },
              placeholderText: {
                color: 'white'
              },
              dateText: {
                color: '#c7c8ca',
                justifyContent: 'flex-start'
              }
            }}
            onDateChange={(date) => { this.setState({ DateNaissance: date }) }}
            value={this.state.DateNaissance}
            placeholder="Veuiller rentrer la date de naissance "
            onValidation={isValid => this.setState({ isValid })}
          />
          
          <Text style={ styles.text }>Lieu de naissance</Text>
          <TextInput
            style={{

              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              color: 'white'
            }}

            onChangeText={(text) => this.setState({ Lieu: text })}
            placeholder="Entrer le Lieu de naissance"
            value={this.state.Lieu}
          />
          
          <Text style={ styles.text }>Nationalité</Text>
          <Dropdown
            placeholder="Nationalité"
            labelFontSize={4}
            baseColor={'white'}
            inputContainerStyle={{
              borderBottomColor: 'transparent',
              color: 'white',
            }}
            containerStyle={{
              height: 40,
              borderBottomColor: 'gray',
              marginLeft: 30,
              marginRight: 30,
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            style={{ color: 'white' }}

            dropdownOffset={{ top: 0 }}
            data={data}
            onChangeText={(text) => this.setState({ Nationalité: text })}
            value={this.state.Nationalité}
          />

          {/*<GooglePlacesAutocomplete
                placeholder='Text'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                  console.log(data);
                  console.log(details);
                }
            // 'details' is provided when fetchDetails = tr
          }
                textInputProps={{
                  onChangeText: (text) => { console.log(text) }
                }}
                getDefaultValue={() => ''}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyBKd4P7dWhknvWqIDMpwjVR9ah6tC4PI5Y',
                  language: 'en', // language of the results
                  types: '(cities)', // default: 'geocode'
                }}
                styles={{
                  textInputContainer: {
                    height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                        color : 'white'
                  },
                  description: {
                    fontWeight: 'bold',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                value={this.state.newNationalite}
                onChangeText={(text) => this.setState({ newNationalite : text})}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
                filterReverseGeocodingByTypes={['country',
                'administrative_area_level_2',]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
/>
              */}
              
              
              <Text style={ styles.text }>Date entrée</Text>
          <View style={styles.container}>
            <DatePicker
              onSubmitEditing={Keyboard.dismiss}
              date={this.state.Date} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="DD-MM-YYYY"
              minDate="01-01-1950"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                height: 40,
                borderBottomColor: 'gray',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 10,
                color: 'white',
                textAlign: 'center',
                borderBottomWidth: 1,
                height: 40,
                width: '85%',
              }}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 30,
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 20,
                  Textcolor: 'white',
                  color: 'white',
                  backgroundColor: "transparent"

                },
                placeholderText: {
                  color: 'white'
                },
                dateText: {
                  color: '#c7c8ca',
                  justifyContent: 'flex-start'
                }
              }}
              onDateChange={(date) => { this.setState({ Date: date }) }}
              value={this.state.Date}
              placeholder="Veuiller renter une date d'entrée "
              onValidation={isValid => this.setState({ isValid })}
            />
            
            
            
            <Text style={ styles.text }>Numéro de Sécurité Social</Text>
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              style={{
                height: 40,
                borderBottomColor: 'gray',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 60,
                borderBottomWidth: 1,
                color: 'white'
              }}
              onChangeText={(text) => this.setState({ Secu: text })}
              placeholder="Entrer le Numéro de Sécurité Social"
              keyboardType = 'numeric'
              value={this.state.Secu}
              onValidation={isValid => this.setState({ isValid })}
            />
          </View>
          <View style={[{ width: "100%", marginBottom:'7%', alignItems: 'center', }]}>
            <Button
              title='Modifier'
              color='#3BB9E0'
              style={{
                width: 10,
                backgroundColor: '#99004d',
                marginTop: 20,
              }}
              onPress={() => {this._verify(), this.props.parentFlatList._dataRefresh(),
      // civilite: '',
      // Name: '',
      // LastName: '',
      // Work: '',
      // TelephoneNumber: '',
      // Adresse: '',
      // ville: '',
      // code_postale: '',
      // Courriel: '',
      // Secu: '',
      // DateNaissance: '',
      // Lieu: '',
      // Nationalité: '',
      // salaire: '',
      // Date: '',
      // shift: new Animated.Value(0),
      // isOpen: false,
      // validated: false,
      // isValid: null,
      // valid: "",
      // type: "",
      // value: "",


                // Faire une fonction qui envoi tout les changement au back

                this.refs.myModal.close();
              }}>
            </Button>
          </View>
        </Animated.View>
         </ScrollView>
      </Modal>
    );
  }
}
handleKeyboardDidShow = (event) => {
  const { height: windowHeight } = Dimensions.get('window');
  const keyboardHeight = event.endCoordinates.height;
  const currentlyFocusedField = TextInputState.currentlyFocusedField();
  UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
    const fieldHeight = height + 30;
    const fieldTop = pageY + 10;
    const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
    if (gap >= 0) {
      return;
    }
    Animated.timing(
      this.state.shift,
      {
        toValue: gap,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  });
}

handleKeyboardDidHide = () => {
  Animated.timing(
    this.state.shift,
    {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }
  ).start();
}

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 20,
    paddingBottom: 10,
  },

  btnModal: {
    position: "absolute",
    right: 2,
    width: 50,
    height: 100,
    marginTop: 3,
    backgroundColor: "transparent"
  },
  
  text: {
    //height: 40,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    fontWeight: 'bold',
    color: "#3BB9E0", 
    fontSize:16
  },
  
  
  input: {
    height: 40,
    borderBottomColor: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    color: 'white',
  },
})