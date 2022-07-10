import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  CheckBox,
  Alert,
  AsyncStorage,
  StyleSheet,
  Dimensions,
} from "react-native";

import { registration_style, inscriptionStyle } from "../Style";

export default class RegistrationStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //company
      company: {
        name: "",
        address: "",
        postal_code: "",
        city: "",
        capital: null,
        SIRET_number: "",
      },
    };
  }

  _goTo = (destination) => {
    console.log("les params:: " + JSON.stringify(this.props.route.params));
    if (this._validateData() === true) {
      this.props.navigation.navigate(destination, {
        companyInfos: this.state.company,
        profileInfos: this.props.route.params.profileInfos,
      });
    }
  };

  _checkData() {
    //company data /Donnée de la société
    if (this.state.company.name === "")
      return Alert.alert("Nom", "Veuillez indiquer le nom de la société");
    if (this.state.company.address === "")
      return Alert.alert(
        "Adresse",
        "Veuillez indiquer l'adresse de la société"
      );
    if (this.state.company.postal_code === "")
      return Alert.alert(
        "code postal",
        "Veuillez indiquer le code postal de l'adresse de la société"
      );
    if (this.state.company.city === "")
      return Alert.alert(
        "Ville",
        "Veuillez indiquer le nom de la ville de l'adresse de la société"
      );
    if (this.state.company.capital == null)
      return Alert.alert(
        "Capital",
        "Veuillez indiquer le capital de la société"
      );
    if (this.state.company.SIRET_number === "")
      return Alert.alert(
        "SIRET/SIREN",
        "Veuillez indiquer le numéro SIREN de la société"
      );
    return true;
  }

  _validateData() {
    if (this._checkData() == true) {
      //TODO add regex for SIRET and SIREN
      let postalcode_reg = /^([0-9]){5}$/;
      //company
      if (postalcode_reg.test(this.state.company.postal_code) == false)
        return Alert.alert(
          "Code postal",
          "numéro de code postal *société* est invalide "
        );
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/**societe / company ****************************************************************/}
          <View style={styles.container}>
            <Text style={styles.title}>Société</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.fields_text,
                  {
                    textAlign: "center",
                    fontSize: 15,
                    fontStyle: "italic",
                  },
                ]}
              >
                Veuillez compléter tous les champs
              </Text>
              <Text style={{ textAlign: "center", fontSize: 17, color: "red" }}>
                {" "}
                *{" "}
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.fieldInput_container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field_names}>Dénomination sociale </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    color: "red",
                  }}
                >
                  {" "}
                  *{" "}
                </Text>
              </View>
              <TextInput
                style={styles.text_input}
                keyboardType="default"
                onChangeText={(newvalue) => {
                  this.setState((prevState) => ({
                    company: {
                      ...prevState.company,
                      name: newvalue,
                    },
                  }));
                }}
              />
            </View>
            <View style={styles.fieldInput_container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field_names}>Adresse du siège social </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    color: "red",
                  }}
                >
                  {" "}
                  *{" "}
                </Text>
              </View>
              <TextInput
                style={styles.text_input}
                keyboardType="default"
                onChangeText={(newvalue) => {
                  this.setState((prevState) => ({
                    company: {
                      ...prevState.company,
                      address: newvalue,
                    },
                  }));
                }}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>Code postal </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "red",
                    }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                </View>
                <TextInput
                  style={styles.text_input}
                  keyboardType="numeric"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      company: {
                        ...prevState.company,
                        postal_code: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>Ville </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "red",
                    }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                </View>
                <TextInput
                  style={styles.text_input}
                  keyboardType="default"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      company: {
                        ...prevState.company,
                        city: newvalue,
                      },
                    }));
                  }}
                />
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>Capital (€) </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "red",
                    }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                </View>
                <TextInput
                  style={styles.text_input}
                  keyboardType="numeric"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      company: {
                        ...prevState.company,
                        capital: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>SIREN</Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      color: "red",
                    }}
                  >
                    {" "}
                    *{" "}
                  </Text>
                </View>
                <TextInput
                  style={styles.text_input}
                  keyboardType="numeric"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      company: {
                        ...prevState.company,
                        SIRET_number: newvalue,
                      },
                    }));
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this._goTo("registrationStep3"); /* _validate()*/
              }}
            >
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1%",
    width: "100%",
  },
  text_input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#04295D",
    color: "black",
    paddingHorizontal: 15,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "200",
    height: 50,
    justifyContent: "center",
  },

  button: {
    width: "90%",
    marginVertical: "3%",
    borderColor: "#04295D",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#3BB9E0",
  },

  // style of the view witch contain the icon and the tewt inside the button (style de la vue qui est dans le bouton et qui contient l'icone et le texte)
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
  },
  // style of the text in the button (style du texte à  l'intérrieur des boutons)

  buttonText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  title: {
    color: "#04295D",
    fontWeight: "bold",
    fontSize: 25,
  },
  fields_text: {
    color: "gray",
    paddingHorizontal: 15,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "200",
    height: "100%",
    justifyContent: "center",
  },

  fieldInput_container: {
    width: "100%",
  },
  field_names: {
    color: "#04295D",
    fontWeight: "bold",
  },
});