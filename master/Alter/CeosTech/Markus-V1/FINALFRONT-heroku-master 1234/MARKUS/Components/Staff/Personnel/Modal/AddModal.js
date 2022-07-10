import React, { Component } from 'react';
import {
  StyleSheet, Text, View,  Platform, Dimensions,
  TextInput, Button, Keyboard, UIManager, Animated, ScrollView
} from 'react-native';
import Modal from 'react-native-modalbox';
import flatListData from '../data/flatListData'
import DatePicker from 'react-native-datepicker';
import PhoneInput from "react-native-phone-input";
import { Dropdown } from 'react-native-material-dropdown';
import { data } from '../data/items'
import { item } from '../data/itemQualification'

var screen = Dimensions.get('window');
const { State: TextInputState } = TextInput;


export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newWork: '',
      newTelephoneNumber: '',
      newAdresse: '',
      newCourriel: '',
      newSecu: '',
      newDateNaissance: '',
      newLieu: '',
      newNationalite: '',
      newQualification: '',
      newDate: '',
      isOpen: false,
      validated: false,
      isValid: null,
      shift: new Animated.Value(0),
      valid: "",
      type: "",
      value: "",
    };


  }
  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

  renderInfo() {
    if (this.state.newTelephoneNumber) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.newTelephoneNumber}</Text>
          </Text>
        </View>
      );
    }
  }
  // Rerend le / appele setState pour ne pas rerendre le component / appele le constructeur pas defaut / Re renders the/call setState so as not to re render the/call the default constructor
  // ComponentDidMount fonctionne aussi / ComponentDidMount also works 
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }
  // Pour le scroll jusqu'a la fin / For the scroll to the end
  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }
  showAddModal = () => {
    this.refs.myModal.open();
  }
  // Gneération d'un clé pour chaque ligne du tableau / Generating a key for each row in the table
  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }

  validateCourriel = (newCourriel) => {
    var re = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    return re.test(newCourriel);
  };

  validateTelephone = (newTelephoneNumber) => {
    var re = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
    return re.test(newTelephoneNumber);
  };
  validateSecu = (newSecu) => {
    var re = /^([1-3])[\s\.\-]?([0-9]{2})[\s\.\-]?(0[0-9]|[2-35-9][0-9]|[14][0-2])[\s\.\-]?(0[1-9]|[1-8][0-9]|9[0-57-9]|2[ab])[\s\.\-]?(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)[\s\.\-]?([0-9]{3})[\s\.\-]?([0-8][0-9]|9[0-7])$/;
    return re.test(newSecu);
  };
  
  render() {
    const { isValid } = this.state;
    const { shift } = this.state;
    return (
      <Modal

        ref={"myModal"}
        style={{
          margin: 0,
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 0,
          shadowRadius: 10,
          width: screen.width - 50,
          height: screen.height - 30,
          borderWidth: 1,
          borderColor: "#3BB9E0",
          borderRadius: 5,
          backgroundColor: 'black',

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
            <Button title="X" color="red" onPress={() => this.refs.myModal.close()} />
          </View>
          <Text style={{
            margin: 0,
            fontSize: 15,
            marginTop: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            lineHeight: 21,
          }}>Créer un nouveau Personnel</Text>
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

            onChangeText={(text) => this.setState({ newName: text })}
            placeholder="Nom"
            placeholderTextColor='white'
            value={this.state.newName}
            onValidation={isValid => this.setState({ isValid })}
            pattern={[
              '^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$',
              '^.{8,}$' // min 8 chars

            ]}
          />
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

          onChangeText={(text) => this.setState({ newName: text })}
          placeholder="Prénom"
          placeholderTextColor='white'
          value={this.state.newName}
          onValidation={isValid => this.setState({ isValid })}
          pattern={[
          '^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$',
          '^.{8,}$' // min 8 chars

          ]}
          />
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

            onChangeText={(text) => this.setState({ newWork: text })}
            placeholder="Métier"
            placeholderTextColor='white'
            value={this.state.newWork}
          />
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
              placeholder: "Numéro de téléphone",
              placeholderTextColor: "white",
            }}
            onChangePhoneNumber={(Number) => this.setState({ newTelephoneNumber: Number })}
            value={this.state.newTelephoneNumber}
            onValidation={isValid => this.setState({ isValid })}
          />
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
            onChangeText={(text) => this.setState({ newAdresse: text })}
            placeholder="Adresse"
            placeholderTextColor='white'
            value={this.state.newAdresse}
            onValidation={isValid => this.setState({ isValid })}
          />
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
            onChangeText={(text) => this.setState({ newCourriel: text })}
            placeholder="Courriel"
            placeholderTextColor='white'
            value={this.state.newCourriel}
            onValidation={isValid => this.setState({ isValid })}
          />
          <DatePicker
            onSubmitEditing={Keyboard.dismiss}
            date={this.state.newDateNaissance} //initial date from state
            mode="date" //The enum of date, datetime and time
            format="DD/MM/YYYY"
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
            onDateChange={(date) => { this.setState({ newDateNaissance: date }) }}
            value={this.state.newDateNaissance}
            placeholder="Date de naissance"
            onValidation={isValid => this.setState({ isValid })}
          />
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

            onChangeText={(text) => this.setState({ newLieu: text })}
            placeholder="Lieu de naissance"
            placeholderTextColor='white'
            value={this.state.newLieu}
          />
          <Dropdown
            placeholder="Nationalité"
            placeholderTextColor='white'
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
            onChangeText={(text) => this.setState({ newNationalite: text })}
            value={this.state.newNationalite}
          />

          <Dropdown
            placeholder="Qualification"
            placeholderTextColor='white'
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
            onChangeText={(text) => this.setState({ newQualification: text })}
            value={this.state.newQualification}
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
          <View style={styles.container}>
            <DatePicker
              onSubmitEditing={Keyboard.dismiss}
              date={this.state.newDate} //initial date from state
              mode="date" //The enum of date, datetime and time
              format="DD/MM/YYYY"
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
              onDateChange={(date) => { this.setState({ newDate: date }) }}
              value={this.state.newDate}
              placeholder="Date d'entrée "
              onValidation={isValid => this.setState({ isValid })}
            />
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
              onChangeText={(text) => this.setState({ newSecu: text })}
              placeholder="Numéro de Sécurité Social"
              placeholderTextColor='white'
              value={this.state.newSecu}
              onValidation={isValid => this.setState({ isValid })}
            />
          </View>
          <View style={[{ width: "100%", margin: 5, alignItems: 'center', }]}>
            <Button
              title='save'
              color='#3BB9E0'
              style={{
                width: 10,
                backgroundColor: '#99004d',
                marginTop: 20,
              }}
              onPress={() => {
                console.log(this.state)
                if (this.state.newName.length == 0) {
                  alert("Vous devez rentrer le prénom et nom ");
                  return;
                }
                if (this.state.newWork.length == 0) {
                  alert("Vous devez rentrer le métier ");
                  return;
                }
                if (this.state.newTelephoneNumber.length == 0) {
                  alert("Vous devez rentrer le numero de téléphone ");
                  return;
                }
                if (this.state.newNationalite.length == 0) {
                  alert("Vous devez rentrer le numero de téléphone ");
                  return;
                }
                if (this.state.newQualification.length == 0) {
                  alert("Vous devez rentrer le numero de téléphone ");
                  return;
                }
                if (this.state.newAdresse.length == 0) {
                  alert("Vous devez rentrer l'adresse ");
                  return;
                }
                  if (this.state.newCourriel.length == 0) {
                    alert("Vous devez rentrer le courriel ");
                    return;
                }
                if (this.state.newSecu.length == 0) {
                  alert("Vous devez rentrer le numéro de securité sociale ");
                  return;
                }
                if (this.state.newDateNaissance.length == 0) {
                  alert("Vous devez rentrer la date de naissance");
                  return;
                }
                if (this.state.newLieu.length == 0) {
                  alert("Vous devez rentrer le lieu ");
                  return;
                }
                if (this.state.newDate.length == 0) {
                  alert("Vous devez rentrer la date d'entrée");
                  return;
                }
                if (!this.validateCourriel(this.state.newCourriel)) {
                  alert("Adresse Mail invalide exemple : Pena@gmail.com")
                  return;
                }
                if (!this.validateSecu(this.state.newSecu)) {
                  alert("Numero de Securité invalide exemple : 2 94 03 75 120 005 22")
                  return;
                }
                const newKey = this.generateKey(24);
                const newRegister = {
                  key: newKey,
                  name: this.state.newName,
                  work: this.state.newWork,
                  telephonenumber: this.state.newTelephoneNumber,
                  adresse: this.state.newAdresse,
                  courriel: this.state.newCourriel,
                  secu: this.state.newSecu,
                  datenaissance: this.state.newDateNaissance,
                  lieu: this.state.newLieu,
                  nationalite: this.state.newNationalite,
                  qualification: this.state.newQualification,
                  date: this.state.newDate
                };
                flatListData.push(newRegister);
                this.props.parentFlatList.refreshFlatList(newKey);
                this.refs.myModal.close();
              }}>
            </Button>
          </View>
        </Animated.View>
        </ScrollView>
      </Modal>

    );
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
    height: 150,
    marginTop: 3,
    backgroundColor: "transparent"
  },
})