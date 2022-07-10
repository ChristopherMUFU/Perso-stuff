import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  /*GENERAL */
  container: {
    //backgroundColor: "black",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1%",
    width: "100%",
  },
  logo: {
    height: 200,
    width: 306,
    resizeMode: "stretch",
  },
  title: {
    fontSize: 30,
    color: "#04295D",
    marginTop: "10%",
    fontWeight: "bold",
    marginBottom: "10%",
  },
  minititle: {
    color: "white",
    fontSize: 15,
    fontStyle: "italic",
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  return: {
    color: "white",
    flex: 1,
  },
  underline: {
    width: "50%",
    borderBottomWidth: 0.5,
    borderColor: "white",
    marginTop: 10,
    marginBottom: 30,
  },

  /*for the drop down*/
  dropdown: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    paddingLeft: "25%",
    marginTop: 15,
  },
  dropdown1: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    paddingLeft: "20%",
    marginTop: 15,
    marginBottom: 10,
  },
  name: {
    // civility
    paddingLeft: 15,
    borderRadius: 8,
    borderWidth: 0.5,
    width: "30%",
    borderColor: "black",
    backgroundColor: "white",
    height: 65,
    marginTop: "5%",
  },

  dropdownDuration: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    width: "40%",
    height: 62,
    paddingLeft: 30,
    marginTop: 15,
  },

  /* for the text input */
  textinput: {
    marginTop: "3%",
    width: "90%",
    height: 55,
    borderWidth: 1.0,
    borderRadius: 7,
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
    paddingLeft: "4%",
    marginBottom: 2,
  },
  textname: {
    // text input first name & last name
    marginTop: 20,
    height: 40,
    width: "60%",
    height: 65,
    borderWidth: 1.0,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
    paddingLeft: 35,
    marginBottom: 10,
  },

  textduration: {
    marginTop: 20,
    height: 40,
    width: "50%",
    height: 65,
    borderWidth: 1.0,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    color: "black",
    paddingLeft: 35,
    marginBottom: 5,
  },

  /*customized button */
  button: {
    marginTop: 10,
    backgroundColor: "#201E1F",
    borderColor: "#3BB9E0",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 7,
  },

  /* POP-UP */
  popup: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  popup_container: {
    top: "10%",
    backgroundColor: "#3C3C3C",
    alignItems: "center",
    width: "90%",
    height: "60%",
    padding: "5%",
    borderColor: "white",
    borderWidth: 0.5,
  },

  /*Signature pad*/
  signature: {
    flex: 1,
    borderColor: "#000033",
    borderWidth: 5,
  },

  /* MAIN PART */
  box: {
    flex: 0.4,
    width: "95%",
    backgroundColor: "#616161",
    borderRadius: 7,
    marginBottom: 10,
  },
  box1: {
    flex: 0.5,
    width: "94%",
    borderRadius: 7,
    marginHorizontal: "3%",
    marginTop: "3%",
  },
  box2: {
    flex: 0.5,
    width: "35%",
    borderRadius: 7,
    marginHorizontal: "1%",
    marginTop: "3%",
  },
  minibox: {
    width: Dimensions.get("window").width * 0.46,
    height: Dimensions.get("window").height * 0.3,

    borderRadius: 7,
    marginLeft: 10,
  },
});

export const buttons = StyleSheet.create({
  choices: {
    marginTop: 10,
    backgroundColor: "#3C3C3C",
    borderColor: "white",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 7,
  },
  titlechoice: {
    color: "white",
    fontSize: 20,
  },
});
export const buttonsV2 = StyleSheet.create({
  touchAble: {
    width: windowWidth * 0.9,
    marginTop: "1%",
    backgroundColor: "gray",
  },
  touch: {
    width: windowWidth * 0.9,
    backgroundColor: "transparent",
    marginTop: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    borderColor: "#04295D",
    borderWidth: 0.5,
    marginBottom: 5,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    borderColor: "#04295D",
    borderWidth: 0.5,
    marginBottom: 25,
  },
  linearGradientb: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    borderColor: "#3BB9E0",
    borderWidth: 0.7,
    marginBottom: 25,
    marginTop: "3%",
  },
  linearGradients: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    borderColor: "#B0B0B0",
    borderWidth: 0.5,
    marginBottom: 25,
    marginTop: "-4%",
  },
  buttonText: {
    fontSize: 18,
    /* fontFamily: "Gill Sans", */
    textAlign: "center",
    margin: 5,
    marginVertical: "2%",
    color: "#FFFFFF",
    backgroundColor: "transparent",
  },
  buttonTextMenu: {
    fontSize: 30,
    /* fontFamily: "Gill Sans", */
    textAlign: "center",
    // margin: 10,
    marginBottom: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  buttonTextmenu: {
    // le style de fond du bouton + la forme
    fontSize: 18,
    /* fontFamily: "Gill Sans", */
    textAlign: "center",
    margin: 10,
    marginBottom: 15,
    color: "#FFFFFF",
    backgroundColor: "#04295D",
    paddingHorizontal: 15,
    paddingVertical: "2%",
    borderRadius: 5,
    borderWidth: 0.5,
    marginVertical: "1%",
  },
  buttonMenu: {
    // le style du text d'un bouton
    fontSize: 30,
    /* fontFamily: "Gill Sans", */
    textAlign: "center",

    color: "#ffffff",
    backgroundColor: "transparent",
    fontWeight: "bold",
  },

  linearGradientmenu: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderColor: "#3BB9E0",
    borderWidth: 1,
    marginBottom: "5%",
  },
});

// Bouton Page Affichage

export const buttonsV3 = StyleSheet.create({
  touchAble: {
    width: windowWidth * 0.7,
    marginTop: "5%",
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    borderWidth: 0.5,
    marginVertical: "1%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});