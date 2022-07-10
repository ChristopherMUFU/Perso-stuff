import React from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { getRestaurantOwnerDetail } from "../../../API/AccountsData";
import call from "react-native-phone-call";
import email from "react-native-email";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // A MODIFIER !
      restaurantOwner: [],
      isValid: false,
    };
  }

  /* Go to a page */
  _goTo = (action) => {
    switch (action) {
      case "Informationsektor":
        this.props.navigation.navigate("informationsektor");
        break;
      case "SupportTechnique":
        this.props.navigation.navigate("technicalsupport");
        break;
      case "NoticeInfoImp":
        this.props.navigation.navigate("noticeinfoimp");
        break;
      case "CGU":
        this.props.navigation.navigate("cgu");
        break;
      case "CGV":
        this.props.navigation.navigate("cgv");
        break;
      case "Guidedutilisation":
        this.props.navigation.navigate("Guidedutilisation");
        break;
      case "Confidentilite":
        this.props.navigation.navigate("confidentialite");
        break;
    }
  };

  call = () => {
    //handler to make a call
    const args = {
      number: "0615244088",
      prompt: false,
    };
    call(args).catch(console.error);
  };

  handleEmail = () => {
    const to = "contact@markus-app.com"; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [""], // string or array of email addresses
      bcc: "", // string or array of email addresses
      subject: "",
      body: "",
    }).catch(console.error);
  };

  _testIsValid() {
    if (this.state.restaurantOwner === []) {
    } else {
      this.setState({ isValid: true });
    }
  }

  _insertData(val) {
    this.setState({ restaurantOwner: val[0] });
  }

  _dataRefresh() {
    getRestaurantOwnerDetail().then((data) => {
      this._insertData(data), this._testIsValid();
    });
  }

  componentDidMount() {
    this._dataRefresh();
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this._dataRefresh();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Assistance</Text>

          {this.state.isValid ? (
            <Text style={styles.userName}>
              {this.state.restaurantOwner.nom +
                " " +
                this.state.restaurantOwner.prénom}
            </Text>
          ) : null}

          <Text style={styles.jobTitle}>
            {this.state.restaurantOwner.company_position}
          </Text>

          <View style={styles.line}>
            <View style={styles.lineSize} />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this._goTo("CGV");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>CGU - Mentions légales</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this._goTo("Confidentilite");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Politique de confidentialité</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this._goTo("Guidedutilisation");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Guide d'utilisation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.handleEmail();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Support technique</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  /*GENERAL */
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: "7%",
    width: windowWidth,
    height: windowHeight * 1.2,
    color: "#04295D",
  },
  // style of the button (style des boutons)
  button: {
    height: "6%",
    width: "90%",
    marginVertical: "3%",
    borderColor: "#04295D",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#04295D",
  },
  // style of the text in the button (style du texte à  l'intérrieur des boutons)
  buttonText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
  },
  // style of the title in the page ( style de titre de la page )
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#04295D",
    marginBottom: "5%",
  },
  // style for the view contain the line ( style de la vue qui contient le trait )
  line: {
    flexDirection: "row",
    marginTop: "2%",
    marginBottom: "2%",
  },
  // style of the line (style du trait )
  lineSize: {
    marginRight: 50,
    marginLeft: 50,
    flex: 1,
    height: 1,
    backgroundColor: "#04295D",
  },
  // style of the user name in the top of the page ( style du nom au début de la page )
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#04295D",
    marginTop: "5%",
  },
  // style of the Job title in the top of the page ( style du poste au début de la page )
  jobTitle: {
    fontSize: 13,
    fontStyle: "italic",
    textTransform: "uppercase",
    color: "#04295D",
    marginTop: "3%",
  },
});