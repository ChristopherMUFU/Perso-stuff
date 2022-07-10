import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPhone,
  faEnvelopeOpen,
  faMapPin,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { faAngleUp, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import call from "react-native-phone-call";
import email from "react-native-email";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let recupData = [];

class FournisseurItem extends React.Component {
  // CONSTRUCTEUR / CONSTRCUTOR
  constructor(props) {
    super(props);
    this.state = {
      // ico : {},
      box_height: windowHeight * 0.08,
      boxOpened: false,
      fournisseur: [],
      isVisible: false,
    };
  }
  _goTo(destination) {
    this.props.navigation.navigate(destination);
  }

  delete() {
    this.props.fournisseurItem.removeFournisseur(this.props.fournisseur.id);
    this.props.navigation.navigate("fournisseurs");
  }

  handleEmail = () => {
    const to = [this.props.fournisseur.adresse_mail]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [""], // string or array of email addresses
      bcc: "", // string or array of email addresses
      subject: "",
      body: "",
    }).catch(console.error);
  };

  /* Fonction qui pemet d'appeller directement le fournisseur quand on clic sur le numero de telephone */
  call = () => {
    //handler to make a call
    const args = {
      number: this.props.fournisseur.numero_telephone,
      prompt: false,
    };
    call(args).catch(console.error);
  };
  _recupDetail(data) {
    recupData = data;
    console.log("DETAIL");
    console.log(data);
  }
  _returnData() {
    console.log("DETAIL2");
    console.log(recupData);
    return recupData;
  }
  _displayDeleveryDay() {
    let livraison = JSON.parse(this.props.fournisseur.jour_livraison);
    console.log("livraison :: " + livraison);
    console.log(livraison.length);
    let res = "";
    for (let i in livraison) {
      if (i == livraison.length - 1) {
        console.log(i + " ok");
        res += livraison[i];
      } else {
        console.log(i);
        res += livraison[i] + ", ";
      }
    }
    return res;
  }

  /// AFFICHAGE / DISPLAY
  _displayDetail() {
    const { fournisseur } = this.props;
    const { navigation } = this.props;

    if (this.state.isVisible) {
      return (
        <View style={[styles.box_item]}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isVisible: false }), console.log(this.props);
            }}
            style={{
              flex: 2,
              paddingLeft: 15,
              color: "white",
              textAlignVertical: "center",
              fontSize: 20,
              marginRight: "10%",
            }}
          >
            <View style={styles.box_container}>
              <View style={styles.box_top_container}>
                <View style={styles.box_left_container}>
                  <Text style={styles.list_textTitle}>{fournisseur.nom}</Text>
                </View>

                <View style={styles.box_right_container} />
              </View>

              <View
                style={{
                  paddingLeft: "1%",
                  marginBottom: "4%",
                  marginTop: "9%",
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    onPress={() => this.call()}
                    icon={faPhone}
                    style={{ color: "#04295D", marginRight: "5%" }}
                    size={20}
                  />

                  <Text onPress={() => this.call()} style={styles.text_details}>
                    {" "}
                    {fournisseur.numero_telephone}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    onPress={() => this.handleEmail()}
                    icon={faEnvelopeOpen}
                    style={{ color: "#04295D", marginRight: "5%" }}
                    size={20}
                  />
                  <Text
                    onPress={() => this.handleEmail()}
                    style={styles.text_details}
                  >
                    {" "}
                    {fournisseur.adresse_mail}{" "}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    icon={faMapPin}
                    style={{ color: "#04295D", marginRight: "5%" }}
                    size={20}
                  />

                  <Text style={styles.text_details}>
                    {fournisseur.adresse}, {fournisseur.code_postale}{" "}
                    {fournisseur.ville}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    style={{ color: "#04295D", marginRight: "5%" }}
                    size={20}
                  />
                  {/* <Text style = {styles.text_details}>Nom du Contact : {fournisseur.contact.name}</Text> */}
                  <Text style={styles.text_details}>
                    {fournisseur.nom_contact}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    style={{ color: "#04295D", marginRight: "5%" }}
                    size={20}
                  />
                  <Text style={styles.text_details}>
                    {this._displayDeleveryDay()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: "1%",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    Alert.alert(
                      "Attention !",
                      "Êtes-vous sûr de vouloir modifier ce fournisseur ?",
                      [
                        {
                          text: "Annuler",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Oui",
                          onPress: () => {
                            this._recupDetail(fournisseur),
                              this._goTo("edit_fournisseur");
                          },
                        },
                      ],

                      { cancelable: false }
                    )
                  }
                  //style={Theme.buttonsV2.touchable, {alignItems: 'center'}}
                >
                  <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isVisible: false }),
                      console.log(this.props);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    style={{ color: "#04295D", marginTop: "90%" }}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    Alert.alert(
                      "Attention !",
                      "Êtes-vous sûr de vouloir supprimer ce fournisseur ?",
                      [
                        {
                          text: "Annuler",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Oui",
                          onPress: () => {
                            this.delete();
                          },
                        },
                      ],

                      { cancelable: false }
                    )
                  }
                >
                  <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.box_item, { height: this.state.box_height }]}>
          <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
            <View style={styles.box_container}>
              <View style={styles.box_top_container}>
                <View style={styles.box_left_container}>
                  <Text style={styles.list_textTitle}>{fournisseur.nom}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    console.log("this.props.iteee");
    console.log(this.props.navigation);
    return <>{this._displayDetail()}</>;
  }
}

// STYLES
const styles = StyleSheet.create({
  box_item: {
    width: windowWidth * 0.95,
    borderWidth: 1.0,
    borderRadius: 5,
    borderColor: "#04295D",
    marginBottom: "4%",
    margin: "auto",
  },
  box_container: {
    height: "100%",
  },
  box_top_container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    padding: "2%",
  },
  box_left_container: {
    flex: 2,
  },
  box_right_container: {
    flex: 2,
    alignItems: "flex-end",
  },

  list_textTitle: {
    color: "#04295D",
    fontSize: 18,
    fontWeight: "bold",
    // flex: 3,
    textAlignVertical: "center",
    marginTop: "3%",
    marginLeft: "4%",
  },
  button: {
    height: "70%",
    width: "50%",
    borderColor: "#3BB9E0",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#3BB9E0",
  },

  text_details: {
    color: "#04295D",
    fontSize: 16,
  },

  buttonText: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    marginBottom: 10,
    color: "#04295D",
    backgroundColor: "transparent",
  },
});

export default FournisseurItem;