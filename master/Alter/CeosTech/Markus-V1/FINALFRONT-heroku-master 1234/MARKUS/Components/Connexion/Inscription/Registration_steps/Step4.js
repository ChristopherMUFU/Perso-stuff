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

import { validateUserSubscription } from "../../../../API/Authentification";
//import '../Connexion'

export default class RegistrationStep4 extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      //Retirement
      company: {
        ...this.props.route.params.companyInfos,
        retirement_fund_name: "",
        retirement_fund_address: "",
        retirement_fund_city: "",
        retirement_fund_postal_code: "",
      },
      profile: this.props.route.params.profileInfos,
      etablissement: this.props.route.params.etablissementInfos,
    }),
      (this.checkbox_cgu = false);
  }

  //Fonction permettant d'accéder à la nav CGU
  _goTo = (action) => {
    switch (action) {
      case "cgvpublic":
        this.props.navigation.navigate("cgvpublic");
        break;
    }
  };

  /**
   * check the if the user typed in all fields
   */
  _checkData() {
    //Retirement
    if (this.state.company.retirement_fund_name === "")
      return Alert.alert(
        "Nom",
        "Veuillez indiquer le nom de la caisse de retraite"
      );
    if (this.state.company.retirement_fund_address === "")
      return Alert.alert(
        "Adresse",
        "Veuillez indiquer l'adresse de la caisse de retraite"
      );
    if (this.state.company.retirement_fund_postal_code === "")
      return Alert.alert(
        "code postal",
        "Veuillez indiquer le code postal de l'adresse de la caisse de retraite"
      );
    if (this.state.company.retirement_fund_city === "")
      return Alert.alert(
        "Nom",
        "Veuillez indiquer le nom de la ville de l'adresse de la  caisse de retraite"
      );

    return true;
  }

  /**
   * validate the data typed in by the user
   */
  _validateData() {
    if (this._checkData() == true) {
      let postalcode_reg = /^([0-9]){5}$/;

      if (
        postalcode_reg.test(this.state.company.retirement_fund_postal_code) ==
        false
      )
        return Alert.alert(
          "Code postal",
          "numéro de code postal *caisse de retraite* est invalide"
        );

      return true;
    }
    return false;
  }

  _subscribeUser() {
    let formData = {
      nom: this.state.profile.firstName,
      prénom: this.state.profile.familyName,
      email: this.state.profile.email,
      phone_number: this.state.profile.phoneNumber,
      company_position: this.state.profile.companyPosition,
      user: {
        username: this.state.profile.email,
        password: this.state.profile.password,
      },
      restaurant: this.state.etablissement,
      company: this.state.company,
    };

    if (this._validateData() == true) {
      validateUserSubscription(formData).then((data) => {
        if (data !== null) {
          this.props.navigation.navigate("connexion");
          return Alert.alert("Bravo, votre inscription est complète");
        } else {
          return Alert.alert(
            "Un problème s'est produit lors de votre inscription."
          );
        }
      });
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
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
          {/***********************CAISSE DE RETRAITE*************************************************** */}

          <View style={styles.fieldInput_container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.field_names}>
                Nom de la caisse de retraite{" "}
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
              onChangeText={(newvalue) => {
                this.setState((prevState) => ({
                  company: {
                    ...prevState.company,
                    retirement_fund_name: newvalue,
                  },
                }));
              }}
            />
          </View>

          <View style={styles.fieldInput_container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.field_names}>
                Adresse de la Caisse de retraite{" "}
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
              onChangeText={(newvalue) => {
                this.setState((prevState) => ({
                  company: {
                    ...prevState.company,
                    retirement_fund_address: newvalue,
                  },
                }));
              }}
            />
          </View>

          <View style={styles.fieldInput_container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.field_names}> Code postal </Text>
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
                    retirement_fund_postal_code: newvalue,
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
              keyboardType="default"
              onChangeText={(newvalue) => {
                this.setState((prevState) => ({
                  company: {
                    ...prevState.company,
                    retirement_fund_city: newvalue,
                  },
                }));
              }}
            />
          </View>
        </View>

        <Text
          style={{
            color: "#04295D",
            fontStyle: "italic",
            fontSize: 16,
            marginLeft: "5%",
            marginTop: "7%",
            marginRight: "2%",
            textAlign: "center",
          }}
        >
          {" "}
          En confirmant votre inscription vous acceptez les{" "}
        </Text>

        <TouchableOpacity onPress={() => this._goTo("cgvpublic")}>
          <Text
            style={{
              color: "#3BB9E0",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {" "}
            Conditions Générales d'Utilisation.{" "}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this._subscribeUser();
            }}
          >
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: "90%",
  },
  field_names: {
    color: "#04295D",
    fontWeight: "bold",
  },
});