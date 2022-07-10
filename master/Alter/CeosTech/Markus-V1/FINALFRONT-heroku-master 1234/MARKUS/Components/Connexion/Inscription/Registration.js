import React from "react";
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    global.sessionToken = null;
  }

  _goTo = (destination) => {
    this.props.navigation.navigate(destination);
  };

  render() {
    return (
        <ScrollView style={styles.mainContainer}>
          {/**Notice explicative / Explanatory note */}
            <View style={styles.content_container}>

                <View style={styles.containertitle}>
                    <Text style={styles.title}>Commencer l'inscription</Text>
                </View>

                <View style={styles.notice_container}>
                    
                    <Text style={[styles.notice_text]}>
                    Les informations demandées dans ce formulaire sont nécessaires
                    pour exploiter certaines fonctionnalités de l'application.
                    </Text>

                    <Text style={[styles.notice_text]}>
                        Toutes les données communiquées seront strictement tenues
                        confidentielles et sont exclusivement exploitées dans le cadre de
                        l'application 
                        <Text
                            style={{
                            fontSize: 18,
                            color: "#3BB9E0",
                            fontWeight: "bold",
                            }}
                        >
                            {" "}MARKUS.
                        </Text>
                    </Text>
                    <Text style={styles.notice_text}>
                        Le processus d’inscription s'effectue' en 4 étapes, veuillez vous
                        munir de votre extrait de 
                        <Text
                            style={{
                            fontSize: 19,
                            color: "#04295D",
                            fontWeight: "bold",
                            }}
                        >
                            {" "}KBIS,{" "}
                        </Text>
                        ainsi que des informations relatives à la{" "}
                        <Text
                            style={{
                            fontSize: 19,
                            color: "#04295D",
                            fontWeight: "bold",
                            }}
                        >
                            caisse de retraite{" "}
                        </Text>
                        de votre entreprise.
                    </Text>
                </View>

                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    this._goTo("registrationStep1"); /* _validate()*/
                }}
                >
                <Text style={styles.buttonText}>Commencer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainContainer:{ 
        flex: 1, 
        width: "100%",
        backgroundColor: "#FFFFFF",
      },
      content_container: {
        flex: 1,
        //width: phoneWidth,
        padding: "4%",
      },
      
      button: {
        width: "100%", 
        marginVertical: '3%', 
        borderColor: "#3BB9E0", 
        borderWidth: .5,
        borderRadius: 6,
        backgroundColor: '#3BB9E0',
        alignSelf: "center"
      },
      buttonText: {
        flex:1,
        fontSize: 20,
        fontWeight:'bold',
        color: "white",
        textAlign: "center",
        flexDirection:'row', 
        alignItems:'center',
        justifyContent: "center",
        padding: "3%"
      },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#04295D",
        marginTop: "5%",
        marginBottom: "5%",
    },
    notice_text: {
        //backgroundColor: "yellow",
        color: "#04295D",
        fontSize: 18,
        alignSelf: "center",
        textAlign: "justify",
        marginVertical: "1%"

    },
    containertitle: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "center",
    },
    notice_container: {
        marginVertical: 25,
        flexDirection: "column",
        alignItems: "center",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "2%",
    },
});