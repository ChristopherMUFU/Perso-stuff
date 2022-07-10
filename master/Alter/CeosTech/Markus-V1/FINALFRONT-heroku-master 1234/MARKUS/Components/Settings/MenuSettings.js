import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
} from "react-native";
import * as Theme from "../Styles/Theme";
import { getRestaurantOwnerDetail } from "../../API/AccountsData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faSignOutAlt,
  faArrowLeft,
  faCog,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";

import { userLogout } from "../../actions/accountsData";
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout()),
  };
};

class MenuSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // A MODIFIER !
      restaurantOwner: [],
      isValid: false,
    };
    this.asyncStor = AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
          return true;
        });
      });
    });
  }

  /* Go to a page */
  _goTo = (action) => {
    switch (action) {
      case "MyAccount":
        this.props.navigation.navigate("my_account");
        break;

      case "Display":
        this.props.navigation.navigate("display");
        break;

      case "ImportDocs":
        this.props.navigation.navigate("ImportDocs");
        break;
      case "Help":
        this.props.navigation.navigate("help");
    }
  };

  _logOut() {
    //Step 1: clear the local storage
    console.log("logout");
    this.clearAsyncStorage();

    //Step 2 : clear the global variables
    global.sessionToken = "";
    global.sessionRefresh = "";
    global.email = "";
    global.password = "";

    //Step 3: clear the state => using Redux
    this.props.logout();

    //Step 4 : redirection
    this.props.navigation.navigate("connexion");
  }

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
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
    console.log("le storage :: " + JSON.stringify(this.asyncStor));
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
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <ScrollView style={{ flex: 1, width: windowWidth }}> */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{
                width: "80%",
                zIndex: 99,
                marginTop: "-3%",
                marginLeft: "5%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ flex: 1, marginTop: "10%", color: "white" }}
                  size={18}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>
              {" "}
              COMPTE <Text style={{ color: "#6ed6ff" }}>.</Text>
            </Text>

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

            {/* <ScrollView style={{ width: "100%" }}> */}
              <View
                style={{
                  alignItems: "center",
                  marginTop: "10%",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this._goTo("MyAccount");
                  }}
                  style={styles.button}
                >
                  <View style={styles.buttonContent}>
                    <FontAwesomeIcon
                      icon={faCog}
                      style={styles.buttonIcon}
                      size={28}
                    />
                    <Text style={styles.buttonText}> Mon Compte </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this._goTo("Help");
                  }}
                  style={styles.button}
                >
                  <View style={styles.buttonContent}>
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      style={styles.buttonIcon}
                      size={28}
                    />
                    <Text style={styles.buttonText}> Assistance </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this._logOut()}
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#d00002",
                      width: "50%",
                      borderColor: "white",
                    },
                  ]}
                >
                  <View style={styles.buttonContent}>
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      style={styles.buttonIcon}
                      size={28}
                    />

                    <Text style={styles.buttonText}> Déconnexion </Text>
                  </View>
                </TouchableOpacity>
              </View>
            {/* </ScrollView> */}
          </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MenuSettings);

const styles = StyleSheet.create({
  /*GENERAL */
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    paddingTop: "7%",
    width: windowWidth,
    height: windowHeight,
    color: "white",
  },
  // style of the title of the page ( style de titre de la page )

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#04295D",
    marginTop: "5%",
    marginBottom: "5%",
  },
  // style for the view contain the line ( style de la vue qui contient le trait )

  line: {
    flexDirection: "row",
    marginTop: "2%",
    marginBottom: "8%",
  },
  // style of the line (style du trait )

  lineSize: {
    marginHorizontal: "13%",
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
  // style of the button (style des boutons)

  button: {
    width: "90%",
    marginVertical: "3%",
    borderColor: "#04295D",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#04295D",
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
  // style of the icon (style de l'icone)
  buttonIcon: {
    color: "white",
    margin: "1%",
  },
});