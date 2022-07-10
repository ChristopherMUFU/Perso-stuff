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
import DropDownPicker from "react-native-dropdown-picker";

export default class RegistrationStep3 extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      //etablissement / institution
      etablissement: {
        name: "",
        address: "",
        postal_code: "",
        city: "",
        phone_number: "",
      },
      company: this.props.route.params.companyInfos,
      profile: this.props.route.params.profileInfos,
    }),
      //for checkbox
      (this.checkbox_address = false),
      (this.checkbox_name = false);
  }

  _goTo = (destination) => {
    console.log("les params:: " + JSON.stringify(this.props.route.params));
    if (this._validateData() === true) {
      this.props.navigation.navigate(destination, {
        etablissementInfos: this.state.etablissement,
        companyInfos: this.state.company,
        profileInfos: this.state.profile,
      });
    }
  };

  _checkData() {
    //etablissement data / institution data
    if (this.state.etablissement.name === "")
      return Alert.alert("Nom", "Veuillez indiquer le nom de restaurant");
    if (this.state.etablissement.address === "")
      return Alert.alert(
        "Adresse",
        "Veuillez indiquer l'adresse de restaurant"
      );
    if (this.state.etablissement.postal_code === "")
      return Alert.alert(
        "Code Postal",
        "Veuillez indiquer le code postal de l'adresse de restaurant"
      );
    if (this.state.etablissement.city === "")
      return Alert.alert(
        "Ville",
        "Veuillez indiquer le nom de la ville de l'adresse de restaurant"
      );
    if (this.state.profile.companyPosition === "")
      return Alert.alert(
        "Poste",
        "Veuillez indiquer le poste dans l'entreprise"
      );
    if (this.state.etablissement.phoneNumber === "")
      return Alert.alert(
        "Numéro de téléphone",
        "Veuillez indiquer le numéro de téléphone de restaurant"
      );
    return true;
  }

  _validateData() {
    if (this._checkData() == true) {
      let postalcode_reg = /^([0-9]){5}$/;
      let phonenumber_reg = /^0([0-9]){9}$/;
      //restaurant
      if (postalcode_reg.test(this.state.etablissement.postal_code) == false)
        return Alert.alert(
          "Code postal",
          "numéro de code postal *établissement* est invalide "
        );
      if (phonenumber_reg.test(this.state.etablissement.phone_number) == false)
        return Alert.alert(
          "Numéro de téléphone",
          "numéro de téléphone *établissement* est invalide"
        );
      return true;
    }
    return false;
  }

  render() {
    return (
      <ScrollView>
        {/**etablissement  / institution ********************************************************* */}
        <View style={styles.container}>
          <Text style={styles.title}>Établissement</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={
                (styles.fields_text,
                {
                  textAlign: "center",
                  fontSize: 15,
                  color: "gray",
                  fontStyle: "italic",
                  marginTop: 4,
                })
              }
            >
              Veuillez compléter tous les champs
            </Text>
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

          <View style={styles.container}>
            <View style={styles.fieldInput_container}>
              <View style={styles.checkbox_container}>
                <CheckBox
                  style={styles.checkbox_box}
                  value={this.checkbox_name}
                  tintColors={{ false: "#04295D", true: "#04295D" }}
                  onValueChange={(newvalue) => {
                    this.checkbox_name = newvalue;
                    if (newvalue) {
                      this.setState((prevState) => ({
                        etablissement: {
                          ...prevState.etablissement,
                          name: this.state.company.name,
                        },
                      }));
                    } else {
                      this.setState((prevState) => ({
                        etablissement: {
                          ...prevState.etablissement,
                          name: "",
                        },
                      }));
                    }
                  }}
                />
                <Text style={styles.checkbox_label}>
                  Nom de l'établissement identique à celui de la société
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>
                    {" "}
                    Nom de l'établissement{" "}
                  </Text>
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
                  defaultValue={this.state.etablissement.name}
                  style={styles.text_input}
                  keyboardType="default"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      etablissement: {
                        ...prevState.etablissement,
                        name: newvalue,
                      },
                    }));
                  }}
                />
              </View>
            </View>
            <View style={styles.fieldInput_container}>
              <View style={styles.checkbox_container}>
                <CheckBox
                  style={styles.checkbox_box}
                  value={this.checkbox_address}
                  tintColors={{ false: "#04295D", true: "#04295D" }}
                  onValueChange={(newvalue) => {
                    this.checkbox_address = newvalue;
                    if (newvalue === true) {
                      this.setState((prevState) => ({
                        etablissement: {
                          ...prevState.etablissement,
                          address: this.state.company.address,
                          postal_code: this.state.company.postal_code,
                          city: this.state.company.city,
                        },
                      }));
                    } else {
                      this.setState((prevState) => ({
                        etablissement: {
                          ...prevState.etablissement,
                          address: "",
                          postal_code: "",
                          city: "",
                        },
                      }));
                    }
                  }}
                />
                <Text style={styles.checkbox_label}>
                  Adresse de l'établissement identique à celle de la société
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>
                    Adresse (rue, avenue, boulevard, voie...){" "}
                  </Text>
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
                  defaultValue={this.state.etablissement.address}
                  keyboardType="default"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      etablissement: {
                        ...prevState.etablissement,
                        address: newvalue,
                      },
                    }));
                  }}
                />
              </View>
            </View>

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
                defaultValue={this.state.etablissement.postal_code}
                keyboardType="numeric"
                onChangeText={(newvalue) => {
                  this.setState((prevState) => ({
                    etablissement: {
                      ...prevState.etablissement,
                      postal_code: newvalue,
                    },
                  }));
                }}
              />
            </View>
            <View style={styles.fieldInput_container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field_names}> Ville </Text>
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
                defaultValue={this.state.etablissement.city}
                keyboardType="default"
                onChangeText={(newvalue) => {
                  this.setState((prevState) => ({
                    etablissement: {
                      ...prevState.etablissement,
                      city: newvalue,
                    },
                  }));
                }}
              />
            </View>

            <View style={styles.fieldInput_container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field_names}>Poste dans l'entreprise </Text>
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
              <View>
                <DropDownPicker
                  placeholder="Poste en entreprise"
                  items={[
                    {
                      label: "Président (SA et SAS)",
                      value: "Président (SA et SAS)",
                    },
                    {
                      label: "Directeur Général (SA et SAS)",
                      value: "Directeur Général (SA et SAS)",
                    },
                    {
                      label: "Gérant (SA et SAS)",
                      value: "Gérant (SARL et EURL)",
                    },
                    {
                      label: "Auto-entrepreneur",
                      value: "Auto-entrepreneur",
                    },
                    {
                      label: "Entrepreneur individuel",
                      value: "Entrepreneur individuel",
                    },
                    { label: "DRH", value: "DRH" },
                    {
                      label: "Directeur de restauration",
                      value: "Directeur de restauration",
                    },
                    { label: "Manager", value: "Manager" },
                  ]}
                  containerStyle={{
                    height: 50,
                    width: "100%",
                  }}
                  //dropDownStyle={styles.dropdownStyle}
                  dropDownStyle={{ backgroundColor: "white" }}
                  labelStyle={{ color: "#04295D", fontSize: 14 }}
                  selectedLabelStyle={{
                    color: "white",
                    fontSize: 15,
                  }}
                  itemStyle={{ justifyContent: "flex-start" }}
                  style={{
                    backgroundColor: "white",
                    paddingLeft: 20,
                  }}
                  onChangeItem={(item) => {
                    console.log("le choix :: " + JSON.stringify(item.value));
                    this.setState((prevState) => ({
                      profile: {
                        ...prevState.profile,
                        companyPosition: item.value,
                      },
                    }));
                  }}
                />
              </View>
            </View>
            <View style={styles.fieldInput_container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.field_names}>Numéro de téléphone </Text>
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
                keyboardType="phone-pad"
                onChangeText={(newvalue) => {
                  this.setState((prevState) => ({
                    etablissement: {
                      ...prevState.etablissement,
                      phone_number: newvalue,
                    },
                  }));
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this._goTo("registrationStep4"); /* _validate()*/
            }}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  checkbox_label: {
    color: "#04295D",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
  },
  checkbox_box: {
    alignSelf: "center",
  },
  zip_textinput: {
    backgroundColor: "white",
    height: 50,
    width: "90%",
    borderRadius: 7,
    fontSize: 20,
  },
  checkbox_container: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1%",
    width: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "white",
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
  //DropDownPicker Etablissement / Institution
  dropdown_view: {
    ...(Platform.OS !== "android" && { zIndex: 10 }),
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: "60%",
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
    width: "100%",
  },

  fieldInput_container: {
    width: "100%",
  },
  field_names: {
    color: "#04295D",
    fontWeight: "bold",
  },
});