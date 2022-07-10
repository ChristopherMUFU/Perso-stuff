import React from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getRestaurantOwnerDetail } from "../../../API/AccountsData";
import { updateRestaurantOwner } from "../../../API/AccountsData";
import { inscriptionStyle } from "./Style";
import "../../Connexion/Connexion";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MyAccount extends React.Component {
  // Pour modifier exec 3 PUT (Restaurant, Company, Owner)
  constructor(props) {
    super(props);
    this.state = {
      restaurantOwner: [],

      nom: "",
      prénom: "",
      email: "",
      newEmail: "",
      testEmail: "",
      password: global.password,
      newPassword: global.password,
      testPassword: "",
      phone_number: "",
      company_position: "",

      restaurantName: "",
      restaurantAddress: "",
      restaurantPostal_code: "",
      restaurantCity: "",
      restaurantPhone_number: "",

      companyName: "",
      companyAddress: "",
      companyPostal_code: "",
      companyCity: "",
      companyCapital: "",
      companySIRET_number: "",
      companyRetirement_fund_name: "",
      companyRetirement_fund_address: "",
      companyRetirement_fund_city: "",
      companyRetirement_fund_postal_code: "",

      isValid: false,
    };
  }

  _testIsValid() {
    if (this.state.restaurantOwner === []) {
    } else {
      this.setState({ isValid: true });
    }
  }

  _insertData(val) {
    console.log("1lo " + val.company.capital);
    this.setState({
      restaurantOwner: val,
      nom: val.nom,
      prénom: val.prénom,
      email: val.email,
      newEmail: val.email,
      phone_number: val.phone_number,
      company_position: val.company_position,

      restaurantName: val.restaurant.name,
      restaurantAddress: val.restaurant.address,
      restaurantPostal_code: val.restaurant.postal_code,
      restaurantCity: val.restaurant.city,
      restaurantPhone_number: val.restaurant.phone_number,

      companyName: val.company.name,
      companyAddress: val.company.address,
      companyPostal_code: val.company.postal_code,
      companyCity: val.company.city,
      companyCapital: val.company.capital + "",
      companySIRET_number: val.company.SIRET_number,
      companyRetirement_fund_name: val.company.retirement_fund_name,
      companyRetirement_fund_address: val.company.retirement_fund_address,
      companyRetirement_fund_city: val.company.retirement_fund_city,
      companyRetirement_fund_postal_code:
        val.company.retirement_fund_postal_code,
    });
  }

  componentDidMount() {
    getRestaurantOwnerDetail().then((data) => {
      this._insertData(data[0]), this._testIsValid();
    });
  }

  _isEmailChange(mail) {
    if (mail === global.email) {
      updateRestaurantOwner(
        {
          nom: this.state.nom,
          prénom: this.state.prénom,
          //email: this.state.email,
          phone_number: this.state.phone_number,
          company_position: this.state.company_position,

          restaurant: {
            name: this.state.restaurantName,
            address: this.state.restaurantAddress,
            postal_code: this.state.restaurantPostal_code,
            city: this.state.restaurantCity,
            phone_number: this.state.restaurantPhone_number,
          },

          company: {
            name: this.state.companyName,
            address: this.state.companyAddress,
            postal_code: this.state.companyPostal_code,
            city: this.state.companyCity,
            capital: Number(this.state.companyCapital),
            SIRET_number: this.state.companySIRET_number,
            retirement_fund_name: this.state.companyRetirement_fund_name,
            retirement_fund_address: this.state.companyRetirement_fund_address,
            retirement_fund_city: this.state.companyRetirement_fund_city,
            retirement_fund_postal_code: this.state
              .companyRetirement_fund_postal_code,
          },

          user: {
            //username: this.state.email,
            password: this.state.newPassword, // sécurisation à revoir
          },
        },
        this.state.restaurantOwner.id
      );
    } else {
      global.email = mail;
      updateRestaurantOwner(
        {
          nom: this.state.nom,
          prénom: this.state.prénom,
          email: mail,
          phone_number: this.state.phone_number,
          company_position: this.state.company_position,

          restaurant: {
            name: this.state.restaurantName,
            address: this.state.restaurantAddress,
            postal_code: this.state.restaurantPostal_code,
            city: this.state.restaurantCity,
            phone_number: this.state.restaurantPhone_number,
          },

          company: {
            name: this.state.companyName,
            address: this.state.companyAddress,
            postal_code: this.state.companyPostal_code,
            city: this.state.companyCity,
            capital: Number(this.state.companyCapital),
            SIRET_number: this.state.companySIRET_number,
            retirement_fund_name: this.state.companyRetirement_fund_name,
            retirement_fund_address: this.state.companyRetirement_fund_address,
            retirement_fund_city: this.state.companyRetirement_fund_city,
            retirement_fund_postal_code: this.state
              .companyRetirement_fund_postal_code,
          },

          user: {
            username: mail,
            password: this.state.newPassword, // sécuristion à revoir
          },
        },
        this.state.restaurantOwner.id
      );
    }
  }

  /* Compare the two emails written by the user */
  /*Several scenarios : */
  _compareEmails() {
    /*1 - If the email has changed but it's not the same as the confirmation email */
    if (
      this.state.newEmail !== this.state.email &&
      this.state.newEmail !== this.state.testEmail
    ) {
      this.setState({ isEmailValid: false });
      return Alert.alert(
        "L'email de confirmation n'est pas le même, veuillez vérifier."
      );
    } else if (!this._validateEmail(this.state.newEmail)) {
      /*2 - If the syntax of the newEmail is incorrect */
      this.setState({ isEmailValid: false });
      return Alert.alert(
        "Le format du nouvel email utilisateur n'est pas valide. Exemple: contact@contact.com"
      );
    } else {
      console.log("mail checked");
      this._comparePasswords();
    }
  }

  /* Compare the two passwords written by the user */
  /*Several scenarios : */
  _comparePasswords() {
    /*1 - If the password has changed but it's not the same as the confirmation password */
    if (
      this.state.newPassword !== this.state.password &&
      this.state.newPassword !== this.state.testPassword
    ) {
      this.setState({ isPasswordValid: false });
      return Alert.alert(
        "Le mot de passe de confirmation n'est pas le même, veuillez vérifier."
      );
    } else {
      console.log("password checked");
      console.log(this);

      this.setState({ password: this.state.newPassword });
      this._verify();
    }
  }

  /* Validation du champs */
  _validateBp = (postalCode) => {
    var re = /^[0-9]{5,5}$/;
    return re.test(postalCode);
  };

  _validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  _validatePhoneNumber = (phone) => {
    var re = /^(0)[1-9]( *[0-9]{2}){4}$/;
    return re.test(phone);
  };

  // Verify all the input

  _verify() {
    if (this.state.nom == "") {
      return Alert.alert("Veuillez renseigner le nom utilisateur");
    }
    if (this.state.prénom == "") {
      return Alert.alert("Veuillez renseigner le prénom utilisateur");
    }
    if (!this._validatePhoneNumber(this.state.phone_number)) {
      return Alert.alert(
        "Le format du numéro de téléphone de l'utilisateur n'est pas valide. Exemple: 06 78 96 75 45"
      );
    }
    if (this.state.phone_number == "") {
      return Alert.alert(
        "Veuillez renseigner le numéro de téléphone de l'utilisateur"
      );
    }
    if (this.state.restaurantName == "") {
      return Alert.alert("Veuillez renseigner le nom de l'établissement");
    }
    if (this.state.restaurantAddress == "") {
      return Alert.alert("Veuillez renseigner l'adresse de l'établissement");
    }
    if (!this._validateBp(this.state.restaurantPostal_code)) {
      return Alert.alert(
        "Le code postal de l'établissement n'est pas valide. Exemple: 75000"
      );
    }
    if (this.state.restaurantPostal_code == "") {
      return Alert.alert(
        "Veuillez renseigner le code postal de l'établissement"
      );
    }
    if (this.state.restaurantCity == "") {
      return Alert.alert("Veuillez renseigner la ville de l'établissement");
    }
    if (this.state.company_position == "") {
      return Alert.alert("Veuillez renseigner le poste dans l'entreprise");
    }
    if (!this._validatePhoneNumber(this.state.restaurantPhone_number)) {
      return Alert.alert(
        "Le format du numéro de téléphone de l'établissement n'est pas valide. Exemple: 06 78 96 75 45"
      );
    }
    if (this.state.restaurantPhone_number == "") {
      return Alert.alert(
        "Veuillez renseigner le numéro de téléphone de l'établissement"
      );
    }
    if (this.state.companyName == "") {
      return Alert.alert(
        "Veuillez renseigner la dénomination sociale de la société"
      );
    }
    if (this.state.companyAddress == "") {
      return Alert.alert("Veuillez renseigner l'adresse du siège social");
    }
    if (!this._validateBp(this.state.companyPostal_code)) {
      return Alert.alert(
        "Le code postal du siège social n'est pas valide. Exemple: 75000"
      );
    }
    if (this.state.companyPostal_code == "") {
      return Alert.alert("Veuillez renseigner le code postal du siège social");
    }
    if (this.state.companyCity == "") {
      return Alert.alert("Veuillez renseigner la ville du siège social");
    }
    if (this.state.companyCapital == "") {
      return Alert.alert("Veuillez renseigner le capital de la société");
    }
    if (this.state.companySIRET_number == "") {
      return Alert.alert("Veuillez renseigner le numéro SIRET de la société");
    }
    if (this.state.companyRetirement_fund_name == "") {
      return Alert.alert(
        "Veuillez renseigner le nom de la caisse de retraite de la société"
      );
    }
    if (this.state.companyRetirement_fund_address == "") {
      return Alert.alert(
        "Veuillez renseigner l'adresse de la caisse de retraite de la société"
      );
    }
    if (this.state.companyRetirement_fund_city == "") {
      return Alert.alert(
        "Veuillez renseigner la ville de la caisse de retraite de la société"
      );
    }
    if (!this._validateBp(this.state.companyRetirement_fund_postal_code)) {
      return Alert.alert(
        "Le code postal de la caisse de retraite n'est pas valide. Exemple: 75000"
      );
    }
    if (this.state.companyRetirement_fund_postal_code == "") {
      return Alert.alert(
        "Veuillez renseigner le code postal de la caisse de retraite de la société"
      );
    } else {
      this._isEmailChange(this.state.newEmail);
      console.log(this.state.newPassword);
      Alert.alert("Modifications enregistrées");
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.content_container}>
          <View style={styles.line} />

          <View alignItems="center">
            <Text style={styles.title}>Profil utilisateur</Text>
          </View>

          <View style={styles.input_container}>
            <Text style={styles.input_name}>Nom</Text>
            <TextInput
              style={styles.text_input}
              placeholder="Dupond"
              value={this.state.nom}
              onChangeText={(value) => this.setState({ nom: value })}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Prénom</Text>
            <TextInput
              style={styles.text_input}
              placeholder="Eric"
              value={this.state.prénom}
              onChangeText={(value) => this.setState({ prénom: value })}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Email</Text>
            <TextInput
              style={styles.text_input}
              placeholder="example@gmail.com"
              value={this.state.newEmail}
              onChangeText={(value) => this.setState({ newEmail: value })}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Confirmer votre email</Text>
            <TextInput
              style={styles.text_input}
              placeholder="example@gmail.com"
              value={this.state.testEmail}
              onChangeText={(value) => this.setState({ testEmail: value })}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Mot de passe</Text>
            <TextInput
              style={styles.text_input}
              placeholder=""
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={
                (value) => this.setState({ newPassword: value })
                //this._comparePasswords()
              }
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Confirmer mot de passe</Text>
            <TextInput
              style={styles.text_input}
              placeholder=""
              secureTextEntry={true}
              value={this.state.testPassword} // testPassword
              onChangeText={
                (value) => this.setState({ testPassword: value })
                //this._comparePasswords()
              }
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.input_name}>Numéro de téléphone</Text>
            <TextInput
              style={styles.text_input}
              placeholder="0612345678"
              value={this.state.phone_number}
              onChangeText={(value) => this.setState({ phone_number: value })}
            />
          </View>

          {this.state.isValid ? (
            <View>
              <View alignItems="center">
                <Text style={styles.title}>Société</Text>
              </View>

              <View style={styles.input_container}>
                <Text style={styles.input_name}>Dénomination sociale</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Indiquer la domination social"
                  value={this.state.companyName}
                  onChangeText={(value) =>
                    this.setState({ companyName: value })
                  }
                />
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>Adresse du siège social</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Indiquer la domination social"
                  value={this.state.companyAddress}
                  onChangeText={(value) =>
                    this.setState({ companyAddress: value })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Code postal</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="75001"
                    value={this.state.companyPostal_code}
                    onChangeText={(value) =>
                      this.setState({ companyPostal_code: value })
                    }
                  />
                </View>
                <View style={[styles.input_container, { flex: 2 }]}>
                  <Text style={styles.input_name}>Ville</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Paris"
                    value={this.state.companyCity}
                    onChangeText={(value) =>
                      this.setState({ companyCity: value })
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Capital</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Indiquer le capital "
                    value={this.state.companyCapital}
                    onChangeText={(value) =>
                      this.setState({ companyCapital: value })
                    }
                  />
                </View>
                <View style={[styles.input_container, { flex: 2 }]}>
                  <Text style={styles.input_name}> SIREN</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="0664646646464"
                    value={this.state.companySIRET_number}
                    onChangeText={(value) =>
                      this.setState({ companySIRET_number: value })
                    }
                  />
                </View>
              </View>

              <View style={styles.input_container}>
                <Text style={styles.input_name}>
                  Nom de la caisse de retraite
                </Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Indiquer le nom de la caisse de retraite"
                  value={this.state.companyRetirement_fund_name}
                  onChangeText={(value) =>
                    this.setState({ companyRetirement_fund_name: value })
                  }
                />
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>
                  Adresse de la caisse de retraite
                </Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="75 rue de Paris"
                  value={this.state.companyRetirement_fund_address}
                  onChangeText={(value) =>
                    this.setState({
                      companyRetirement_fund_address: value,
                    })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Code postal</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="75001"
                    value={this.state.companyRetirement_fund_city}
                    onChangeText={(value) =>
                      this.setState({
                        companyRetirement_fund_city: value,
                      })
                    }
                  />
                </View>
                <View style={[styles.input_container, { flex: 2 }]}>
                  <Text style={styles.input_name}>Ville</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Paris"
                    value={this.state.companyRetirement_fund_postal_code}
                    onChangeText={(value) =>
                      this.setState({
                        companyRetirement_fund_postal_code: value,
                      })
                    }
                  />
                </View>
              </View>
            </View>
          ) : null}

          {this.state.isValid ? (
            <View>
              <View alignItems="center">
                <Text style={styles.title}>Établissement</Text>
              </View>

              <View style={styles.input_container}>
                <Text style={styles.input_name}>Nom de l'établissement</Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="Indiquer le nom de l'établissement"
                  value={this.state.restaurantName}
                  onChangeText={(value) =>
                    this.setState({ restaurantName: value })
                  }
                />
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_name}>
                  Adresse (rue, avenue, boulevard, voie...)
                </Text>
                <TextInput
                  style={styles.text_input}
                  placeholder="75 rue de Paris"
                  value={this.state.restaurantAddress}
                  onChangeText={(value) =>
                    this.setState({ restaurantAddress: value })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Code postal</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="75001"
                    value={this.state.restaurantPostal_code}
                    onChangeText={(value) =>
                      this.setState({ restaurantPostal_code: value })
                    }
                  />
                </View>
                <View style={[styles.input_container, { flex: 2 }]}>
                  <Text style={styles.input_name}>Ville</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Paris"
                    value={this.state.restaurantCity}
                    onChangeText={(value) =>
                      this.setState({ restaurantCity: value })
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Poste dans l'entreprise</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="Président"
                    value={this.state.company_position}
                    onChangeText={(value) =>
                      this.setState({ company_position: value })
                    }
                  />
                </View>
                <View style={[styles.input_container, { flex: 1 }]}>
                  <Text style={styles.input_name}>Numéro de téléphone</Text>
                  <TextInput
                    style={styles.text_input}
                    placeholder="0612345678"
                    value={this.state.restaurantPhone_number}
                    onChangeText={(value) =>
                      this.setState({ restaurantPhone_number: value })
                    }
                  />
                </View>
              </View>
            </View>
          ) : null}

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this._compareEmails();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  // style of the scrollview witch contain the main view (style du scrollview qui contient la vue principal)
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  // style of the main view (style de la vue principal)
  content_container: {
    flex: 1,
    width: "100%",
    padding: "3%",
  },
  // style of the view witch contain the text and the textinput (style de la vue qui contient le texte et le textinput )
  input_container: {
    flex: 1,
    marginHorizontal: "1%",
  },
  // style of the text before the input (style du texte avant la saisie)
  input_name: {
    fontWeight: "700",
    fontSize: 14,
    color: "#04295D",
  },
  // style of textinput(style de la zone d'entrée de texte)
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

  // style of the button (style des boutons)

  button: {
    width: "100%",
    marginVertical: "3%",
    borderColor: "#3BB9E0",
    borderWidth: 0.5,
    borderRadius: 6,
    backgroundColor: "#3BB9E0",
    alignSelf: "center",
  },
  // style of the text in the button (style du texte à  l'intérrieur des boutons)

  buttonText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
  },
  // style of the title
  title: {
    color: "#04295D",
    fontWeight: "bold",
    fontSize: 20,
  },
});