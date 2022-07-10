import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  AsyncStorage,
} from "react-native";

export default class RegistrationStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //user profile
      profile: {
        familyName: "",
        firstName: "",
        phoneNumber: "",
        email: "",
        confirmed_email: "",
        password: "",
        confirmed_password: "",
        companyPosition: "",
      },
    };
  }

  _goTo = (destination) => {
    if (this._validateData() === true) {
      this.props.navigation.navigate(destination, {
        profileInfos: this.state.profile,
      });
    }
  };

  _checkData() {
    //profile data / Donnée de l'utilisateur
    if (this.state.profile.familyName === "")
      return Alert.alert("Nom", "Veuillez indiquer le nom d'utilisateur");
    if (this.state.profile.firstName === "")
      return Alert.alert("Prénom", "Veuillez indiquer le prénom d'utilisateur");
    if (this.state.profile.email === "")
      return Alert.alert("Email", "Veuillez indiquer l'email d'utilisateur");
    if (this.state.profile.confirmed_email === "")
      return Alert.alert("Email", "Veuillez confirmer l'email d'utilisateur");
    if (this.state.profile.phoneNumber === "")
      return Alert.alert(
        "Numéro de téléphone",
        "Veuillez indiquer le numéro de téléphone d'utilisateur"
      );
    if (this.state.profile.password === "")
      return Alert.alert(
        "Mot de passe",
        "Veuillez indiquer le mot de passe d'utilisateur"
      );
    if (this.state.profile.confirmed_password === "")
      return Alert.alert(
        "Mot de passe",
        "Veuillez confirmer le mot de passe d'utilisateur"
      );
    return true;
  }

  _validateData() {
    if (this._checkData() == true) {
      let phonenumber_reg = /^0([0-9]){9}$/;
      let email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //profile
      if (email_reg.test(this.state.profile.email) == false)
        return Alert.alert(
          "Email",
          "Veuillez indiquer une addresse mail valide"
        );
      if (this.state.profile.email !== this.state.profile.confirmed_email)
        return Alert.alert("Email", "Adresse mail non identique");
      if (phonenumber_reg.test(this.state.profile.phoneNumber) == false)
        return Alert.alert(
          "Numéro de téléphone",
          "numéro de téléphone *utilisateur* est invalide"
        );
      if (this.state.profile.password !== this.state.profile.confirmed_password)
        return Alert.alert("Mot de passe", "Mot de passe non identique");
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/**profile utilisateur  / profile user*/}
          <View style={styles.container}>
            <Text style={styles.title}>Profil utilisateur</Text>
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

            <View style={styles.container}>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}> Nom </Text>
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
                      profile: {
                        ...prevState.profile,
                        familyName: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}> Prénom </Text>
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
                      profile: {
                        ...prevState.profile,
                        firstName: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}> Email </Text>
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
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      profile: {
                        ...prevState.profile,
                        email: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>
                    {" "}
                    Confirmer votre email{" "}
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
                  keyboardType="email-address"
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      profile: {
                        ...prevState.profile,
                        confirmed_email: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}> Numéro de téléphone </Text>
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
                      profile: {
                        ...prevState.profile,
                        phoneNumber: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}> Mot de passe </Text>
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
                  secureTextEntry={true}
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      profile: {
                        ...prevState.profile,
                        password: newvalue,
                      },
                    }));
                  }}
                />
              </View>
              <View style={styles.fieldInput_container}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.field_names}>
                    {" "}
                    Confirmer mot de passe{" "}
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
                  keyboardType="default"
                  secureTextEntry={true}
                  onChangeText={(newvalue) => {
                    this.setState((prevState) => ({
                      profile: {
                        ...prevState.profile,
                        confirmed_password: newvalue,
                      },
                    }));
                  }}
                />
              </View>
            </View>
          </View>
          {/************************************************************************** */}
          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this._goTo("registrationStep2"); /* _validate()*/
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